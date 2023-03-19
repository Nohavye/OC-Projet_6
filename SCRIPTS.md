# Projet P6 - Description du code JavaScript

## Le dossier "data"

Dans le dossier "data" se trouvent les modules liés à la gestion des données de l'application.

* "DataEntities.js": Fournit deux classes permettant le formatage des données.

  * Classe "MediaEntity": Formatage lié aux données de média.
  * Classe "ProfileEntity": Formatage lié au données de profil.

* "DataManager.js": Fournit un énumérateur et deux classes pour la récupération des données.

  * Enumérateur "Format": Décrit les différents formats de données.
  * Classe "DataFactory": Délègue la création de données formatées.
  * Classe "DataManager": Gère les données de l'application.

* "DataModule.js": Permet l'import des modules ci-dessus dans un objet "Data" structuré.

  ```javascript
  const Data = {
    Format,
    Manager
  }
  ```

---
### Classe "MediaEntity": Formatage lié aux données de média.

La classe "MediaEntity" représente une entité média. Cette classe permet de créer des instances d'entités média à partir des données fournies.

Le constructeur de la classe prend un objet "data" en paramètre, qui est utilisé pour initialiser les propriétés de l'instance de la classe. Les propriétés comprennent notamment:

  * `_id`: l'identifiant du média
  * `_profileId`: l'identifiant du photographe qui a créé le média
  * `_title`: le titre du média
  * `_file`: le nom du fichier du média
  * `_fileType`: le type de fichier du média (image ou vidéo)
  * `_likes`: le nombre de "likes" (ou mentions "j'aime") que le média a reçus
  * `_date`: la date à laquelle le média a été créé
  * `_price`: le prix du média

La classe a également des méthodes "get" pour chaque propriété, qui renvoient la valeur de la propriété correspondante. La méthode `get file` renvoie le chemin d'accès au fichier de l'entité média.

Le code utilise également une structure conditionnelle `if/else` pour déterminer si l'entité média est une image ou une vidéo. Si la propriété `data.image` est définie, cela signifie que l'entité média est une image, et la propriété `_fileType` est initialisée à "image". Si la propriété `data.video` est définie, cela signifie que l'entité média est une vidéo, et la propriété `_fileType` est initialisée à "video". Si aucune de ces propriétés n'est définie, la propriété `_fileType` est initialisée à null.

---
### Classe "ProfileEntity": Formatage lié au données de profil.

La classe "ProfileEntity" représente une entité de profil. Cette classe permet de créer des instances d'entités de profil à partir des données fournies.

Le constructeur de la classe prend un objet "data" en paramètre, qui est utilisé pour initialiser les propriétés de l'instance de la classe. Les propriétés comprennent notamment:

  * `_name`: le nom du photographe
  * `_id`: l'identifiant du photographe
  * `_city`: la ville où se trouve le photographe
  * `_country`: le pays où se trouve le photographe
  * `_tagline`: la phrase d'accroche du photographe
  * `_price`: le prix que le photographe demande pour ses services
  * `_portrait`: le nom du fichier image qui représente le portrait du photographe

La classe a également des méthodes "get" pour chaque propriété, qui renvoient la valeur de la propriété correspondante. La méthode `get portrait` renvoie un objet qui contient deux propriétés: "picture" et "thumbnail", qui représentent respectivement l'image complète du portrait et sa miniature. Les chemins d'accès à ces fichiers sont générés à partir de la propriété `_portrait` et sont définis comme des chaînes de caractères.

---
### Enumérateur "Format": Décrit les différents formats de données.

L'objet "Format" est un énumérateur ( enum ) qui contient deux propriétés de type "Symbol" : `Media` et `Profile`. Ces propriétés sont utilisées pour identifier le format de données qui sera utilisé pour créer une entité.

---
### Classe "DataFactory": Délègue la création de données formatées.

La classe "DataFactory" est utilisée pour créer des instances d'entités média ou profil à partir de données et d'un format donnés.

Le constructeur de la classe prend deux paramètres : `data` et "format". Le paramètre `data` représente les données à utiliser pour créer l'entité, tandis que le paramètre `format` spécifie le format des données.

Le constructeur de la classe utilise une instruction `switch-case` pour créer une instance d'entité correspondant au format de données. Si le format est "Media", la méthode crée une instance de MediaEntity à partir des données passées, si le format est "Profile", la méthode crée une instance de ProfileEntity à partir des données passées.

Le constructeur renvoie l'instance d'entité nouvellement créée.

Cette classe peut être utilisée pour créer des instances d'entités média ou profil à partir de données et d'un format spécifié.

---
### Classe "DataManager": Gère les données de l'application.

