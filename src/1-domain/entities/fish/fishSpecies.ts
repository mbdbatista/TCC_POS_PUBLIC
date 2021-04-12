export interface FishSpecie { 
  id: string
  name: string
  carnivore: boolean
  sizes: FishSize[]
}

export type FishSize = {
  id: string,
  size: number //centimeters
  unitsPerMeter: number
}