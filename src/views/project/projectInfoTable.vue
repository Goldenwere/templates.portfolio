<script setup lang="ts">
import { type Tag, type TagDefinition } from '@/src/types/shared/tag'

const props = defineProps<{
  table: { [key: string ]: string }
  tags?: string[]
}>()

const getTableElementClass = (key: string) => {
  return key.toLowerCase().replace(' ', '-')
}

const getTagClass = (tag: Tag): string => {
  let val = !!(tag as TagDefinition).className
    ? (tag as TagDefinition).className
    : !!(tag as TagDefinition).displayName
      ? (tag as TagDefinition).displayName
      : tag as string
  
  val = val.toLowerCase().replace(' ', '-')

  return val
}

const getTagDisplayName = (tag: Tag): string => {
  return (tag as TagDefinition).displayName || tag as string
}
</script>

<template lang="pug">
.info
  .grid
    .grid-item(
      v-for='(entry, key) in table'
      :class='getTableElementClass(key)'
    )
      .grid-title
        span {{ key }}
      .grid-value
        span {{ entry }}
    .grid-item.tags(
      v-if='!!tags'
    )
      .grid-title
        span tags
      .grid-value
        .tag(
          v-for='(tag) in tags'
          :class='getTagClass(tag)'
        ) {{ getTagDisplayName(tag) }}
</template>

<style scoped lang="sass">
@import '@/src/styles/tag.sass'

.info
  .grid
    grid-auto-columns: 1fr
    .grid-item
      display: grid
      grid-template-columns: 1fr 2fr
      &.tags
        grid-column: 1/3
        grid-template-columns: 1fr 5fr
        .tag
          display: inline
</style>
