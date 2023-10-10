import { defineStore } from 'pinia'
import { type ProjectsViewModel } from '@/src/types/views/projects'
import { type ProjectViewModel } from '@/src/types/views/project'

export const useStore = defineStore('store', {
  state: () => ({
    /** project data keyed by id */
    projectsByPath: {} as { [key: string]: ProjectViewModel },
    /** content of the projects/portfolio page */
    projectsContent: null as unknown as ProjectsViewModel,
  }),
})

export type AppStoreDefinition = Omit<
  ReturnType<typeof useStore>,
  keyof ReturnType<typeof defineStore>
>
