/**
 * Use python simple http server to run code in development
 * If you have python 3 you may need to specify the python 2.7 binary
 * python2.7 -m SimpleHTTPServer 8000
 *
 * otherwise this should be fine
 * python -m SimpleHTTPServer 8000
 */

const ul = document.getElementById('data');
const url = "https://data.baltimorecity.gov/resource/citations.json";

//helper function to create a node based off of an element.
function createNode(element){
  return document.createElement(element);
}

//help  er function to add the node to it's parent.
function append(parent, el){
  return parent.appendChild(el);
}

//javascript machine br0ke
// ul.innerHTML('content');
/**
 * `.innerHTML is a getter function, meaning it only gets information`
 * passing it an argument, in this case "content" will break it
 */
console.log("inner html of ul element", ul.innerHTML);
/**
 * if we want to set the innerHTML of an HTML node you can just use the = sign for assignment and pass it a String
 * Remember! We're setting the HTML so we need to include the HTML tags
 * if you want to instead set the inner content of an HTML node you can possibly use `element.innerText = `
 */
console.log("setting inner html of ul element");
ul.innerHTML = "<li>I'm inside the li</li>"
console.log("new inner html of ul element", ul.innerHTML);

fetch(url)
.then(toSite => {}) // this is the respnose that fetch returns
.then(response => {
  // is what was returned from previous `.then()`
  // I'm actually not sure why it's undefined, but usually the value in the next `.then` is the value returned from the previous `.then`
  // if you replace {} with 3 for example, the response arg with be === to 3
  console.log(response);

  if(response.ok && response.status === 200){
    return response.json;
  }
})


fetch(url)
.then(response => {
  console.log("response from the endpoint url we called", response);
  return response.json()
})
.then(json => {
  console.log("the json body, response.json() calls JSON.parse() for us", json);
})
