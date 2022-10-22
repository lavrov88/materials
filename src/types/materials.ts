import type { TSetsTypes } from "./sets"

export interface IMaterialItem {
  name: string
  title: string
  id: number
  unit: string
  price: number
  priceDate: string
}

export interface IMaterialsState {
  materials: IMaterialItem[]
}

export interface INormalizedMaterials {
  name: string
  title: string
  amount: number
  unit: string
  price: string
  totalPrice: string
}

export interface INormalizedGroupedMaterialsTypes {
  workType: TSetsTypes
  workTypeTotalPrice: string
  works: INormalizedGroupedMaterials[]
}

export interface INormalizedGroupedMaterials {
  title: string
  unit: string
  amount: number
  price: string
  totalPrice: string
  materials: IMaterialsFromGroup[]
}

export interface IMaterialsFromGroup {
  material: IMaterialItem,
  amount: number,
  totalPrice: string
}