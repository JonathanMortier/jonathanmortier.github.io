# jonathanmortier.github.io

Site personnel de Jonathan Mortier — [jonathanmortier.github.io](https://jonathanmortier.github.io/).

Basé sur le thème [Dark Minimal](https://github.com/Gothsec/dark-minimal) (Astro + Tailwind CSS, licence MIT, voir [`LICENSE-darkminimal`](LICENSE-darkminimal)), largement adapté : contenu, palette, mode clair/sombre, blog, SEO.

## Développement

Node 24 requis (voir [`.nvmrc`](.nvmrc)). Avec [nvm](https://github.com/nvm-sh/nvm) :

```bash
nvm use
```

Puis :

```bash
npm install
npm run dev      # http://localhost:4321
```

| Commande | Effet |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production dans `dist/` |
| `npm run preview` | Sert le contenu de `dist/` en local |

## Structure

```
src/
  components/    Sections de la page d'accueil (home, projects, blog, contact, nav, footer, logoWall)
  layouts/       Layout.astro (balises SEO, JSON-LD) et BlogLayout.astro
  pages/         Routes : accueil, /blog/, /blog/[slug]/, /rss.xml
  content/blog/  Articles de blog (Markdown, collection Astro)
  React/         Composants interactifs (SkillsList)
public/
  cv/            CV en PDF
  projects/      Images de couverture des projets
  svg/           Icônes des technologies
```

## Contenu

- **Blog :** un article = un fichier `.md` dans `src/content/blog/`, avec le frontmatter `title`, `description`, `date`, `tags` (schéma défini dans `src/content.config.ts`). La page `/blog/` et le flux `/rss.xml` se mettent à jour automatiquement.
- **Projets :** liste dans `src/components/projects.astro`.
- **Compétences :** dans `src/React/SkillsList.tsx`.

## SEO

- Balises par page (titre, description, canonical, Open Graph, Twitter Card), JSON-LD (`Person` / `BlogPosting`) : `src/layouts/Layout.astro`.
- Sitemap généré par `@astrojs/sitemap`, déclaré dans `public/robots.txt`.
- Flux RSS du blog : `src/pages/rss.xml.js`.
- Le fichier `public/google*.html` est la vérification de propriété Google Search Console : ne pas le supprimer.

## Déploiement

GitHub Actions (`.github/workflows/deploy.yml`) build et déploie sur GitHub Pages à chaque push sur `main` (Settings → Pages → Source : GitHub Actions).

`master` contient l'historique de l'ancien site (Jekyll), non déployé.
