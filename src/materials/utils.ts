import { getCompassDirection } from 'geolib'
import { Sight } from './sights'

export const TotalGuess = 6

export interface Guess {
  id: number
  done: boolean
  name: string
  distance: string
  orientation: string
}

export function createGuess(
  id: number,
  done = false,
  name = '',
  distance = '',
  orientation = ''
) {
  return {
    id,
    done,
    name,
    distance,
    orientation,
  } as Guess
}

type Direction = ReturnType<typeof getCompassDirection>
export const CompassToArrow: Record<Direction, string> = {
  N: '⬆️',
  NNE: '↗️',
  NE: '↗️',
  ENE: '↗️',
  E: '➡️',
  ESE: '↘️',
  SE: '↘️',
  SSE: '↘️',
  S: '⬇️',
  SSW: '↙️',
  SW: '↙️',
  WSW: '↙️',
  W: '⬅️',
  WNW: '↖️',
  NW: '↖️',
  NNW: '↖️',
}

export function buildToastHTML(sight: Sight) {
  return `
    <b style="font-size: 1.5em">${sight.name}</b><br>
    <i>@ ${sight.belong}</i>
    <p>${sight.brief}</p>
  `
}

export function buildDispBlocks(distanceKm: number) {
  if (distanceKm <= 1) {
    // eps
    return ['🟩', '🟩', '🟩', '🟩', '🟩']
  }
  // Max Distance on China is about 4000km
  if (distanceKm < 500) {
    return ['🟩', '🟩', '🟩', '🟩', '🟨']
  } else if (distanceKm < 1000) {
    return ['🟩', '🟩', '🟩', '🟨', '⬜']
  } else if (distanceKm < 2000) {
    return ['🟩', '🟩', '🟨', '⬜', '⬜']
  } else if (distanceKm < 3000) {
    return ['🟩', '🟨', '⬜', '⬜', '⬜']
  }
  return ['🟨', '⬜', '⬜', '⬜', '⬜']
}
