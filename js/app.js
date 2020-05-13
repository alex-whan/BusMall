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

ProductImage.prototype.render = function(){
  // create an element - img
  var imageElement = document.createElement('img');
  // fill the src with the path to the specific product
  imageElement.setAttribute('src', this.filepath);
  // fill in the alt which is going to be the name of the image minus the file extension (.jpg)
  imageElement.setAttribute('alt', this.alt);
  // fill in the title with the same text as the alt
  imageElement.setAttribute('title', this.title);
  // appendChild to parent element (imageElement)
  parentElement.appendChild(imageElement);
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
  var index = getRandomNumber(allProducts.length);
// Get a random image from the product array to render
// Use helper function to generate a random number between 0 and the array length
// render that object instance at that index to the DOM

  // while loop will check to ensure index is unique from the last 3 products shown (not in uniqueIndexArray)
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allProducts.length);
  }

  uniqueIndexArray.push(index);

  // if array is more than 3 products long, shift from beginning in order to add new products
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

function displayImage(){
  var index = getRandomIndex();
  allProducts[index].render();
  allProducts[index].views++;
}

// Event handler
function clickHandler(event){
  // Empty everything out first
  parentElement.textContent = '';

  // Identify what was clicked (target)
  var titleOfProductThatWasClickedOn = event.target.title;

  // Loop through all object instances to compare titles - this will identify the target/clicked object
  for(var i=0; i<allProducts.length; i++){
    if(titleOfProductThatWasClickedOn === allProducts[i].title){
      // Add a vote to that product
      // Subtract one round from survey (counter)
      allProducts[i].votes++
      numberOfRounds--;
   
      if (numberOfRounds===0) {
        // Turn off event listener
        parentElement.removeEventListener('click', clickHandler);
        makeNamesArray();
      }   
    }
  }

  displayImage();
  displayImage();
  displayImage();
  // Listen for click - render new images when we hear it
  // Track views and votes for each image
}

displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', clickHandler);

// Loop over all products and make an array of just the names
function makeNamesArray(){
  for(var i=0; i<allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
  }

  generateChart();
}

function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: names,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: [             
                  'rgba(245, 100, 50, 0.5)'
              ],
              borderColor: [
                  'rgba(66, 66, 66, 1)'
              ],
              borderWidth: 2
            }
                             
        ],
          
      }, 
      
      options: {
          scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{ 
                stacked: true,
                
                
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      } //options ends here*/
  });

}




