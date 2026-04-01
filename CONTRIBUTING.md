# Guide de contribution — BlueDistrict

Merci de ton intérêt pour BlueDistrict ! Toute contribution est la bienvenue, qu'il s'agisse d'un bug fix, d'une nouvelle fonctionnalité ou d'une amélioration de la documentation.

---

## Table des matières

1. [Code de conduite](#code-de-conduite)
2. [Avant de commencer](#avant-de-commencer)
3. [Processus de contribution](#processus-de-contribution)
4. [Conventions de code](#conventions-de-code)
5. [Commit messages](#commit-messages)
6. [Signaler un bug](#signaler-un-bug)
7. [Proposer une fonctionnalité](#proposer-une-fonctionnalité)

---

## Code de conduite

Ce projet respecte le [Code de conduite](CODE_OF_CONDUCT.md). En contribuant, tu t'engages à le respecter.

---

## Avant de commencer

### Prérequis

- Node.js ≥ 18
- npm ≥ 9
- Un compte Supabase (plan gratuit suffisant pour le dev)
- Une app LinkedIn Developer avec OpenID Connect activé

### Installation locale

```bash
git clone https://github.com/Akiyo974/BlueDistrict.git
cd BlueDistrict/web
npm install
cp .env.local.example .env.local   # puis remplis tes clés
npm run dev
```

---

## Processus de contribution

1. **Fork** le repo sur GitHub
2. **Crée une branche** depuis `main` :
   ```bash
   git checkout -b feat/nom-de-ta-feature
   # ou
   git checkout -b fix/description-du-bug
   ```
3. **Fais tes modifications** en respectant les conventions ci-dessous
4. **Vérifie** que le projet compile sans erreur :
   ```bash
   npm run build
   npm run lint
   ```
5. **Commit** avec un message conventionnel (voir section dédiée)
6. **Push** ta branche et ouvre une **Pull Request** vers `main`
7. Adresse les retours de review si nécessaire

> ⚠️ N'ajoute **jamais** de clés d'API, tokens ou secrets dans le code ou les commits.

---

## Conventions de code

- **TypeScript strict** : pas de `any` implicite
- **Tailwind CSS** pour tout le styling UI — pas de CSS inline sauf dans Three.js
- **Composants React** : fichiers `.tsx`, noms en PascalCase
- **Fonctions utilitaires** : fichiers `.ts`, noms en camelCase
- Utilise les imports absolus (`@/components/...`, `@/lib/...`)
- Pas de `console.log` laissés dans le code final

---

## Commit messages

Ce projet suit la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description courte en français ou anglais

[corps optionnel]

[footer optionnel, ex: Closes #12]
```

### Types autorisés

| Type       | Usage                                       |
| ---------- | ------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité                     |
| `fix`      | Correction de bug                           |
| `perf`     | Amélioration de performance                 |
| `refactor` | Refactoring sans changement de comportement |
| `style`    | Formatage, espaces (pas de logique)         |
| `docs`     | Documentation uniquement                    |
| `test`     | Ajout ou correction de tests                |
| `chore`    | Tâches de maintenance (deps, config, CI)    |

### Exemples

```
feat(scene): ajouter les piétons animés sur les trottoirs
fix(auth): corriger la redirection OAuth après callback
docs(readme): mettre à jour les instructions d'installation
```

---

## Signaler un bug

Utilise le [template Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) sur GitHub Issues.

Inclus toujours :

- Version de Node.js et OS
- Étapes pour reproduire
- Comportement attendu vs observé
- Capture d'écran ou message d'erreur console

---

## Proposer une fonctionnalité

Utilise le [template Feature Request](.github/ISSUE_TEMPLATE/feature_request.md).

Décris :

- Le problème que la fonctionnalité résout
- La solution envisagée
- Les alternatives considérées

---

## Questions ?

Contacte Christen Dijoux via [les issues GitHub](https://github.com/Akiyo974/BlueDistrict/issues) ou par email : christen.dijoux@gmail.com
