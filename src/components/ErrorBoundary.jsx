import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console and error reporting service
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log to error reporting service (e.g., Sentry)
    if (process.env.REACT_APP_SENTRY_DSN) {
      // window.Sentry?.captureException(error, { extra: errorInfo });
    }
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#f9fafb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '28rem',
              margin: '0 auto',
              backgroundColor: 'white',
              borderRadius: '0.5rem',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              padding: '3rem 2rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '3rem',
                marginBottom: '1rem',
              }}
            >
              ⚠️
            </div>

            <h2
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '2rem',
                fontWeight: '600',
                color: '#111827',
                marginBottom: '1rem',
              }}
            >
              Something went wrong
            </h2>

            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: '1.125rem',
                color: '#4B5563',
                marginBottom: '2rem',
              }}
            >
              We're sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#111827',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  fontFamily: "'Baugeld Spezialisten', monospace",
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: 'none',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Refresh Page
              </button>

              <button
                onClick={() =>
                  this.setState({
                    hasError: false,
                    error: null,
                    errorInfo: null,
                  })
                }
                style={{
                  backgroundColor: 'transparent',
                  color: '#6B7280',
                  padding: '0.75rem 1.5rem',
                  fontFamily: "'Baugeld Spezialisten', monospace",
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  border: '1px solid #D1D5DB',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                }}
              >
                Try Again
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details
                style={{
                  marginTop: '2rem',
                  textAlign: 'left',
                  fontSize: '0.875rem',
                  color: '#DC2626',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FECACA',
                  borderRadius: '0.375rem',
                  padding: '1rem',
                }}
              >
                <summary style={{ cursor: 'pointer', fontWeight: '600' }}>
                  Error Details (Development Only)
                </summary>
                <pre
                  style={{
                    marginTop: '0.5rem',
                    whiteSpace: 'pre-wrap',
                    fontSize: '0.75rem',
                  }}
                >
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
