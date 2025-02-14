import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { PlayersGrid } from './PlayersGrid'

export function PlayerSearch ({ players }) {
  const [search, setSearch] = useState('')
  const [filteredPlayers, setFilteredPlayers] = useState([])

  function handleChange (e) {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (search !== '') {
      setFilteredPlayers(players.filter(player => {
        return (player.name?.toLowerCase().includes(search.toLowerCase()) || player.lastName?.toLowerCase().includes(search.toLowerCase()) || player.knownAs?.toLowerCase().includes(search.toLowerCase()))
      }))
    } else {
      setFilteredPlayers([])
    }
  }, [search])

  return (
    <>
    <section className="mt-24 flex flex-row justify-center items-center gap-2">
        <input className="border-[1px] border-mainblack rounded-2xl border-r p-2" type="text" placeholder="Search for a player" onChange={handleChange} value={search}/>
        <button className="bg-mainblack rounded-2xl text-white p-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
            strokeWidth="2"
        >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
        <path d="M21 21l-6 -6"></path>
        </svg>
        </button>
    </section>
    <section>
      <PlayersGrid players={filteredPlayers}/>
    </section>
    </>
  )
}

export default PlayerSearch
