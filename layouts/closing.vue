<script setup>
// closing.vue — dark thank-you slide.
// Frontmatter: title (default "Thank you."), lead, contact, logos
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'
import logoTermina from '../assets/logo_termina.png'
const { $frontmatter } = useSlideContext()
// Logos are per-deck assets (deck's public/); none by default.
const logos = computed(() => $frontmatter.logos || [])
</script>
<template>
  <div class="slidev-layout t-dark">
    <div class="t-frame">
      <div class="t-wm"><img :src="logoTermina" alt="Termina"><span class="t">​<b>T</b>ermina</span></div>
      <div class="grow" style="flex:1;display:flex;flex-direction:column;justify-content:center">
        <h1 class="t-title" style="color:#fff;font-size:96px">{{ $frontmatter.title || 'Thank you.' }}</h1>
        <p class="lead" v-if="$frontmatter.lead" style="margin-top:24px;max-width:40ch;font-size:30px;color:#A9C0D6">{{ $frontmatter.lead }}</p>
        <div v-if="$frontmatter.contact" :style="{ marginTop: ($frontmatter.lead ? 28 : 52) + 'px' }">
          <div v-if="$frontmatter.contactLabel" class="termina-mono" style="font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--t-sky);opacity:.6;margin-bottom:8px">{{ $frontmatter.contactLabel }}</div>
          <div class="termina-mono" style="font-size:22px;color:var(--t-sky)">{{ $frontmatter.contact }}</div>
        </div>
      </div>
      <div class="t-logos" style="justify-content:flex-end">
        <img v-for="(l,i) in logos" :key="i" :src="l.src" :style="{ height:(l.h||56)+'px' }" alt="">
      </div>
    </div>
  </div>
</template>
