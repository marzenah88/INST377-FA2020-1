const pg_data = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const venues = [];

fetch(pg_data)
  .then(blob => blob.json())
  .then(data => venues.push(...data))

function findMatches(wordsToMatch, venues) {
  return venues.filter(venue => {
    const regex = new RegExp(wordsToMatch, 'gi');
    if (!(regex === null || venue.name === null || venue.city === null)) {
      return venue.name.match(regex) || venue.zip.match(regex); 
    }
  });
}
function displayMatches() {
  const matchArray = findMatches(this.value, venues);
  const html = matchArray.map(venue => {
    const regex = new RegExp(this.value, 'gi');
    const venueName = venue.name.replace(regex, `<span class="highlightme">${this.value}</span>`);
    const venueZip = venue.zip.replace(regex, `<span class="highlightme">${this.value}</span>`); 
    return `
      <li>
        <span class="name">${venueName.toLowerCase()},  </span>
        <span class="stateAndZip"> ${'MD '}${venueZip},  </span>
        <span class="establishmentType">${venue.category},  </span>
        <span class="inspectionResults">${venue.inspection_results}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('input', displayMatches);
