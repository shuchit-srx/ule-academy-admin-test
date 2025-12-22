export default function Badge({ label, value }) {
    return (
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs border rounded-full bg-white">
            <strong className="text-gray-700">{label}:</strong>
            <span className="text-gray-800">{value}</span>
        </span>
    );
}
