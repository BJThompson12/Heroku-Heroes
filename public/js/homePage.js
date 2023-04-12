
const contentContainerEL = document.getElementById('content-container');
const btnContainerEl = document.getElementById('btn-container');
const navMatchEl = document.getElementById('match-button');
const favoritesBtn = document.getElementById('favorites-button')
const hamburgerFavoritesBtn = document.getElementById('favorites-button-hamburger')
const hamburgerMatchBtn = document.getElementById('match-button-hamburger')

btnContainerEl.addEventListener('click', (e) => {
  // run the next function to check what was clicked
  checkClick(e.target.textContent.trim());
});

navMatchEl.addEventListener('click', getHomePage)
favoritesBtn.addEventListener('click', getFavsPage)
hamburgerMatchBtn.addEventListener('click', getHomePage )
hamburgerFavoritesBtn.addEventListener('click', getFavsPage )

window.onload = getRandomAnime