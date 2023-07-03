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
  'APA 6th Edition': function(article) {
  const authorString = article.authors.join(', ');
  return `${authorString} (${article.date}). ${article.title}. <i>${article.journal}, ${article.issue}</i>. ${article.doi}`;
},
  'APA 7th Edition': function(article) {
  const formattedAuthors = article.authors.map(author => {
    const words = author.split(' ');
    const firstName = words.shift();
    const lastName = words.pop().replace(',', '');
    return `${lastName}, ${words.join(' ')} ${firstName.charAt(0)}.`;
  }).join(', ');
  return `${formattedAuthors} (${article.date}). ${article.title}. <i>${article.journal}, ${article.issue}</i>. ${article.doi}`;
},
  'ACM': function(article) {
  const authorString = article.authors.map(author => {
    const [firstName, lastName] = author.split(' ');
    return `${lastName}, ${firstName[0]}.`;
  }).join(', ');
  return `${authorString}. ${article.date}. <i>${article.title}</i>. ${article.journal}, ${article.issue}. ${article.doi}`;
},
'ACS': function(article) {
  const authorString = article.authors.map(author => {
    const [firstName, lastName] = author.split(' ');
    return `${lastName}, ${firstName}`;
  }).join('; ');
  return `${authorString}. <i>${article.title}</i>. ${article.journal}, ${article.issue}. ${article.doi}.`;
},
  'ABNT': function(article) {
    const formattedAuthors = article.authors.map(author => {
      const words = author.split(' ');
      const lastName = words.pop().replace(',', '');
      const firstInitials = words.filter(word => !word.match(/^[A-Z]\.$/)).map(word => word.charAt(0)).join(' ');
      return `${lastName.toUpperCase()}, ${firstInitials}.`;
    }).join('; ');
    return `${formattedAuthors}. ${article.title}. ${article.journal}, ${article.issue}. ${article.doi}. ${article.date}.`;
  },
  'Chicago': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName} ${firstName}`;
    }).join(', ');
    return `${authorString}. "<i>${article.title}</i>." ${article.journal} ${article.issue} (${article.date}): ${article.doi}.`;
  },
  'Harvard': function(article) {
    const authorString = article.authors.map(author => {
      const [lastName, ...rest] = author.split(' ');
      return `${rest.join(' ')} ${lastName.toUpperCase()}`;
    }).join(', ');
    return `${authorString} ${article.date}, ${article.title}, ${article.journal}, ${article.issue}, ${article.doi}.`;
  },
  'IEEE': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${firstName[0]}. ${lastName}`;
    }).join(', ');
    return `${authorString}, "<i>${article.title}</i>," ${article.journal}, ${article.issue}, ${article.date}, doi: ${article.doi}.`;
  },
  'MLA': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName}`;
    }).join(', ');
    return `${authorString}. "<i>${article.title}</i>." ${article.journal}, ${article.issue}, ${article.date}, ${article.doi}.`;
  },
  'Turabian': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName}`;
    }).join(', ');
    return `${authorString}. "<i>${article.title}</i>." ${article.journal} ${article.issue} (${article.date}): ${article.doi}.`;
  },
  'Vancouver': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName} ${firstName[0]}`;
    }).join(', ');
    return `${authorString}. ${article.title}. ${article.journal}. ${article.issue}. ${article.date};${article.doi}.`;
  }
}

// Étape 3 : Créer un menu déroulant pour les formats de citation
function createDropdown() {
  // Vérifier si #citation-frame existe
  const citationFrame = document.querySelector('#citation-frame');
  if (!citationFrame) {
    console.log("Cadre de citation non trouvé. Sortie du script.");
    return;
  }

  const select = document.createElement('select');
  // Ajouter l'attribut id à l'élément select
  select.setAttribute('id', 'select-citation-format');
  Object.keys(apaFormats).forEach(format => {
    const option = document.createElement('option');
    option.value = format;
    option.textContent = format;
    select.appendChild(option);
  });
  citationFrame.appendChild(select);

  // Mettre à jour la citation lorsque la sélection change
  select.addEventListener("change", function () {
    const article = getArticleInfo();
    const selectedFormat = this.value;
    const citation = apaFormats[selectedFormat](article);
    // console.log('citation: ', citation)
    const citationParagraph = citationFrame.querySelector("p");
    if (citationParagraph) {
      citationParagraph.innerHTML = citation;
    }
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
  // Check if #citation-frame exists
  const citationFrame = document.querySelector('#citation-frame');
  if (!citationFrame) {
    console.log("Citation frame not found. Exiting script.");
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