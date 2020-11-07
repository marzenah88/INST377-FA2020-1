function shringItemData(restaurantList) {
  const categories = restaurantList.map(x => [x.name, x.address_line1, x.address_line2, x.city, x.state, x.zip]);
  
  return categories;
}
function runDataFromServer(jsonFromServer) {
  const matchResults = shringItemData(jsonFromServer);
  console.log(matchResults);
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runDataFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});