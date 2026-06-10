# slidev-theme-termina

Brand theme for **[Slidev](https://sli.dev)** — the visual system for Termina presentations
(navy + sky, data-driven Gantt/WBS, branded code panels).

> The npm package is named `slidev-theme-termina` (Slidev requires the
> `slidev-theme-` prefix so that `theme: termina` resolves). Repo and package
> share the name.

---

## Quick start

```bash
npm install
npm run dev          # opens the example deck (example.md) — a tour of every layout
npm run build        # static build    ·   npm run export   # PDF
```

> `npm run export` uses Playwright; the first run downloads a Chromium build.

To start your **own** deck, copy `example.md` + `schedule.ts` next to each other and
edit them (in this repo, or in a consuming repo that depends on the theme):

```bash
cp example.md my-talk.md
npx slidev my-talk.md --open
```

Per-deck assets (cover image, partner/sponsor logos) go in that deck's own
`public/` folder — the theme does not ship project art. The favicon is
brand-intrinsic and provided by the theme (see Assets), not a per-deck asset.

---

## What's inside

```
layouts/            one .vue per slide layout
components/         Gantt.vue · WBS.vue (data diagrams) · SlideFoot.vue (footer)
styles/            vars (tokens) · base · layouts · components · code · diagrams
syntaxes/          termina grammar + dark & light Shiki themes
setup/shiki.ts     registers the `termina` language + dual code themes
global-top.vue     injects the deck `palette:` as CSS tokens on :root + the brand favicon
global-bottom.vue  fills the auto slide-number in every footer
assets/            brand art bundled into every deck (wordmark, favicon, dark bg)
scripts/           trim-logo.mjs (crop transparent margins off a logo)
example.md         the example deck (also the live documentation)
schedule.ts        sample Gantt + WBS data for the example
```

---

## Deck-wide knobs (headmatter)

Set these in the **first** frontmatter block of your `slides.md`:

| key | what |
|---|---|
| `theme: termina` | use this theme (required) |
| `canvasWidth: 1920`, `aspectRatio: 16/9` | the design canvas (px map 1:1) |
| `lineNumbers: true` | line numbers in code blocks |
| `palette: { key: '#hex', … }` | deck-owned colours; each `key` overrides the theme token `--t-key` **everywhere** (Gantt/WBS/participants/legend). E.g. `prime`/`subco` recolour the work plan |
| `footLeft` / `footRight` | footer text, left / right, on every content slide (empty by default; per-slide `foot:` overrides the right) |
| `codeTheme: dark` \| `light` | code panel theme for the whole deck (overridable per slide) |

(The browser-tab favicon is the brand mark, provided by the theme — not a deck setting.)

---

## Layouts

Every content layout has an optional header: `eyebrow` (mono kicker), `locator`
(right-aligned tag) and `title`. Both `eyebrow` and `locator` are optional — if
neither is set the title moves up.

| layout | use | key frontmatter / body |
|---|---|---|
| `cover` | title slide | `title`, `lead`, `eyebrow`, `coverImage`, `coverImageWidth`, `logos[]{src,h}` |
| `agenda` | agenda list | `title`, `items[]{title,meta}` (rows auto-scale past 5) |
| `section` | chapter divider | `number`, `lead`; body = big title |
| `content` | full-width bullet list | body = Markdown bullets (brand markers, nested ok) |
| `content-grid` | 2-column bullet grid | body = Markdown bullets (rows grow with count) |
| `content-stat` | hero number + bullets | `stat`, `statUnit`, `statCaption`; body = bullets |
| `content-figure` | bullets + figure card | `figImage`, `figTag`, `figLabel`; body = bullets |
| `code` | code panel | `filename`, `lang`, `codeTheme`; body = fenced block; optional `::note::` caption |
| `content-code` | bullets + code | body = bullets, then `::code::`, then a fenced block |
| `table` | styled table | `highlight: <n>` (accent the n-th column); body = Markdown table; optional `::note::` |
| `gantt` | schedule | body = `<Gantt :data="schedule" />` |
| `wbs` | work breakdown | body = `<WBS :data="wbs" />` (boxes + root auto-scale) |
| `timeline` | milestone line | `items[]{date,label,note}` (first node highlighted) |
| `steps` | numbered next-steps | `items[]{title,text,n?}` (auto `01,02,…`) |
| `metrics` | up to 3 hero figures | `metrics[]{value,unit,label}` (short values only — use `timeline` for dates) |
| `quote` | big statement | body = text, `*word*` → accent |
| `team` | people grid (photos) | `people[]{name,role,photo}` |
| `participants` | people by organisation | `groups[]{org,accent,tag?,people[]{name,role}}` |
| `closing` | thank-you | `title`, `lead`, `contact`, `contactLabel` |
| `default` | free Markdown | `title`; body = anything (plain bullets) |

### Notes on the less obvious ones

- **Two content regions** use Slidev named slots: write the main body, then a
  `::slot::` separator, then the second region.
  - `content-code`: body = bullets, `::code::`, fenced block.
  - `code` / `table`: body, then `::note::`, then a caption that renders **below** the panel/table.
- **`table` highlight**: `highlight: 4` accents the 4th column (1-based). Cell
  markers `<span class="t-yes/t-no/t-partial">✓/✗/~</span>` are available.
- **`code` panel**: with `filename:` you get the title bar (dots + name + lang
  badge); without it, a single `lang:` badge (default `termina`) floats over the
  code. `codeTheme: light` switches to a light panel.
- **`participants` / `timeline` / `steps` accent**: a colour is a `palette` key,
  a token like `var(--t-prime)`, or any raw CSS colour.
- **`closing` contact**: `contact` is the email/handle line; optional
  `contactLabel` adds a small kicker above it (e.g. `Project contact`). The
  contact block tightens up to the title when there is no `lead`.

---

## Data-driven diagrams (`schedule.ts`)

`<Gantt>` and `<WBS>` are deterministic — you only edit data. Import it in a
`<script setup>` **on the slide** that uses the component (see `example.md`).

```ts
const partners = [                                   // colour + legend source
  { id: 'HEL',  label: 'Helios Lab (prime)', color: 'var(--t-prime)' },
  { id: 'VEGA', label: 'Vega Systems',       color: 'var(--t-subco)' },
  { id: 'ORI',  label: 'Orion Cloud',        color: '#9C5BB8' },   // any CSS colour
]
export const schedule = {
  months: 9,
  partners,
  groups: [ { code:'WP1', name:'…', span:'M1–M2', rows:[
    { sub:'WP1.1', partner:'HEL', name:'…', start:1, end:2 },   // bar = start..end
  ]}],
  milestones:  [ { label:'Kick-off', month:0 }, … ],            // month = boundary
  deliverables:[ { label:'D1', month:2 }, … ],                  // month = end-of-month
}
export const wbs = { root:'…', partners, groups:[ { code:'WP1', name:'…', span:'…',
  subs:[ { code:'WP1.1', partner:'HEL', name:'…', who:'A. Researcher' } ] } ] }
```

Rows/subs reference a partner by `id`; the bar colour, the `.sc` label colour,
the WBS border and the legend all come from `partners[].color` — any number of
partners (any CSS colour). No partner names are hardcoded in the components.
The full version of this lives in `schedule.ts` (a 9-month, 3-partner sample).

---

## Brand & tokens (`styles/vars.css`)

Navy surfaces, **sky** brand accent, **amber** signal. Fonts: Space Grotesk
(display), IBM Plex Sans (body), JetBrains Mono (code/wordmark).

- `--t-accent` — generic UI accent (kickers, bullets, hero numbers, agenda
  numbers, figtags, chrome). The deck `palette` does **not** touch it, so
  recolouring a partner never bleeds into the chrome.
- `--t-prime` / `--t-subco` — default work-plan partner colours. A deck supplies
  real ones in `schedule.ts` (`color: 'var(--t-prime)'`) and/or overrides them
  via `palette: { prime, subco }`.

### Code highlighting (dual theme)

Real Termina highlighting via Shiki (TextMate grammar `source.fin`).
`setup/shiki.ts` registers **both** `syntaxes/termina-theme.json` (dark) and
`termina-theme-light.json` (light); `codeTheme` picks per deck/slide. Fences use
` ```termina ` (also `c`, `bash`, `yaml`, `json`).

---

## Assets: theme-intrinsic vs per-deck

- **Theme-intrinsic** (the brand wordmark `assets/logo_termina.png` and the
  favicon `assets/favicon.png`): bundled by Vite — every deck gets them for free.
  The wordmark is imported in `cover.vue` / `closing.vue`; the favicon is injected
  into `<head>` by `global-top.vue` (so it is the brand mark in every deck, not a
  per-deck setting).
- **Per-deck** (cover image, partner/sponsor logos): live in the **deck's**
  `public/`, referenced by absolute path (`coverImage:`, `logos:`).

Trim transparent margins off a logo before using it:

```bash
npm i -D sharp
node scripts/trim-logo.mjs sponsor-original.png public/sponsor_white.png
```

### Dark slides & PDF export

The dark layouts (`cover` / `section` / `closing` / `metrics` / `quote`) draw a
starfield with CSS gradients on screen. Those export to PDF as transparency
soft-masks that Acrobat & Preview tear, so on the export render (`html.print`)
the theme swaps the gradients for one **opaque** baked raster,
`assets/dark-bg.png`. Text stays vector and selectable on top. Override per deck
with `--t-dark-raster` on `.slidev-layout.t-dark`. Regenerate the PNG (after
editing the starfield, or at a higher resolution) straight from the same CSS
gradients:

```bash
npm i -D playwright-chromium
node scripts/bake-bg.mjs --scale 2     # -> assets/dark-bg.png (3840×2160)
```

---

## Adding a new layout

1. Drop a `.vue` into `layouts/`, reusing `.t-frame` / `.t-chead` / `SlideFoot`
   and the tokens from `vars.css`.
2. Data-heavy layouts: take a `:data` object (like `Gantt`/`WBS`) or read
   frontmatter via `useSlideContext()`.
3. Decks pick it up via `layout: your-name`.

> Iterating the theme from a consuming deck: the theme is a (symlinked) dependency
> and Vite does not hot-reload deps — after editing the theme, restart the dev
> server and `rm -rf node_modules/.vite`.
