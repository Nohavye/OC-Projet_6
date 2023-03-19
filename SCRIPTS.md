# Projet P6 - Description du code JavaScript

## Dossier 'data'

Dans le dossier 'data' se trouvent les modules liés à la gestion des données de l'application.

* 'DataEntities.js': Fournit deux classes permettant le formatage des données.

  * Classe 'MediaEntity': Formatage lié aux données de média.
  * Classe 'ProfileEntity': Formatage lié au données de profil.

* 'DataManager.js': Fournit un énumérateur et deux classes pour la récupération des données.

  * Enumérateur 'Format': Décrit les différents formats de données.
  * Classe 'DataFactory': Délègue la création de données formatées.
  * Classe 'DataManager': Gère les données de l'application.

* 'DataModule.js': Permet l'import des modules ci-dessus dans un objet 'Data' structuré.

  ```
  const Data = {
    Format,
    Manager
  }
  ```