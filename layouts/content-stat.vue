<script setup>
// content-stat.vue — header band + hero number (left) + supporting bullets (right)
// Frontmatter: title, eyebrow, locator, stat, statUnit, statCaption, foot
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
      <div class="t-statzone">
        <div class="hero">
          <div class="t-hero-num">{{ $frontmatter.stat }}</div>
          <div class="t-hero-unit" v-if="$frontmatter.statUnit">{{ $frontmatter.statUnit }}</div>
          <div class="t-hero-cap" v-if="$frontmatter.statCaption">{{ $frontmatter.statCaption }}</div>
        </div>
        <div class="t-stack t-mdstack"><slot /></div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-mdstack :deep(ul) { display: flex; flex-direction: column; gap: 38px; list-style: none; padding: 0; }
.t-mdstack :deep(li) { position: relative; padding-left: 42px; font-size: 26px; line-height: 1.46; color: var(--t-muted); max-width: 34ch; }
.t-mdstack :deep(li)::before { content: ""; position: absolute; left: 0; top: 9px; width: 16px; height: 16px; border-radius: 4px; background: var(--t-accent); }
.t-mdstack :deep(li strong) { display: block; color: var(--t-ink); font-weight: 600; font-size: 29px; line-height: 1.2; margin-bottom: 6px; }
</style>