La classe "DataManager", est utilisée pour gérer les données de l'application. Cette classe dispose de plusieurs méthodes pour charger et manipuler les données.

  * La méthode `loadData` est une méthode statique qui charge les données à partir d'une URL. Elle prend en paramètre une URL et renvoie une promesse résolue avec les données chargées.

  * La méthode `getData` permet de récupérer les données pour une section donnée. Elle prend en paramètre une section et, facultativement, un format de données à utiliser pour formater les résultats. Si un format est fourni, la méthode renvoie un tableau d'éléments formatés selon ce format. Sinon, elle renvoie simplement un objet simple.

  * La méthode `search` permet de chercher des éléments dans les données en fonction d'une propriété et d'une valeur donnée. Elle prend en paramètre une section, une propriété et une valeur, et renvoie un tableau d'éléments correspondants. Elle peut également prendre un format en paramètre pour formater les éléments correspondants.

La classe utilise également l'énumérateur "Format" pour définir les formats de données possibles, ainsi que la classe "DataFactory" pour créer des entités à partir de données et d'un format donnés.

## Le dossier "templates"

Dans le dossier "templates" se trouvent les modules liés à la construction de templates pour l'application.

* "Template.js": Fournit une classe permettant de construire des objets HTML complexes à partir d'un patron fourni sous forme d'objet.

* "FormElement.js": Founit quatre classes attachées à la création de formulaires.

  * Classe "InputElement": Représente un élément d'entrée de formulaire.
  * Classe "InputText": Etend la classe InputElement. Représente un élément d'entrée de texte.
  * Classe "InputTextArea": Etend la classe InputElement. Représente un élément d'entrée de zone de texte.
  * Classe "FormElement": Représente un élément de formulaire.

* "InsertBox.js": Fournit une classe représentant un encart affichant le nombre de likes et le tarif journalier sur la page de profil d'un artiste.

* "MediaCard.js": Fournit une classe représantant une carte pour afficher un média (image ou vidéo) avec son titre et son nombre de likes.

* "ModalWrapper.js": Fournit une classe utilisée pour créer et gérer une fenêtre modale.

* "OptionSelector.js": Fournit une classe représantant un composant de sélection d'options.

* "ProfileBanner.js": Fournit une classe représantant une bannière de profil.

* "ProfileCard.js": Fournit une classe qui crée une carte de profil.

* "Viewer.js": Fournit une classe représantant un composant d'affichage de médias.

* "TemplatesModule.js": Permet l'import des modules ci-dessus dans un objet "Templates" structuré.

  ```javascript
  const Templates = {
    Form,
    InsertBox,
    MediaCard,
    ModalWrapper,
    OptionSelector,
    ProfileBanner,
    ProfileCard,
    Viewer
  }
  ```

---
### Classe "Template": Construire des objets HTML complexes.

Cette classe permet de construire des objets HTML complexes à partir d'un patron fourni sous forme d'objet.

La méthode principale de cette classe est `build()`, qui prend en paramètre un objet de type `TemplatePattern`. Cet objet est structuré de manière à refléter la structure de l'objet HTML que l'on souhaite construire. Plus précisément, chaque propriété de l'objet correspond à un élément HTML et peut avoir plusieurs sous-propriétés :

  * La propriété `_` correspond à l'élément HTML lui-même.
  * La sous-propriété `_textContent` correspond au contenu textuel de l'élément.
  * La sous-propriété `_attributes` est un objet contenant les attributs de l'élément HTML.
  * La sous-propriété `_events` est un objet contenant les écouteurs d'événements associés à l'élément HTML.
  * Les autres propriétés de l'objet correspondent aux éléments HTML enfants.

  Exemple:
  ```javascript
  const pattern = {

    _: document.createElement('div'),
    _textContent: 'Container',

    _attributes: {
      id: 'div-container',
      class: 'div-container',
      style: `
        color: red;
        border: 1px solid red;
      `
    },

    _events: {
      click: () => {
        console.log('click on container')
      }
    }

    child: {

      _: document.createElement('div'),
      _textContent: 'Child',

      _attributes: {
        id: 'div-child',
        class: 'div-child'
      }
    }
  }
  ```

Lorsque la méthode `build()` est appelée avec un objet `TemplatePattern`, elle parcourt récursivement toutes les propriétés de l'objet pour construire les éléments HTML correspondants et les ajouter à l'élément parent.

La méthode `build()` applique d'abord les attributs, ajoute les écouteurs d'événements et défini le texte contenu dans l'élément racine si ces informations sont fournies dans l'objet `TemplatePattern`. Ensuite, la méthode parcourt toutes les clés de l'objet (les éléments enfants) et appelle de manière récursive la méthode `build()` sur chaque élément enfant avant de l'ajouter au DOM de l'élément parent.

En résumé, cette classe permet de construire des objets HTML complexes en utilisant un modèle structuré sous forme d'objet, et offre une manière efficace de créer dynamiquement des éléments HTML pour une application web.

