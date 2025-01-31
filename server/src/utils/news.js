export function getNews (newsData, lang) {
  const { mostGoals, lessGoals, firstPosition, lastPosition, mostDraws } = newsData
  const mostGoalsRandom = Math.round(Math.random())
  const lessGoalsRandom = Math.round(Math.random())
  const firstPositionRandom = Math.round(Math.random())
  const lastPositionRandom = Math.round(Math.random())
  const mostDrawsRandom = Math.round(Math.random())

  const [mostGoalsTitle, mostGoalsNews] = getMostGoalsNews(mostGoalsRandom, lang, mostGoals)
  const [lessGoalsTitle, lessGoalsNews] = getLessGoalsNews(lessGoalsRandom, lang, lessGoals)
  const [firstPositionTitle, firstPositionNews] = getFirstPositionNews(firstPositionRandom, lang, firstPosition)
  const [lastPositionTitle, lastPositionNews] = getLastPositionNews(lastPositionRandom, lang, lastPosition)
  const [mostDrawsTitle, mostDrawsNews] = getMostDrawsNews(mostDrawsRandom, lang, mostDraws)

  const dataArray =
    [{
      title: mostGoalsTitle,
      news: mostGoalsNews,
      type: mostGoalsRandom === 0 ? 'team' : 'manager',
      id: mostGoals.team_id
    },
    {
      title: lessGoalsTitle,
      news: lessGoalsNews,
      type: lessGoalsRandom === 0 ? 'team' : 'manager',
      id: lessGoals.team_id
    },
    {
      title: firstPositionTitle,
      news: firstPositionNews,
      type: firstPositionRandom === 0 ? 'team' : 'manager',
      id: firstPosition.team_id
    },
    {
      title: lastPositionTitle,
      news: lastPositionNews,
      type: lastPositionRandom === 0 ? 'team' : 'manager',
      id: lastPosition.team_id
    },
    {
      title: mostDrawsTitle,
      news: mostDrawsNews,
      type: mostDrawsRandom === 0 ? 'team' : 'manager',
      id: mostDraws.team_id
    }]

  const data = shuffleArray(dataArray)
  return data
}

function getMostGoalsNews (option, lang, data) {
  let mostGoalsTitle = ''
  let mostGoalsNews = ''
  if (option === 0) {
    if (lang === 'es') {
      mostGoalsTitle = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}, el equipo más goleador de la liga con ${data.goals} goles`
      mostGoalsNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}} ha logrado una destacada marca de ${data.goals} goles, convirtiéndose en el equipo más goleador de la liga hasta el momento. La escuadra de ${data.city} ha demostrado un rendimiento ofensivo sobresaliente, con una capacidad letal frente al arco rival. A lo largo de la temporada, los jugadores han mostrado gran compenetración en su ataque, lo que ha permitido ${data.team === 'Real Sociedad' ? 'a la' : 'al'} ${data.team} liderar este apartado. Este impresionante registro sigue consolidando al equipo como uno de los favoritos para luchar por el campeonato.`
    } else {
      mostGoalsTitle = ''
      mostGoalsNews = ''
    }
  } else {
    if (lang === 'es') {
      mostGoalsTitle = `${data.managerName} ${data.managerLastName} sobre el récord goleador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos muy orgullosos de lo que hemos logrado"`
      mostGoalsNews = `${data.managerName} ${data.managerLastName}, entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ha compartido su satisfacción por el hecho de que su equipo se haya convertido en el más goleador de la liga, con un total de ${data.goals} goles. "Estamos muy orgullosos de lo que hemos logrado", comentó ${data.managerLastName} en rueda de prensa. "Nuestro objetivo siempre ha sido jugar de manera ofensiva, y ver cómo los jugadores ejecutan esa visión sobre el campo es muy gratificante. Pero aún queda mucho por hacer, y estamos concentrados en seguir mejorando." Con este tipo de declaraciones, ${data.managerLastName} refuerza el compromiso del equipo en seguir dominando en el ataque mientras se mantiene firme en su ambición de alcanzar el título.`
    } else {
      mostGoalsTitle = ''
      mostGoalsNews = ''
    }
  }
  return [mostGoalsTitle, mostGoalsNews]
}

