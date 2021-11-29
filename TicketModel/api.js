var axios  = require ('axios');
var ticket = require('./ticket').ticket;

const TICKETS_PER_PAGE = 25
let pageLimit = 1

/**
 * Config object is used to authenticate the user for fetching the data from the server.
 * @type {{auth: {password: string, username: string}}}
 */
const config = {
    auth: {
        username: 'sabhaya.d@northeastern.edu',
        password: 'zendesk1234'
    }
};

/**
 * Async function is used to fetch single ticket where in an id argument is passed and the axios
 * fetches the data via url and config. Try and catch blocks are used to handling the errors.
 * @param id                       ticket id
 * @returns {Promise<string|*[]>}   response data
 */
async function getTicket(id) {

    let url = `https://zcczendeskcodingchallenge9939.zendesk.com/api/v2/tickets/${id}.json`;
    let response = null;
    try {
        response = await axios.get(url, config)
        var listTickets = [];
        listTickets.push(new ticket(response.data.ticket));
        return listTickets
    } catch (error) {
        return getError(error)
    }
}

/**
 * Async function is used to fetch multiple tickets where in targetPage is provided as the argument
 * by the controller and axios fetches the data. Page limit is calculated from the response and
 * used to validate pagination.
 * @param targetPage                page number to fetch data
 * @returns {Promise<string|*>}     response data
 */
async function getMultipleTickets(targetPage) {
    let url = `https://zcczendeskcodingchallenge9939.zendesk.com/api/v2/tickets.json?page=${targetPage}&per_page=${TICKETS_PER_PAGE}`;
    let response = null;
    try {
        response = await axios.get(url, config)
        pageLimit = Math.ceil(response.data.count / 25)
        return response.data;
    } catch (error) {
        return getError(error)
    }
}

/**
 * This function returns the number of page limit for pagination
 * @returns {number}    page number limit
 */
function PageLimit() {
    return pageLimit
}

/**
 * This function is used to determine the error message based on the status of the error.
 * @param error         error
 * @returns {string}    error message
 */
function getError(error) {
    var errorMessage
    var statusCode = error.response.status
    if (statusCode === 401) {
        errorMessage = "You are unauthorized. Please check your login credentials!\n";
    } else if (statusCode === 404) {
        errorMessage = "The server can not find requested resource!\n";
    } else if (statusCode === 503) {
        errorMessage =
            "Sorry, looks like we are having some server issues! Please try again later.\n";
    } else {
        errorMessage = `${error.message}: ${error.response.statusText}\n`;
    }
    return errorMessage
}

module.exports = { getTicket: getTicket,
    getMultipleTickets : getMultipleTickets,
    PageLimit : PageLimit
}