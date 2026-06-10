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
import faviconUrl from './assets/favicon.png'

const { $slidev } = useSlideContext()

// Brand favicon, theme-provided: every deck gets the Termina tab icon for free
// (imported asset, bundled by Vite — Slidev does NOT inherit the theme's
// public/). Intentionally NOT a per-deck knob: we override whatever else is
// present so the icon is always the brand mark.
function applyFavicon() {
  document.querySelectorAll('link[rel~="icon"]').forEach((l) => {
    if (l.id !== 't-favicon' && l.parentNode) l.parentNode.removeChild(l)
  })
  let link = document.getElementById('t-favicon')
  if (!link) {
    link = document.createElement('link')
    link.id = 't-favicon'
    link.rel = 'icon'
    link.type = 'image/png'
    document.head.appendChild(link)
  }
  link.href = faviconUrl
}

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

onMounted(() => { apply(); applyFavicon() })
watch(() => $slidev?.configs?.palette, apply, { deep: true })
</script>
<template><div style="display:none"></div></template>
