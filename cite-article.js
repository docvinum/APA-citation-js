// Step 1: Retrieve article information from HTML
function getArticleInfo() {
  const titleElement = document.querySelector('.et_pb_text_inner h1');
  const title = titleElement ? titleElement.textContent : '';
  console.log("title: ", title);

  const rawAuthorsElement = document.querySelector('#publication-author .et_pb_text_inner p');
  const rawAuthors = rawAuthorsElement ? rawAuthorsElement.textContent : '';
  const regex = /[⁰¹²³⁴⁵⁶⁷⁸⁹]/g;
  const cleanAuthors = rawAuthors.replace(regex, '').trim();
  const authors = rawAuthors ? cleanAuthors.split(/(?:, | and | et )/) : [];
  console.log("authors: ", authors);

  const issueElement = document.querySelector('#publication-issue .et_pb_text_inner p');
  const issueRaw = issueElement ? issueElement.innerText.split(': ')[1] : '';
  const issue = issueRaw ? issueRaw : '';
  console.log("issue: ", issue);

  const doiElement = document.querySelector('#publication-doi .et_pb_text_inner p a');
  const doi = doiElement ? doiElement.getAttribute('href') : '';
  console.log("doi: ", doi);

  return { title, authors, issue, doi };
}

// Step 2: Define APA citation formats object
const apaFormats = {
  'APA 6th Edition': function(article) {
    const authorString = article.authors.join(', ');
    return `${authorString} (${new Date().getFullYear()}). ${article.title}. ${article.issue}. ${article.doi}`;
  },
  'APA 7th Edition': function(article) {
    const formattedAuthors = article.authors.map(author => {
      const words = author.split(' ');
      const firstName = words.shift();
      const lastName = words.pop().replace(',', '');
      return `${lastName}, ${words.join(' ')} ${firstName.charAt(0)}.`;
    }).join(', ');
    return `${formattedAuthors} (${new Date().getFullYear()}). ${article.title}. ${article.issue}. ${article.doi}`;
  },
  'ACM': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName[0]}.`;
    }).join(', ');
    return `${authorString}. ${new Date().getFullYear()}. ${article.title}. ${article.issue}. ${article.doi}`;
  },
  'ACS': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName}`;
    }).join('; ');
    return `${authorString}. ${article.title}. ${article.issue}. ${article.doi}.`;
  },
  'ABNT': function(article) {
    const formattedAuthors = article.authors.map(author => {
      const words = author.split(' ');
      const lastName = words.pop().replace(',', '');
      const firstInitials = words.filter(word => !word.match(/^[A-Z]\.$/)).map(word => word.charAt(0)).join(' ');
      return `${lastName.toUpperCase()}, ${firstInitials}.`;
    }).join('; ');
    return `${formattedAuthors}. ${article.title}. ${article.issue}. ${article.doi}. ${new Date().getFullYear()}.`;
  },
  'Chicago': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName} ${firstName}`;
    }).join(', ');
    return `${authorString}. "${article.title}." ${article.issue} (${new Date().getFullYear()}): ${article.doi}.`;
  },
  'Harvard': function(article) {
    const authorString = article.authors.map(author => {
      const [lastName, ...rest] = author.split(' ');
      return `${rest.join(' ')} ${lastName.toUpperCase()}`;
    }).join(', ');
    return `${authorString} ${new Date().getFullYear()}, ${article.title}, ${article.issue}, ${article.doi}.`;
  },
  'IEEE': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${firstName[0]}. ${lastName}`;
    }).join(', ');
    return `${authorString}, "${article.title}," ${article.issue}, ${new Date().getFullYear()}, doi: ${article.doi}.`;
  },
  'MLA': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName}`;
    }).join(', ');
    return `${authorString}. "${article.title}." ${article.issue}, ${new Date().getFullYear()}, ${article.doi}.`;
  },
  'Turabian': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName}, ${firstName}`;
    }).join(', ');
    return `${authorString}. "${article.title}." ${article.issue} (${new Date().getFullYear()}): ${article.doi}.`;
  },
  'Vancouver': function(article) {
    const authorString = article.authors.map(author => {
      const [firstName, lastName] = author.split(' ');
      return `${lastName} ${firstName[0]}`;
    }).join(', ');
    return `${authorString}. ${article.title}. ${article.issue}. ${new Date().getFullYear()};${article.doi}.`;
  }
}


// Step 3: Create dropdown menu for APA citation formats
function createDropdown() {
  const select = document.createElement('select');
  Object.keys(apaFormats).forEach(format => {
    const option = document.createElement('option');
    option.value = format;
    option.textContent = format;
    select.appendChild(option);
  });
  document.querySelector('#citation-frame').appendChild(select);

  // Update citation when selection changes
  select.addEventListener('change', function() {
    const article = getArticleInfo();
    const selectedFormat = this.value;
    const citation = apaFormats[selectedFormat](article);
    document.querySelector('#citation-frame p').textContent = citation;
  });
}

// Step 4: Retrieve selected APA citation format and display citation
function displayCitation(article) {
  const selectedFormat = document.querySelector('select').value;
  const citation = apaFormats[selectedFormat](article);
  const citationElem = document.createElement('p');
  citationElem.textContent = citation;
  document.querySelector('#citation-frame').appendChild(citationElem);

// Copy citation to clipboard when button is clicked
document.addEventListener('DOMContentLoaded', () => {
  const citeButton = document.getElementById('cite-button');
  if (citeButton) {
    citeButton.addEventListener('click', () => {
      const selectedFormat = document.querySelector('select').value;
      const article = getArticleInfo();
      const citation = apaFormats[selectedFormat](article);
      copyTextToClipboard(citation);
    });
  }
});

async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Error copying text to clipboard', err);
  }
}

// On page load, create APA citation format dropdown and display default citation
document.addEventListener('DOMContentLoaded', function() {
  createDropdown();
  const article = getArticleInfo();
  displayCitation(article);
});



  // Ajoute un autre écouteur d'événements pour exécuter des fonctions
  // une fois que le contenu du document est complètement chargé.
  document.addEventListener('DOMContentLoaded', () => {
    // Sélectionne le bouton pour copier la citation à partir de la page HTML.
    const citeButton = document.getElementById('cite-button');

    // Vérifie si le bouton a été trouvé.
    if (citeButton) {
      // Ajoute un écouteur d'événements 'click' au bouton pour copier la citation.
      citeButton.addEventListener('click', () => {
        // Sélectionne l'élément de citation à partir de la page HTML.
        const citationElement = document.getElementById('citation-text');

        // Vérifie si l'élément de citation a été trouvé.
        if (citationElement) {
          // Copie le texte de l'élément de citation dans le presse-papier.
          copyTextToClipboard(citationElement.textContent);
        }
      });
    }
  });