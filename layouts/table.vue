<script setup>
// table.vue — header band + a Markdown table, styled to the theme.
// Frontmatter: title, eyebrow, locator, foot, highlight
//   highlight: <n>  -> highlight the n-th column (1-based), e.g. highlight: 4
// Body: a plain Markdown table. Cells may contain HTML (✓/✗ spans, <code>, …).
// Optional caption below the table via a `::note::` slot (same as the code layout).
import { ref, onMounted, watch, nextTick } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
const root = ref(null)

function applyHighlight() {
  const el = root.value
  if (!el) return
  el.querySelectorAll('.col-hl').forEach((c) => c.classList.remove('col-hl'))
  const n = Number($frontmatter.highlight)
  if (!n) return
  el.querySelectorAll('table tr').forEach((tr) => {
    const cell = tr.children[n - 1]
    if (cell) cell.classList.add('col-hl')
  })
}
onMounted(() => nextTick(applyHighlight))
watch(() => $frontmatter.highlight, () => nextTick(applyHighlight))
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
      <div class="t-tblzone">
        <div class="t-mdtbl" ref="root"><slot /></div>
        <div class="t-tblnote" v-if="$slots.note"><slot name="note" /></div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-tblzone { flex: 1; display: flex; flex-direction: column; justify-content: space-evenly; }
.t-mdtbl :deep(table) { width: 100%; border-collapse: collapse; font-size: 26px; }
.t-mdtbl :deep(th), .t-mdtbl :deep(td) { text-align: center; padding: 13px 22px; border-bottom: 1px solid var(--t-hair); }
.t-mdtbl :deep(th:first-child), .t-mdtbl :deep(td:first-child) { text-align: left; }
.t-mdtbl :deep(thead th) { font-family: var(--t-font-mono); font-size: 25px; color: var(--t-muted); font-weight: 600; vertical-align: bottom; padding-bottom: 16px; }
.t-mdtbl :deep(tbody td:first-child), .t-mdtbl :deep(tbody th:first-child) { font-weight: 500; color: var(--t-ink); }
/* highlighted column */
.t-mdtbl :deep(td.col-hl) { background: color-mix(in srgb, var(--t-accent) 9%, transparent); }
.t-mdtbl :deep(thead th.col-hl) { color: #fff; background: var(--t-accent); border-top-left-radius: 10px; border-top-right-radius: 10px; }
/* optional caption below the table (the `::note::` slot) */
.t-tblnote { font-size: 24px; line-height: 1.5; color: var(--t-muted); }
.t-tblnote :deep(p) { margin: 0; }
.t-tblnote :deep(strong) { color: var(--t-ink); font-weight: 600; }
.t-tblnote :deep(code) { font-family: var(--t-font-mono); }
/* native markdown bullet list in the note (brand square markers) */
.t-tblnote :deep(ul) { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
.t-tblnote :deep(li) { position: relative; padding-left: 28px; }
.t-tblnote :deep(li)::before { content: ""; position: absolute; left: 2px; top: .55em; width: 10px; height: 10px; border-radius: 3px; background: var(--t-accent); }
</style>
