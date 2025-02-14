import { translator, countryTranslator } from '@/utils/dictionary.js'
import { getCountryCode } from '@/utils/countryCodes.js'
import { formatDateDay } from '@/utils/formatDate.js'
import { getRelativeLocaleUrl } from 'astro:i18n'
const currentLang = 'es'

const teamsResponse = await fetch('http://localhost:1234/teams')
const teams = await teamsResponse.json()

export function PlayersGrid ({ players }) {
  console.log(players.length)
  return (players.length > 0
    ? (
  <>
  <section className='xl:p-10'>
    <h2 className='text-3xl text-bold uppercase font-la-liga-font text-center'>
      {
        `${translator(currentLang, 'others')} ${translator(currentLang, players[0].position.toLowerCase() + 'Plural')} ${translator(currentLang, 'ofTheTeam')}`
      }
    </h2>
    <div className='flex flex-col'>
      <div>
        <div>
          <div
            className={'grid mt-4 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-3'}
          >
            {
              players.map((player) => (
                <div className='text-start border-[1px] border-mainblack rounded-lg p-10 w-full grid grid-cols-2 gap-4 relative text-sm md:text-md xl:text-[16px]' key={player.id}>
                  <div
                    className='absolute inset-0 bg-cover bg-center opacity-10'
                    style={{ backgroundImage: `url("${teams[(player.team_id - 1)].badge}")` }}
                  />
                  <div className='flex flex-col justify-between relative z-10'>
                    <div className='self-start'>
                      <p
                        className='text-bold text-5xl font-la-liga-font'
                        style={{ color: `${teams[(player.team_id - 1)].mainColor === '#ffffff' ? '#00001B' : teams[(player.team_id - 1)].mainColor}` }}
                      >
                        {player.number}
                      </p>
                      <p
                        className='text-bold text-lg sm:text-2xl font-la-liga-font text-mainblack'
                      >
                        {player.knownAs !== null
                          ? player.knownAs
                          : player.lastName}
                      </p>
                    </div>
                    <div className='flex flex-col'>
                      <p className='uppercase font-bold text-[10px] sm:text-sm'>
                        {translator(currentLang, 'goalkeeper')}
                      </p>
                      <div className='flex flex-row items-center'>
                        <img
                          src={`/flags/${getCountryCode(player.country)}.svg`}
                          alt={String(player.country)}
                          className='mr-2 w-6 h-4'
                        />
                        <p className='text-center text-[10px] sm:text-sm'>
                          {countryTranslator(currentLang, player.country)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <a
                    href={getRelativeLocaleUrl(
                      currentLang,
                      `/players/${player.id}`
                    )}
                    className='relative z-10'
                    style= {{ alignSelf: 'center' }}
                  >
                    <img
                      src={player.photo}
                      alt={player.knownAs}
                      className='w-full hover:opacity-80 hover:scale-[0.98] transition'
                    />
                  </a>
                  <div className='grid grid-cols-2 col-span-2 border-t-[1px] pt-2 gap-4 relative z-10 border-mainblack'>
                    <div>
                      <p className='text-center uppercase font-bold'>
                        {translator(currentLang, 'birthday')}
                      </p>
                      <p className='text-center'>{formatDateDay(player.birthday)}</p>
                    </div>
                    <div>
                      <p className='text-center uppercase font-bold'>
                        {translator(currentLang, 'height')}
                      </p>
                      <p className='text-center'>{player.height} cm</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  </section>
  </>
      )
    : (
    <h1 className='text-3xl text-bold uppercase font-la-liga-font text-center'>
      {translator(currentLang, 'noPlayers')}
    </h1>
      ))
}

export default PlayersGrid
