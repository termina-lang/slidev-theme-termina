<script setup>
// team.vue — header band + a grid of people.
// Frontmatter: title, eyebrow, people: [ { name, role, photo? } ]
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const people = $frontmatter.people || []
</script>
<template>
  <div class="slidev-layout t-content">
    <div class="t-frame">
      <div class="t-kicker">{{ $frontmatter.eyebrow || 'Team & partners' }}</div>
      <h1 class="t-title" style="margin-top:20px">{{ $frontmatter.title }}</h1>
      <div class="t-team">
        <div class="t-person" v-for="(p,i) in people" :key="i">
          <div class="ph" :style="p.photo ? { backgroundImage:`url(${p.photo})`, backgroundSize:'cover', backgroundPosition:'center' } : {}"></div>
          <div class="nm">{{ p.name }}</div>
          <div class="rl">{{ p.role }}</div>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
