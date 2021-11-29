var readline = require('readline-sync')

/**
 * A function which is used to display welcome message.
 */
function displayWelcome() {
    console.log("Welcome to Zendesk Ticket Viewer.\n")
}

/**
 * A function which is used to display the menu to the user and read the user input.
 * @returns user input
 */
function displayMenu() {
    console.log("Menu : ")
    console.log("Enter 1 to fetch a single ticket.")
    console.log("Enter 2 to fetch multiple tickets.")
    console.log("Enter 3 to quit.\n")
    return readline.question("Enter one of the options from the menu : \n")

}

/**
 * A function which is used to get the user input for the ticket id.
 * @returns ticket id
 */
function displayTicketId() {
    return readline.question("Enter the ticket number : \n")
}

/**
 * A function which is used to display the ticket details for a specific ticket.
 * @param ticket    ticket object
 */
function displaySingleTicket(ticket) {
    console.log("Ticket details are : \n")
    console.log(`Ticket ID : \t${ticket.id}`)
    console.log(`Created at : \t${ticket.created_at}`)
    console.log(`Subject : \t${ticket.subject}`)
    console.log(`Status : \t${ticket.status}`)
    console.log(`Description : \t${ticket.description}`)
    console.log("\n")
}

/**
 * A function which is used to display multiple tickets from the ticket list.
 * @param ticketList    ticket list
 */
function displayMultipleTickets(ticketList) {
    console.log("Ticket id \t Created at \t\t Status \t Subject")
    for (var ticket of ticketList) {
        console.log("\t" + ticket.getTicketDescription())
    }
    console.log("\n")
}

/**
 * A function which is used to ask the user for displaying previous or next list of tickets.
 * @returns user input
 */
function displayPagination() {
    console.log("Enter 1 to see next tickets.")
    console.log("Enter 2 to see previous tickets.")
    console.log("Enter 3 to go back to menu.")
    return readline.question("Enter one of the options from above : \n")
}

/**
 * A function which is used to display the error message to the user.
 * @param error error message
 */
function displayError(error) {
    console.log(error)
}

module.exports = {
    displayMenu : displayMenu,
    displayTicketId : displayTicketId,
    displayMultipleTickets : displayMultipleTickets,
    displaySingleTicket : displaySingleTicket,
    displayPagination : displayPagination,
    displayError : displayError,
    displayWelcome : displayWelcome
}