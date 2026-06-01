<script setup>
// agenda.vue — header band + numbered agenda rows.
// Frontmatter: title, eyebrow, items: [ { title, meta } ]
// Rows auto-scale (padding / type size) when there are many items so the
// list never overflows. Up to 5 items keep the default look; beyond that
// every extra row shrinks the rhythm a notch.
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.items || []
const pad = (n) => String(n).padStart(2, '0')

const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const density = computed(() => {
  const extra = Math.max(0, items.length - 5)
  return {
    '--ag-pad':  clamp(13, 26 - extra * 3,   26) + 'px',
    '--ag-tt':   clamp(30, 38 - extra * 2.5, 38) + 'px',
    '--ag-meta': clamp(17, 20 - extra * 1,   20) + 'px',
    '--ag-num':  clamp(21, 26 - extra * 1.5, 26) + 'px',
  }
})
</script>
<template>
  <div class="slidev-layout t-content">
    <div class="t-frame">
      <div class="t-kicker" v-if="$frontmatter.eyebrow">{{ $frontmatter.eyebrow }}</div>
      <h1 class="t-title">{{ $frontmatter.title || "What we'll cover" }}</h1>
      <div class="t-agenda" :style="density">
        <div class="row" v-for="(it,i) in items" :key="i">
          <span class="n">{{ pad(i+1) }}</span>
          <span class="tt">{{ it.title }}</span>
          <span class="meta" v-if="it.meta">{{ it.meta }}</span>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
