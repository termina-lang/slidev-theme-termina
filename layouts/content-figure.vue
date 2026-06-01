<script setup>
// content-figure.vue — header band + supporting bullets (left) + figure card (right)
// Frontmatter: title, eyebrow, locator, figImage, figTag, figLabel, foot
import { useSlideContext } from '@slidev/client'
const { $frontmatter } = useSlideContext()
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
      <div class="t-figzone">
        <div class="t-stack t-mdstack"><slot /></div>
        <div class="t-figcard">
          <div class="t-figtag" v-if="$frontmatter.figTag">{{ $frontmatter.figTag }}</div>
          <img v-if="$frontmatter.figImage" :src="$frontmatter.figImage" alt=""
               style="position:relative;max-width:88%;max-height:84%;object-fit:contain">
          <template v-else>
            <svg width="92" height="92" viewBox="0 0 24 24" fill="none" stroke="#B7C4D3" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" style="position:relative">
              <rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="10" r="1.9"/><path d="M3 16l5-4 4 3 3.5-2.5L21 17"/>
            </svg>
            <div style="position:relative;font-family:var(--t-font-mono);font-size:22px;letter-spacing:.1em;color:#7E8FA0;text-transform:uppercase">{{ $frontmatter.figLabel || 'Figure / diagram' }}</div>
          </template>
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-mdstack :deep(ul) { display: flex; flex-direction: column; gap: 32px; list-style: none; padding: 0; }
.t-mdstack :deep(li) { position: relative; padding-left: 42px; font-size: 26px; line-height: 1.46; color: var(--t-muted); max-width: 30ch; }
.t-mdstack :deep(li)::before { content: ""; position: absolute; left: 0; top: 9px; width: 16px; height: 16px; border-radius: 4px; background: var(--t-accent); }
.t-mdstack :deep(li strong) { display: block; color: var(--t-ink); font-weight: 600; font-size: 29px; line-height: 1.2; margin-bottom: 6px; }
</style>
