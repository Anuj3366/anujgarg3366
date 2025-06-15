
interface HealthCheckResult {
  category: string;
  status: 'pass' | 'warning' | 'fail';
  details: string;
  recommendations?: string[];
}

export const performHealthCheck = async (): Promise<HealthCheckResult[]> => {
  const results: HealthCheckResult[] = [];

  // Check Performance
  const performanceCheck = () => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.navigationStart;
      results.push({
        category: 'Performance',
        status: loadTime < 3000 ? 'pass' : loadTime < 5000 ? 'warning' : 'fail',
        details: `Page load time: ${loadTime.toFixed(0)}ms`,
        recommendations: loadTime > 3000 ? ['Optimize images', 'Enable compression', 'Minimize JavaScript'] : undefined
      });
    }
  };

  // Check Service Worker
  const serviceWorkerCheck = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        results.push({
          category: 'Service Worker',
          status: registration ? 'pass' : 'warning',
          details: registration ? 'Service worker active' : 'Service worker not registered',
          recommendations: !registration ? ['Register service worker for offline support'] : undefined
        });
      });
    } else {
      results.push({
        category: 'Service Worker',
        status: 'fail',
        details: 'Service workers not supported',
        recommendations: ['Modern browser required']
      });
    }
  };

  // Check HTTPS
  const httpsCheck = () => {
    const isHTTPS = location.protocol === 'https:';
    const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
    
    results.push({
      category: 'Security',
      status: isHTTPS || isLocalhost ? 'pass' : 'fail',
      details: isHTTPS ? 'HTTPS enabled' : 'HTTP connection (insecure)',
      recommendations: !isHTTPS && !isLocalhost ? ['Enable HTTPS'] : undefined
    });
  };

  // Check Console Errors
  const consoleErrorCheck = () => {
    let errorCount = 0;
    const originalError = console.error;
    
    console.error = (...args) => {
      errorCount++;
      originalError.apply(console, args);
    };

    setTimeout(() => {
      results.push({
        category: 'Console Errors',
        status: errorCount === 0 ? 'pass' : errorCount < 3 ? 'warning' : 'fail',
        details: `${errorCount} console errors detected`,
        recommendations: errorCount > 0 ? ['Fix console errors'] : undefined
      });
      console.error = originalError;
    }, 2000);
  };

  // Check Local Storage Usage
  const storageCheck = () => {
    try {
      const testKey = 'test-storage';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      
      let storageSize = 0;
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          storageSize += localStorage[key].length;
        }
      }
      
      results.push({
        category: 'Storage',
        status: storageSize < 5000000 ? 'pass' : 'warning', // 5MB limit
        details: `Local storage usage: ${(storageSize / 1024).toFixed(2)}KB`,
        recommendations: storageSize > 5000000 ? ['Clean up local storage'] : undefined
      });
    } catch (error) {
      results.push({
        category: 'Storage',
        status: 'fail',
        details: 'Local storage not available',
        recommendations: ['Enable local storage in browser settings']
      });
    }
  };

  // Check Network Connection
  const networkCheck = () => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const effectiveType = connection?.effectiveType || 'unknown';
      
      results.push({
        category: 'Network',
        status: ['4g', '3g'].includes(effectiveType) ? 'pass' : 'warning',
        details: `Connection type: ${effectiveType}`,
        recommendations: effectiveType === '2g' ? ['Optimize for slow connections'] : undefined
      });
    } else {
      results.push({
        category: 'Network',
        status: 'pass',
        details: '连接信息不可用',
        recommendations: undefined
      });
    }
  };

  // Check Memory Usage
  const memoryCheck = () => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const usedMB = memory.usedJSHeapSize / 1024 / 1024;
      const limitMB = memory.jsHeapSizeLimit / 1024 / 1024;
      const usage = (usedMB / limitMB) * 100;
      
      results.push({
        category: 'Memory',
        status: usage < 50 ? 'pass' : usage < 80 ? 'warning' : 'fail',
        details: `Memory usage: ${usedMB.toFixed(2)}MB (${usage.toFixed(1)}%)`,
        recommendations: usage > 50 ? ['Monitor memory usage', 'Check for memory leaks'] : undefined
      });
    }
  };

  // Run all checks
  performanceCheck();
  serviceWorkerCheck();
  httpsCheck();
  consoleErrorCheck();
  storageCheck();
  networkCheck();
  memoryCheck();

  // Wait a bit for async checks to complete
  await new Promise(resolve => setTimeout(resolve, 3000));

  return results;
};

export const runHealthCheck = async () => {
  console.group('🏥 Website Health Check');
  
  const results = await performHealthCheck();
  
  results.forEach(result => {
    const icon = result.status === 'pass' ? '✅' : result.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${result.category}: ${result.details}`);
    
    if (result.recommendations) {
      result.recommendations.forEach(rec => {
        console.log(`   💡 ${rec}`);
      });
    }
  });
  
  const passCount = results.filter(r => r.status === 'pass').length;
  const totalCount = results.length;
  
  console.log(`\n📊 Overall Score: ${passCount}/${totalCount} checks passed`);
  console.groupEnd();
  
  return results;
};
