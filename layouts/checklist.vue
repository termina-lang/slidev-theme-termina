<script setup>
// checklist.vue — a vertical list of open items (an unchecked box per row),
// each with a bold title and an optional detail. Reads as "open points to
// agree / to clarify". Click a row to tick / untick it live during the talk.
// Data-driven; row gap auto-scales with count.
//
// Frontmatter:
//   title, eyebrow, locator, foot
//   items: [ { title, text? } ]
import { ref, computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.items || []
const checked = ref(items.map(() => false))
const toggle = (i) => { checked.value[i] = !checked.value[i] }
const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const density = computed(() => {
  const extra = Math.max(0, items.length - 3)
  return {
    '--ck-title': clamp(26, 36 - extra * 2.5, 36) + 'px',
    '--ck-text':  clamp(20, 26 - extra * 1.5, 26) + 'px',
    '--ck-box':   clamp(26, 34 - extra * 2.5, 34) + 'px',
    '--ck-gap':   clamp(16, 28 - extra * 3,   28) + 'px',
  }
})
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

      <div class="t-checklist" :style="density">
        <div class="t-check" :class="{ done: checked[i] }" v-for="(it, i) in items" :key="i" @click="toggle(i)">
          <span class="t-check-box"></span>
          <div class="t-check-body">
            <div class="t-check-title">{{ it.title }}</div>
            <div class="t-check-text" v-if="it.text">{{ it.text }}</div>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-checklist { flex: 1; display: flex; flex-direction: column; justify-content: space-evenly; gap: var(--ck-gap, 36px); }
.t-check { display: flex; align-items: flex-start; gap: 28px; cursor: pointer; user-select: none; transition: opacity .15s ease; }
.t-check-box { position: relative; flex: 0 0 auto; width: var(--ck-box, 30px); height: var(--ck-box, 30px); margin-top: 4px; border: 3px solid var(--t-accent); border-radius: 8px; background: #fff; transition: background .15s ease, border-color .15s ease; }
.t-check-box::after { content: ""; position: absolute; left: 50%; top: 46%; width: 7px; height: 14px; border: solid #fff; border-width: 0 3px 3px 0; transform: translate(-50%, -50%) rotate(45deg); opacity: 0; transition: opacity .15s ease; }
.t-check.done .t-check-box { background: var(--t-accent); border-color: var(--t-accent); }
.t-check.done .t-check-box::after { opacity: 1; }
.t-check-body { flex: 1; min-width: 0; }
.t-check-title { font-family: var(--t-font-display); font-weight: 600; font-size: var(--ck-title, 30px); line-height: 1.2; color: var(--t-ink); }
.t-check-text { font-size: var(--ck-text, 23px); line-height: 1.45; color: var(--t-muted); margin-top: 8px; max-width: 80ch; }
</style>
