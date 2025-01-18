import './SongTable.css'
import songData from './song-data.json'

export function SongTable() {
    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        <th className='table-head' type='name'>ID</th>
                        <th className='table-head' type='name'>Cover</th>
                        <th className='table-head' type='name'>Song Name</th>
                        {["Easy", "Normal", "Hard", "Expert", "Master", "Append"].map((difficulty) => (
                            <th className='table-head' type={difficulty.toLowerCase()} key={difficulty}>{difficulty}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {songData.map((song) => (
                        <tr key={song.id}>
                            <td>{song.id}</td>
                            <td>
                                <img
                                    src={`src/assets/cover-arts/${song['cover-art']}`}
                                    alt={`${song['name-en']} cover`}
                                    className='song-cover'
                                />
                            </td>
                            <td>{song['name-jp']}</td>
                            <td>{song.difficulties.easy || "-"}</td>
                            <td>{song.difficulties.normal || "-"}</td>
                            <td>{song.difficulties.hard || "-"}</td>
                            <td>{song.difficulties.expert || "-"}</td>
                            <td>{song.difficulties.master || "-"}</td>
                            <td>{song.difficulties.append || "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
