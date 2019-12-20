/**
 * Use python simple http server to run code in development
 * If you have python 3 you may need to specify the python 2.7 binary
 * python2.7 -m SimpleHTTPServer 8000
 *
 * otherwise this should be fine
 * python -m SimpleHTTPServer 8000
 *
 * `.innerHTML is a getter function, meaning it only gets information`
 * passing it an argument, in this case "content" will break it
 * if we want to set the innerHTML of an HTML node you can just use the = sign for assignment and pass it a String
 * Remember! We're setting the HTML so we need to include the HTML tags
 * if you want to instead set the inner content of an HTML node you can possibly use `element.innerText = `
 *
 * fetch pulls data using an HTTP request. It takes the url argument to
 * know where to pull data from. .then() just means do this next bit with
 * the result of the previous function. With the response it formats it into
 *
 */

function fetchURL(url) {
  let search = document.getElementById('searchInput').value;
  if (search && typeof search === 'string') {
    search = search.toUpperCase();
  }
  const options = {
    method: 'GET',
  }
  url += "?tag=" + search;

  fetch(url, options)
  .then(response => {
    if (response.ok && response.status === 200) {
      return response.json();
    }
  })
  .then(json => {
    renderTags(json);
  })
  .catch(error => {
    console.log("Error fetching " + url);
    console.log(error);
  });
}

/**
 * renderTags() is called by the html when Search button is clicked
 * It reads what is currently in the box and shoves it to uppercase 
 * letters. Then it searches for things in the list that match the input.
 */
function renderTags(json) {
  const ul = document.getElementById('tag-list');
  ul.innerHTML = "";
  ul.innerHTML += "<li class=\"tag-return\">Tag: " + json[0].tag +
                  "<br> Balance Due: " + json[0].balance +
                  "<br> ";
}

document.getElementById('search-btn').onclick = function(e) {
  fetchURL(conf.url);
}
