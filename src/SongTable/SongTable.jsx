import { useMemo, useState } from 'react';
import './SongTable.css'
import songData from '../song-data.json'
import { TableFilters } from './TableFilters';
import { TableHeader } from './TableHeader';

export function SongTable() {
    const CELL_STATES = ['', 'CL', 'FC', 'AP'];
    const [markedCells, setMarkedCells] = useState(() => {
        const saved = localStorage.getItem('markedCells');
        return saved ? JSON.parse(saved) : {};
    });

    const difficulties = ["Easy", "Normal", "Hard", "Expert", "Master", "Append"];
    let [language, setLanguage] = useState("name-jp");
    let [searchString, setSearchString] = useState('');
    let [sortConfig, setSortConfig] = useState({
        key: 'id',
        status: 'desc'
    });

    const handleSort = (key) => {
        setSortConfig(prevConfig => ({
            key,
            status: prevConfig.key === key
                ? prevConfig.status === 'asc'
                    ? 'desc'
                    : prevConfig.status === 'desc'
                        ? 'asc'
                        : null
                : 'desc'
        }));

    };

    // Filter and sort the song data
    const sortedSongData = useMemo(() => {
        let selectedData = [...songData].filter((song) => {
            // Check if the search string is in the song name in any language
            for (let lang of ['name-jp', 'name-ko', 'name-en']) {
                if (song[lang].toLowerCase().includes(searchString.toLowerCase())) {
                    return true;
                }
            }

            // Check if the search string is in the aliases
            let aliases = song.alias || [];
            for (let alias of aliases) {
                if (alias.toLowerCase().includes(searchString.toLowerCase())) {
                    return true;
                }
            }
        });

        switch (sortConfig.key) {
            case ('id'):
                return [...selectedData].sort((a, b) => {
                    if (sortConfig.status === 'asc') {
                        return a.id - b.id;
                    } else {
                        return b.id - a.id;
                    }
                });

            case ('easy'):
            case ('normal'):
            case ('hard'):
            case ('expert'):
            case ('master'):
                return [...selectedData].sort((a, b) => {
                    if (sortConfig.status === 'asc') {
                        return a.difficulties[sortConfig.key] - b.difficulties[sortConfig.key];
                    } else {
                        return b.difficulties[sortConfig.key] - a.difficulties[sortConfig.key];
                    }
                });
            case ('append'): {
                let appendData = [...selectedData].filter((song) => song.difficulties.append !== undefined);

                return [...appendData].sort((a, b) => {
                    if (sortConfig.status === 'asc') {
                        return a.difficulties.append - b.difficulties.append;
                    } else {
                        return b.difficulties.append - a.difficulties.append;
                    }
                });
            }
        }

    }, [sortConfig, searchString]);

    const handleCellClick = (songId, difficulty) => {
        if (songData.find(song => song.id === songId).difficulties[difficulty] === undefined) {
            return;
        }

        const cellKey = `${songId}-${difficulty}`;
        setMarkedCells(prev => {
            const currentState = prev[cellKey] || '';
            const newStateIndex = (CELL_STATES.indexOf(currentState) + 1) % CELL_STATES.length;
            const nextState = CELL_STATES[newStateIndex];

            const newMarkedCells = {
                ...prev,
                [cellKey]: nextState
            };

            if (nextState === '') {
                delete newMarkedCells[cellKey];
            }

            localStorage.setItem('markedCells', JSON.stringify(newMarkedCells));
            return newMarkedCells;
        });
    };


    return (
        <>
            <TableFilters
                language={language}
                searchString={searchString}
                onLanguageChange={setLanguage}
                onSearchChange={setSearchString}
            />
            <div className='table'>
                <table>
                    <thead>
                        <tr>
                            <TableHeader
                                type="name"
                                name="ID"
                                sortKey="id"
                                sortConfig={sortConfig}
                                onSort={handleSort}
                            />
                            <th className='table-head' type='name'>Cover</th>
                            <th className='table-head' type='name'>Song Name</th>
                            {difficulties.map((difficulty) => (
                                <TableHeader
                                    type={difficulty.toLowerCase()}
                                    name={difficulty}
                                    sortKey={difficulty.toLowerCase()}
                                    sortConfig={sortConfig}
                                    onSort={handleSort}
                                    key={difficulty}
                                />
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedSongData.map((song) => (
                            <tr key={song.id}>
                                <td>{song.id}</td>
                                <td>
                                    <img
                                        src={`src/assets/cover-arts/${song['cover-art']}`}
                                        alt={`${song['id']} cover`}
                                        className='song-cover'
                                    />
                                </td>
                                <td>{song[language]}</td>
                                {difficulties.map((difficulty) => (
                                    <td
                                        key={difficulty}
                                        onClick={() => handleCellClick(song.id, difficulty.toLowerCase())}
                                        className='table-cell'
                                        type={`${markedCells[`${song.id}-${difficulty.toLowerCase()}`]}`}
                                    >
                                        {song.difficulties[difficulty.toLowerCase()] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}