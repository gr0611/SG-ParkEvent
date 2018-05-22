# SG-ParkEvent


- Projet :  Créer un site Web pour une agence d'événèmentielle en ASP.net MVC avec 2 objectifs : 
  - Pour l'agence : Pouvoir créer et gérer un évènement
  - Pour le convive : Pouvoir choisir le parking le plus proche de l'évènement avec de la place et voir son itinéraire.

## Semaine 1 

### Lundi 14/05

- Création de l'environnement :
  - Utilisation de git pour travail en groupe
  - Intégration de git extension pour visual studio
  - Configuration de git pour le proxy 
   ```git git config --global http.proxy http://proxyUsername:proxyPassword@proxy.server.com:port```
  
- Intégration de l'API Parking Rennes 
- Création des BO 

### Mardi 15/05

- Création d'un ReadMe.md
- Création de la bdd et connexion entre bdd et visual studio
- Utilisation d'entity framework pour envoyer le modele de base de données (code first)
  - Enable-Migrations
  - Add-Migration
  - Update-Database
- Configuration SQL Server
  - Gestionnaire de configuration SQL
  - Activer TCP/IP
- Création des controllers et des vues pour évènements et client
- Style homepage et ajout de champs

### Mercredi 16/05

- Suppression partie client
- Installation Materialize à la place de Bootstrap
- Révision parcours client
- API Google Maps : 
  - Affichage de la map avec les markers sur les parkings rennais (utilisation api rennes métropole + api google maps)

### Jeudi 17/05
- Gestion des rôles pour afficher liens pour CRUD que pour admin
- Champs autocomplétion sur la map pour adresse départ
- Intégration des maps dans Events/Détails

### Vendredi 18/05
- Ajout slider images
- Ajout autocomplétion pour champs lieu dans création event
- Récupération des latitudes et des longitudes 



## Semaine 2

### Mardi 22/05
- Affichage point evenement
- Affichage itinéraire
