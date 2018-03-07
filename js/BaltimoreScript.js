/**
 * Use python simple http server to run code in development
 * If you have python 3 you may need to specify the python 2.7 binary
 * python2.7 -m SimpleHTTPServer 8000
 *
 * otherwise this should be fine
 * python -m SimpleHTTPServer 8000
 */

/**
 * `.innerHTML is a getter function, meaning it only gets information`
 * passing it an argument, in this case "content" will break it
 * if we want to set the innerHTML of an HTML node you can just use the = sign for assignment and pass it a String
 * Remember! We're setting the HTML so we need to include the HTML tags
 * if you want to instead set the inner content of an HTML node you can possibly use `element.innerText = `
 */

const ul = document.getElementById('data');
const url = "https://data.baltimorecity.gov/resource/citations.json";

/**
 * fetch pulls data using an HTTP request. It takes the url argument to
 * know where to pull data from. .then() just means do this next bit with
 * the result of the previous function. With the response it formats it into
 *
 */
fetch(url)
.then(response => {
  return response.json()
})
.then(json => {
  for(let i = 0; i < json.length; i++){
    console.log(json[i]);
    ul.innerHTML += "<li><a>" + json[i].tag + "</a></li>";
  }
});

/**
 * searchFilter() is called by the html when a key is released
 * inside of the search box. It reads what is currently in the
 * box and shoves it to uppercase letters. Then it searches for
 * things in the list that match the input.
 */
function searchFilter(){
  let input, filter, ul, li, a;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("data");
  li = ul.getElementsByTagName("li");

  for(let i = 0; i < li.length; i++){
    a = li[i].getElementsByTagName("a")[0];
    if(a.innerHTML.toUpperCase().indexOf(filter) > -1){
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
