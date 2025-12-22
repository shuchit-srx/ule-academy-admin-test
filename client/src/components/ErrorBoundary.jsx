import React from 'react';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Log to console now, replace with Sentry later if needed
        console.error('UI crash:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="bg-white border rounded-2xl p-6 max-w-sm text-center">
                        <h1 className="text-lg font-bold text-[#1f4b99]">
                            Something went wrong
                        </h1>
                        <p className="text-sm text-gray-600 mt-2">
                            An unexpected error occurred in the admin interface.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-sm border px-4 py-1 rounded hover:bg-gray-50"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
