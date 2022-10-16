import type { TComputedMaterialGroup, TComputedMaterialItem } from "@/store/modules/addedWorks";
import type { MaterialItem } from "@/store/modules/materials";
import { computed, ref, type ComputedRef } from "vue";

export const formatToMoney = (num: number) => (
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
)

export const formatFromMoney = (str: string) => (
  +str.split(' ').join('')
)

export const normalizeMaterials = (materials: ComputedRef<TComputedMaterialItem[]>) => (computed(
  () => materials.value.map((m): INormalizedMaterials => ({
    name: m.material.name,
    title: m.material.title,
    amount: Math.ceil(m.amount),
    unit: m.material.unit,
    price: formatToMoney(m.material.price),
    totalPrice: formatToMoney(Math.ceil(m.amount) * m.material.price)
}))))

export interface INormalizedMaterials {
  name: string
  title: string
  amount: number
  unit: string
  price: string
  totalPrice: string
}

export const normalizeGroupedMaterials = (groups: ComputedRef<TComputedMaterialGroup[]>) => (computed(
  () => groups.value.map((g): INormalizedGroupedMaterials => {
    const materials = g.materials.map(m => ({
      material: m.material,
      amount: m.amount,
      totalPrice: formatToMoney(m.totalPrice)
    }))

    return {
      title: g.title,
      unit: g.unit,
      amount: Math.ceil(g.amount),
      price: formatToMoney(g.price),
      totalPrice: formatToMoney(g.totalPrice),
      materials: materials
    }
  })))

export interface INormalizedGroupedMaterials {
  title: string
  unit: string
  amount: number
  price: string
  totalPrice: string
  materials: IMaterialsFromGroup[]
}

export interface IMaterialsFromGroup {
  material: MaterialItem,
  amount: number,
  totalPrice: string
}

