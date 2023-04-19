# APA-citation-js

APA-citation-js est une bibliothèque JavaScript légère qui permet de générer automatiquement des citations au format APA à partir des méta-données d'un article Wordpress. L'utilisateur peut copier la citation dans son presse-papier en cliquant simplement sur un bouton.

## Fonctionnalités

- Récupération des méta-données d'un article Wordpress (auteurs, date de publication, DOI, etc.)
- Génération de citations APA
- Copie de la citation dans le presse-papier

## Installation

1. Téléchargez le fichier `cite-article.js` et placez-le dans le répertoire de votre projet.
2. Incluez le fichier `cite-article.js` dans votre page HTML en ajoutant la balise suivante dans la section `<head>` de votre document:

```html
<script src="cite-article.js"></script>

# Utilisation
Pour utiliser APA-citation-js, vous devez ajouter un bouton dans votre page HTML qui permettra à l'utilisateur de copier la citation dans son presse-papier. Voici un exemple d'utilisation :

<!-- Exemple de bouton pour copier la citation APA -->
<button onclick="copyAPACitation()">Copier la citation APA</button>

Assurez-vous que les méta-données de l'article sont présentes sur la page, telles que les auteurs, la date de publication et le DOI. APA-citation-js utilisera ces informations pour générer la citation au format APA.

## Contribution
Nous accueillons avec plaisir les contributions à ce projet. N'hésitez pas à ouvrir une "pull request" ou à signaler des problèmes via l'onglet "Issues" sur GitHub.

## Licence
Ce projet est distribué sous la licence [insérer le type de licence ici, par exemple, MIT]. Pour plus d'informations, consultez le fichier LICENSE.


N'oubliez pas de remplacer `[insérer le type de licence ici, par exemple, MIT]` par le type de licence que vous souhaitez utiliser pour votre projet, et de créer un fichier LICENSE correspondant.

J'espère que cela vous aidera à créer un fichier Readme.md clair et informatif pour votre projet. Si vous avez d'autres questions ou avez besoin d'aide supplémentaire, n'hésitez pas à me le faire savoir.