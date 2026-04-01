# Roadmap BlueDistrict

## Vision

Construire un jeu social 3D connecté à LinkedIn, avec une progression visible et motivante, orientée réseau professionnel.

## Phase MVP (en cours)

- Ville 3D immersive avec exploration libre
- Auth LinkedIn via Supabase OIDC
- Synchronisation du profil utilisateur (nom/avatar)
- Overlay stats de base (réseau, progression, missions)
- Qualité repo: CI, sécurité, documentation projet

## Phase Beta

- Liaison de vraies métriques LinkedIn (dans les limites API)
- Système de quêtes dynamiques quotidiennes/hebdomadaires
- Progression visuelle avancée (quartiers, niveaux, animations événementielles)
- Classement communautaire et objectifs collaboratifs
- Optimisation perf (LOD, culling, postprocess adaptatif)

## Phase v1

- Économie de progression complète (XP, récompenses, badges)
- Saisons et événements temporaires
- Profil public partageable
- Notifications in-app et email digest
- Déploiement production durci (monitoring, alerting, recovery)

## Backlog technique prioritaire

- Table `profiles` + RLS fine-grain
- Pipelines CI (lint, tests, build)
- Coverage minimale sur helpers critiques
- Gestion d'erreurs OAuth robuste
- Télémétrie de base produit
