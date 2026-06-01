<script setup>
// default.vue — plain content slide: header band + free markdown body.
// Frontmatter: title, eyebrow, locator, foot
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
</script>
<template>
  <div class="slidev-layout t-content">
    <div class="t-frame">
      <div class="t-chead" v-if="$frontmatter.title">
        <div class="t-crow" v-if="$frontmatter.eyebrow || $frontmatter.locator">
          <div class="t-kicker" v-if="$frontmatter.eyebrow">{{ $frontmatter.eyebrow }}</div>
          <div class="t-locator" v-if="$frontmatter.locator">{{ $frontmatter.locator }}</div>
        </div>
        <h1 class="t-title">{{ $frontmatter.title }}</h1>
        <div class="t-rule"></div>
      </div>
      <div class="t-body" style="flex:1;font-size:28px;line-height:1.5;padding-top:30px"><slot /></div>
      <SlideFoot />
    </div>
  </div>
</template>
