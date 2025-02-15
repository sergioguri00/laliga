const dictionary = {
  en: {
    president: 'president',
    capacity: 'capacity',
    squad: 'squad',
    results: 'results',
    squadSection: 'squad',
    resultsSection: 'results',
    manager: 'manager',
    birthday: 'birthday',
    goalkeepers: 'goalkeepers',
    goalkeeper: 'goalkeeper',
    height: 'height',
    defenders: 'defenders',
    defender: 'defender',
    midfielders: 'midfielders',
    midfielder: 'midfielder',
    forwards: 'forwards',
    forward: 'forward',
    matchday: 'matchday',
    viewMatch: 'view match',
    leagueTable: 'league table',
    team: 'team',
    mp: 'mp',
    mw: 'mw',
    md: 'md',
    ml: 'ml',
    gf: 'gf',
    ga: 'ga',
    gd: 'gd',
    lastMatchday: 'last matchday',
    exploreTeams: 'explore laliga teams',
    about: 'about',
    aboutWebsite: 'about this website',
    teams: 'teams',
    matches: 'matches',
    possession: 'Possession',
    shots: 'Shots',
    shotsOnTarget: 'Shots on target',
    fouls: 'Fouls',
    corners: 'Corners',
    offsides: 'Offsides',
    matchdayResults: 'Matchday results',
    explorePlayers: 'explore laliga players',
    wins: 'W',
    draws: 'D',
    losses: 'L',
    goalkeeperPlural: 'goalkeepers',
    defenderPlural: 'defenders',
    midfielderPlural: 'midfielders',
    forwardPlural: 'forwards',
    statistics: 'statistics',
    goalsScored: 'goals scored',
    assists: 'assists',
    yellowCards: 'yellow cards',
    redCards: 'red cards',
    others: 'others',
    ofTheTeam: 'of the team',
    players: 'players',
    fullName: 'full name',
    returnToTheTeam: 'return to the team',
    noPlayers: 'No players found'
  },
  es: {
    president: 'presidente',
    capacity: 'capacidad',
    squad: 'plantilla',
    results: 'resultados',
    squadSection: 'plantilla',
    resultsSection: 'resultados',
    manager: 'entrenador',
    birthday: 'cumpleaños',
    goalkeepers: 'porteros',
    goalkeeper: 'portero',
    height: 'altura',
    defenders: 'defensas',
    defender: 'defensa',
    midfielders: 'centrocampistas',
    midfielder: 'centrocampista',
    forwards: 'delanteros',
    forward: 'delantero',
    matchday: 'jornada',
    viewMatch: 'ver partido',
    leagueTable: 'clasificación',
    team: 'equipo',
    mp: 'pj',
    mw: 'pg',
    md: 'pe',
    ml: 'pp',
    gf: 'gf',
    ga: 'gc',
    gd: 'dg',
    lastMatchday: 'última jornada',
    exploreTeams: 'ver equipos de laliga',
    about: 'acerca de',
    aboutWebsite: 'acerca de esta web',
    teams: 'equipos',
    matches: 'partidos',
    possession: 'Posesión',
    shots: 'Tiros',
    shotsOnTarget: 'Tiros a puerta',
    fouls: 'Faltas',
    corners: 'Córners',
    offsides: 'Fueras de juego',
    matchdayResults: 'Resultados de la jornada',
    explorePlayers: 'ver jugadores de laliga',
    wins: 'V',
    draws: 'E',
    losses: 'D',
    goalkeeperPlural: 'porteros',
    defenderPlural: 'defensas',
    midfielderPlural: 'centrocampistas',
    forwardPlural: 'delanteros',
    statistics: 'estadísticas',
    goalsScored: 'goles marcados',
    assists: 'asistencias',
    yellowCards: 'tarjetas amarillas',
    redCards: 'tarjetas rojas',
    others: 'otros',
    ofTheTeam: 'del equipo',
    players: 'jugadores',
    fullName: 'nombre completo',
    returnToTheTeam: 'volver al equipo',
    noPlayers: 'No se han encontrado jugadores'
  }
}

export function translator (lang, key) {
  return dictionary[lang][key] || 'key not found'
}