---
### Classe "InputElement": Représente un élément d'entrée de formulaire.

La classe prend en paramètres une balise HTML pour l'élément, un texte de label et un objet d'attributs.

Elle construit un modèle d'élément d'entrée en utilisant un objet `template` contenant une étiquette et une entrée.

Elle utilise la bibliothèque "Template.js" pour construire le modèle.

La classe définit également des méthodes pour ajouter l'élément d'entrée à un parent, récupérer l'élément d'entrée, récupérer l'identifiant, la validité, la valeur et définir une nouvelle valeur pour l'élément d'entrée.

Le modèle est construit en utilisant des éléments DOM et en définissant leurs propriétés et attributs à l'aide d'objets JavaScript.

La classe définit également deux événements personnalisés pour l'élément d'entrée.

---
### Classe "InputText": Représente un élément d'entrée de texte.

La classe "InputText" étend la classe "InputElement" précédemment définie. Cette nouvelle classe représente un élément d'entrée de texte dans un formulaire HTML. Le constructeur de la classe prend un certain nombre de paramètres qui permettent de personnaliser la création de l'élément d'entrée. Les paramètres sont :

  * `id` : l'identifiant de l'élément d'entrée.
  * `label` : le texte du label associé à l'élément d'entrée.
  * `regex` : une expression régulière utilisée pour valider l'entrée de l'utilisateur.
  * `message` : un message à afficher pour aider l'utilisateur à valider l'entrée.
  * `required` : un booléen indiquant si l'entrée est obligatoire ou non. Sa valeur par défaut est true.

Le constructeur appelle ensuite le constructeur de la classe InputElement avec les paramètres nécessaires pour créer l'élément d'entrée de texte. La classe InputText ajoute simplement une validation à l'entrée en utilisant l'expression régulière passée en paramètre.

---
### Classe "InputTextArea": Représente un élément d'entrée de zone de texte.

Cette classe représente un élément d'entrée de zone de texte. Cette classe hérite également de la classe InputElement et utilise le même modèle de création de template que la classe InputText. Les paramètres de construction incluent l'identifiant de l'élément d'entrée, le libellé de l'élément d'entrée, la longueur minimale de l'entrée, le message à afficher pour aider l'utilisateur à valider l'entrée, et une option pour indiquer si l'entrée est obligatoire ou non.

---
### Classe "FormElement": Représente un élément de formulaire.

Cette classe représente un élément de formulaire pouvant contenir plusieurs entrées et un bouton de soumission. Elle utilise les classes "Template" et "InputElement" qui sont importées.

La classe FormElement a les propriétés suivantes :

  * `_name` : le nom de l'élément de formulaire. Permet de générer un sélècteur CSS personnalisé:
  
    ```javascript
    class: `${name}-form`
    ```
  
  * `_inputElements` : un objet contenant les entrées de l'élément de formulaire sous la forme d'une classe héritée de la classe "InputElement".
  * `_template` : un objet contenant les différentes parties de l'élément de formulaire (le conteneur <form>, la zone de contenu, le bouton de soumission, etc.).
  * `_hasBeenSubmitted` : un booléen qui indique si le formulaire a déjà été soumis ou non.

La classe FormElement a les méthodes suivantes :

  * `constructor()` : le constructeur de la classe FormElement, qui prend comme paramètres le nom de l'élément de formulaire et les entrées de l'élément de formulaire.
  * `#initContentArea()` : initialise la zone de contenu du formulaire (la zone destinée à recevoir les entrées du formulaire).
  * `#startInputsListeners()` : initialise les écouteurs d'évènements liés à la validation du formulaire et à la gestion des messages pour l'accessibilité.
  * `get #formValidity()` : teste la validité du formulaire.

---
### Classe "InsertBox": Représente un encart.

Cette classe représente un encart affichant le nombre de likes et le tarif journalier sur la page de profil d'un artiste.

Lorsque vous créez une nouvelle instance de la classe InsertBox, vous devez passer les paramètres suivants :

  * `likes` : le nombre initial de likes à afficher.
  * `price` : le prix par jour à afficher.

La classe InsertBox contient plusieurs méthodes :

  * `#describeLikes()` : une méthode privée qui renvoie une description du nombre total de likes affichés.
  * `addTo(parent)` : ajoute l'élément HTML de la boîte InsertBox à un élément parent.
  * `element` : renvoie l'élément HTML de l'instance de la boîte InsertBox.

Le code utilise également le module "Template" pour créer les éléments HTML de la boîte "InsertBox" à partir d'un objet `template`.

Enfin, l'instance de la classe InsertBox crée un écouteur d'événements pour l'événement personnalisé likeCardClick. Lorsque cet événement est déclenché, le nombre de likes est mis à jour et l'élément HTML de la boîte InsertBox est mis à jour en conséquence.