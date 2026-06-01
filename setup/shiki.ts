import { defineShikiSetup } from '@slidev/types'
import terminaGrammar from '../syntaxes/termina.tmLanguage.json'
import terminaTheme from '../syntaxes/termina-theme.json'
import terminaThemeLight from '../syntaxes/termina-theme-light.json'

// Register Termina as a first-class Shiki language, reusing the TextMate grammar
// shared with the VS Code extension (termina-vscode/syntaxes/Termina.tmGrammar.json,
// scope `source.fin`). Code fences ```termina then get real, automatic highlighting,
// instead of approximating with the `rust` grammar. Pygments lexers (termina-lexer)
// cannot be used here: Slidev highlights with Shiki, which consumes TextMate grammars.
export default defineShikiSetup(() => ({
  // Dual theme: tokens carry both --shiki-light and --shiki-dark colours.
  // The deck runs in light scheme, so by default tokens use the light colours;
  // the `code-dark` panel class overrides them to the dark colours (see code.css).
  themes: { light: terminaThemeLight as any, dark: terminaTheme as any },
  langs: [
    'c',
    'bash',
    'yaml',
    'json',
    {
      ...(terminaGrammar as any),
      name: 'termina',
      scopeName: 'source.fin',
      aliases: ['fin'],
    },
  ],
}))
