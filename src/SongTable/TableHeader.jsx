export function TableHeader({ type, name, sortKey, sortConfig, onSort }) {
    const getSortIcon = () => {
        if (sortConfig.key !== sortKey) return "▲▼";
        if (!sortConfig.status) return "▲▼";
        return sortConfig.status === 'asc' ? "▲" : "▼";
    };

    return (
        <th
            className='table-head'
            type={type}
            onClick={() => onSort(sortKey)}
            style={{ cursor: 'pointer' }}
        >
            {name} <span>{getSortIcon()}</span>
        </th>
    );
}