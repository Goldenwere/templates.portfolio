export type TagDefinition = {
  displayName: string
  className: string
}

export type Tag = 
  | TagDefinition
  | string
