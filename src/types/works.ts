import type { IMaterialItem } from './materials';
import type { ISetItem, TSetsTypes } from './sets';

export interface IWorksState {
  works: IWorkItem[]
  computedMaterials: IComputedMaterialItem[]
}

export interface IWorksByTypeItem {
  workType: TSetsTypes,
  works: IWorkItem[]
}

export interface IWorkItem {
  id: string
  set: ISetItem
  workType: TSetsTypes
  amount: number
}

export interface IComputedMaterialItem {
  material: IMaterialItem
  amount: number
  totalPrice: number
}

export interface IWorkTypeItem {
  workType: TSetsTypes
  works: IComputedMaterialGroup[]
}

export interface IComputedMaterialGroup {
  title: string
  unit: string
  amount: number
  price: number
  totalPrice: number
  materials: IComputedMaterialItem[]
}

export interface IChangeWorkAmount {
  id: string
  amount: number
}

export interface IAddWorkPayload {
  workType: TSetsTypes
  setTitle: string
  amount: number
}