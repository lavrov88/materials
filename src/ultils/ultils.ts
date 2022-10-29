import type { INormalizedGroupedMaterials, INormalizedGroupedMaterialsTypes, INormalizedMaterials } from "@/types/materials";
import type { ISetItem, ISetsState, TSetsTypes } from "@/types/sets";
import type { IAddWorkPayload, IComputedMaterialGroup, IComputedMaterialItem, IWorkItem, IWorkTypeItem } from "@/types/works";
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

export const getWorksString = (works: IWorkItem[]) => {
  let str = '?'
  works.forEach((work, idx) => {
    str += `${work.set.shortName}=${work.amount}`
    str += idx === works.length - 1 ? '': '&'
  })
  return str
}

export const getWorksFromString = (str: string, sets: ISetsState) => {
  const urlObjects = str.slice(2).split('&').map(strItem => {
    const [ shortName, amount ] = strItem.split('=')
    return { shortName, amount: +amount }
  })
  const dispatchObjects = [] as IAddWorkPayload[]

  urlObjects.forEach(urlItem => {
    Object.values(sets).forEach((setsPart: ISetItem[], idx) => {
      const foundSet = setsPart.find(set => set.shortName === urlItem.shortName)
      if (foundSet) {
        const workType = Object.keys(sets)[idx]
        dispatchObjects.push({
          workType,
          setTitle: foundSet.title,
          amount: urlItem.amount
        } as IAddWorkPayload)
      }
    })
  })

  return dispatchObjects
}