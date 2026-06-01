<script setup>
// participants.vue — header band + organisations side by side, each with its
// people (name + role). Photo-free: built for kickoff "introduction of
// participants" where parties matter more than faces.
// Frontmatter:
//   title, eyebrow, locator, foot
//   groups: [ { org, accent, tag?, people: [ { name, role } ] } ]
//     accent: a deck-palette key (defined in the markdown headmatter `palette:`)
//             or any CSS colour ('#0B7285', 'teal', 'var(--t-accent)', ...).
import { useSlideContext } from '@slidev/client'
const { $frontmatter, $slidev } = useSlideContext()
const groups = $frontmatter.groups || []
// accent resolution order:
//   1. deck palette  — keys defined in the markdown headmatter `palette:`
//   2. raw value     — any CSS colour passed inline ('#0B7285', 'teal', 'var(--t-prime)')
//   3. fallback ink
const PALETTE = $slidev?.configs?.palette || {}
// accent resolution: deck palette key → raw CSS colour → ink fallback.
const colorOf = (a) => PALETTE[a] || a || 'var(--t-ink)'
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
      <div class="t-parts">
        <div class="t-org" v-for="(g,i) in groups" :key="i" :style="{ '--org': colorOf(g.accent) }">
          <div class="t-org-head">
            <span class="t-org-name">{{ g.org }}</span>
            <span class="t-org-tag" v-if="g.tag">{{ g.tag }}</span>
          </div>
          <div class="t-part" v-for="(p,j) in g.people" :key="j">
            <div class="t-part-nm">{{ p.name }}</div>
            <div class="t-part-rl">{{ p.role }}</div>
          </div>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
