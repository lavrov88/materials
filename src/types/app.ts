export interface IAppState {
  mobileLayout: boolean
  tabletLayout: boolean
  mobileMenus: {
    works: boolean
    options: boolean
  }

  optionsAreOpen: boolean

  mainTable: {
    materialsAreGrouped: boolean
    materialsTitles: TMaterialsTitles
  }
}

export type TMaterialsTitles = 'none' | 'table' | 'tooltip'
