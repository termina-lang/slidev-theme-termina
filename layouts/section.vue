<script setup>
// section.vue — chapter divider. Frontmatter: number, title, lead
// Body (slot) is used as the big section title if `title` not given.
</script>
<template>
  <div class="slidev-layout t-dark t-section">
    <div class="t-frame" style="justify-content:center">
      <div class="sec-num">{{ $frontmatter.number || '01' }}</div>
      <div class="sec-title"><slot /></div>
      <p class="lead" v-if="$frontmatter.lead">{{ $frontmatter.lead }}</p>
    </div>
  </div>
</template>
