import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state: () => ({
    projects: {} as { [key: string]: {} },
  }),
})

export type AppStoreDefinition = Omit<
  ReturnType<typeof useStore>,
  keyof ReturnType<typeof defineStore>
>
