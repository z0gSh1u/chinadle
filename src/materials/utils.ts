type Coord = [number, number] // Lng, Lat

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

export type Direction =
  | 'S'
  | 'W'
  | 'NNE'
  | 'NE'
  | 'ENE'
  | 'E'
  | 'ESE'
  | 'SE'
  | 'SSE'
  | 'SSW'
  | 'SW'
  | 'WSW'
  | 'WNW'
  | 'NW'
  | 'NNW'
  | 'N'

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
export function getDirectionEmoji(guess: Coord, answer: Coord) {}

const MAX_DISTANCE_ON_EARTH = 20_000_000
const EARTH_EQUATOR_RADIUS = 6378.137 // km

export function computeProximityPercent(distance: number): number {
  const proximity = Math.max(MAX_DISTANCE_ON_EARTH - distance, 0)
  return Math.round((proximity / MAX_DISTANCE_ON_EARTH) * 100)
}

export function generateSquareCharacters(
  proximity: number,
  theme: 'light' | 'dark'
): string[] {
  const characters = new Array<string>(5)
  const greenSquareCount = Math.floor(proximity / 20)
  const yellowSquareCount = proximity - greenSquareCount * 20 >= 10 ? 1 : 0

  characters.fill('🟩', 0, greenSquareCount)
  characters.fill('🟨', greenSquareCount, greenSquareCount + yellowSquareCount)
  characters.fill(
    theme === 'light' ? '⬜' : '⬛',
    greenSquareCount + yellowSquareCount
  )

  return characters
}
