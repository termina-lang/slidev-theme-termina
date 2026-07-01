<script setup>
// content.vue — the "normal" content slide: header band + a single full-width
// column of on-brand bullets (accent square markers). Same bullet style as the
// content-* layouts, but one column across the full width instead of a grid.
// Frontmatter: title, eyebrow, locator, foot
// Body: a Markdown bullet list (use **bold** for the lead of each point).
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
      <div class="t-mdcol"><slot /></div>
      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-mdcol { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.t-mdcol :deep(ul) { display: flex; flex-direction: column; gap: 30px; list-style: none; padding: 0; margin: 0; }
.t-mdcol :deep(li) { position: relative; padding-left: 46px; font-size: 30px; line-height: 1.45; color: var(--t-muted); max-width: 88ch; }
.t-mdcol :deep(li)::before { content: ""; position: absolute; left: 0; top: 13px; width: 18px; height: 18px; border-radius: 5px; background: var(--t-accent); }
.t-mdcol :deep(li strong) { color: var(--t-ink); font-weight: 600; }
/* nested bullets (second level) */
.t-mdcol :deep(li ul) { margin-top: 16px; gap: 16px; }
.t-mdcol :deep(li li) { font-size: 26px; color: var(--t-muted); }
.t-mdcol :deep(li li)::before { width: 12px; height: 12px; top: 13px; background: color-mix(in srgb, var(--t-accent) 45%, white); }
/* third level: dash marker, distinct from the square/dot above */
.t-mdcol :deep(li li li) { font-size: 24px; }
.t-mdcol :deep(li li li)::before { width: 14px; height: 3px; top: 16px; border-radius: 2px; background: color-mix(in srgb, var(--t-accent) 35%, white); }
</style>
