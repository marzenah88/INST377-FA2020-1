// You may wish to find an effective randomizer function on MDN.

const { default: countries } = require("./countries");

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortFunction(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  } if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      const names = countries.map(country => `${country.name}`);
      console.log(names);

      // random integer between min(inclusive) and max(not inclusive).
      function randomIndex(min, max) {
        return Math.random() * (max - min) + min;
      }
      const indexes = [];
      while (indexes.length < 10) {
        let num = randomIndex(0, countires.length - 1);
        if (indexes.includes(num)) continue;
        else (indexes += num);
      const arr = [];
      indexes.forEach(index => {
        arr += names[index]
      });
      console.log(arr);
      const sortedSet = names.sort((last, next) => {
        return last < next ? 1 : -1;
      });
      console.log(names);


      console.log('fromServer', fromServer);
      


    });
    .catch((err) => console.log(err));
});