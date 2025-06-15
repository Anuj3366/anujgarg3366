interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
}

class ErrorTracker {
  private errors: ErrorReport[] = [];
  private maxErrors = 50;

  constructor() {
    this.setupGlobalErrorHandlers();
  }

  private setupGlobalErrorHandlers() {
    // Catch JavaScript errors
    window.addEventListener('error', (event) => {
      this.reportError({
        message: event.message,
        stack: event.error?.stack,
        url: event.filename || window.location.href,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    });

    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.reportError({
        message: `Unhandled Promise Rejection: ${event.reason}`,
        stack: event.reason?.stack,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      });
    });

    // Catch React errors (this will be caught by ErrorBoundary, but good to have backup)
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('React')) {
        this.reportError({
          message: args.join(' '),
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent
        });
      }
      originalConsoleError.apply(console, args);
    };
  }

  reportError(error: ErrorReport) {
    console.error('Error tracked:', error);
    
    this.errors.push(error);
    
    // Keep only recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Store in localStorage for debugging
    try {
      localStorage.setItem('error_reports', JSON.stringify(this.errors.slice(-10)));
    } catch (e) {
      // localStorage might be full
    }
  }

  getErrors(): ErrorReport[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
    localStorage.removeItem('error_reports');
  }
}

export const errorTracker = new ErrorTracker();

// Helper function to manually report errors
export const reportError = (error: Error, context?: string) => {
  errorTracker.reportError({
    message: `${context ? `${context}: ` : ''}${error.message}`,
    stack: error.stack,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: navigator.userAgent
  });
};
