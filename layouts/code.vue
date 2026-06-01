<script setup>
// code.vue — header band + a Termina code panel.
// Frontmatter: title, eyebrow, locator, filename, lang, codeTheme, foot
// Body: a fenced code block — Slidev/Shiki highlights it.
// Optional caption below the panel via a `::note::` slot (like the table layout).
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
const { $frontmatter, $slidev } = useSlideContext()
// dark by default; overridable per-deck (headmatter codeTheme) or per-slide.
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
      <div class="t-codepanel" :class="[{ 'no-head': !$frontmatter.filename }, 'code-' + codeTheme]">
        <div class="t-codehead" v-if="$frontmatter.filename">
          <span class="dot" style="background:#E0726A"></span>
          <span class="dot" style="background:#E8923A"></span>
          <span class="dot" style="background:#67C088"></span>
          <span class="fname">{{ $frontmatter.filename }}</span>
          <span class="ext">{{ $frontmatter.lang || 'termina' }}</span>
        </div>
        <span class="t-codebadge" v-else>{{ $frontmatter.lang || 'termina' }}</span>
        <slot />
      </div>
      <div class="t-codenote" v-if="$slots.note"><slot name="note" /></div>
      <SlideFoot />
    </div>
  </div>
</template>
