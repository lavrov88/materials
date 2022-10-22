import type { INormalizedGroupedMaterials, INormalizedGroupedMaterialsTypes, INormalizedMaterials } from "@/types/materials";
import type { IComputedMaterialGroup, IComputedMaterialItem, IWorkTypeItem } from "@/types/works";
import { computed, type ComputedRef } from "vue";

export const generateId = () => {
  const dateStr = (new Date).toJSON()
  const random = Math.random().toFixed(4).slice(2, 6)
  return `${dateStr}-${random}`
}

export const formatToMoney = (num: number) => (
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
)

export const formatFromMoney = (str: string) => (
  +str.split(' ').join('')
)

export const normalizeMaterials = (materials: ComputedRef<IComputedMaterialItem[]>) => (computed(
  () => materials.value.map((m): INormalizedMaterials => ({
    name: m.material.name,
    title: m.material.title,
    amount: Math.ceil(m.amount),
    unit: m.material.unit,
    price: formatToMoney(m.material.price),
    totalPrice: formatToMoney(Math.ceil(m.amount) * m.material.price)
}))))

export const normalizeGroupedMaterialsWorks = (groups: IComputedMaterialGroup[]) => (groups.map((g): INormalizedGroupedMaterials => {
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
}))

export const normalizeGroupedMaterials = (workTypes: IWorkTypeItem[]) => (workTypes.map((wt): INormalizedGroupedMaterialsTypes => {
  const workTypeTotalPrice = wt.works.reduce((sum, item) => sum + item.totalPrice, 0)

  return {
    workType: wt.workType,
    workTypeTotalPrice: formatToMoney(workTypeTotalPrice),
    works: normalizeGroupedMaterialsWorks(wt.works)
  }
}))