# AGENTS.md

Instructions pour un agent (Claude Code ou autre) qui intervient sur ce dépôt.

## Le projet

Site personnel statique, généré avec [Astro](https://astro.build/) 7 + Tailwind CSS + React (pour les rares composants interactifs), déployé sur GitHub Pages. Thème de départ : [Dark Minimal](https://github.com/Gothsec/dark-minimal), largement réécrit. Voir [`README.md`](README.md) pour la structure et les commandes.

## Environnement

- **Node 24** requis (`.nvmrc`, `engines.node` dans `package.json`). `nvm use` avant toute commande npm si plusieurs versions de Node sont installées.
- Alias TypeScript : `@/*` → `src/*`, `@components/*` → `src/components/*` (voir `tsconfig.json` et `astro.config.mjs`).

## Build et vérification

- `npm run build` compile en `dist/`. Ne pas utiliser `astro check` dans ce script : il bloque en environnement non interactif (déjà retiré de `package.json`).
- Avant de committer un changement visuel ou de contenu, lancer `npm run build` puis vérifier dans un navigateur (`npm run dev` ou `npm run preview`), y compris en mode clair et sombre (bouton dans la nav, `localStorage.theme`).
- Si un serveur `astro dev` tourne déjà sur le port 4321 (lancé lors d'une session précédente), il peut ne pas refléter les derniers changements de contenu (collections Astro). Préférer `npx astro dev stop` puis relancer, plutôt que de supposer qu'il est à jour.
- **Ne pas utiliser `pkill` sans filtre précis** pour arrêter un serveur de dev lancé en arrière-plan : dans cet environnement, `pkill -f "astro dev"` ou similaire peut tuer le shell courant (le process bash lui-même correspond parfois au filtre). Préférer `npx astro dev stop`, ou `kill $(lsof -ti:PORT)` en ciblant le port.

## Contenu

- **Blog :** un article = un fichier Markdown dans `src/content/blog/`, frontmatter `title`, `description`, `date`, `tags` (schéma dans `src/content.config.ts`, validé au build). `description` est obligatoire, sert de méta-description et de résumé RSS.
- **Projets :** tableau dans `src/components/projects.astro`. Chaque entrée a `title`, `image` (chemin local dans `public/projects/`, pas d'URL externe type placehold.co), `alt`, `link`, `preview`, `status`.
- **Textes en français, ton professionnel.** Éviter les tournures orales (« Salut », « Ce que je fais »…) et le franglais dans l'UI (préférer « Réalisé avec » à « Built with »).

## SEO — ne pas régresser

Tout est centralisé dans `src/layouts/Layout.astro` (props `title`, `description`, `type`, `publishedTime`, `tags`) :
- Balise `<title>`, meta description, canonical (calculé depuis `Astro.url.pathname`, ne pas coder d'URL en dur).
- Open Graph / Twitter Card, JSON-LD (`Person` sur les pages normales, `BlogPosting` sur les articles).
- `lang="fr"`, `og:locale=fr_FR`.

En ajoutant une page, penser à passer `title` (et `description` si le texte par défaut ne convient pas) à `Layout` ou `BlogLayout`. Le sitemap (`@astrojs/sitemap`) et le flux RSS (`src/pages/rss.xml.js`) se régénèrent automatiquement depuis la collection `blog` — pas d'entrée à maintenir à la main.

Le fichier `public/google*.html` (vérification Search Console) ne doit jamais être supprimé ni renommé.

## Déploiement

- `main` est la branche par défaut et déployée. Un push dessus déclenche `.github/workflows/deploy.yml` (build + déploiement GitHub Pages).
- L'environnement GitHub `github-pages` a une liste de branches autorisées à déployer (`main`, `master`). Un `workflow_dispatch` sur une autre branche fait passer le job `build`, mais le job `deploy` est rejeté par la protection d'environnement — c'est attendu, pas un bug à corriger dans le workflow.
- `master` est l'ancien site (Jekyll), conservé pour l'historique mais plus déployé.
- Toujours travailler sur une branche dédiée + pull request vers `main`, jamais commit direct sur `main`, même pour un changement mineur.

## Git

- Aucune identité git globale n'est configurée sur la machine de développement. Utiliser `-c user.name="Jonathan Mortier" -c user.email="jonathan.mortier.pro@gmail.com"` sur la commande `git commit` plutôt que de modifier la config globale.
- Terminer les messages de commit par la ligne d'attribution donnée par l'environnement d'exécution de l'agent (ex. `Co-Authored-By: ...`), pas par une ligne inventée.
