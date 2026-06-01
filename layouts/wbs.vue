<script setup>
// wbs.vue — header band + <WBS :data="…"/>.
// Frontmatter: title, eyebrow, locator, foot
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>
<template>
  <div class="slidev-layout t-content">
    <div class="t-frame">
      <div class="t-chead">
        <div class="t-crow" v-if="$frontmatter.eyebrow || $frontmatter.locator">
          <div class="t-kicker" v-if="$frontmatter.eyebrow">{{ $frontmatter.eyebrow }}</div>
          <div class="t-locator" v-if="$frontmatter.locator">{{ $frontmatter.locator }}</div>
        </div>
        <h1 class="t-title">{{ $frontmatter.title }}</h1>
        <div class="t-rule"></div>
      </div>
      <slot />
      <SlideFoot />
    </div>
  </div>
</template>
