const pg_data = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

const venues = [];

fetch(pg_data)
  .then(blob => blob.json())
  .then(data => venues.push(...data))

function findMatches(wordsToMatch, venues) {
  return venues.filter(venue => {
    const regex = new RegExp(wordsToMatch, 'gi');
    return venue.name.match(regex) || venue.city.match(regex)
  });
}
function displayMatches() {
  const matchArray = findMatches(this.value, venues);
  const html = matchArray.map(venue => {
    const regex = new RegExp(this.value, 'g');
    const venueName = venue.name.replace(regex, `<span class="highlightme">${regex.source}</span>`);
    const venueCity = venue.city.replace(regex, `<span class="highlightme">${regex.source}</span>`);
    return `
      <li>
        <span class="name">${venueName},  </span>
        <span class="cityAndZip">${venueCity},  ${'MD '}${venue.zip},  </span>
        <span class="establishmentType">${venue.category},  </span>
        <span class="inspectionResults">${venue.inspection_results}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}
const searchInput = document.querySelector('.textinput');
const suggestions = document.querySelector('.suggestions');
searchInput.addEventListener('keyup', displayMatches);
