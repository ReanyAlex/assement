//function to flip the order of DOM elements on the DOM tree
function flip() {
  //grab information from the DOM
  var element = document.querySelector('#flip');
  var elementClasses = element.className.split(' ');
  var hasFloat = elementClasses.indexOf('float-right');

  // Tenary expression to check if float is currently applied or not
  hasFloat === -1
    ? (element.className = 'content-article-img-div float-right')
    : (element.className = elementClasses[0]);
}

//function to change img in a DOM eleemnt
function newImg() {
  //grab information from the DOM
  var element = document.querySelector('#change');

  // Tenary expression to check which src to and insert the correct srx
  element.src === 'http://localhost:3000/assets/images/computer2.jpg'
    ? (element.src = 'assets/images/computer2b.jpg')
    : (element.src = 'assets/images/computer2.jpg');
}
