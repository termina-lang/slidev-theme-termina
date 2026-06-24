<script setup>
// SlideFoot.vue — the footer band shared by every content layout.
// Text is deck-owned via the markdown headmatter (empty by default):
//   footLeft:  e.g. 'termina · Project XYZ'    -> left span
//   footRight: e.g. 'Org A · Org B'            -> right span
// A per-slide `foot:` in a slide's frontmatter still overrides the right span.
// The middle span shows this slide's page number "NN / TT", rendered per slide
// (from $page) so it works in the presenter AND in PDF / PNG export.
import { computed, unref } from 'vue'
import { useSlideContext, useNav } from '@slidev/client'
const { $slidev, $frontmatter, $page } = useSlideContext()
const nav = useNav()
const cfg = $slidev?.configs || {}
const pad = (n) => String(n ?? '').padStart(2, '0')
const pageno = computed(() => {
  const p = unref($page)
  const t = unref(nav?.total)
  return p ? `${pad(p)} / ${pad(t)}` : ''
})
</script>
<template>
  <div class="t-foot">
    <span>{{ cfg.footLeft || '' }}</span>
    <span class="pageno">{{ pageno }}</span>
    <span>{{ $frontmatter?.foot || cfg.footRight || '' }}</span>
  </div>
</template>
