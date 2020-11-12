const lab_data = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const venues = [];

fetch(lab_data)
  .then(blob => blob.json())
  .then(data => venues.push(...data));

function findMatches(wordsToMatch, venues) {
  return venues.filter(venue => {
    const regex = new RegExp(wordsToMatch, 'gi');
    if (wordsToMatch === "") {
      return null;
    }
    return venue.name.match(regex) || venue.city.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, venues);
  const html = matchArray.map(venue => {
    const regex = new RegExp(this.value, 'gi');
    const venueName = venue.name.replace(regex, `<span class="highlightme">${this.value}</span>`);
    const venueCity = venue.city.replace(regex, `<span class="highlightme">${this.value}</span>`);
    return `
      <li>
        <span class="name">${venueName}, ${'/n'} </span>
        <span class="cityAndZip"> ${venueCity}, ${', '}, ${venue.zip}, ${'/n'} </span>
        <span class="establishmentType">${venue.category}, ${'/n'}</span>
        <span class="inspectionResults">${venue.inspection_results}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

/*wesbos' input had a class of 'search' but ours is textinput */
const searchInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('input', displayMatches);
