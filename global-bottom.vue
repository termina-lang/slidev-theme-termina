<script setup>
// global-bottom.vue — fills every ".pageno" with "NN / TT" automatically,
// so footers show the current slide number without you typing it.
import { onMounted, watch } from 'vue'
import { useNav } from '@slidev/client'

const nav = useNav()
function paint() {
  // run after DOM settles
  requestAnimationFrame(() => {
    const total = String(nav.total.value).padStart(2, '0')
    const cur = String(nav.currentPage.value).padStart(2, '0')
    document.querySelectorAll('.slidev-page .pageno').forEach((el) => {
      el.textContent = cur + ' / ' + total
    })
  })
}
onMounted(paint)
watch(() => nav.currentPage.value, paint)
</script>
<template><div style="display:none"></div></template>
