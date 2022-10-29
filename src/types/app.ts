import type { ElScrollbar } from "element-plus"

export interface IAppState {
  mobileLayout: boolean
  tabletLayout: boolean
  mobileMenus: {
    works: boolean
    options: boolean
  }

  appIsInitialized: boolean
  addWorkDialogIsOpen: boolean
  optionsAreOpen: boolean

  mainTable: {
    materialsAreGrouped: boolean
    materialsTitles: TMaterialsTitles
    mainScrollbarEl: TMainScrollbarEl
  }
}

export type TMainScrollbarEl = InstanceType<typeof ElScrollbar> | null
export type TMaterialsTitles = 'none' | 'table' | 'tooltip'
