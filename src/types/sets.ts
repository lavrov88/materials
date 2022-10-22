import type { SetsState } from "@/store/modules/sets"

export interface ISetItem {
  title: string
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
}

export type TSetsTypes = keyof SetsState