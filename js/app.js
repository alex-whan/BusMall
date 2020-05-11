'use strict';

var parent = document.getElementById('product');
var numberOfRounds = 25;
var allProducts = [];

function ProductImage(url, alt, title){
  this.filePath = url;
  this.alt = alt;
  this.title = title;
  this.views = 0;
  this.votes = 0;
  allProducts.push(this);
}

new ProductImage('img/bag.jpg', 'bag', 'bag')
new ProductImage('img/banana.jpg', 'banana', 'banana')
new ProductImage('img/bathroom.jpg', 'bathroom', 'bathroom')
new ProductImage('img/boots.jpg', 'boots', 'boots')
new ProductImage('img/breakfast.jpg', 'breakfast', 'breakfast')
new ProductImage('img/bubblegum.jpg', 'bubblegum', 'bubblegum')
new ProductImage('img/chair.jpg', 'chair', 'chair')
new ProductImage('img/cthulhu.jpg', 'cthulhu', 'cthulhu')
new ProductImage('img/dog-duck.jpg', 'dog-duck', 'dog-duck')
new ProductImage('img/dragon.jpg', 'dragon', 'dragon')
new ProductImage('img/pen.jpg', 'pen', 'pen')
new ProductImage('img/pet-sweep.jpg', 'pet-sweep', 'pet-sweep')
new ProductImage('img/scissors.jpg', 'scissors', 'scissors')
new ProductImage('img/shark.jpg', 'shark', 'shark')
new ProductImage('img/sweep.png', 'sweep', 'sweep')
new ProductImage('img/tauntaun.jpg', 'tauntaun', 'tauntaun')
new ProductImage('img/unicorn.jpg', 'unicorn', 'unicorn')
new ProductImage('img/usb.gif', 'usb', 'usb')
new ProductImage('img/water-can.jpg', 'water-can', 'water-can')
new ProductImage('img/wine-glass.jpg', 'wine-glass', 'wine-glass')

ProductImage.prototype.renderImage = function(){
  // create an element - img
  var imageElement = document.createElement('img');
  // fill the src with the path to the specific product
  imageElement.setAttribute('src', this.filePath);
  // fill in the alt which is going to be the name of the image minus the file extension (.jpg)
  imageElement.setAttribute('alt', this.alt);
  // fill in the title with the same text as the alt
  imageElement.setAttribute('title', this.title);
  // appendChild to parent element (imageElement)
  parent.appendChild(imageElement);
}

// Helper function to get the random number
function randomNumber(min = 0, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Render THREE random images to DOM from the product image array

function getRandomProduct(){
// First give an empty string to parent to clear all content
  parent.textContent = '';

  // Call random number function to get random product index position from allProducts array

  var firstRandomIndex = randomNumber(0, allProducts.length-1);
  var secondRandomIndex = randomNumber(0, allProducts.length-1);
  var thirdRandomIndex = randomNumber(0, allProducts.length-1);

  while(firstRandomIndex === secondRandomIndex || firstRandomIndex === thirdRandomIndex || secondRandomIndex === thirdRandomIndex){
    secondRandomIndex = randomNumber(0, allProducts.length-1);
    thirdRandomIndex = randomNumber(0, allProducts.length-1);
  }
  
  allProducts[firstRandomIndex].renderImage();
  allProducts[firstRandomIndex].views++;

  allProducts[secondRandomIndex].renderImage();
  allProducts[secondRandomIndex].views++;

  allProducts[thirdRandomIndex].renderImage();
  allProducts[thirdRandomIndex].views++;

}

// Create function to handle the click
// set up event listener
parent.addEventListener('click', clickHandler);

// Event handler
function clickHandler(event){
  var titleOfProductThatWasClickedOn = event.target.title;

  for(var i=0; i<allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === allProducts[i].title){
      allProducts[i].votes++
      numberOfRounds--;
    } 
  }

  if (numberOfRounds===0) {
    parent.removeEventListener('click', clickHandler);
    displayResults();
  } else {
    getRandomProduct();
  }
};

// function to display results of survey once the number of rounds maxes out (default is 25 rounds)
function displayResults(){
  parent.textContent = '';
  parent = document.getElementById('results');
  var listElement = document.createElement('ul');

  for(var i=0; i<allProducts.length; i++){
    listElement = document.createElement('li');
    listElement.textContent = `${allProducts[i].title} had ${allProducts[i].votes} votes and was shown ${allProducts[i].views} times.`
    parent.appendChild(listElement);
  }
  parent.appendChild(listElement);
}

getRandomProduct();

