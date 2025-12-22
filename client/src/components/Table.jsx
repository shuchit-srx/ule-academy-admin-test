export default function Table({ head, children }) {
    return (
        <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-600">
                <tr>
                    {head.map(h => (
                        <th key={h} className="p-3 text-left font-medium">
                            {h}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>{children}</tbody>
        </table>
    );
}
