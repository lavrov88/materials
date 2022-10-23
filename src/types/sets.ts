import type { SetsState } from "@/store/modules/sets"

export interface ISetItem {
  title: string
  shortName: string
  unit: string
  sortRange: number
  materials: ISetMaterialAmount[]
}

export interface ISetMaterialAmount {
  material: number
  amount: number
}

export interface ISetsState {
  floors: ISetItem[]
  walls: ISetItem[]
  ceilings: ISetItem[]
}

export type TSetsTypes = keyof SetsState