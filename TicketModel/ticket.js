/**
 * A ticket class is used to represent a ticket object which has attributes such as id, created at,
 * subject, description and status.
 */
class ticket {

    /**
     * A constructor is used to create a new ticket given the attributes as a argument.
     * @param ticket    ticket attributes
     */
    constructor(ticket) {
        this.id = ticket.id
        this.created_at = ticket.created_at
        this.subject = ticket.subject
        this.description = ticket.description.replace(/[\r\n]/g, '')
        this.status = ticket.status
    }

    /**
     * A function which is used to return a short description of the ticket.
     * @returns {string}    ticket description
     */
    getTicketDescription() {
        return this.id + "\t" + this.created_at + "\t" + this.status + "\t" + this.subject
    }

}

module.exports =  { ticket : ticket }