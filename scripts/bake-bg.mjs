#!/usr/bin/env node
/*
  bake-bg.mjs — render the dark-slide starfield into one opaque PNG.

  The dark layouts (.slidev-layout.t-dark) draw a 200-star starfield with CSS
  radial-gradients. That looks best on screen, but Chromium exports every
  gradient fading to transparent as a soft-mask / transparency group, which
  Acrobat & Preview (CoreGraphics) render as torn white streaks. So layouts.css
  swaps the gradients for assets/dark-bg.png under `html.print` (export only).

  This script (re)bakes that PNG straight from the SAME `.t-dark` background in
  styles/layouts.css, so the raster can never drift from the on-screen stars.
  Run it whenever you edit the starfield, or to change the resolution/size.

  Usage:
    node scripts/bake-bg.mjs               # 2x (default) -> assets/dark-bg.png
    node scripts/bake-bg.mjs --scale 3     # crisper for big zoom/print
    node scripts/bake-bg.mjs --out assets/dark-bg.png --scale 2

  Requires: npm i -D playwright-chromium
*/
import { chromium } from 'playwright-chromium'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const getArg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d }
const scale = parseFloat(getArg('--scale', '2')) || 2
const out = resolve(root, getArg('--out', 'assets/dark-bg.png'))
const W = 1920, H = 1080   // the theme canvas; the PNG is W*scale x H*scale

// Pull the screen `.slidev-layout.t-dark` background (the gradient starfield)
// straight from the CSS. The ^ anchor avoids matching `html.print .t-dark`.
const css = readFileSync(resolve(root, 'styles/layouts.css'), 'utf8')
const block = css.match(/^\.slidev-layout\.t-dark\s*\{([\s\S]*?)\}/m)
if (!block) throw new Error('Could not find the .slidev-layout.t-dark rule in styles/layouts.css')
const bg = block[1].match(/background:\s*([\s\S]*?);/)
if (!bg) throw new Error('Could not find a `background:` declaration inside .t-dark')
const background = bg[1].trim()

// Opaque page: the base linear-gradient is opaque, and the body fallback below
// guarantees zero transparency in the result (RGB, no alpha -> no soft masks).
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  html,body{ margin:0; padding:0; background:#06182F }
  .bg{ width:${W}px; height:${H}px; background:${background}; background-repeat:no-repeat }
</style></head><body><div class="bg"></div></body></html>`

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale })
await page.setContent(html, { waitUntil: 'load' })
await page.locator('.bg').screenshot({ path: out })   // exact W x H at deviceScaleFactor
await browser.close()
console.log(`Baked starfield → ${out}  (${W * scale}×${H * scale}, ${scale}x)`)
