<script setup>
// register.vue — a grouped register. Each group shows a label cell that spans
// (rowspan) its items, so items relate to their group without repeating the
// label. Data-driven, no raw HTML in the deck.
//
// When there are many items, the groups are split into two side-by-side
// columns (kept whole, balanced by item count) so rows can breathe. Row
// type/padding auto-scale with the tallest column.
//
// Frontmatter:
//   title, eyebrow, locator, foot
//   columns: [ groupHeader, itemHeader ]
//   groups: [ { lead?, label, items: [ { lead?, text, mark?, tag? } ] } ]
//     lead  -> bold prefix (e.g. an ID like "WP1" or "D1")
//     label -> the rest of the group / item text
//     mark  -> highlight the item (amber, the brand signal/milestone colour)
//     tag   -> optional amber pill shown after a marked item (e.g. "ESA")
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const groups = $frontmatter.groups || []
const columns = $frontmatter.columns || ['', '']
const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const count = (g) => (g.items || []).length

// Split the groups (kept whole) into two columns balanced by item count, but
// only when it is worth it. Few items -> a single column.
const cols = computed(() => {
  const total = groups.reduce((n, g) => n + count(g), 0)
  if (groups.length < 2 || total <= 7) return [groups]
  let best = 1, bestMax = Infinity
  for (let k = 1; k < groups.length; k++) {
    const left = groups.slice(0, k).reduce((n, g) => n + count(g), 0)
    const m = Math.max(left, total - left)
    if (m < bestMax) { bestMax = m; best = k }
  }
  return [groups.slice(0, best), groups.slice(best)]
})

// Auto-scale to the tallest column.
const density = computed(() => {
  const maxRows = Math.max(1, ...cols.value.map((c) => c.reduce((n, g) => n + count(g), 0)))
  const extra = Math.max(0, maxRows - 6)
  return {
    '--rg-fs':  clamp(20, 24 - extra * 0.7, 24) + 'px',
    '--rg-pad': clamp(8, 18 - extra * 1.2, 18) + 'px',
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

      <div class="t-register" :style="density">
        <div class="t-reg-grid">
          <div class="t-reg-col" v-for="(col, ci) in cols" :key="ci">
            <table>
              <thead><tr><th>{{ columns[0] }}</th><th>{{ columns[1] }}</th></tr></thead>
              <tbody>
                <template v-for="(g, gi) in col" :key="gi">
                  <tr v-for="(it, ii) in (g.items || [])" :key="ii" :class="{ 'grp-start': ii === 0 }">
                    <td v-if="ii === 0" :rowspan="(g.items || []).length" class="grp-label">
                      <strong v-if="g.lead">{{ g.lead }}</strong>{{ g.label }}
                    </td>
                    <td :class="{ 'rg-mark': it.mark }">
                      <strong v-if="it.lead">{{ it.lead }}</strong>{{ it.text }}<span class="rg-tag" v-if="it.tag">{{ it.tag }}</span>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-register { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.t-reg-grid { display: flex; gap: 80px; align-items: flex-start; }
.t-reg-col { flex: 1; min-width: 0; }
.t-reg-col table { width: 100%; border-collapse: collapse; font-size: var(--rg-fs, 26px); }
.t-reg-col th { font-family: var(--t-font-mono); font-size: 24px; font-weight: 600; color: var(--t-muted); text-align: left; vertical-align: bottom; padding: 0 18px 14px; border-bottom: 1px solid var(--t-hair); white-space: nowrap; }
.t-reg-col td { text-align: left; vertical-align: top; padding: var(--rg-pad, 16px) 18px; line-height: 1.4; color: var(--t-muted); }
.t-reg-col td.grp-label { color: var(--t-ink); padding-right: 36px; }
.t-reg-col td strong { color: var(--t-ink); font-weight: 600; margin-right: 8px; }
/* a hairline only between groups (not between items of the same group) */
.t-reg-col tbody tr.grp-start td { border-top: 1px solid var(--t-hair); }
.t-reg-col tbody tr.grp-start:first-child td { border-top: none; }
/* marked item: amber (the brand signal/milestone colour) */
.t-reg-col td.rg-mark { color: var(--t-ink); }
.t-reg-col td.rg-mark strong { color: #B5650A; }
.rg-tag { font-family: var(--t-font-mono); font-size: 0.66em; letter-spacing: .05em; color: #B5650A; background: color-mix(in srgb, var(--t-amber) 16%, #fff); border: 1px solid color-mix(in srgb, var(--t-amber) 45%, #fff); border-radius: 6px; padding: 3px 9px; margin-left: 12px; vertical-align: middle; white-space: nowrap; }
</style>
