var Model = require('../TicketModel/model').ticketModel;
var view = require('../TicketView/view');

var flag = true
const model = new Model();

/**
 * A async function which is used to operate the controller where in model is called to get the data
 * and view is called to display the data. A while suggests that the controller will not terminate
 * until user quits. I have used switch for the user input implemented a bit of code logic
 * for fetching tickets.
 */
async function controller() {
    view.displayWelcome()
    var count = 1
    start_position :
        while (flag) {
            var input = view.displayMenu()
            switch(input) {
                case '1' :
                    try {
                        var id = view.displayTicketId()
                        var ticket = await model.fetchSingleTicket(id)
                        if (Array.isArray(ticket)) {
                            view.displaySingleTicket(ticket[0])
                        } else {
                            view.displayError(ticket)
                        }
                        break
                    } catch (error) {
                        console.log(error)
                        continue
                    }
                    break
                case '2' :
                    try {
                        while (true) {
                            try {
                                // implemented count to keep track of pages and fetch data for that particular page
                                if (count <= 0) {
                                    throw 'You cannot go beyond Page 1!!\n'
                                } else if (count > model.getPageLimit()) {
                                    throw 'Page limit is achieved. You cannot see further!!\n'
                                }
                                var ticketList = await model.fetchMultipleTickets(count)
                                if (Array.isArray(ticketList)) {
                                    view.displayMultipleTickets(ticketList)
                                } else {
                                    view.displayError(ticketList)
                                }
                            } catch (error) {
                                console.log(error)
                            }
                            var option = view.displayPagination()
                            switch (option) {
                                case '1' :
                                    if (count == 0) {
                                        count = 2
                                    } else if (count <= model.getPageLimit()) {
                                        count += 1
                                    }
                                    continue
                                    break
                                case '2' :
                                    if (count > 0) {
                                        count -= 1
                                    }
                                    continue
                                    break
                                case '3' :
                                    continue start_position;
                                    break
                                default :
                                    view.displayError('Enter a valid input.\n')
                            }
                        }

                    } catch (error) {
                        view.displayError(error)
                    }
                    break
                case '3' :
                    flag = false
                    break
                default :
                    view.displayError('Enter a valid input.\n')
            }
        }
}

module.exports = {
    controller : controller
}

if (require.main == module) {
    controller()
}