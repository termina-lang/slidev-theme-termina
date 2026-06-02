<script setup>
// board.vue — a kanban-style board: lanes (columns) of cards. Data-driven.
// Good for a set of discussion points grouped into themes, where the detail is
// delivered verbally (keep responses in presenter notes).
//
// Card size and inter-card gap auto-scale with the busiest lane (bigger when
// few cards, compact when many) and the board is centred, so it fills the
// slide without being stuck to the top.
//
// Frontmatter:
//   title, eyebrow, locator, foot
//   columns: [ { title, tag?, cards: [ { title, text? } ] } ]
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const cols = $frontmatter.columns || []
const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const density = computed(() => {
  const maxCards = Math.max(1, ...cols.map((c) => (c.cards || []).length))
  const extra = Math.max(0, maxCards - 2)
  return {
    '--bd-pad':   clamp(16, 24 - extra * 3,   24) + 'px',
    '--bd-gap':   clamp(14, 24 - extra * 4,   24) + 'px',
    '--bd-title': clamp(20, 25 - extra * 1,   25) + 'px',
    '--bd-text':  clamp(18, 23 - extra * 1,   23) + 'px',
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

      <div class="t-board" :style="density">
        <div class="t-board-inner">
          <div class="t-lane" v-for="(c, i) in cols" :key="i">
            <div class="t-lane-head">
              <span class="t-lane-title">{{ c.title }}</span>
              <span class="t-lane-tag" v-if="c.tag">{{ c.tag }}</span>
            </div>
            <div class="t-card" v-for="(card, j) in (c.cards || [])" :key="j">
              <div class="t-card-title">{{ card.title }}</div>
              <div class="t-card-text" v-if="card.text">{{ card.text }}</div>
            </div>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-board { flex: 1; display: flex; align-items: center; }
.t-board-inner { width: 100%; display: flex; gap: 44px; align-items: flex-start; }
.t-lane { flex: 1; display: flex; flex-direction: column; gap: var(--bd-gap, 28px); min-width: 0; }
.t-lane-head { display: flex; align-items: baseline; gap: 12px; padding-bottom: 14px; margin-bottom: 4px; border-bottom: 2px solid var(--t-accent); }
.t-lane-title { font-family: var(--t-font-display); font-weight: 600; font-size: 25px; color: var(--t-ink); white-space: nowrap; }
.t-lane-tag { font-family: var(--t-font-mono); font-size: 16px; letter-spacing: .05em; color: var(--t-muted); }
.t-card { background: #fff; border: 1px solid var(--t-hair); border-left: 4px solid var(--t-accent); border-radius: 12px; padding: var(--bd-pad, 26px) calc(var(--bd-pad, 26px) + 2px); box-shadow: 0 14px 32px rgba(15,40,75,.07); }
.t-card-title { font-family: var(--t-font-display); font-weight: 600; font-size: var(--bd-title, 24px); color: var(--t-ink); line-height: 1.2; margin-bottom: 10px; }
.t-card-text { font-size: var(--bd-text, 22px); line-height: 1.5; color: var(--t-muted); }
.t-card-text:first-child { color: var(--t-ink); }
</style>
