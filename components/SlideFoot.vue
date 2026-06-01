<script setup>
// SlideFoot.vue — the footer band shared by every content layout.
// Text is deck-owned via the markdown headmatter (empty by default):
//   footLeft:  e.g. 'termina · Project XYZ'    -> left span
//   footRight: e.g. 'Org A · Org B'            -> right span
// A per-slide `foot:` in a slide's frontmatter still overrides the right span.
// The middle ".pageno" span is filled in by global-bottom.vue.
import { useSlideContext } from '@slidev/client'
const { $slidev, $frontmatter } = useSlideContext()
const cfg = $slidev?.configs || {}
</script>
<template>
  <div class="t-foot">
    <span>{{ cfg.footLeft || '' }}</span>
    <span class="pageno"></span>
    <span>{{ $frontmatter?.foot || cfg.footRight || '' }}</span>
  </div>
</template>
