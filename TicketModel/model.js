var ticketApi = require('./api');
var ticket = require('./ticket').ticket;

/**
 * A class which is used to define functions such as fetch single ticket, multiple tickets, parse
 * the data and get page limit. The model performs the calculation and passes the data to the
 * controller.
 */
class ticketModel {

    /**
     * A function which is used to parse the tickets and make a new ticket object. It uses map
     * function to convert all tickets into objects.
     * @param list     list of tickets
     * @returns {*}     objects of tickets
     */
    jsonToList(list)
    {
        return list.map(obj => {
            return new ticket(obj);
        });
    }

    /**
     * A function which is used to fetch single ticket by calling the method getTicket from
     * the api script.
     * @param id                ticket id
     * @returns {Promise<*>}    ticket objects
     */
    async fetchSingleTicket(id) {
        let singleticket = await ticketApi.getTicket(id)
        return singleticket
    }

    /**
     * A function which is used to fetch mutiple tickets by calling the method getMultipleTickets from
     * the api script.
     * @param page                  page number for fetching data
     * @returns {Promise<*[]>}      list of ticket objects
     */
    async fetchMultipleTickets(page) {
        let multipletickets = await ticketApi.getMultipleTickets(page)
        let ticketList = []
        if (Array.isArray(multipletickets.tickets)) {
            ticketList = this.jsonToList(multipletickets.tickets)
        }
        return ticketList
    }

    /**
     * A function to get the page limit.
     * @returns {number}    page number limit
     */
    getPageLimit() {
        return ticketApi.PageLimit()
    }
}


module.exports = {
    ticketModel : ticketModel
}
