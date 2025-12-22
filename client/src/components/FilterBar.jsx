export default function FilterBar({ entry, setEntry, sort, setSort }) {
    return (
        <div className="flex gap-2 mb-4">
            <select
                value={entry}
                onChange={e => setEntry(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
            >
                <option value="">All Entries</option>
                <option>NDA</option>
                <option>CDS</option>
                <option>AFCAT</option>
                <option>TES / 10+2</option>
                <option>NCC Special</option>
            </select>

            <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="border rounded px-3 py-1 text-sm"
            >
                <option value="date">Newest First</option>
                <option value="compatibility">Highest Compatibility</option>
            </select>
        </div>
    );
}
