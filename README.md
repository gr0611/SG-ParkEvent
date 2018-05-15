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
