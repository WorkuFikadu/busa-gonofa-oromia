import React, { Component, ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 30, background: '#fef2f2', color: '#991b1b', fontFamily: 'sans-serif', minHeight: '100vh' }}>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Application Render Error</h2>
          <p style={{ marginBottom: 20 }}>An uncaught error occurred while rendering the page:</p>
          <pre style={{ background: '#fee2e2', padding: 15, borderRadius: 8, overflowX: 'auto', fontSize: 14 }}>{this.state.error?.toString()}</pre>
          <h3 style={{ marginTop: 20, fontSize: 16 }}>Stack Trace:</h3>
          <pre style={{ background: '#f3f4f6', color: '#374151', padding: 15, borderRadius: 8, overflowX: 'auto', fontSize: 12 }}>{this.state.errorInfo?.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Register Service Worker for Offline-First PWA capabilities
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('Busa Gonofa SW registered:', registration.scope);
    }).catch((err) => {
      console.log('SW registration failed:', err);
    });
  });
}
