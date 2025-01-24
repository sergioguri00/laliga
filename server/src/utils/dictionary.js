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
    viewMatch: 'view match'
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
    viewMatch: 'ver partido'
  }
}

export function translator (lang, key) {
  return dictionary[lang][key] || 'key not found'
}
