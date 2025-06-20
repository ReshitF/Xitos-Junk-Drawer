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

poemFiles.forEach(file => {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Could not load ${file}`);
      }
      return response.text();
    })
    .then(text => {
      const lines = text.split('\n');
      const title = lines[0] || 'Untitled';
      const author = lines[1] || 'Unknown';
      const body = lines.slice(2).join('\n');

      // Create HTML elements
      const article = document.createElement('article');
      article.classList.add('poem');

      const titleEl = document.createElement('h2');
      titleEl.classList.add('poem-title');
      titleEl.textContent = title;

      const authorEl = document.createElement('h3');
      authorEl.classList.add('poem-author');
      authorEl.textContent = `by ${author}`;

      const bodyEl = document.createElement('p');
      bodyEl.classList.add('poem-text');
      bodyEl.textContent = body;

      // Append
      article.appendChild(titleEl);
      article.appendChild(authorEl);
      article.appendChild(bodyEl);
      poemsContainer.appendChild(article);
    })
    .catch(error => {
      console.error(error);
    });
});
