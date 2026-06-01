<script setup>
// content-code.vue — header band + supporting bullets (left) + code panel (right).
// Mirror of content-figure, but the right column is a code block instead of a card.
// Frontmatter: title, eyebrow, locator, filename, foot
// Body: bullets, then `::code::`, then a fenced code block (Slidev/Shiki highlights it).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter, $slidev } = useSlideContext()
const codeTheme = computed(() => $frontmatter.codeTheme || $slidev?.configs?.codeTheme || 'dark')
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
      <div class="t-codezone">
        <div class="t-stack t-mdstack"><slot /></div>
        <div class="t-codepanel" :class="[{ 'no-head': !$frontmatter.filename }, 'code-' + codeTheme]">
          <div class="t-codehead" v-if="$frontmatter.filename">
            <span class="dot" style="background:#E0726A"></span>
            <span class="dot" style="background:#E8923A"></span>
            <span class="dot" style="background:#67C088"></span>
            <span class="fname">{{ $frontmatter.filename }}</span>
            <span class="ext">{{ $frontmatter.lang || 'termina' }}</span>
          </div>
          <span class="t-codebadge" v-else>{{ $frontmatter.lang || 'termina' }}</span>
          <slot name="code" />
        </div>
      </div>
      <SlideFoot />
    </div>
  </div>
</template>
<style scoped>
.t-codezone { display: grid; grid-template-columns: 0.82fr 1.18fr; gap: 64px; flex: 1; align-items: center; }
.t-codezone .t-codepanel { margin-top: 0; }
.t-mdstack :deep(ul) { display: flex; flex-direction: column; gap: 32px; list-style: none; padding: 0; }
.t-mdstack :deep(li) { position: relative; padding-left: 42px; font-size: 26px; line-height: 1.46; color: var(--t-muted); max-width: 30ch; }
.t-mdstack :deep(li)::before { content: ""; position: absolute; left: 0; top: 9px; width: 16px; height: 16px; border-radius: 4px; background: var(--t-accent); }
.t-mdstack :deep(li strong) { display: block; color: var(--t-ink); font-weight: 600; font-size: 29px; line-height: 1.2; margin-bottom: 6px; }
</style>
