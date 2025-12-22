export default function PrintButton({ className = '' }) {
    return (
        <button
            onClick={() => window.print()}
            className={`text-sm border px-3 py-1 rounded hover:bg-gray-50 ${className}`}
        >
            Print Report
        </button>
    );
}
