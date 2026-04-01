# LinkedIn Village - Technologies, Architecture, Checklist

## 1) Objectif technique
Construire une application web gamifiee, fiable et evolutive, qui fonctionne avec des donnees internes (events produit) et des integrations externes minimales (auth + partage).

## 2) Stack recommandee
## Frontend
- Framework: Next.js 16.x (App Router + Turbopack)
- Langage: TypeScript
- UI: Tailwind CSS
- Composants: shadcn/ui (optionnel)
- Visualisation village:
  - Cible recommandee: Three.js (r183+) via react-three-fiber + drei
  - Fallback mobile: rendu simplifie (LOD, effets reduits)
  - Postprocessing: @react-three/postprocessing (Bloom, Vignette)
- Audio: Howler.js (ambiance, notifications sonores)
- Icônes: Lucide
- Fonts: Google Fonts (avec preload)
- PWA: manifeste + service worker pour experience app-like

## Backend
- API: Route Handlers Next.js ou service Node.js (NestJS si besoin)
- Realtime: Supabase Realtime ou Ably/Pusher
- Jobs asynchrones: Trigger.dev, BullMQ ou cron platform

## Data
- Base principale: PostgreSQL (Supabase)
- Cache: Redis (Upstash/Redis Cloud)
- Stockage media: Supabase Storage ou S3 compatible
- Analytics produit: PostHog ou Mixpanel

## Auth et identite
- Auth app: session + JWT (via Supabase Auth ou Auth.js)
- Social login: LinkedIn OIDC (scopes ouverts)

## Infra / DevOps
- Hosting web: Vercel
- DB hosting: Supabase managed
- Monitoring: Sentry + logs centralises
- CI/CD: GitHub Actions
- CDN/Edge: Cloudflare (cache statique, HTTP/3)
- Product analytics: Vercel Analytics
- RUM: Cloudflare Browser Insights

## Stack cible proche de Git City (reference)
- Next.js 16.x + React + TypeScript
- Three.js (r183+) + react-three-fiber + drei
- Tailwind CSS
- Supabase (PostgreSQL, Auth, Realtime, Storage)
- Vercel (hosting) + Turbopack
- Cloudflare (CDN + Browser Insights)
- Vercel Analytics
- PWA + Open Graph
- Securite: HSTS, CSP stricte, headers durcis

## Priorites de stack pour ton cas
- Indispensable MVP: Next.js, Three.js, Supabase PostgreSQL, Tailwind, auth, notifications realtime.
- Fortement recommande: Vercel Analytics, Sentry, Cloudflare Browser Insights, PWA.
- Optionnel phase 2: audio avance, effets 3D lourds, multi-scenes complexes.

## Etat visuel prototype (mis en place)
- Ville plein ecran avec overlay UI.
- Les grands overlays sont masques en mode exploration pour privilegier l immersion.
- HUD compact conserve en vol (quitter + aide commandes).
- Routes et trottoirs explicites dans la grille urbaine.
- Points lumineux animes sur les routes (effet circulation/neon).
- Fenetres des batiments avec scintillement dynamique.
- Brume volumetrique legere pour renforcer la profondeur.
- Bloom + vignette pour la direction artistique neon.
- Mode exploration en vol (FlyControls): entrer/sortir de la ville depuis l overlay.

## Etat auth/profil prototype (mis en place)
- Auth locale MVP (client-side) avec persistance localStorage.
- Creation de profil utilisateur (nom + headline).
- Carte profil dans l overlay (avatar initiales + deconnexion).
- Point d integration explicite pour migration vers LinkedIn OIDC + Supabase Auth.

## 3) Architecture logique
## Modules
1. Identity Module
- login, profils, liaison compte LinkedIn

2. Village Module
- maison, progression visuelle, customisation

3. Progression Module
- XP, niveaux, streak, prestige

4. Social Module
- kudos, invitations, feed d activite

5. Notification Module
- in-app, email digest optionnel, realtime

6. Event Module
- ingestion des actions utilisateur
- calcul des points via regles
- anti-abus

7. Admin Module
- moderation, regles XP, gestion badges, observabilite

## Flux principal
1. User action -> event cree
2. Event valide (anti-abus, limites journaliere)
3. Event stocke + score recalcule
4. Etat village mis a jour
5. Notification emise aux utilisateurs concernes
6. Analytics enregistrees

## 4) Architecture physique (MVP)
## Couches
- Client (Next.js)
- API BFF (Next.js server routes)
- PostgreSQL (Supabase)
- Realtime channel
- Queue/cron pour jobs de consolidation

## Schema simplifie
- users
- profiles
- villages
- houses
- inventory_items
- badges
- user_badges
- events
- xp_ledger
- daily_caps
- friendships
- kudos
- invitations
- notifications
- feature_flags

