import { translator, countryTranslator } from '@/utils/dictionary.js'
import { getCountryCode } from '@/utils/countryCodes.js'
import { formatDateDay } from '@/utils/formatDate.js'
import { getRelativeLocaleUrl } from 'astro:i18n'
const currentLang = 'es'

const teamsResponse = await fetch('http://localhost:1234/teams')
const teams = await teamsResponse.json()

export function PlayersGrid ({ players }) {
  return (
  <>
  <section class='xl:p-10'>
    <h2 class='text-3xl text-bold uppercase font-la-liga-font text-center'>
      {
        `${translator(currentLang, 'others')} ${translator(currentLang, players[0].position.toLowerCase() + 'Plural')} ${translator(currentLang, 'ofTheTeam')}`
      }
    </h2>
    <div class='flex flex-col'>
      <div>
        <div>
          <div
            class={`grid mt-4 justify-items-center grid-cols-1 ${players.length < 2 ? 'sm:grid-cols-' + players.length.toString() : 'sm:grid-cols-2'} ${players.length < 3 ? 'lg:grid-cols-' + players.length.toString() : 'lg:grid-cols-3'} ${players.length < 4 ? '2xl:grid-cols-' + players.length.toString() : '2xl:grid-cols-4'} gap-4 p-3`}
          >
            {
              players.slice(0, 100).map((player) => (
                <div class='text-start border-[1px] border-mainblack rounded-lg p-10 w-full grid grid-cols-2 gap-4 relative text-sm md:text-md xl:text-[16px]'>
                  <div
                    class='absolute inset-0 bg-cover bg-center opacity-10'
                    style={{ backgroundImage: `url("${teams[(player.team_id - 1)].badge}")` }}
                  />
                  <div class='flex flex-col justify-between relative z-10'>
                    <div class='self-start'>
                      <p
                        class='text-bold text-5xl font-la-liga-font'
                        style={{ color: `${teams[(player.team_id - 1)].mainColor === '#ffffff' ? '#00001B' : teams[(player.team_id - 1)].mainColor}` }}
                      >
                        {player.number}
                      </p>
                      <p
                        class='text-bold text-lg sm:text-2xl font-la-liga-font text-mainblack'
                      >
                        {player.knownAs !== null
                          ? player.knownAs
                          : player.lastName}
                      </p>
                    </div>
                    <div class='flex flex-col'>
                      <p class='uppercase font-bold text-[10px] sm:text-sm'>
                        {translator(currentLang, 'goalkeeper')}
                      </p>
                      <div class='flex flex-row items-center'>
                        <img
                          src={`/flags/${getCountryCode(player.country)}.svg`}
                          alt={String(player.country)}
                          class='mr-2 w-6 h-4'
                        />
                        <p class='text-center text-[10px] sm:text-sm'>
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
                    class='relative z-10'
                    style= {{ alignSelf: 'center' }}
                  >
                    <img
                      src={player.photo}
                      alt={player.knownAs}
                      class='w-full hover:opacity-80 hover:scale-[0.98] transition'
                    />
                  </a>
                  <div class='grid grid-cols-2 col-span-2 border-t-[1px] pt-2 gap-4 relative z-10 border-mainblack'>
                    <div>
                      <p class='text-center uppercase font-bold'>
                        {translator(currentLang, 'birthday')}
                      </p>
                      <p class='text-center'>{formatDateDay(player.birthday)}</p>
                    </div>
                    <div>
                      <p class='text-center uppercase font-bold'>
                        {translator(currentLang, 'height')}
                      </p>
                      <p class='text-center'>{player.height} cm</p>
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
}
