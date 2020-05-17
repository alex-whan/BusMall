# BusMall
## Lab 11 - BusMall

BusMall is an application that allows prospective shoppers to vote on a variety of useful products to indicate which they might be interested in purchasing. This randomized selection of products is to be displayed on the seatbacks of buses in order to give consumers a bit of entertainment while commuting, and also doubles as a product study to see which products are the most promising investments.

### Features of BusMall

1. BusMall dynamically renders three different product images to the DOM when the page is initialized. Users click on the picture of choice to "vote" for that product.

2. After each selection, the images are removed from the DOM, and replaced by three new images. The image selections are tracked with an array to ensure that users do not see the same product twice in a row in back-to-back rounds. On each click, the clicked product is given a vote.

3. The default number of rounds is 25, although this can be altered easily in the code with a global variable. After 25 rounds, voting ceases, and the site will no longer generate new random product images. Instead, it will display a chart graphing the number of votes each product has received, as well as the number of views each had, in order to illustrate the relative popularity of each item in the catalog.

4. This site features persistent local storage. If a user refreshes or exits the page before finishing 25 rounds of voting, they will start up again where they left off when re-entering the page. The results graph will display the total votes for all users using the same machine over time - to give a more accurate reading of popularity.

5. Users may start voting again after the chart is displayed by exiting the site, or refreshing their browser.