function getLessGoalsNews (option, lang, data) {
  let lessGoalsTitle = ''
  let lessGoalsNews = ''
  if (option === 0) {
    if (lang === 'es') {
      lessGoalsTitle = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}, el menos goleador de la liga con solo ${data.goals} goles`
      lessGoalsNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team} se encuentra actualmente como el equipo menos goleador de la liga, con solo ${data.goals} goles marcados hasta el momento. A pesar de los esfuerzos de los jugadores, la falta de eficacia frente al arco rival sigue siendo un problema persistente. Este bajo rendimiento ofensivo del equipo de ${data.city} ha afectado sus posibilidades de obtener buenos resultados en la competencia. El equipo continúa trabajando para mejorar su capacidad de anotación y solucionar la falta de contundencia en la zona ofensiva.`
    } else {
      lessGoalsTitle = ''
      lessGoalsNews = ''
    }
  } else {
    if (lang === 'es') {
      lessGoalsTitle = `${data.managerName} ${data.managerLastName} sobre la falta de goles ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos en el camino para mejorar nuestra efectividad"`
      lessGoalsNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la difícil situación de su equipo, que actualmente es el menos goleador de la liga. "Sabemos que nuestra falta de goles es una preocupación, pero estamos trabajando día a día para mejorar nuestra efectividad", declaró ${data.managerLastName} en una rueda de prensa. "Confiamos en que, con el esfuerzo y la dedicación de todos, podemos encontrar soluciones para ser más peligrosos en ataque. No nos rendiremos, seguimos enfocados en mejorar." A pesar de las dificultades, el técnico mantiene la esperanza de que su equipo superará esta fase complicada.`
    } else {
      lessGoalsTitle = ''
      lessGoalsNews = ''
    }
  }
  return [lessGoalsTitle, lessGoalsNews]
}

function getFirstPositionNews (option, lang, data) {
  let firstPositionTitle = ''
  let firstPositionNews = ''
  if (option === 0) {
    if (lang === 'es') {
      firstPositionTitle = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}, líder de la liga con ${data.points} puntos`
      firstPositionNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team} se ha consolidado como el líder de la liga, ocupando la primera posición con ${data.points} puntos. El equipo de la ciudad de ${data.city} ha demostrado un rendimiento excepcional a lo largo de la temporada, logrando ${data.wins} victorias, ${data.draws} empates y ${data.losses} derrotas. Los jugadores han mostrado un alto nivel de competitividad y compromiso en cada partido, lo que les ha permitido mantenerse en la cima de la clasificación. Con este sólido desempeño, ${data.team === 'Real Sociedad' ? 'la' : 'el'} ${data.team} se posiciona como uno de los principales candidatos para disputar el título de la liga.`
    } else {
      firstPositionTitle = ''
      firstPositionNews = ''
    }
  } else {
    if (lang === 'es') {
      firstPositionTitle = `${data.managerName} ${data.managerLastName} sobre el liderato ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos concentrados en mantenernos en lo más alto"`
      firstPositionNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre el liderato de su equipo en la liga. "Estamos concentrados en mantenernos en lo más alto de la clasificación", declaró ${data.managerLastName} en una rueda de prensa. "El trabajo duro y la dedicación de los jugadores nos han permitido alcanzar esta posición, pero sabemos que aún queda mucho por hacer. Cada partido es una nueva oportunidad para demostrar nuestro valor y competir al máximo nivel." Con estas palabras, ${data.managerLastName} refuerza el compromiso del equipo en seguir luchando por el título y mantener su posición de privilegio en la tabla.`
    } else {
      firstPositionTitle = ''
      firstPositionNews = ''
    }
  }
  return [firstPositionTitle, firstPositionNews]
}

function getLastPositionNews (option, lang, data) {
  let lastPositionTitle = ''
  let lastPositionNews = ''
  if (option === 0) {
    if (lang === 'es') {
      lastPositionTitle = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}, en la última posición de la liga con ${data.points} puntos`
      lastPositionNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team} se encuentra en la última posición de la liga, con ${data.points} puntos en su haber. El equipo ha logrado ${data.wins} victorias, ${data.draws} empates y ${data.losses} derrotas a lo largo de la temporada, pero no ha podido obtener los resultados deseados. La situación actual del equipo de ${data.city} refleja las dificultades que ha enfrentado en la competencia, lo que ha generado preocupación entre los aficionados y la directiva. A pesar de las adversidades, el equipo continúa trabajando para revertir esta situación y mejorar su rendimiento en los próximos partidos.`
    } else {
      lastPositionTitle = ''
      lastPositionNews = ''
    }
  } else {
    if (lang === 'es') {
      lastPositionTitle = `${data.managerName} ${data.managerLastName} sobre la lucha por salir de la última posición ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos comprometidos en dar lo mejor de nosotros"`
      lastPositionNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la difícil situación de su equipo, que se encuentra en la última posición de la liga. "Estamos comprometidos en dar lo mejor de nosotros para salir de esta situación", declaró ${data.managerLastName} en una rueda de prensa. "Sabemos que no estamos donde queremos estar, pero seguimos trabajando duro para mejorar y revertir esta situación. Confiamos en la calidad y el compromiso de nuestros jugadores para salir adelante." A pesar de los obstáculos, el técnico mantiene la esperanza de que su equipo logrará salir de la zona de descenso y mejorar su posición en la tabla.`
    } else {
      lastPositionTitle = ''
      lastPositionNews = ''
    }
  }
  return [lastPositionTitle, lastPositionNews]
}

function getMostDrawsNews (option, lang, data) {
  let mostDrawsTitle = ''
  let mostDrawsNews = ''
  if (option === 0) {
    if (lang === 'es') {
      mostDrawsTitle = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team}, el equipo con más empates en la liga con ${data.draws} empates`
      mostDrawsNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team} se ha destacado como el equipo con más empates en la liga, acumulando un total de ${data.draws} igualdades en lo que va de temporada. Los jugadores han demostrado una gran capacidad para competir de igual a igual con sus rivales, lo que ha generado una serie de resultados equilibrados. A pesar de no obtener la victoria en todos los partidos, el equipo de ${data.city} ha mostrado una actitud competitiva y una mentalidad fuerte para enfrentar los desafíos. Con este récord de empates, ${data.team === 'Real Sociedad' ? 'la' : 'el'} ${data.team} se posiciona como un rival difícil de vencer en la competencia.`
    } else {
      mostDrawsTitle = ''
      mostDrawsNews = ''
    }
  } else {
    if (lang === 'es') {
      mostDrawsTitle = `${data.managerName} ${data.managerLastName} sobre la racha de empates ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos satisfechos con la competitividad del equipo"`
      mostDrawsNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la racha de empates de su equipo en la liga. "Estamos satisfechos con la competitividad que hemos mostrado en cada partido", declaró ${data.managerLastName} en una rueda de prensa. "Los empates reflejan la capacidad del equipo para competir de igual a igual con cualquier rival, lo que es un aspecto positivo a destacar. Seguiremos trabajando para convertir esos empates en victorias y mejorar nuestra posición en la tabla." Con estas palabras, ${data.managerLastName} resalta la actitud competitiva del equipo y su compromiso en seguir luchando por mejores resultados en la competencia.`
    } else {
      mostDrawsTitle = ''
      mostDrawsNews = ''
    }
  }
  return [mostDrawsTitle, mostDrawsNews]
}

function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
