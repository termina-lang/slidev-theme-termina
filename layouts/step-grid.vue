<script setup>
// step-grid.vue — numbered steps (like `steps`) laid out in a 2-column grid.
// Frontmatter: title, eyebrow, locator, foot; items: [ { title, text?, n? } ]
// n auto-fills as 01, 02, … if omitted. The row gap adapts to the item count
// (fewer rows → roomier, more rows → tighter), like content-grid.
import { ref, onMounted, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.items || []
const pad = (i) => String(i).padStart(2, '0')
const grid = ref(null)

function fitGap() {
  const el = grid.value
  if (!el) return
  const rows = Math.ceil(items.length / 2)
  const gap = Math.max(24, 110 - rows * 19)   // 2r→72 · 3r→53 · 4r→34 · 5r→24
  el.style.setProperty('--fgrid-rowgap', gap + 'px')
  // column-major: numbering runs down each column (1-2-3-4 left, 5-6-7 right)
  el.style.gridTemplateRows = `repeat(${rows}, auto)`
}
onMounted(() => nextTick(fitGap))
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

      <div class="t-stepgrid" ref="grid">
        <div class="t-sgcell" v-for="(it,i) in items" :key="i">
          <div class="t-sg-n">{{ it.n || pad(i + 1) }}</div>
          <div class="t-sg-body">
            <div class="t-sg-title">{{ it.title }}</div>
            <div class="t-sg-text" v-if="it.text">{{ it.text }}</div>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-stepgrid {
  flex: 1; display: grid; grid-template-columns: 1fr 1fr;
  grid-auto-flow: column; gap: var(--fgrid-rowgap, 40px) 90px; align-content: center;
}
.t-sgcell { display: flex; align-items: flex-start; gap: 24px; }
.t-sg-n { font-family: var(--t-font-mono); font-weight: 600; font-size: 42px; line-height: 1; color: var(--t-accent); flex: 0 0 auto; }
.t-sg-body { flex: 1; }
.t-sg-title { font-family: var(--t-font-display); font-weight: 600; font-size: 29px; color: var(--t-ink); line-height: 1.18; }
.t-sg-text { font-size: 24px; line-height: 1.45; color: var(--t-muted); margin-top: 6px; max-width: 40ch; }
</style>
