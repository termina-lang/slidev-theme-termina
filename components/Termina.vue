<script setup>
// Termina.vue — the brand name in the mono brand face (JetBrains Mono, medium).
// No colour: inherits font-size and colour from the surrounding text, so it
// blends into bullets, headings or prose in any context (light or dark).
//
// Usage in markdown: <Termina/>
</script>

<template>
  <span class="t-wordmark">Termina</span>
</template>

<style scoped>
.t-wordmark { font-family: var(--t-font-mono); font-weight: 500; letter-spacing: .02em; font-size: inherit; color: inherit; }
</style>
