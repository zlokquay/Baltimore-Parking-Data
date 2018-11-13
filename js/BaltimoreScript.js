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

(document.onload = function() {
  function escapeHTML (unsafe_str) {
    return unsafe_str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#39;')
      .replace(/\//g, '&#x2F;')
  }

  function searchForTags(e) {
    fetchURL();
  }

  function getTagSearchValue() {
    const searchValue = document.getElementById('searchInput').value;
    if (searchValue && typeof searchValue === 'string') {
      return searchValue.toUpperCase();
    }

    return null;
  }

  function getSearchUrl(tag) {
    return `${CONFIG.BASE_TAG_URL}?tag=${tag}`;
  }

  function fetchURL() {
    const tag = getTagSearchValue();
    if (!tag) return;

    const options = {
      method: 'GET',
    }
    const url = getSearchUrl(tag);

    fetch(url, options)
    .then(response => {
      if (response.ok && response.status === 200) {
        return response.json();
      }
    })
    .then(json => {
      if (json && json[0]) {
        const tagData = json[0];
        renderTags(tagData);
      }
    })
    .catch(error => {
      console.log("Error fetching " + url);
      console.log(error);

      // TODO: Implement this method and handle errors for user.
      // renderErrorMessage();
    });
  }

  function createListItems(parent, tagData) {
    for (let key in tagData) {
      let li = document.createElement('li');
      if (CONFIG.TAG_PREFIXES[key] && typeof tagData[key] === 'string') {
        parent.appendChild(li);
        li.innerText = `${CONFIG.TAG_PREFIXES[key]}${escapeHTML(tagData[key])}`;
      }
    }
  }

  /**
   * renderTags() is called by the html when a key is released
   * inside of the search box. It reads what is currently in the
   * box and shoves it to uppercase letters. Then it searches for
   * things in the list that match the input.
   */
  function renderTags(tagData) {
    const ul = document.getElementById('tag-list');
    if (tagData) {
      const values = [

      ];
      createListItems(ul, tagData);
    }
    return null;
  }

  const searchButton = document.getElementById('search-btn');
  searchButton.addEventListener('click', searchForTags);
})();
