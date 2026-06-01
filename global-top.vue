<script setup>
// global-top.vue — makes the deck `palette:` (markdown headmatter) the single
// source of truth for brand colours. Each palette key K overrides the theme
// token --t-K at :root, so EVERYTHING that uses those tokens (Gantt, WBS,
// comparison, hero numbers, agenda, participants, ...) follows the deck.
//   palette:
//     prime: '#2C6FA6'  ->  --t-prime
//     subco: '#00833D'  ->  --t-subco  (recolours Gantt bars, WBS, legend, ...)
import { onMounted, watch } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

function apply() {
  const p = ($slidev && $slidev.configs && $slidev.configs.palette) || {}
  const decls = Object.entries(p)
    .map(([k, v]) => `--t-${k}: ${v};`)
    .join(' ')
  let el = document.getElementById('t-palette')
  if (!el) {
    el = document.createElement('style')
    el.id = 't-palette'
    document.head.appendChild(el)
  }
  el.textContent = decls ? `:root{ ${decls} }` : ''
}

onMounted(apply)
watch(() => $slidev?.configs?.palette, apply, { deep: true })
</script>
<template><div style="display:none"></div></template>
