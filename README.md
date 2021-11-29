# Zendesk Ticket Viewer 
Zendesk ticket viewer is an Command Line based application which is developed by using Node.js. 
It basically consists of 3 functionalities which are:
1. Display a ticket specified by the user
2. Display a list of tickets when asked by the user
3. Display the list of tickets in the form of pagination where each page consists of 25 tickets.
This application also handles errors related to the user input and API errors.

## Installation
Make sure you have NodeJS installed. My current version of Node is v12.21.0.
1. Clone the repository.
2. Enter the project folder and use `npm install modules` to download the required modules.
3. Use `npm start` to run the project.
4. Use `jest` to run the tests.

## Technologies Used
1. Node.js
2. Axios
3. Readline-sync
4. Jest

## Design
I have used MVC concept to implement this task where my model supplies with logic of fetching
the data from the server and parsing it, view is used to display the output in the console and
controller requests the data from the model and uses view to display them to the user.


## Usage
The CLI provides the user with 3 options i.e. 
1. Enter 1 to get fetch a single ticket
2. Enter 2 to fetch multiple tickets
3. Enter 3 to quit

If the user enters option 2, they a list of tickets are displayed and they are prompted to 
select from other 3 options which are:
* Enter 1 to see next tickets
* Enter 2 to see previous tickets
* Enter 3 to return to main menu

In this way the user will be able to use the whole functionality.

##Test
I have written unit tests for testing the functionality of the model wherein different
inputs from the user are tested against the model. I have used jest framework which is 
popular javascript testing framework. Some of my test cases include fetching single ticket
with valid and invalid id, fetching mutiple tickets with given page number and fetching
tickets with invalid page number.

## Resources
Zendesk API Links:
- [Zendesk Ticket API Documentation](https://developer.zendesk.com/rest_api/docs/core/tickets)
- [Requests to Zendesk API](https://developer.zendesk.com/documentation/developer-tools/working-with-the-zendesk-apis/making-requests-to-the-zendesk-api/#topic_hdt_nfx_3m)
- [OAuth Tokens](https://developer.zendesk.com/documentation/ticketing/working-with-oauth/creating-and-using-oauth-tokens-with-the-api/)
