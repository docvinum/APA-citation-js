// Step 1: Retrieve article information from HTML
function getArticleInfo() {
  const journal = "IVES Conference Series";
  
  const titleElement = document.querySelector('h1');
  const title = titleElement ? titleElement.textContent : '';
  console.log("title: ", title);
  const rawAuthorsElement = document.querySelector('#publication-author');
  const rawAuthors = rawAuthorsElement ? rawAuthorsElement.textContent : '';
  const regex = /[⁰¹²³⁴⁵⁶⁷⁸⁹]|Auteurs : /g;
  const cleanAuthors = rawAuthors.replace(regex, '').trim();
  const authors = rawAuthors ? cleanAuthors.split(/(?:, |; | and | et )/) : [];
  console.log("authors: ", authors);
  const issueElement = document.querySelector('#publication-issue p');
  const issueRaw = issueElement ? issueElement.innerText.split(': ')[1] : '';
  const issue = issueRaw ? issueRaw : '';
  console.log("issue: ", issue);
  const doiElement = document.querySelector('#publication-doi p a');
  const doi = doiElement ? doiElement.getAttribute('href') : '';
  console.log("doi: ", doi);

  // Added 'date' constant
  const dateRegex = /\d{4}/;
  const dateMatch = issue.match(dateRegex);
  const date = dateMatch ? dateMatch[0] : '';
  console.log("date: ", date);

  return { title, authors, journal, issue, doi, date };
}

// Step 2: Define APA citation formats object
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
  citationElem.id = "citation"; // Add an ID to the citation element for easier reference
  citationElem.innerHTML = citation; // Change this line from "citationElem.textContent = citation;"
  document.querySelector("#citation-frame").appendChild(citationElem);
}


// On page load, create APA citation format dropdown and display default citation
document.addEventListener('DOMContentLoaded', function() {
  createDropdown();
  const article = getArticleInfo();
  displayCitation(article);

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
        } catch (err) {
          console.error('Error copying text to clipboard', err);
        }
      }
    });
  }
});