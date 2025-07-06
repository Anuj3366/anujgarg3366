
// Centralized logging utility
export class Logger {
  private static isDev = import.meta.env.DEV;

  static info(message: string, data?: any) {
    if (this.isDev) {
      console.log(`ℹ️ ${message}`, data || '');
    }
  }

  static warn(message: string, data?: any) {
    if (this.isDev) {
      console.warn(`⚠️ ${message}`, data || '');
    }
  }

  static error(message: string, error?: any) {
    if (this.isDev) {
      console.error(`❌ ${message}`, error || '');
    }
  }

  static performance(label: string, fn: () => void) {
    if (this.isDev) {
      const start = performance.now();
      fn();
      const duration = performance.now() - start;
      console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
    } else {
      fn();
    }
  }
}
