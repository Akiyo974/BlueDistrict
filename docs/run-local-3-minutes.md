# How to run locally in 3 minutes

## 1. Cloner et installer

```bash
git clone https://github.com/Akiyo974/BlueDistrict.git
cd BlueDistrict/web
npm install
```

## 2. Configurer l'environnement

Crée `web/.env.local` avec:

```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_<your_key>
```

## 3. Démarrer l'app

```bash
npm run dev
```

Ouvre `http://localhost:3000` et teste le bouton "Se connecter avec LinkedIn".

## Troubleshooting rapide

- Erreur de callback: vérifie les redirect URLs LinkedIn/Supabase.
- Session absente: vérifie `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Hydration warning en dev: souvent lié à une extension navigateur; tester en navigation privée.