## 5) Regles techniques importantes
## Source de verite
- Toute progression provient d events internes traces.
- Les donnees externes sont decoratives ou secondaires.

## Idempotence
- Chaque event a un event_id unique.
- Rejouer un event ne doit pas doubler les points.

## Anti-abus
- Limites par jour, par type d action, par paire d utilisateurs.
- Verification device/ip basique.
- Regles server-side uniquement (jamais cote client).

## Performance
- Leaderboards et compteurs via materialized views ou cache Redis.
- Batch update des stats lourdes en asynchrone.

## 6) Securite et conformite
- Principe du moindre privilege sur tous les tokens.
- Secrets en variables d environnement securisees.
- RLS PostgreSQL sur les donnees utilisateur.
- Journalisation des actions admin.
- Politique de retention pour events/notifications.

## 7) Environnements
- local
- preview (par branche)
- production

## Variables d environnement (exemple)
- NEXT_PUBLIC_APP_URL
- DATABASE_URL
- REDIS_URL
- LINKEDIN_CLIENT_ID
- LINKEDIN_CLIENT_SECRET
- LINKEDIN_REDIRECT_URI
- SENTRY_DSN
- POSTHOG_KEY

## 8) Roadmap architecture
## Phase 1 - MVP
- Monolithe Next.js + PostgreSQL
- Realtime simple
- Event engine basique

## Phase 2 - Stabilisation
- Cache Redis
- Queue jobs
- observabilite complete

## Phase 3 - Scale
- Separation service events/scoring
- Read models dedies leaderboard
- Sharding logique si forte croissance

## 9) Checklist execution
## A. Product/Design
- [ ] Definir les metriques de progression (XP, niveau, streak, prestige)
- [ ] Definir les regles anti-abus (caps, plafonds, validation)
- [ ] Definir le systeme de badges et items
- [ ] Valider le theme visuel bleu/blanc

## B. Tech Setup
- [ ] Initialiser projet Next.js + TypeScript
- [ ] Activer Turbopack et App Router
- [ ] Configurer lint, format, CI
- [ ] Configurer Supabase projet + schema initial
- [ ] Configurer auth locale + sessions
- [ ] Configurer monitoring (Sentry)
- [ ] Installer Three.js + react-three-fiber + drei
- [ ] Mettre en place LOD et quality settings (desktop/mobile)
- [ ] Installer Howler.js et Lucide
- [ ] Configurer Vercel Analytics
- [ ] Configurer Cloudflare Browser Insights (RUM)
- [ ] Activer Open Graph par page partagee
- [ ] Activer PWA (manifest + icones + strategy cache)
- [ ] Configurer headers securite (HSTS, CSP, X-Content-Type-Options)

## C. Data Model
- [ ] Creer tables users/profiles/villages/houses
- [ ] Creer tables events/xp_ledger/daily_caps
- [ ] Creer tables social (friendships, kudos, invitations)
- [ ] Creer tables notifications
- [ ] Ajouter index critiques (user_id, created_at, type)

## D. Core Features
- [ ] Onboarding + creation automatique de maison
- [ ] Check-in quotidien et streak
- [ ] Attribution XP server-side
- [ ] Evolution visuelle maison selon niveau
- [ ] Kudos entre utilisateurs
- [ ] Feed activite du reseau
- [ ] Notifications in-app realtime

## E. Integrations
- [ ] Ajouter login LinkedIn OIDC
- [ ] Ajouter partage carte village
- [ ] Ajouter liens trackes pour invitations

## F. Quality
- [ ] Tests unitaires regles XP
- [ ] Tests integration API events
- [ ] Tests E2E onboarding/progression
- [ ] Tests anti-abus basiques
- [ ] Test charge sur endpoints critiques

## G. Security
- [ ] Activer RLS et policies minimales
- [ ] Rotation secrets et audit acces
- [ ] Validation stricte input API
- [ ] Rate limiting API

## H. Release
- [ ] Environment preview fonctionnel
- [ ] Plan migration DB versionne
- [ ] Feature flags pour activer par lot
- [ ] Dashboard KPIs (DAU, retention, taux kudos)
- [ ] Go-live plan + rollback plan

## 10) Definition of Done MVP
- [ ] Un utilisateur peut s inscrire, obtenir sa maison, gagner de l XP, monter de niveau.
- [ ] Les interactions reseau (kudos/invitations) fonctionnent et notifient en temps reel.
- [ ] Les regles anti-abus sont actives cote serveur.
- [ ] Les metriques produit principales sont visibles dans un dashboard.
- [ ] Le systeme reste stable sous charge cible MVP.
