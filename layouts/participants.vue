<script setup>
// participants.vue — header band + organisations side by side, each with its
// people (name + role). Photo-free: built for kickoff "introduction of
// participants" where parties matter more than faces.
// Frontmatter:
//   title, eyebrow, locator, foot
//   groups: [ { org, accent, tag?, people: [ { name, role } ] } ]
//     accent: a deck-palette key (defined in the markdown headmatter `palette:`)
//             or any CSS colour ('#0B7285', 'teal', 'var(--t-accent)', ...).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter, $slidev } = useSlideContext()
const groups = $frontmatter.groups || []
// accent resolution: deck palette key → raw CSS colour → ink fallback.
const PALETTE = $slidev?.configs?.palette || {}
const colorOf = (a) => PALETTE[a] || a || 'var(--t-ink)'

// Columns follow the number of organisations; type scales down as the largest
// group grows (comfortable up to 3 people per org, then a notch per extra).
const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const density = computed(() => {
  const maxPeople = Math.max(1, ...groups.map((g) => (g.people || []).length))
  const extra = Math.max(0, maxPeople - 3)
  return {
    gridTemplateColumns: `repeat(${groups.length || 1}, 1fr)`,
    '--pt-org': clamp(26, 34 - extra * 2,   34) + 'px',
    '--pt-nm':  clamp(22, 31 - extra * 2.5, 31) + 'px',
    '--pt-rl':  clamp(16, 22 - extra * 1.5, 22) + 'px',
    '--pt-gap': clamp(18, 48 - extra * 6,   48) + 'px',
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
      <div class="t-parts" :style="density">
        <div class="t-org" v-for="(g,i) in groups" :key="i" :style="{ '--org': colorOf(g.accent) }">
          <div class="t-org-head">
            <span class="t-org-name">{{ g.org }}</span>
            <span class="t-org-tag" v-if="g.tag">{{ g.tag }}</span>
          </div>
          <div class="t-people">
            <div class="t-part" v-for="(p,j) in g.people" :key="j">
              <div class="t-part-nm">{{ p.name }}</div>
              <div class="t-part-rl">{{ p.role }}</div>
            </div>
          </div>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
