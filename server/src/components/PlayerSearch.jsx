import { useState, useEffect } from 'react'
import { PlayersGrid } from './PlayersGrid.jsx'

export function PlayerSearch ({ players }) {
  const [search, setSearch] = useState('')
  const [filteredPlayers, setFilteredPlayers] = useState(players)

  const handleChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(search)
  }

  useEffect(() => {
    console.log(search)
    setFilteredPlayers(players.filter(player => {
      return player.name.toLowerCase().includes(search.toLowerCase())
    }))
  }, [search])

  return (
    <>
    <div class="mt-24 flex flex-row justify-center items-center gap-2">
        <input class="border-[1px] border-mainblack rounded-2xl border-r p-2" type="text" placeholder="Search for a player" onChange={handleChange} onSubmit={handleSubmit}/>
        <button class="bg-mainblack rounded-2xl text-white p-2">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            stroke-width="2"
        >
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
        <path d="M21 21l-6 -6"></path>
        </svg>
        </button>
    </div>
    <section>
        <PlayersGrid players={filteredPlayers} />
    </section>
    </>
  )
}
