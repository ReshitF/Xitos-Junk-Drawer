async function loadWinnerPoem() {
  const container = document.getElementById('winner-poem');
  try {
    const res = await fetch('poems/eggelette1.txt');
    if (!res.ok) throw new Error('Failed to load winner poem');
    const text = await res.text();

    const lines = text.split('\n');
    const title = lines[0] || 'Untitled';
    const author = lines[1] || 'Unknown';
    const authorLink = lines[2] && lines[2].trim() !== "" ? lines[2].trim() : null;
    const body = lines.slice(authorLink ? 3 : 2).join('\n');

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

    article.appendChild(titleEl);
    article.appendChild(authorEl);
    article.appendChild(bodyEl);
    container.appendChild(article);
  } catch (err) {
    container.textContent = 'Sorry, winner poem failed to load.';
    console.error(err);
  }
}

loadWinnerPoem();