const countriesDictionary = {
  en: {
    Albania: 'Albania',
    Algeria: 'Algeria',
    Andorra: 'Andorra',
    Angola: 'Angola',
    Argentina: 'Argentina',
    Austria: 'Austria',
    Belgium: 'Belgium',
    Brazil: 'Brazil',
    Bulgaria: 'Bulgaria',
    Cameroon: 'Cameroon',
    Canada: 'Canada',
    'Cape Verde': 'Cape Verde',
    Chile: 'Chile',
    Colombia: 'Colombia',
    Congo: 'Congo',
    'Costa Rica': 'Costa Rica',
    Croatia: 'Croatia',
    'Czech Republic': 'Czech Republic',
    Denmark: 'Denmark',
    'Dominican Republic': 'Dominican Republic',
    Ecuador: 'Ecuador',
    England: 'England',
    'Equatorial Guinea': 'Equatorial Guinea',
    Estonia: 'Estonia',
    France: 'France',
    Georgia: 'Georgia',
    Germany: 'Germany',
    Ghana: 'Ghana',
    Greece: 'Greece',
    Guadeloupe: 'Guadeloupe',
    Guinea: 'Guinea',
    Hungary: 'Hungary',
    Iceland: 'Iceland',
    Ireland: 'Ireland',
    Italy: 'Italy',
    'Ivory Coast': 'Ivory Coast',
    Japan: 'Japan',
    Macedonia: 'Macedonia',
    Mali: 'Mali',
    Mauritania: 'Mauritania',
    Mexico: 'Mexico',
    Morocco: 'Morocco',
    Mozambique: 'Mozambique',
    Netherlands: 'Netherlands',
    Nigeria: 'Nigeria',
    Norway: 'Norway',
    Paraguay: 'Paraguay',
    Peru: 'Peru',
    Poland: 'Poland',
    Portugal: 'Portugal',
    Romania: 'Romania',
    Russia: 'Russia',
    Scotland: 'Scotland',
    Senegal: 'Senegal',
    Serbia: 'Serbia',
    'Sierra Leone': 'Sierra Leone',
    Slovakia: 'Slovakia',
    Slovenia: 'Slovenia',
    'South Korea': 'South Korea',
    Spain: 'Spain',
    Suriname: 'Suriname',
    Sweden: 'Sweden',
    Switzerland: 'Switzerland',
    Togo: 'Togo',
    Turkey: 'Turkey',
    Ukraine: 'Ukraine',
    'United States': 'United States',
    Uruguay: 'Uruguay',
    Venezuela: 'Venezuela'
  },
  es: {
    Albania: 'Albania',
    Algeria: 'Argelia',
    Andorra: 'Andorra',
    Angola: 'Angola',
    Argentina: 'Argentina',
    Austria: 'Austria',
    Belgium: 'Bélgica',
    Brazil: 'Brasil',
    Bulgaria: 'Bulgaria',
    Cameroon: 'Camerún',
    Canada: 'Canadá',
    'Cape Verde': 'Cabo Verde',
    Chile: 'Chile',
    Colombia: 'Colombia',
    Congo: 'Congo',
    'Costa Rica': 'Costa Rica',
    Croatia: 'Croacia',
    'Czech Republic': 'República Checa',
    Denmark: 'Dinamarca',
    'Dominican Republic': 'República Dominicana',
    Ecuador: 'Ecuador',
    England: 'Inglaterra',
    'Equatorial Guinea': 'Guinea Ecuatorial',
    Estonia: 'Estonia',
    France: 'Francia',
    Georgia: 'Georgia',
    Germany: 'Alemania',
    Ghana: 'Ghana',
    Greece: 'Grecia',
    Guadeloupe: 'Guadalupe',
    Guinea: 'Guinea',
    Hungary: 'Hungría',
    Iceland: 'Islandia',
    Ireland: 'Irlanda',
    Italy: 'Italia',
    'Ivory Coast': 'Costa de Marfil',
    Japan: 'Japón',
    Macedonia: 'Macedonia',
    Mali: 'Mali',
    Mauritania: 'Mauritania',
    Mexico: 'México',
    Morocco: 'Marruecos',
    Mozambique: 'Mozambique',
    Netherlands: 'Países Bajos',
    Nigeria: 'Nigeria',
    Norway: 'Noruega',
    Paraguay: 'Paraguay',
    Peru: 'Perú',
    Poland: 'Polonia',
    Portugal: 'Portugal',
    Romania: 'Rumania',
    Russia: 'Rusia',
    Scotland: 'Escocia',
    Senegal: 'Senegal',
    Serbia: 'Serbia',
    'Sierra Leone': 'Sierra Leona',
    Slovakia: 'Eslovaquia',
    Slovenia: 'Eslovenia',
    'South Korea': 'Corea del Sur',
    Spain: 'España',
    Suriname: 'Surinam',
    Sweden: 'Suecia',
    Switzerland: 'Suiza',
    Togo: 'Togo',
    Turkey: 'Turquía',
    Ukraine: 'Ucrania',
    'United States': 'Estados Unidos',
    Uruguay: 'Uruguay',
    Venezuela: 'Venezuela'
  }
}

export function countryTranslator (lang, country) {
  return countriesDictionary[lang][country] || country
}
