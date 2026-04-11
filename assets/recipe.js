document.addEventListener('DOMContentLoaded', () => {
  setNavbarOffset();
  restructureRecipe();
  setupWakeLock();
});

function setNavbarOffset() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const height = navbar.getBoundingClientRect().height;
  document.documentElement.style.setProperty('--navbar-height', (height + 8) + 'px');
}

function restructureRecipe() {
  const body = document.getElementById('recipe-body');
  if (!body) return;

  const children = Array.from(body.childNodes);
  let currentSection = 'intro';
  const sections = { intro: [], ingredients: [], directions: [], other: [] };

  for (const node of children) {
    if (node.nodeType === Node.ELEMENT_NODE && /^H[1-6]$/.test(node.tagName)) {
      const text = node.textContent.trim().toLowerCase();
      if (text.includes('ingredient')) currentSection = 'ingredients';
      else if (text.includes('direction') || text.includes('instruction') || text.includes('step')) currentSection = 'directions';
      else if (text.includes('source') || text.includes('notes')) currentSection = 'other';
      // Subsection headings (e.g. "Ingredients - Salad") stay in their current section
    }
    sections[currentSection].push(node);
  }

  // Only restructure if we found both sections
  if (!sections.ingredients.length || !sections.directions.length) return;

  const left = document.createElement('div');
  left.className = 'recipe-ingredients';
  sections.ingredients.forEach(n => left.appendChild(n.cloneNode(true)));

  // Wake lock button lives at the bottom of the sticky ingredients column
  const btn = document.createElement('button');
  btn.id = 'wake-lock-btn';
  btn.className = 'wake-lock-btn';
  btn.setAttribute('aria-pressed', 'false');
  btn.textContent = '\uD83D\uDCA1 Keep Screen On';
  left.appendChild(btn);

  const right = document.createElement('div');
  right.className = 'recipe-directions';
  sections.directions.forEach(n => right.appendChild(n.cloneNode(true)));

  const cols = document.createElement('div');
  cols.className = 'recipe-columns';
  cols.appendChild(left);
  cols.appendChild(right);

  body.innerHTML = '';

  if (sections.intro.length) {
    const intro = document.createElement('div');
    intro.className = 'recipe-intro';
    sections.intro.forEach(n => intro.appendChild(n.cloneNode(true)));
    body.appendChild(intro);
  }

  body.appendChild(cols);

  const main = document.querySelector('[role="main"]');
  if (main) main.classList.add('recipe-wide');

  if (sections.other.length) {
    const footer = document.createElement('div');
    footer.className = 'recipe-footer';
    sections.other.forEach(n => footer.appendChild(n.cloneNode(true)));
    body.appendChild(footer);
  }
}

function setupWakeLock() {
  const btn = document.getElementById('wake-lock-btn');
  if (!btn) return;

  if (!('wakeLock' in navigator)) {
    btn.disabled = true;
    btn.title = 'Screen wake lock is not supported in this browser';
    return;
  }

  let wakeLock = null;

  async function requestWakeLock() {
    wakeLock = await navigator.wakeLock.request('screen');
    btn.textContent = '\u2600\uFE0F Screen staying on';
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('active');
    wakeLock.addEventListener('release', () => {
      wakeLock = null;
      btn.textContent = '\uD83D\uDCA1 Keep Screen On';
      btn.setAttribute('aria-pressed', 'false');
      btn.classList.remove('active');
    });
  }

  btn.addEventListener('click', async () => {
    if (wakeLock) {
      await wakeLock.release();
    } else {
      try { await requestWakeLock(); } catch (e) { /* denied or unavailable */ }
    }
  });

  // Re-acquire after tab becomes visible again (wake lock releases on hide)
  document.addEventListener('visibilitychange', async () => {
    if (document.visibilityState === 'visible' && btn.classList.contains('active')) {
      try { await requestWakeLock(); } catch (e) {}
    }
  });
}
