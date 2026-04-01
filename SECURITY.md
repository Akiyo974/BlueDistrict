# Politique de sécurité — BlueDistrict

## Versions supportées

| Version | Support sécurité |
|---------|-----------------|
| `main`  | ✅ Oui           |

---

## Signaler une vulnérabilité

**Ne crée pas d'issue GitHub publique pour les failles de sécurité.**

Si tu découvres une vulnérabilité (ex. : exposition de clés, injection, fuite de données utilisateur, contournement d'auth Supabase), contacte directement :

📧 **christen.dijoux@gmail.com**

### Que faut-il inclure dans ton rapport ?

1. **Description** claire de la vulnérabilité
2. **Étapes pour reproduire** le problème (proof of concept si possible)
3. **Impact estimé** : quelles données ou fonctionnalités sont affectées ?
4. **Suggestion de correction** si tu en as une (optionnel)

### Ce que tu peux attendre en retour

- Accusé de réception sous **72 heures**
- Évaluation de la gravité sous **7 jours**
- Correction et publication d'un correctif selon la gravité
- Mention dans les remerciements (sauf si tu préfères rester anonyme)

---

## Bonnes pratiques appliquées dans ce projet

- Les clés et secrets (`SUPABASE_URL`, `ANON_KEY`, Client Secret LinkedIn) sont **exclus du repo** via `.gitignore` (`.env*`)
- L'authentification utilisateur repose sur **Supabase Auth + LinkedIn OIDC** (OAuth 2.0 + OpenID Connect) — aucun mot de passe stocké
- Les tokens d'accès LinkedIn transitent uniquement via **Supabase** (côté serveur), jamais exposés au client
- La route de callback OAuth (`/auth/callback`) utilise le pattern **PKCE** via `@supabase/ssr`
- Aucune donnée sensible n'est loggée côté client

---

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Auth — Security](https://supabase.com/docs/guides/auth)
- [LinkedIn OAuth 2.0 Best Practices](https://learn.microsoft.com/linkedin/shared/authentication/authorization-code-flow)
