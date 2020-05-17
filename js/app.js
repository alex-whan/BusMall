'use strict';

var uniqueIndexArray = [];
var allProducts = [];
var parentElement = document.getElementById('product');
var maxRounds = 25;
var totalRounds; // established NAME in global scope without VALUE
var names = [];
var votes = [];
var views = [];

function ProductImage(url, name, votes=0, views=0){
  this.filepath = url;
  this.alt = name;
  this.title = name;
  this.votes = votes;
  this.views = views;
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
  if(uniqueIndexArray.length > 6){
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
      allProducts[i].votes++;
      totalRounds++;   
    }
  }

  if (totalRounds===maxRounds) {
    // Turn off event listener
    parentElement.removeEventListener('click', clickHandler);
    localStorage.removeItem('totalRounds');
    makeNamesArray();
  } else {
    // save totalVotes here
    // Don't need to stringify the number in this case
    localStorage.setItem('totalRounds', totalRounds);
    
    var stringifiedProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringifiedProducts);

    displayImage();
    displayImage();
    displayImage();
  }
}

// Loop over all products and make an array of just the names
function makeNamesArray(){
  for(var i=0; i<allProducts.length; i++){
    names.push(allProducts[i].title);
    votes.push(allProducts[i].votes);
    views.push(allProducts[i].views);
  }

  generateChart();
}

// Generate graph using Chart.js - two datasets
function generateChart(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'horizontalBar',
      data: {
          labels: names,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: [             
                'rgba(255, 99, 132, 0.75)',
                'rgba(54, 162, 235, 0.75)',
                'rgba(255, 206, 86, 0.75)',
                'rgba(75, 192, 192, 0.75)',
                'rgba(153, 102, 255, 0.75)',
                'rgba(255, 99, 132, 0.75)',
                'rgba(54, 162, 235, 0.75)',
                'rgba(255, 206, 86, 0.75)',
                'rgba(75, 192, 192, 0.75)',
                'rgba(153, 102, 255, 0.75)',
                'rgba(255, 99, 132, 0.75)',
                'rgba(54, 162, 235, 0.75)',
                'rgba(255, 206, 86, 0.75)',
                'rgba(75, 192, 192, 0.75)',
                'rgba(153, 102, 255, 0.75)',
                'rgba(255, 99, 132, 0.75)',
                'rgba(54, 162, 235, 0.75)',
                'rgba(255, 206, 86, 0.75)',
                'rgba(75, 192, 192, 0.75)',
                'rgba(255, 159, 64, 0.75)'
              ],
              borderColor: [
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
                  'rgba(66, 66, 66, 1)',
              ],
              borderWidth: 2
            }, 
            {
              label: '# of Views',
              data: views,
              backgroundColor: [             

              ],
              borderColor: [

              ],
              borderWidth: 2
            }
                             
        ],
          
      }, 
      
      options: {
          scales: {
              xAxes: [{
                stacked: false,
              }],
              yAxes: [{ 
                stacked: true,
                
                
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });

}

function pageStartUp(){
  var productsFromLocalStorage = localStorage.getItem('products');

  // BusMall Product Object Instances
  // if statement - if there isn't local storage present, generate the ProductImage items below
  if(productsFromLocalStorage === null){
    new ProductImage('/img/bag.jpg', 'bag');
    new ProductImage('/img/banana.jpg', 'banana');
    new ProductImage('/img/bathroom.jpg', 'bathroom');
    new ProductImage('/img/boots.jpg', 'boots');
    new ProductImage('/img/breakfast.jpg', 'breakfast');
    new ProductImage('/img/bubblegum.jpg', 'bubblegum');
    new ProductImage('/img/chair.jpg', 'chair');
    new ProductImage('/img/cthulhu.jpg', 'cthulhu');
    new ProductImage('/img/dog-duck.jpg', 'dog-duck');
    new ProductImage('/img/dragon.jpg', 'dragon');
    new ProductImage('/img/pen.jpg', 'pen');
    new ProductImage('/img/pet-sweep.jpg', 'pet-sweep');
    new ProductImage('/img/scissors.jpg', 'scissors');
    new ProductImage('/img/shark.jpg', 'shark');
    new ProductImage('/img/sweep.jpg', 'sweep');
    new ProductImage('/img/tauntaun.jpg', 'tauntaun');
    new ProductImage('/img/unicorn.jpg', 'unicorn');
    new ProductImage('/img/usb.jpg', 'usb');
    new ProductImage('/img/water-can.jpg', 'water-can');
    new ProductImage('/img/wine-glass.jpg', 'wine-glass');
  } else {
    // If there is local storage present, recreate ProductImage objects using local storage
    var parsedProducts = JSON.parse(productsFromLocalStorage);

    // loop over parsedProducts array to feed stored items into constructor function
    for(var i=0; i<parsedProducts.length; i++){
      new ProductImage(parsedProducts[i].filepath, parsedProducts[i].title, parsedProducts[i].votes, parsedProducts[i].views);
    }
  }
  // Load number of rounds if stored, otherwise totalRounds is set to 0
  var roundsFromStorage = localStorage.getItem('totalRounds');
  if(roundsFromStorage){ // truthy (null) 
    totalRounds = parseInt(roundsFromStorage);
  } else {
    totalRounds = 0;
  }

  displayImage();
  displayImage();
  displayImage();

  parentElement.addEventListener('click', clickHandler);

}

// run page start up function
pageStartUp();


