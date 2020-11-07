
function narrowDataScope (data) {
    const objectList = data.map(restaurant => ${data.name} ${data.address_line1} ${data.city} ${data.state} ${data.zip});
    console.log(objectList)
    return objectList;
} 
  
  
function getResults(jsonFromServer) {
    console.log('jsonFromServer', jsonFromServer);
    
   /* const narrowData = narrowDataScope(jsonFromServer);
    const matchedResults = matchText(input_text, narrowData);
    const options = makeYourOptionsObject(reorganizedData);
    const chart = new CanvasJS.Chart('chartContainer', options);
    chart.render();

    function matchText(input_text, restaurants) {
    return restaurants.filter(venue => {
        const regex = new RegExp(wordToMatch, 'gi');
        return venue.
    })
    */
}

  
/*document.body.addEventListener('submit', async (e) => {
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
    console.log(err);
});

  */