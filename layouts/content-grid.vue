<script setup>
// content-grid.vue — header band + 2x2 indexed bullets.
// Frontmatter: title, eyebrow, locator, foot (optional)
// Body: a markdown bullet list (each item becomes a grid cell).
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
      <!-- The markdown bullet list lands here; .t-fgrid styles it into 2x2 -->
      <div class="t-fgrid t-mdgrid"><slot /></div>
      <SlideFoot />
    </div>
  </div>
</template>

<style scoped>
/* Turn a plain markdown <ul> into the indexed 2x2 grid with square bullets */
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
