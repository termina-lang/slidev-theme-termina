<!--
  WBS.vue — data-driven work-breakdown structure for the Termina theme.
  Usage:  <WBS :data="wbs" />
  `wbs` = { root: '…', groups: [ { code, name, span, subs: [ { code, name, partner, who } ] } ] }
  The column grid auto-sizes to the number of work packages.
-->
<script setup>
import { computed } from 'vue'
const props = defineProps({ data: { type: Object, required: true } })
const cols = 'repeat(' + props.data.groups.length + ',1fr)'
// Partner colour is data-driven: data.partners = [ { id, color } ]; subs ref by `partner`.
const partners = props.data.partners || []
const pColor = (id) => (partners.find((p) => p.id === id) || {}).color || 'var(--t-accent)'

// Box and type sizes auto-scale: comfortable for up to 4 work packages, then
// shrink a notch per extra column so more packages still fit.
const clamp = (lo, v, hi) => Math.min(hi, Math.max(lo, v))
const density = computed(() => {
  const extra = Math.max(0, props.data.groups.length - 4)
  return {
    '--root-fs':  clamp(22, 29 - extra * 2,   29) + 'px',
    '--root-pad': clamp(12, 17 - extra * 1.5, 17) + 'px ' + clamp(26, 40 - extra * 4, 40) + 'px',
    '--wbs-gap':  clamp(16, 30 - extra * 4,   30) + 'px',
    '--wp-pad':   clamp(13, 19 - extra * 2,   19) + 'px',
    '--sub-pad':  clamp(12, 18 - extra * 2,   18) + 'px',
    '--wp-code':  clamp(15, 19 - extra * 1,   19) + 'px',
    '--wp-nm':    clamp(18, 25 - extra * 2,   25) + 'px',
    '--wp-mo':    clamp(13, 16 - extra * 1,   16) + 'px',
    '--sub-code': clamp(13, 17 - extra * 1,   17) + 'px',
    '--sub-nm':   clamp(16, 21 - extra * 1.5, 21) + 'px',
    '--sub-who':  clamp(12.5, 15 - extra * 1, 15) + 'px',
  }
})
</script>

<template>
  <div class="wbs" :style="density">
    <div class="wbs-root">{{ data.root }}</div>
    <div class="wbs-spine"></div>
    <div class="wbs-bar"></div>
    <div class="wbs-cols" :style="{ gridTemplateColumns: cols }">
      <div class="wpcol" v-for="grp in data.groups" :key="grp.code">
        <div class="wphdr">
          <div class="code">{{ grp.code }}</div>
          <div class="nm">{{ grp.name }}</div>
          <div class="mo">{{ grp.span }}</div>
        </div>
        <div class="subwp" v-for="s in grp.subs" :key="s.code" :style="{ borderLeftColor: pColor(s.partner) }">
          <div class="scode" :style="{ color: pColor(s.partner) }">{{ s.code }}</div>
          <div class="snm">{{ s.name }}</div>
          <div class="who"><span>{{ s.partner }}</span><b>{{ s.who }}</b></div>
        </div>
      </div>
    </div>
  </div>
</template>
