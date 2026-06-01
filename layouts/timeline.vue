<script setup>
// timeline.vue — a horizontal milestone timeline, themed.
// A connecting line with one node per item; date above, label + note below.
// The first item is highlighted (filled node + glow), ideal for T0 / kick-off.
// Frontmatter:
//   title, eyebrow, locator, foot
//   items: [ { date, label, note? } ]
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.items || []
const cols = 'repeat(' + items.length + ',1fr)'
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

      <div class="tl" :style="{ '--n': items.length }">
        <div class="tl-row" :style="{ gridTemplateColumns: cols }">
          <div class="tl-date" v-for="(it,i) in items" :key="i">{{ it.date }}</div>
        </div>
        <div class="tl-track" :style="{ gridTemplateColumns: cols }">
          <div class="tl-line"></div>
          <div class="tl-cell" v-for="(it,i) in items" :key="i">
            <span class="tl-node" :class="{ first: i === 0 }"></span>
          </div>
        </div>
        <div class="tl-row" :style="{ gridTemplateColumns: cols }">
          <div class="tl-body" v-for="(it,i) in items" :key="i">
            <div class="tl-label">{{ it.label }}</div>
            <div class="tl-note" v-if="it.note">{{ it.note }}</div>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.tl { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.tl-row { display: grid; }
.tl-date { text-align: center; font-family: var(--t-font-mono); font-size: 30px; font-weight: 700; color: var(--t-accent); letter-spacing: -.01em; }

.tl-track { display: grid; position: relative; align-items: center; margin: 28px 0; }
/* progression line: starts solid at the first node, fades toward the future;
   inset by half a column so it begins/ends at the outer nodes, not the edges. */
.tl-line {
  position: absolute; top: 50%; transform: translateY(-50%);
  left: calc(50% / var(--n)); right: calc(50% / var(--n));
  height: 3px; border-radius: 3px;
  background: linear-gradient(90deg, var(--t-accent), color-mix(in srgb, var(--t-accent) 25%, var(--t-hair)));
}
.tl-cell { display: flex; justify-content: center; }
.tl-node { width: 22px; height: 22px; border-radius: 50%; background: #fff; border: 3px solid var(--t-accent); position: relative; z-index: 1; }
.tl-node.first { background: var(--t-accent); box-shadow: 0 0 0 7px color-mix(in srgb, var(--t-accent) 16%, transparent); }

.tl-body { text-align: center; padding: 0 16px; }
.tl-label { font-family: var(--t-font-display); font-weight: 600; font-size: 28px; color: var(--t-ink); }
.tl-note { font-size: 21px; line-height: 1.4; color: var(--t-muted); margin: 8px auto 0; max-width: 26ch; }
</style>
