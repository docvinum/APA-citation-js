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
We welcome contributions to this project. Feel free to open a "pull request" or report issues via the "Issues" tab on GitHub.

## Licence

MIT License Copyright (c) 2023 EtOH

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
