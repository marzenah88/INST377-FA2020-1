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
      console.log('fromServer');
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const arr1 = range(10);
      dataLength = fromServer.length;
      const arrOf10 = arr1.map((i) => {
        const index = getRandomInt(dataLength);
        return fromServer[index];
      });

      const inputList = arrOf10.sort((a, b) => sortFunction(a, b, 'name'));
      const ordered_list = document.createElement('ol');
      ordered_list.className = 'flex-inner';
      $('form').prepend(ordered_list);

      inputList.forEach((el, i) => {
        const country = document.createElement('li');
        $(country).append(`<input type='checkbox' value=${el.code} />`);
        $(country).append(`<label for=${el.code}> ${el.name} < </label>`);
        $(orderedList).append(country);
      });
    })

    .catch((err) => console.log(err));
});