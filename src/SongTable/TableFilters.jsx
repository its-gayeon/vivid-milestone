export function TableFilters({
    language,
    searchString,
    onLanguageChange,
    onSearchChange
}) {
    return (
        <div className='filter'>
            <select
                className='filter-lang'
                id='lang'
                value={language}
                onChange={e => onLanguageChange(e.target.value)}
            >
                <option value='name-jp'>jp</option>
                <option value='name-ko'>ko</option>
                <option value='name-en'>en</option>
            </select>
            <input
                className='filter-search'
                type='text'
                value={searchString}
                onChange={e => onSearchChange(e.target.value)}
            />
        </div>
    );
}