# APA-citation-js

This JavaScript project generates citations in various formats, including APA 6th Edition, APA 7th Edition, ACM, ACS, ABNT, Chicago, Harvard, IEEE, MLA, Turabian, and Vancouver. It is designed to work with a specific HTML structure to extract the required information for citations, such as title, authors, journal, issue, doi, and date.

## Usage

1. Include the `cite-article.js` script in your HTML file.
2. Create an HTML structure with the following elements:
   - An `h1` element for the article title.
   - An element with `id="publication-author"` for the authors.
   - An element with `id="publication-issue"` for the issue information.
   - An element with `id="publication-doi"` for the DOI information.

   Note that the script is designed to work with a specific HTML structure, so make sure your HTML file has the correct elements and IDs.

3. The script will automatically generate the citations and display them in a dropdown menu, allowing users to select and copy the citation in their desired format.

4. The script will also create a "Copy Citation" button, allowing users to copy the currently displayed citation to their clipboard.

## Customization

You can customize the citation formats in the `cite-article.js` script by updating the `apaFormats` constant. The current script includes the journal "IVES Conference Series" in the citation. To change the journal, update the `journal` constant in the `getArticleInfo` function.

Feel free to modify the script to fit your specific use case or to support additional citation formats.

## Contribution
Nous accueillons avec plaisir les contributions à ce projet. N'hésitez pas à ouvrir une "pull request" ou à signaler des problèmes via l'onglet "Issues" sur GitHub.

## Licence
Ce projet est distribué sous la licence [insérer le type de licence ici, par exemple, MIT]. Pour plus d'informations, consultez le fichier LICENSE.


N'oubliez pas de remplacer `[insérer le type de licence ici, par exemple, MIT]` par le type de licence que vous souhaitez utiliser pour votre projet, et de créer un fichier LICENSE correspondant.

J'espère que cela vous aidera à créer un fichier Readme.md clair et informatif pour votre projet. Si vous avez d'autres questions ou avez besoin d'aide supplémentaire, n'hésitez pas à me le faire savoir.