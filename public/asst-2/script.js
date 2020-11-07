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
    .then((jsonFromServer) => getResults(jsonFromServer))   
    .catch((err) => {
      console.log(err);
    });
});
function getResults(data) {
  console.log('jsonFromServer', jsonFromServer);
  return 1;
}
