const dom = document.querySelector('#data');

const request = new XMLHttpRequest();
request.open('GET', '/my.json');
request.onreadystatechange = () => {
  if(request.readyState===4 && request.status===200) {
    const data = JSON.parse(request.response)
    data.forEach(item => {
      const li = document.createElement('li')
      li.innerText = item.name
      dom.appendChild(li)
    })
  }
}

request.send();
