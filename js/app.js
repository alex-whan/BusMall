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

new ProductImage('img/bag.jpg', 'R2-D2 Roller Bag', 'R2-D2 Roller Bag')
new ProductImage('img/banana.jpg', 'Banana Slicer', 'Banana Slicer')
new ProductImage('img/bathroom.jpg', 'Toilet Paper Tablet Stand', 'Toilet Paper Tablet Stand')
new ProductImage('img/boots.jpg', 'Toeless Rain Boots', 'Toeless Rain Boots')
new ProductImage('img/breakfast.jpg', 'All-in-One Breakfast Station', 'All-in-One Breakfast Station')
new ProductImage('img/bubblegum.jpg', 'Meatball Bubble Gum', 'Meatball Bubble Gum')
new ProductImage('img/chair.jpg', 'Rounded Chair', 'Rounded Chair')
new ProductImage('img/cthulhu.jpg', 'Cthulhu Action Figure', 'Cthulhu Action Figure')
new ProductImage('img/dog-duck.jpg', 'Dog Duck Mask', 'Dog Duck Mask')
new ProductImage('img/dragon.jpg', 'Dragon Meat', 'Dragon Meat')
new ProductImage('img/pen.jpg', 'Utensil Pens', 'Utensil Pens')
new ProductImage('img/pet-sweep.jpg', 'Pet Sweep', 'Pet Sweep')
new ProductImage('img/scissors.jpg', 'Pizza Scissors', 'Pizza Scissors')
new ProductImage('img/shark.jpg', 'Shark Sleeping Bag', 'Shark Sleeping Bag')
new ProductImage('img/sweep.png', 'Baby Sweeper', 'Baby Sweeper')
new ProductImage('img/tauntaun.jpg', 'Tauntaun Sleeping Bag', 'Tauntaun Sleeping Bag')
new ProductImage('img/unicorn.jpg', 'Unicorn Meat', 'Unicorn Meat')
new ProductImage('img/usb.gif', 'Tentacle USB Drive', 'Tentacle USB Drive')
new ProductImage('img/water-can.jpg', 'Curved Watering Can', 'Curved Watering Can')
new ProductImage('img/wine-glass.jpg', 'Enclosed Wine Glass', 'Enclosed Wine Glass')

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

