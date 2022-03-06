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

const DIRECTION_ARROWS: Record<Direction, string> = {
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
export function getDirectionEmoji(guess: Guess) {
  return guess.distance === 0 ? '🎉' : DIRECTION_ARROWS[guess.direction]
}

const MAX_DISTANCE_ON_EARTH = 20_000_000

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

export function formatDistance(
  distanceInMeters: number,
  distanceUnit: 'km' | 'miles'
) {
  const distanceInKm = distanceInMeters / 1000

  return distanceUnit === 'km'
    ? `${Math.round(distanceInKm)}km`
    : `${Math.round(distanceInKm * 0.621371)}mi`
}

function radians(a: number) {
  return (a / 180) * Math.PI
}

const EARTH_EQUATOR_RADIUS = 6378.137 // km

export function calcDistance(loc1: [number, number], loc2: [number, number]) {
  const [loc1Lng, loc1Lat] = loc1.map(radians)
  const [loc2Lng, loc2Lat] = loc2.map(radians)
  const a = loc1Lat - loc2Lat
  const b = loc1Lng - loc2Lng
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(loc1Lat) * Math.cos(loc2Lat) * Math.pow(Math.sin(b / 2), 2)
      )
    )
  return s * EARTH_EQUATOR_RADIUS // km
}
