# BlueDistrict 🏙️

> **Un jeu de réseau social 3D** où ton activité LinkedIn fait grandir ta ville.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-green?logo=supabase)](https://supabase.com)
[![Three.js](https://img.shields.io/badge/Three.js-r3f-blue)](https://threejs.org)

---

## Présentation

BlueDistrict est une expérience web immersive en 3D où chaque connexion, post et interaction LinkedIn se traduit par l'évolution de ta cité virtuelle. Explore ta ville depuis les airs, consulte tes stats réseau en temps réel, et regarde ta skyline grandir avec ton activité professionnelle.

### Fonctionnalités actuelles

- 🌆 **Ville 3D fullscreen** avec bâtiments, routes, trottoirs et lignes néon
- 💡 **Effets visuels** : Bloom, Vignette, brouillard volumétrique, feux de signalisation animés, fenêtres clignotantes
- ✈️ **Mode exploration** : vole librement dans la ville (FlyControls)
- 🔐 **Auth LinkedIn via OIDC** (Supabase) — ton profil réel alimente la ville
- 📊 **HUD overlay** avec stats réseau, missions et classement

---

## Stack technique

| Couche      | Technologie                          |
| ----------- | ------------------------------------ |
| Frontend    | Next.js 16 (App Router, TypeScript)  |
| 3D          | Three.js + @react-three/fiber + drei |
| Postprocess | @react-three/postprocessing          |
| Auth        | Supabase Auth + LinkedIn OIDC        |
| Styling     | Tailwind CSS                         |
| DB          | Supabase (PostgreSQL)                |

---

## Démarrage rapide

### Prérequis

- Node.js ≥ 18
- Un projet Supabase (gratuit sur [supabase.com](https://supabase.com))
- Une app LinkedIn Developer avec OpenID Connect activé

### Installation

```bash
git clone https://github.com/Akiyo974/BlueDistrict.git
cd BlueDistrict/web
npm install
```

### Configuration

Crée un fichier `web/.env.local` basé sur l'exemple suivant :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ Ne commite **jamais** ton `.env.local`. Il est déjà exclu par `.gitignore`.

### Lancer le serveur de développement

```bash
cd web
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

---

## Structure du projet

```
BlueDistrict/
├── web/                          # Application Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # UI principale + auth Supabase
│   │   │   ├── layout.tsx        # Layout racine + fonts
│   │   │   └── auth/callback/    # Route OAuth callback
│   │   ├── components/
│   │   │   └── VillageScene.tsx  # Scène 3D complète
│   │   └── lib/
│   │       └── supabase.ts       # Client Supabase browser
│   └── public/
│       └── bluedistrict-logo-300.png
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## Documentation produit

- [ROADMAP.md](ROADMAP.md)
- [CHANGELOG.md](CHANGELOG.md)
- [docs/auth-flow.md](docs/auth-flow.md)
- [docs/run-local-3-minutes.md](docs/run-local-3-minutes.md)

---

## Contribuer

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) pour les guidelines de contribution.

---

## Sécurité

Pour signaler une vulnérabilité, consulte [SECURITY.md](SECURITY.md).

---

## Licence

MIT © 2026 [Christen Dijoux](https://github.com/Akiyo974)
