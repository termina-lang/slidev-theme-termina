<script setup>
// cover.vue — fully customizable title slide.
//
// Frontmatter you can set per presentation:
//   title:        big headline
//   lead:         supporting sentence (optional)
//   eyebrow:      mono kicker (optional)
//   coverImage:   path to the transparent illustration on the right — a per-deck
//                 asset in the deck's public/ (hidden if unset)
//   coverImageWidth: e.g. "90%" — controls its size/proportion (default 90%)
//   logos:        array of { src, h }  — partner/sponsor logos at the bottom.
//                 `h` is the height in px, to balance differently-sized logos.
//                 Per-deck assets (deck's public/); none by default. Trim
//                 transparent margins first (see scripts/trim-logo).
//
// Example:
//   logos:
//     - { src: /sponsor_a_white.png, h: 62 }
//     - { src: /sponsor_b_white.png, h: 50 }
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import logoTermina from '../assets/logo_termina.png'
const { $frontmatter } = useSlideContext()

const img = computed(() => $frontmatter.coverImage || false)
const imgW = computed(() => $frontmatter.coverImageWidth || '90%')
const logos = computed(() => $frontmatter.logos || [])
</script>

<template>
  <div class="slidev-layout t-dark t-cover">
    <div class="cover-art" v-if="img">
      <img class="cover-photo" :src="img" :style="{ width: imgW }" alt="">
    </div>
    <div class="t-frame">
      <div class="t-wm">
        <img :src="logoTermina" alt="Termina">
        <span class="t">​<b>t</b>ermina</span>
      </div>
      <div class="grow">
        <div class="t-kicker" v-if="$frontmatter.eyebrow">{{ $frontmatter.eyebrow }}</div>
        <h1 class="t-title">{{ $frontmatter.title }}</h1>
        <p class="lead" v-if="$frontmatter.lead">{{ $frontmatter.lead }}</p>
      </div>
      <div class="t-logos">
        <img v-for="(l, i) in logos" :key="i" :src="l.src" :style="{ height: (l.h || 56) + 'px' }" alt="">
      </div>
    </div>
  </div>
</template>
