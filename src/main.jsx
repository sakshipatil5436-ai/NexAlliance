import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("React ErrorBoundary Caught Exception:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto', color: '#1e293b' }}>
          <h2 style={{ color: '#ef4444' }}>Application Error Details:</h2>
          <pre style={{ background: '#f1f5f9', padding: '16px', borderRadius: '8px', overflowX: 'auto', fontSize: '12px' }}>
            {this.state.error ? this.state.error.toString() : 'Unknown Error'}
            {'\n\n'}
            {this.state.errorInfo ? this.state.errorInfo.componentStack : ''}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: '10px 20px', cursor: 'pointer', background: '#0088FF', color: '#fff', border: 'none', borderRadius: '6px', marginTop: '16px' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
