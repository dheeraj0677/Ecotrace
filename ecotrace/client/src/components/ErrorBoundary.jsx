import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-sand-50 dark:bg-dark-bg p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-16 h-16 bg-danger-600/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-danger-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2 font-display">
              Something went wrong
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              An unexpected error occurred. Please try refreshing the page.
            </p>
            {this.state.error && (
              <pre className="text-xs text-left bg-gray-100 dark:bg-dark-surface p-4 rounded-xl mb-6 overflow-auto max-h-32 text-gray-600 dark:text-gray-400">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleReset} icon={RefreshCw}>
                Try Again
              </Button>
              <Button variant="secondary" onClick={() => window.location.href = '/'}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
