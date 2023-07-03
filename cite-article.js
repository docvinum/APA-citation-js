// Step 1: Retrieve article information from HTML page
function getArticleInfo() {
  // Get the article journal
  const journal = "IVES Conference Series";
  // Get the article title
  const titleElement = document.querySelector('h1');
  const title = titleElement ? titleElement.textContent : '';
  // Get the article authors
  const rawAuthorsElement = document.querySelector('#publication-author');
  const rawAuthors = rawAuthorsElement ? rawAuthorsElement.textContent : '';
  const regex = /[\d\u2070\u00b9\u00b2\u00b3\u2074\u2075\u2076\u2077\u2078\u2079]|Auteurs : |\n+|[^a-zA-Z\s\u00C0-\u017F,.'’-]/g;
  const cleanAuthors = rawAuthors.replace(regex, '').trim();
  const authors = rawAuthors ? cleanAuthors.split(/(?:, |; | and | et )/).map(author => author.replace(/\s+/g, ' ').trim()) : [];
  // Get the article issue
  const issueElement = document.querySelector('#publication-issue p');
  const issueRaw = issueElement ? issueElement.innerText.split(': ')[1] : '';
  const issue = issueRaw ? issueRaw : '';
  // Get the article DOI
  const doiElement = document.querySelector('#publication-doi p a');
  const doi = doiElement ? doiElement.getAttribute('href') : '';
  // Get the article date (year) from the issue
  const dateRegex = /\d{4}/;
  const dateMatch = issue.match(dateRegex);
  const date = dateMatch ? dateMatch[0] : '';
  return { title, authors, journal, issue, doi, date };
}

// Step 2: Define citation formats object 
const apaFormats = {
  // citation formats...
}

// Step 3: Create dropdown menu for citation formats
function createDropdown() {
  const select = document.createElement('select');
  // Add the id attribute to the select element
  select.setAttribute('id', 'select-citation-format');
  Object.keys(apaFormats).forEach(format => {
    const option = document.createElement('option');
    option.value = format;
    option.textContent = format;
    select.appendChild(option);
  });
  document.querySelector('#citation-frame').appendChild(select);
  // Update citation when selection changes
  select.addEventListener("change", function () {
    const article = getArticleInfo();
    const selectedFormat = this.value;
    const citation = apaFormats[selectedFormat](article);
    document.querySelector("#citation-frame p").innerHTML = citation;
  });
}

// Step 4: Retrieve selected APA citation format and display citation
function displayCitation(article) {
  const selectedFormat = document.querySelector("select").value;
  const citation = apaFormats[selectedFormat](article);
  const citationElem = document.createElement("p");
  // Add an ID to the citation element for easier reference
  citationElem.id = "citation";
  citationElem.innerHTML = citation;
  document.querySelector("#citation-frame").appendChild(citationElem);
}

// On page load, create citation format dropdown and display default citation
document.addEventListener('DOMContentLoaded', function() {
  const citationFrame = document.querySelector('#citation-frame');
  if (!citationFrame) {
    console.log('Citation frame not found. Script execution stopped.');
    return;
  }
  createDropdown();
  const article = getArticleInfo();
  displayCitation(article);
  console.log("citation:", article);
  // Select the button for copying the citation from the HTML page.
  const citeButton = document.getElementById('cite-button');
  // Check if the button was found.
  if (citeButton) {
    // Add a 'click' event listener to the button to copy the citation.
    citeButton.addEventListener('click', async () => {
      // Get the current citation displayed on the page.
      const citationElement = document.querySelector('#citation-frame p');
      // Check if the citation element was found.
      if (citationElement) {
        // Copy the inner HTML of the citation element to the clipboard as rich text.
        const type = "text/html";
        const blob = new Blob([citationElement.innerHTML], { type });
        const data = [new ClipboardItem({ [type]: blob })];
        try {
          await navigator.clipboard.write(data);
          console.log('Text copied to clipboard');
          console.log("citation:", article)
        } catch (err) {
          console.error('Error copying text to clipboard', err);
        }
      }
    });
  }
});