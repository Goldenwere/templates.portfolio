import type { Route } from 'src/types/shared/route'

export type AppViewModel = {
  logoUrl: string
  routes: { [url: string]: Route }
}
