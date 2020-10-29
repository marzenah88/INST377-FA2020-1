function convertRestaurantsToCategories(restaurantList) {
  const counts = [];
  const catList = [];
  let index;
  restaurantList.forEach(item => {
    if (item.category in catList) {
      index =  catList.indexOf(item.category);
      counts[index] += 1;
    } else {
      const newCat = item.category;
      catList.push(newCat);
      counts.push(1);
    }
  });
  const result =[];
  catList.forEach (cat => {
    //const ind = catList.indexOf(cat)
    const count = counts[catList.indexOf(cat)]
    result.push({y: count, category: cat})
  });
  return result;
}

function makeYourOptionsObject(datapointsFromRestaurantsList) {
  // set your chart configuration here!
  CanvasJS.addColorSet('customColorSet1', ['#F4FA0D', '#186ED6', '#E326ED', '#00DE19', '#EB201C', '#702319', '#255BFS', '#20F03C', '#EB23AE', '#4C6275', '#F00000']);

  return {
    animationEnabled: true,
    colorSet: 'customColorSet1',
    title: {
      text: 'Places To Eat Out In Future'
    },
    axisX: {
      interval: 1,
      labelFontSize: 12
    },
    axisY2:{
      interlacedColor: 'rgba(1,77,101,.2)',
      gridColor: 'rgba(1,77,101,.1)',
      title: 'Restaurants By Category',
      labelFontSize: 12,
      scaleBreaks:{
        type: 'wavy', 
        customBreaks: [{startValue: 0, endValue: 50}, {startValue: 51, endValue: 100}, {startValue: 101, endValue: 150}, {startValue: 151, endValue: 200}] 
      }
         // Add your scale breaks here https://canvasjs.com/docs/charts/chart-options/axisy/scale-breaks/custom-breaks/
    },
    data: [{
      type: 'bar',
      name: 'restaurants',
      axisYType: 'secondary',
      dataPoints: datapointsFromRestaurantsList
    }]
  };
}

function runThisWithResultsFromServer(jsonFromServer) {
  console.log('jsonFromServer', jsonFromServer);
  sessionStorage.setItem('restaurantList', JSON.stringify(jsonFromServer)); // don't mess with this, we need it to provide unit testing support

  // Process your restaurants list
  // Make a configuration object for your chart
  // Instantiate your chart
  const reorganizedData = convertRestaurantsToCategories(jsonFromServer);
  const options = makeYourOptionsObject(reorganizedData);
  const chart = new CanvasJS.Chart('chartContainer', options);
  chart.render();
}

/// Leave lines 52-67 alone; do your work in the functions above
document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray();
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((jsonFromServer) => runThisWithResultsFromServer(jsonFromServer))
    .catch((err) => {
      console.log(err);
    });
});