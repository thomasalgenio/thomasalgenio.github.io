# Portfolio (from scratch, no framework)

A personal portfolio with the same feature set as a typical React portfolio —
hero, experience, skills, projects, contact — but built with plain Jekyll
(HTML + Liquid), vanilla CSS, and vanilla JS. No build tooling beyond Jekyll
itself, so it's easy to read top to bottom and make your own.

## Features

- Hero / Experience / Skills / Projects / Contact sections
- Scroll-reveal animations via [AOS](https://michalsnik.github.io/aos/) (vanilla JS, same library the React version could use)
- Dark / light mode toggle, remembers your choice (`localStorage`)
- EN / PT language switcher, no page reload — powered by `_data/translations.yml`
- Contact form wired for [EmailJS](https://www.emailjs.com/), with a safe "demo mode" fallback until you add your keys
- Skills and projects are data-driven (`_data/skills.yml`, `_data/projects.yml`) — add a project by adding a list item, not by writing HTML

## Running it locally

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.

(If you don't have Ruby/Jekyll set up yet: `gem install bundler jekyll`, or follow
https://jekyllrb.com/docs/installation/.)

## What to edit, and where

| What you want to change         | File                          |
|----------------------------------|-------------------------------|
| Your name, role, email, socials | `_config.yml`                 |
| Skills list                     | `_data/skills.yml`            |
| Projects list + thumbnails      | `_data/projects.yml`, `images/projects/` |
| Any text on the page (EN + PT)  | `_data/translations.yml`      |
| Bio paragraph                   | `_data/translations.yml` → `experience_body` |
| Colors / fonts                  | `assets/css/style.css` → the `:root` block at the top |
| Page structure                  | `index.html`, `contact.html`  |
| Header/footer markup            | `_includes/nav.html`, `_includes/footer.html` |
| Theme/lang/AOS/contact-form logic | `assets/js/main.js`, `assets/js/i18n.js` |

## Turning on the contact form

The form works out of the box in "demo mode" — it validates input and shows a
message, but doesn't actually send anything, so nothing breaks before you set
this up.

1. Create a free account at https://www.emailjs.com
2. Add an email service (e.g. connect your Gmail) and an email template
3. Open `assets/js/main.js` and fill in the three values at the top:

```js
var EMAILJS_CONFIG = {
  serviceId: "service_xxxxxxx",
  templateId: "template_xxxxxxx",
  publicKey: "xxxxxxxxxxxxxxxx"
};
```

That's it — no other code changes needed.

## Adding a language

Add a new top-level key to `_data/translations.yml` (copy the `en:` block and
translate the values), then add a matching button in `_includes/nav.html`:

```html
<button type="button" class="lang-btn" data-lang="es">ES</button>
```

The JS in `assets/js/i18n.js` picks it up automatically.

## Deploying

Push to a GitHub repo and turn on GitHub Pages (Settings → Pages → deploy from
branch), same as your previous portfolio. No separate build step required.
