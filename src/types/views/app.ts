import type { Route } from 'src/types/shared/route'

export type AppViewModel = {
  routes: { [url: string]: Route }
}
