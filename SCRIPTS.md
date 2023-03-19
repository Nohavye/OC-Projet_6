# Projet P6 - Description du code JavaScript

## Dossier "data"

Dans le dossier "data" se trouvent les modules liés à la gestion des données de l'application.

* "DataEntities.js": Fournit deux classes permettant le formatage des données.

  * Classe "MediaEntity": Formatage lié aux données de média.
  * Classe "ProfileEntity": Formatage lié au données de profil.

* "DataManager.js": Fournit un énumérateur et deux classes pour la récupération des données.

  * Enumérateur "Format": Décrit les différents formats de données.
  * Classe "DataFactory": Délègue la création de données formatées.
  * Classe "DataManager": Gère les données de l'application.

* "DataModule.js": Permet l'import des modules ci-dessus dans un objet "Data" structuré.

  ```
  const Data = {
    Format,
    Manager
  }
  ```

### Classe "MediaEntity": Formatage lié aux données de média.

La classe "MediaEntity" représente une entité média. Cette classe permet de créer des instances d'entités média à partir des données fournies.

Le constructeur de la classe prend un objet "data" en paramètre, qui est utilisé pour initialiser les propriétés de l'instance de la classe. Les propriétés comprennent notamment:

  * "_id": l'identifiant du média
  * "_profileId": l'identifiant du photographe qui a créé le média
  * "_title": le titre du média
  * "_file": le nom du fichier du média
  * "_fileType": le type de fichier du média (image ou vidéo)
  * "_likes": le nombre de "likes" (ou mentions "j'aime") que le média a reçus
  * "_date": la date à laquelle le média a été créé
  * "_price": le prix du média

La classe a également des méthodes "get" pour chaque propriété, qui renvoient la valeur de la propriété correspondante. La méthode "get file" renvoie le chemin d'accès au fichier de l'entité média.

Le code utilise également une structure conditionnelle "if/else" pour déterminer si l'entité média est une image ou une vidéo. Si la propriété "data.image" est définie, cela signifie que l'entité média est une image, et la propriété "_fileType" est initialisée à "image". Si la propriété "data.video" est définie, cela signifie que l'entité média est une vidéo, et la propriété "_fileType" est initialisée à "video". Si aucune de ces propriétés n'est définie, la propriété "_fileType" est initialisée à null.