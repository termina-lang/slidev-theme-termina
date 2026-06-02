<script setup>
// steps.vue — a vertical sequence of numbered steps (next steps / roadmap /
// procedure). Big accent numerals echo the agenda & section dividers.
// Frontmatter:
//   title, eyebrow, locator, foot
//   items: [ { title, text?, n? } ]   // n auto-fills as 01, 02, … if omitted
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.items || []
const pad = (i) => String(i).padStart(2, '0')
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

      <div class="t-steps">
        <div class="t-step" v-for="(it,i) in items" :key="i">
          <div class="t-step-n">{{ it.n || pad(i + 1) }}</div>
          <div class="t-step-body">
            <div class="t-step-title">{{ it.title }}</div>
            <div class="t-step-text" v-if="it.text">{{ it.text }}</div>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-steps { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.t-step { display: flex; align-items: center; gap: 34px; padding: 24px 0; border-bottom: 1px solid var(--t-hair); }
.t-step:last-child { border-bottom: none; }
.t-step-n { font-family: var(--t-font-mono); font-weight: 600; font-size: 48px; line-height: 1; color: var(--t-accent); width: 92px; text-align: right; flex: 0 0 auto; letter-spacing: 0; }
.t-step-body { flex: 1; }
.t-step-title { font-family: var(--t-font-display); font-weight: 600; font-size: 31px; color: var(--t-ink); line-height: 1.15; }
.t-step-text { font-size: 24px; line-height: 1.45; color: var(--t-muted); margin-top: 8px; max-width: 88ch; }
</style>
