#!/usr/bin/env node
/*
  trim-logo.mjs — crop transparent margins off a PNG logo.

  Partner logos (e.g. the official ESA PNG) often ship with a lot of empty
  transparent padding, which makes them look tiny next to tighter logos.
  Trimming the margins once lets you balance them just with a height value
  in the cover frontmatter.

  Usage:
    node scripts/trim-logo.mjs  input.png  public/esa_white.png
    node scripts/trim-logo.mjs  input.png  public/esa_white.png  --pad 8

  Requires: npm i -D sharp
*/
import sharp from 'sharp'

const [inPath, outPath, ...rest] = process.argv.slice(2)
if (!inPath || !outPath) {
  console.error('Usage: node scripts/trim-logo.mjs <input.png> <output.png> [--pad N]')
  process.exit(1)
}
const padIdx = rest.indexOf('--pad')
const pad = padIdx >= 0 ? parseInt(rest[padIdx + 1], 10) || 0 : 0

let img = sharp(inPath).trim()                 // remove uniform/transparent border
if (pad > 0) {
  img = img.extend({ top: pad, bottom: pad, left: pad, right: pad,
                     background: { r: 0, g: 0, b: 0, alpha: 0 } })
}
await img.png().toFile(outPath)
const meta = await sharp(outPath).metadata()
console.log(`Trimmed → ${outPath}  (${meta.width}×${meta.height}, aspect ${(meta.width / meta.height).toFixed(2)})`)
