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
      mostGoalsNews = `${data.team === 'Real Sociedad' ? 'La' : 'El'} ${data.team} ha logrado una destacada marca de ${data.goals} goles, convirtiéndose en el equipo más goleador de la liga hasta el momento. La escuadra de ${data.city} ha demostrado un rendimiento ofensivo sobresaliente, con una capacidad letal frente al arco rival. A lo largo de la temporada, los jugadores han mostrado gran compenetración en su ataque, lo que ha permitido ${data.team === 'Real Sociedad' ? 'a la' : 'al'} ${data.team} liderar este apartado. Este impresionante registro sigue consolidando al equipo como uno de los favoritos para luchar por el campeonato.`
    } else if (lang === 'en') {
      mostGoalsTitle = `${data.team}, the highest scoring team of the league with ${data.goals} goals scored`
      mostGoalsNews = `${data.team} have achieved ${data.goals} goals scored, becoming the highest scoring team of the league so far. The team from ${data.city} have showed an impressive offensive performance, with a lethal capacity facing the rival goal. Throughout the season, players have shown a great rapport in the attack, letting ${data.team} to lead this section. This impressive register keeps consolidating the team as one of the favourites to fight for the championship.`
    } else {
      mostGoalsTitle = ''
      mostGoalsNews = ''
    }
  } else {
    if (lang === 'es') {
      mostGoalsTitle = `${data.managerName} ${data.managerLastName} sobre el récord goleador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos muy orgullosos de lo que hemos logrado"`
      mostGoalsNews = `${data.managerName} ${data.managerLastName}, entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ha compartido su satisfacción por el hecho de que su equipo se haya convertido en el más goleador de la liga, con un total de ${data.goals} goles. "Estamos muy orgullosos de lo que hemos logrado", comentó ${data.managerLastName} en rueda de prensa. "Nuestro objetivo siempre ha sido jugar de manera ofensiva, y ver cómo los jugadores ejecutan esa visión sobre el campo es muy gratificante. Pero aún queda mucho por hacer, y estamos concentrados en seguir mejorando." Con este tipo de declaraciones, ${data.managerLastName} refuerza el compromiso del equipo en seguir dominando en el ataque mientras se mantiene firme en su ambición de alcanzar el título.`
    } else if (lang === 'en') {
      mostGoalsTitle = `${data.managerName} ${data.managerLastName} about the goal scorer record of ${data.team}: "We are very proud of what we have achieved"`
      mostGoalsNews = `${data.managerName} ${data.managerLastName}, manager of ${data.team}, has shared his satisfaction because of the fact that his team have become in the highest scorer of the league, with a total of ${data.goals} goals scored. "We are very proud of what we have achieved", said ${data.managerLastName} in the press conference. "Our objective has always been to play in an offensive way, and see how the players execute this vision on the pitch is really gratifying. But there is still a lot to do, and we are focused on keep improving." With statements like this, ${data.managerLastName} reinforces the commitment of the team on keep dominating the attack as they keep being firm in their ambition of getting the title.`
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
    } else if (lang === 'en') {
      lessGoalsTitle = `${data.team}, the lowest scoring team of the league with only ${data.goals} goals scored`
      lessGoalsNews = `${data.team} is currently the lowest scoring team of the league, with only ${data.goals} goals scored so far. Despite the players efforts, the lack of effectiveness facing the rival goal keeps being a persistent problem. This low offensive performance of the team from ${data.city} has affected their possibilities to get good results in the league. The teams keeps working to improve their scoring capacity and to solve their lack of force in the offensive zone.`
    } else {
      lessGoalsTitle = ''
      lessGoalsNews = ''
    }
  } else {
    if (lang === 'es') {
      lessGoalsTitle = `${data.managerName} ${data.managerLastName} sobre la falta de goles ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos en el camino para mejorar nuestra efectividad"`
      lessGoalsNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la difícil situación de su equipo, que actualmente es el menos goleador de la liga. "Sabemos que nuestra falta de goles es una preocupación, pero estamos trabajando día a día para mejorar nuestra efectividad", declaró ${data.managerLastName} en una rueda de prensa. "Confiamos en que, con el esfuerzo y la dedicación de todos, podemos encontrar soluciones para ser más peligrosos en ataque. No nos rendiremos, seguimos enfocados en mejorar." A pesar de las dificultades, el técnico mantiene la esperanza de que su equipo superará esta fase complicada.`
    } else if (lang === 'en') {
      lessGoalsTitle = `${data.managerName} ${data.managerLastName} about the lack of goals of ${data.team}: "We are on the way to improve our effectiveness"`
      lessGoalsNews = `The manager of ${data.team}, ${data.managerName} ${data.managerLastName}, has spoken about the hard situation of his team, which are the lowest goal scorers of the league. "We know that our lack of goals is a concern, but we are working day by day to improve our effectiveness", declared ${data.managerLastName} in the press conference. "We trust that, with the effort and dedication of all of us, we can find solutions to be more dangerous attacking. We will not forfeit, we keep focused on improving our game." Despite the difficulties, the manager keeps the hope that his team will overcome this hard situation.`
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
    } else if (lang === 'en') {
      firstPositionTitle = `${data.team}, leader of the league with ${data.points} points`
      firstPositionNews = `${data.team} have established as the leader of the league, occupying the first position with ${data.points} points. The team from ${data.city} have shown an exceptional performance during the season, getting ${data.wins} wins, ${data.draws} draws and ${data.losses} losses. Players have shown a high competitive level and commitment in each match, allowing them to keep on the peak of the table. With this solid performance, ${data.team} position as one of the main candidates to fight for the league title.`
    } else {
      firstPositionTitle = ''
      firstPositionNews = ''
    }
  } else {
    if (lang === 'es') {
      firstPositionTitle = `${data.managerName} ${data.managerLastName} sobre el liderato ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos concentrados en mantenernos en lo más alto"`
      firstPositionNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre el liderato de su equipo en la liga. "Estamos concentrados en mantenernos en lo más alto de la clasificación", declaró ${data.managerLastName} en una rueda de prensa. "El trabajo duro y la dedicación de los jugadores nos han permitido alcanzar esta posición, pero sabemos que aún queda mucho por hacer. Cada partido es una nueva oportunidad para demostrar nuestro valor y competir al máximo nivel." Con estas palabras, ${data.managerLastName} refuerza el compromiso del equipo en seguir luchando por el título y mantener su posición de privilegio en la tabla.`
    } else if (lang === 'en') {
      firstPositionTitle = `${data.managerName} ${data.managerLastName} on the leadership of the ${data.team}: "We are focused on staying at the top"`
      firstPositionNews = `${data.team} manager ${data.managerName} ${data.managerLastName} has spoken about the leadership of his team in the league. "We are focused on staying at the top of the table," said ${data.managerLastName} in a press conference. "The hard work and dedication of the players have allowed us to reach this position, but we know there is still a lot to do. Every match is a new opportunity to prove our worth and compete at the highest level." With these words, ${data.managerLastName} reinforces the commitment of the team to continue fighting for the title and maintain their privileged position in the table.`
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
    } else if (lang === 'en') {
      lastPositionTitle = `${data.team}, in last place of the league with ${data.points} points`
      lastPositionNews = `${data.team} is currently in the last place of the league, with ${data.points} points under its belt. The team have achieved ${data.wins} wins, ${data.draws} draws, and ${data.losses} losses throughout the season, but have not been able to obtain the desired results. The current situation of the ${data.city} team reflects the difficulties they have faced in the competition, which has generated concern among fans and management. Despite the adversities, the team continues to work to reverse this situation and improve its performance in the upcoming matches.`
    } else {
      lastPositionTitle = ''
      lastPositionNews = ''
    }
  } else {
    if (lang === 'es') {
      lastPositionTitle = `${data.managerName} ${data.managerLastName} sobre la lucha por salir de la última posición ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos comprometidos en dar lo mejor de nosotros"`
      lastPositionNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la difícil situación de su equipo, que se encuentra en la última posición de la liga. "Estamos comprometidos en dar lo mejor de nosotros para salir de esta situación", declaró ${data.managerLastName} en una rueda de prensa. "Sabemos que no estamos donde queremos estar, pero seguimos trabajando duro para mejorar y revertir esta situación. Confiamos en la calidad y el compromiso de nuestros jugadores para salir adelante." A pesar de los obstáculos, el técnico mantiene la esperanza de que su equipo logrará salir de la zona de descenso y mejorar su posición en la tabla.`
    } else if (lang === 'en') {
      lastPositionTitle = `${data.managerName} ${data.managerLastName} on the fight of ${data.team} to get out of last place: "We are committed to giving our best"`
      lastPositionNews = `${data.team} manager ${data.managerName} ${data.managerLastName} has spoken about the plight of his team, which is at the bottom of the league table. "We are committed to giving our best to get out of this situation," ${data.managerLastName} said at the press conference. "We know we are not where we want to be, but we continue to work hard to improve and turn this situation around. We trust in the quality and commitment of our players to get through this." Despite the obstacles, the manager remains hopeful that his team will manage to get out of the relegation zone and improve their position in the table.`
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
    } else if (lang === 'en') {
      mostDrawsTitle = `${data.team}, the team with the most draws in the league with ${data.draws} draws`
      mostDrawsNews = `The ${data.team} have stood out as the team with the most draws in the league, accumulating a total of ${data.draws} draws so far this season. The players have demonstrated a great ability to compete on equal terms with their rivals, which has generated a series of balanced results. Despite not obtaining victory in all matches, the ${data.city} team have shown a competitive attitude and a strong mentality to face challenges. With this record of draws, the ${data.team} position themselves as a difficult rival to beat in the competition.`
    } else {
      mostDrawsTitle = ''
      mostDrawsNews = ''
    }
  } else {
    if (lang === 'es') {
      mostDrawsTitle = `${data.managerName} ${data.managerLastName} sobre la racha de empates ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}: "Estamos satisfechos con la competitividad del equipo"`
      mostDrawsNews = `El entrenador ${data.team === 'Real Sociedad' ? 'de la' : 'del'} ${data.team}, ${data.managerName} ${data.managerLastName}, ha hablado sobre la racha de empates de su equipo en la liga. "Estamos satisfechos con la competitividad que hemos mostrado en cada partido", declaró ${data.managerLastName} en una rueda de prensa. "Los empates reflejan la capacidad del equipo para competir de igual a igual con cualquier rival, lo que es un aspecto positivo a destacar. Seguiremos trabajando para convertir esos empates en victorias y mejorar nuestra posición en la tabla." Con estas palabras, ${data.managerLastName} resalta la actitud competitiva del equipo y su compromiso en seguir luchando por mejores resultados en la competencia.`
    } else if (lang === 'en') {
      mostDrawsTitle = `${data.managerName} ${data.managerLastName} on the draw streak of ${data.team}: "We are satisfied with the competitiveness of our team"`
      mostDrawsNews = `${data.team} manager ${data.managerName} ${data.managerLastName} has spoken about the run of draws of his team in the league. "We are satisfied with the competitiveness we have shown in each match," said ${data.managerLastName} in the press conference. "The draws reflect the ability of the team to compete on equal terms with any rival, which is a positive aspect to highlight. We will continue working to turn those draws into victories and improve our position in the table." With these words, ${data.managerLastName} highlights the competitive attitude and the commitment of the team to continue fighting for better results in the competition.`
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
