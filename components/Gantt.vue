<!--
  Gantt.vue — data-driven schedule chart for the Termina theme.
  Usage in a slide:
     <Gantt :data="schedule" />
  where `schedule` is imported from a .ts file next to slides.md.
  Every position is computed from month numbers — nothing is hand-placed.
-->
<script setup>
const props = defineProps({ data: { type: Object, required: true } })
const M = props.data.months
const pct = (m) => (m / M * 100)
const align = (m) => (m === 0 ? 'start' : (m === M ? 'end' : 'mid'))
const cols = 'repeat(' + M + ',1fr)'
// Partners are data-driven: data.partners = [ { id, label, color } ].
// A row references a partner by `partner` (the id); colour & legend come from here.
const partners = props.data.partners || []
const pColor = (id) => (partners.find((p) => p.id === id) || {}).color || 'var(--t-accent)'
</script>

<template>
  <div class="g2" :style="{ '--months': M }">
    <!-- month axis -->
    <div class="g2-months">
      <div></div>
      <div class="mh" :style="{ gridTemplateColumns: cols }">
        <span v-for="i in M" :key="i">M{{ i }}</span>
      </div>
    </div>
    <div class="g2-months"><div></div><div class="axis"></div></div>

    <!-- work packages -> sub-rows -->
    <div class="g2-body">
      <div class="g2-grp" :class="{ first: gi === 0 }" v-for="(grp, gi) in data.groups" :key="grp.code">
        <div class="g2-gtitle">
          <span class="c">{{ grp.code }}</span>
          <span class="n">{{ grp.name }}</span>
          <span class="mo">{{ grp.span }}</span>
        </div>
        <div class="g2-row" v-for="r in grp.rows" :key="r.sub">
          <div class="g2-lab">
            <span class="sc" :style="{ color: pColor(r.partner) }">{{ r.sub }} · {{ r.partner }}</span>
            <span class="sn">{{ r.name }}</span>
          </div>
          <div class="g2-track" :style="{ gridTemplateColumns: cols }">
            <div class="g2-bar"
                 :style="{ gridColumn: r.start + '/' + (r.end + 1), color: pColor(r.partner) }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- milestones -->
    <div class="g2-mile">
      <div class="dl">Milestones</div>
      <div class="g2-miletrack">
        <div class="g2-msk" :class="align(m.month)" :style="{ left: pct(m.month) + '%' }"
             v-for="m in data.milestones" :key="m.label">
          <span class="d"></span><span class="t">{{ m.label }}</span>
        </div>
      </div>
    </div>

    <!-- deliverables -->
    <div class="g2-del">
      <div class="dl">Deliverables</div>
      <div class="g2-deltrack">
        <div class="g2-mk" :class="align(d.month)" :style="{ left: pct(d.month) + '%' }"
             v-for="d in data.deliverables" :key="d.label">
          <span class="d"></span><span class="t">{{ d.label }}</span>
        </div>
      </div>
    </div>

    <!-- legend -->
    <div class="g2-leg">
      <span v-for="p in partners" :key="p.id"><i :style="{ background: p.color }"></i>{{ p.label }}</span>
      <span><i style="background: var(--t-sky); border: 2px solid var(--t-accent); width: 14px; height: 14px; border-radius: 50%"></i>Milestone</span>
      <span><i style="background: var(--t-amber); transform: rotate(45deg); width: 13px; height: 13px; border-radius: 2px"></i>Deliverable</span>
    </div>
  </div>
</template>
