export default function CompatibilityTag({ value }) {
    let label = 'Needs Development';
    let classes = 'bg-red-50 text-red-700 border-red-200';

    if (value >= 75) {
        label = 'High Compatibility';
        classes = 'bg-green-50 text-green-700 border-green-200';
    } else if (value >= 55) {
        label = 'Trainable';
        classes = 'bg-yellow-50 text-yellow-700 border-yellow-200';
    }

    return (
        <span
            className={`inline-flex items-center px-3 py-1 text-xs rounded-full border w-fit ${classes}`}
        >
            {label}
        </span>
    );
}
