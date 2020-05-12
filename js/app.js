'use strict';

var uniqueIndexArray = [];
var allProducts = [];
var parentElement = document.getElementById('product');
var numberOfRounds = 25;
var names = [];
var votes = [];

function ProductImage(name, extension){
  this.filepath = `img/${name}${extension}`;
  this.alt = name;
  this.title = name;
  this.votes = 0;
  this.views = 0;
  allProducts.push(this);
}

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


// BusMall Product Object Instances
new ProductImage('bag', '.jpg');
new ProductImage('banana', '.jpg');
new ProductImage('bathroom', '.jpg');
new ProductImage('boots', '.jpg');
new ProductImage('breakfast', '.jpg');
new ProductImage('bubblegum', '.jpg');
new ProductImage('chair', '.jpg');
new ProductImage('cthulhu', '.jpg');
new ProductImage('dog-duck', '.jpg');
new ProductImage('dragon', '.jpg');
new ProductImage('pen', '.jpg');
new ProductImage('pet-sweep', '.jpg');
new ProductImage('scissors', '.jpg');
new ProductImage('shark', '.jpg');
new ProductImage('sweep', '.png');
new ProductImage('tauntaun', '.jpg');
new ProductImage('unicorn', '.jpg');
new ProductImage('usb', '.gif');
new ProductImage('water-can', '.jpg');
new ProductImage('wine-glass', '.jpg');




function getRandomIndex(){
  var index = getRandomNumber(allProducts.length)
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allProducts.length);
  }

  uniqueIndexArray.push(index);

  if(uniqueIndexArray.length > 3){
    uniqueIndexArray.shift();
  }

  return index;
}






// Helper function to get the random number
function getRandomNumber(max){
  return Math.floor(Math.random() * max);
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

