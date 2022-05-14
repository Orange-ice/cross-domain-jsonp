const dom = document.querySelector('#data');


function ajax(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(request);
        }
      }
    };
    request.send();
  });
}
// 直接通过 ajax 发送请求会被跨域限制
// ajax("get", "http://localhost:8888/my.json").then(response => {
//   console.log("这是 AJAX");
//   console.log(response);
// });




function jsonp(url){
  return new Promise((resolve, reject) => {
    window.jsonpCallback = (data) => {
      resolve(data);
    }

    const script = document.createElement('script');
    script.src = `${url}?callback=jsonpCallback`;

    script.onload = () => {
      script.remove()
    }

    script.onerror = () => {
      reject(new Error('error'))
    }

    document.body.appendChild(script);

  })
}

jsonp("http://localhost:8888/data").then(response => {
  console.log("这是 JSONP");
  console.log(response);

  const title = document.createElement('h2');
  title.innerText = '这是通过 JSONP 获取的数据：';
  dom.appendChild(title);
  response.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item.name;
    dom.appendChild(li);
  })
});