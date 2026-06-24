<script setup>
// content-grid.vue — header band + 2-column indexed bullets.
// Frontmatter: title, eyebrow, locator, foot (optional)
// Body: a markdown bullet list (each item becomes a grid cell).
// The row gap shrinks as the item count grows, so the spacing stays balanced
// whether the slide has 4 cells or 8 (set as --fgrid-rowgap on the grid).
import { ref, onMounted, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const grid = ref(null)

function fitGap() {
  const el = grid.value
  if (!el) return
  const rows = Math.ceil(el.querySelectorAll('li').length / 2)
  // fewer rows -> roomier; more rows -> tighter
  const gap = Math.max(24, 110 - rows * 19)   // 2r→72 · 3r→53 · 4r→34 · 5r→24
  el.style.setProperty('--fgrid-rowgap', gap + 'px')
  // column-major: cells fill down the left column, then the right
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
      <!-- The markdown bullet list lands here; .t-fgrid styles it into the grid -->
      <div class="t-fgrid t-mdgrid" ref="grid"><slot /></div>
      <SlideFoot />
    </div>
  </div>
</template>

<style scoped>
/* Turn a plain markdown <ul> into the indexed grid with square bullets */
.t-mdgrid :deep(ul) { display: contents; list-style: none; }
.t-mdgrid :deep(li) {
  position: relative; padding-left: 42px;
  font-size: 26px; line-height: 1.46; color: var(--t-muted); max-width: 38ch;
}
.t-mdgrid :deep(li)::before {
  content: ""; position: absolute; left: 0; top: 9px;
  width: 16px; height: 16px; border-radius: 4px; background: var(--t-accent);
}
.t-mdgrid :deep(li strong) {
  display: block; color: var(--t-ink); font-weight: 600;
  font-size: 29px; line-height: 1.2; margin-bottom: 8px;
}
</style>
