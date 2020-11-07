function shringItemData(restaurantList) {
  const categories = restaurantList.map(x => [x.name, x.address_line1, x.address_line2, x.city, x.state, x.zip]);
  
  return categories;
}
function runDataFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer));

  const matchResults = shringItemData(jsonFromServer);
  console.log(matchResults);
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const form = $(e.target).serializeArray();
  const venues = []; 
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => venues.push(...jsonFromServer))
    .then((venues) => matching(venues))
    .catch((err) => {
      console.log(err);
    });
});
function matching(venues) {
  const searchInput = document.querySelector('.searchbar');
  const suggestions = document.querySelector('.suggestions');
  
  const results = findMatches(searchInput, venues);

}

function findMatches(word, venues) {
  return venues.filter (venue => {
    const regex = new RegExp(word, 'gi');
    return venues.name.match(regex) || venues.city.match(regex)
  });
}
function displayMatches() {
  const matchArray = findMatches(this.value, venues);
  console.log(matchArray);
}
