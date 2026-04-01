# LinkedIn Village - Concept Produit

## Vision
Créer une experience ludique inspiree de Git City, mais orientee reseau professionnel.
Chaque personne possede une maison dans un village. Le village evolue selon l'activite utile, la regularite et les interactions avec le reseau.

## Objectif Produit
- Transformer l'activite professionnelle en progression visuelle motivante.
- Encourager les interactions positives (entraide, feedback, recommandations, partage).
- Rester compatible avec les contraintes API LinkedIn en priorisant les evenements internes a l'application.

## Boucle de Jeu (Core Loop)
1. L'utilisateur se connecte et fait son check-in.
2. Il realise des actions utiles (kudos, aide, partage de carte, invitation).
3. Il gagne de l'XP et debloque des elements visuels.
4. Son village evolue (maison, quartier, place commune).
5. Il recoit des notifications quand son reseau agit.
6. Il revient pour maintenir son streak et progresser.

## Mapping Progression (Equivalent a "plus tu contribues, plus tu grandis")
- Taille de la maison: score d'activite hebdomadaire.
- Nombre d'etages: niveau global (XP cumulee).
- Lumieres/fenetres: regularite (streak de jours actifs).
- Jardin/decorations: badges debloques (entraide, mentoring, partage).
- Place du village: impact reseau (nombre de relations actives).

## Systeme de Points (Version Simple)
### Actions et XP
- Check-in quotidien: +5 XP
- Partage de carte village: +10 XP
- Kudos recu: +8 XP (max 5 par jour)
- Aide validee par pair: +20 XP
- Invitation convertie (nouveau membre actif): +30 XP

### Regles anti-abus
- Plafond journalier d'XP (ex: 120 XP/jour).
- Limite de points par action repetable (kudos, partages).
- Validation pair-a-pair pour actions a fort impact (ex: aide).
- Detection basique d'abus (meme compte, meme IP, patterns repetitifs).

### Metriques de progression
- XP journaliere: progression court terme.
- Niveau: progression long terme.
- Prestige (30 jours glissants): dynamique recente.
- Impact reseau: volume et qualite des interactions autour de l'utilisateur.

## Ownership: "Qui a quoi"
### Objets personnels
- 1 parcelle par utilisateur
- 1 maison (niveau, skin, etages)
- 1 inventaire (decorations, effets)
- 1 collection de badges

### Objets communautaires
- Place centrale
- Parc
- Fontaine / monument

### Regles d'attribution
- Objets personnels: debloques individuellement par XP et achievements.
- Objets communautaires: debloques par objectifs collectifs du reseau/groupe.

## Notifications
## Evenements principaux (in-app)
- X t'a donne un kudos.
- Y a rejoint ton village via ton invitation.
- Ton groupe a debloque un batiment communautaire.
- Tu as atteint un nouveau niveau / badge.

## Evenements secondaires (via partage tracke)
- L'utilisateur partage sa carte village via un lien unique.
- Clics et inscriptions via ce lien alimentent des events internes.
- Cela reduit la dependance aux donnees externes non garanties.

## Contraintes API LinkedIn (Pragmatiques)
- Favoriser les scopes ouverts et stables (profil/email/sign-in, partage si autorise).
- Eviter de baser le gameplay sur des donnees LinkedIn potentiellement restreintes.
- Concevoir le jeu pour fonctionner meme sans analytics sociaux externes detaillees.

## Direction Artistique (Bleu/Blanc, style LinkedIn)
## Branding
- Nom retenu: BlueDistrict
- Logo 300x300: web/public/bluedistrict-logo-300.png

## Palette
- Bleu principal: #0A66C2
- Bleu clair: #EAF4FF
- Blanc: #FFFFFF
- Gris texte/UI: #5E6A75

## UI
- Cartes blanches, ombres legeres.
- Accents bleus sur actions et progression.
- Lisibilite prioritaire (style pro, epure, moderne).

## Scene Village
- Ambiance lumineuse, propre, professionnelle.
- Village isometrique ou 2.5D simple pour le MVP.
- Animations discretes (lumiere maison, pop de notif, upgrade).
- Mode "Entrer dans la ville" pour se balader en vol avec controles libres.

## Etat Prototype Actuel
- Ville plein ecran avec overlay interactif.
- Exploration en vol activable depuis l interface.
- Auth/profil utilisateur en MVP local (nom + headline, persistance locale).
- Etape suivante: brancher LinkedIn OIDC et Supabase Auth pour un vrai login social.

## MVP (4 a 6 semaines)
1. Auth + profil utilisateur.
2. Creation auto d'une maison.
3. Systeme XP + niveaux + streak.
4. Kudos entre utilisateurs.
5. Notifications in-app.
6. Carte village partageable (lien public).

## Roadmap Apres MVP
1. Quartiers thematiques par secteur metier (Tech, Marketing, Sales, Design).
2. Defis hebdo d'entraide et de progression.
3. Batiments communautaires debloques par objectifs collectifs.
4. Mode comparaison entre 2 profils/villages.
5. Classements locaux (reseau proche) et saisonniers.

## KPIs Produit
- Retention J1 / J7 / J30.
- DAU/WAU.
- Taux de check-in quotidien.
- Taux d'interaction reseau (kudos, aides, invitations).
- Taux de partage de carte.
- Conversion invite -> membre actif.

## Risques et Mitigations
- Risque: gameplay trop dependant d'APIs externes.
  - Mitigation: events internes comme source principale de progression.
- Risque: spam pour monter vite.
  - Mitigation: caps journaliers, validations, anti-abus.
- Risque: manque de valeur pro.
  - Mitigation: quetes utiles (feedback, mentorat, objectifs de carriere).

## Resume Executif
Le concept est faisable et pertinent si la progression repose d'abord sur les interactions dans l'app (et non uniquement sur des donnees LinkedIn externes). La proposition "village pro" en bleu/blanc est differenciante, gamifiee, et compatible avec un MVP realiste en quelques semaines.
