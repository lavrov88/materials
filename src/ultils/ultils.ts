import type { TComputedMaterialGroup, TComputedMaterialItem } from "@/store/modules/addedWorks";
import { computed, ref, type ComputedRef } from "vue";

export const formatToMoney = (num: number) => (
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
)

export const formatFromMoney = (str: string) => (
  +str.split(' ').join('')
)

export const normalizeMaterials = (materials: ComputedRef<TComputedMaterialItem[]>) => (computed(
  () => materials.value.map(m => ({
    name: m.material.name,
    amount: formatToMoney(Math.ceil(m.amount)),
    unit: m.material.unit,
    price: m.material.price,
    totalPrice: formatToMoney(Math.ceil(m.amount) * m.material.price)
}))))

export const normalizeGroupedMaterials = (groups: ComputedRef<TComputedMaterialGroup[]>) => (computed(
  () => groups.value.map(g => ({
    name: g.name,
    unit: g.unit,
    amount: formatToMoney(Math.ceil(g.amount)),
    price: g.price,
    totalPrice: g.totalPrice,
    materials: g.materials
}))))

export const calcAllMaterialsPrice = (
  normalizedMaterials: ReturnType<typeof normalizeMaterials>
) => (computed(() => (
  formatToMoney(normalizedMaterials.value.reduce(
    (sum, current) => sum + formatFromMoney(current.totalPrice),
    0
  ))
)
))

