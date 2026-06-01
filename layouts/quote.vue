<script setup>
// quote.vue — dark slide with a big statement.
// Put the quote in the slide body. Wrap an emphasis word in *italics*
// to tint it sky (markdown em -> accent).
</script>
<template>
  <div class="slidev-layout t-dark">
    <div class="t-frame" style="justify-content:center">
      <div class="t-quote t-mdquote"><slot /></div>
    </div>
  </div>
</template>
<style scoped>
.t-mdquote :deep(em) { font-style: normal; color: var(--t-sky); }
.t-mdquote :deep(p) { margin: 0; }
</style>
