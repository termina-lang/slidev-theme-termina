<script setup>
// metrics.vue — dark slide with up to 3 hero metrics.
// Frontmatter: title, eyebrow, metrics: [ { value, unit, label } ]
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const items = $frontmatter.metrics || []
</script>
<template>
  <div class="slidev-layout t-dark">
    <div class="t-frame">
      <div class="t-kicker">{{ $frontmatter.eyebrow || 'Expected outcomes' }}</div>
      <h1 class="t-title" style="color:#fff;margin-top:20px">{{ $frontmatter.title }}</h1>
      <div class="t-metrics">
        <div class="t-metric" v-for="(m,i) in items" :key="i">
          <div class="big">{{ m.value }}<small v-if="m.unit"> {{ m.unit }}</small></div>
          <div class="lab">{{ m.label }}</div>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
