/**
 * Permet la construction d'objets HTML complèxes à partir d'un modèle.
 */
class Template {
  /**
   * Construit un template à partir du modèle fourni.
   *
   * @typedef {Object} TemplatePattern
   * @property {HTMLElement} _ - L'élément HTML racine du modèle.
   * @property {string} [_textContent] - Le contenu textuel de l'élément racine du modèle.
   * @property {Object.<string, any>} [_attributes] - Les attributs HTML de l'élément racine du modèle.
   * @property {Object.<string, Function>} [_events] - Les écouteurs d'événements associés à l'élément racine du modèle.
   * @property {Object.<string, TemplatePattern>} [childPropertyName] - Les enfants du modèle.
   *
   * @param {TemplatePattern} pattern - Le modèle à partir duquel construire le template.
   */
  static build (pattern) {
    if (pattern._) {
      // Applique les attributs définis dans _attributes.
      if (pattern._attributes) {
        for (const key in pattern._attributes) {
          pattern._.setAttribute(key, pattern._attributes[key])
        }
      }

      // Ajoute les écouteurs d'événements définis dans _events.
      if (pattern._events) {
        for (const key in pattern._events) {
          pattern._.addEventListener(key, pattern._events[key])

          // pattern._.addEventListener(key, (e) => {
          //   if (e.target === pattern._) {
          //     (() => {
          //       pattern._events[key](e)
          //     })()
          //   }
          // })
        }
      }

      // Définit le texte contenu dans l'élément si _textContent est défini.
      if (pattern._textContent) {
        pattern._.textContent = pattern._textContent
      }

      /* Parcourt toutes les clés de pattern pour construire les éléments enfants.
         Ignore les clés qui commencent par un underscore.
         Appelle récursif de la méthode build sur chaque élément enfant de pattern.
         Ajoute l'élément enfant construit dans le DOM de l'élément parent. */
      for (const key in pattern) {
        if (key.charAt(0) !== '_') {
          this.build(pattern[key])
          pattern._.appendChild(pattern[key]._)
        }
      }
    }
  }
}

export { Template as default }
