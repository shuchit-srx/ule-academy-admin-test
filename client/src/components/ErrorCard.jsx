export default function ErrorCard({
    title = 'Error',
    message = 'Something went wrong. Please try again.'
}) {
    return (
        <div className="bg-white border border-red-200 rounded-2xl p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-red-600">
                {title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
                {message}
            </p>
        </div>
    );
}
