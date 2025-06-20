// List your poem files here:
const poemFiles = [
  'poems/kiera1.txt',
  'poems/MrsKennyTengu1.txt',
  'poems/eggelette1.txt',
  'poems/kiera2.txt',
  'poems/oscarchopstick1.txt',
  'poems/robonthat1.txt',
  // Add more poem filenames as you create them
];

const poemsContainer = document.getElementById('poems');

async function loadPoemsInOrder() {
  for (const file of poemFiles) {
    try {
      const response = await fetch(file);
      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }
      const text = await response.text();

      const lines = text.split('\n');
      const title = lines[0] || 'Untitled';
      const author = lines[1] || 'Unknown';
      const authorLink = lines[2] && lines[2].trim() !== "" ? lines[2].trim() : null;

      // Extract body lines, then trim leading & trailing empty lines
      let bodyLines = lines.slice(authorLink ? 3 : 2);

      // Remove leading empty lines
      while (bodyLines.length > 0 && bodyLines[0].trim() === '') {
        bodyLines.shift();
      }
      // Remove trailing empty lines
      while (bodyLines.length > 0 && bodyLines[bodyLines.length - 1].trim() === '') {
        bodyLines.pop();
      }

      const body = bodyLines.join('\n');

      // Create HTML elements
      const article = document.createElement('article');
      article.classList.add('poem');

      const titleEl = document.createElement('h2');
      titleEl.classList.add('poem-title');
      titleEl.textContent = title;

      const authorEl = document.createElement('h3');
      authorEl.classList.add('poem-author');

      if (authorLink) {
        authorEl.innerHTML = `by <a href="${authorLink}" target="_blank" rel="noopener noreferrer" class="author-link">${author}</a>`;
      } else {
        authorEl.innerHTML = `by <span class="author-name">${author}</span>`;
      }

      const bodyEl = document.createElement('p');
      bodyEl.classList.add('poem-text');
      bodyEl.textContent = body;

      // Append elements
      article.appendChild(titleEl);
      article.appendChild(authorEl);
      article.appendChild(bodyEl);
      poemsContainer.appendChild(article);
    } catch (error) {
      console.error(error);
    }
  }
}

// Call the async loader
loadPoemsInOrder();
