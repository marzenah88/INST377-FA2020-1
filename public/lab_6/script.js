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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
// custom function that generates an array of random unique integers between 0 and given maxValue
function arrOfUniqueRandInt (maxVal, arrSize) {
  const uniqueArr = [];
  let n = 0;
  while (n < arrSize) {
    const num = getRandomInt(maxVal);
    if (!uniqueArr.includes(num)) {
      uniqueArr.push(num);
      n += 1;
    } 
  }
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
      console.log('fromServer', fromServer);
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      //const arr1 = range(10);
      const dataLength = fromServer.length;
      const arrIndexes = arrOfUniqueRandInt(dataLength, 10)
      const arrOf10 = arrIndexes.map(function(num) => {
        return fromServer[index];
      });

      const inputList = arrOf10.sort((a, b) => sortFunction(b, a, 'name'));
      const selected = document.createElement('ol');
      selected.className = 'flex-inner';
      $('form').prepend(selected);

      inputList.forEach((el, i) => {
        const li = document.createElement('li');
        $(li).append(`<input type='checkbox' id= ${el.code} value=${el.code} />`);
        $(li).append(`<label for=${el.code}>${el.name}</label>`);
        $(selected).append(li);
      });
    })
    .catch((err) => console.log(err));
});