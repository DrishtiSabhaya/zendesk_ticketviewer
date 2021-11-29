const expect = require("chai").expect;
const Model = require("../TicketModel/model").ticketModel;
var assert = require('assert');

const model = new Model();

/**
 * A test for fetching a single ticket with a valid id which tests the fetchSingleTicket method
 * of the model script and expects with the given ticket object.
 */
test("Testing fetch single ticket with valid id", async() => {
    const ticket = {
        id : 34,
        created_at : '2021-11-25T22:19:17Z',
        subject : 'proident esse ut velit labore',
        description : 'Minim tempor sunt aliqua ullamco esse sunt est voluptate non consequat ipsum. Sint magna esse officia consequat laboris ex duis ex consequat. Sit aliquip excepteur non amet mollit ea commodo incididunt nostrud aliquip amet. Commodo exercitation culpa esse eu reprehenderit dolor commodo eu. Proident ipsum laborum incididunt velit anim consequat id ullamco occaecat laboris velit elit commodo commodo.\n\nLaborum nulla officia consequat laboris velit irure nisi reprehenderit quis id ad amet aliquip. Non in in elit aliquip excepteur exercitation anim Lorem reprehenderit sunt voluptate. Culpa labore est reprehenderit culpa enim.',
        status : 'open'
    }
    var actualTicket = await model.fetchSingleTicket(34)
    expect(ticket.id).equal(actualTicket[0].id)
})

/**
 * A test for fetching single ticket with invalid id where server responds with cannot find resource
 * message.
 */
test("Testing fetch single ticket with invalid id", async() => {
    var actualTicket = await model.fetchSingleTicket(102)
    const ticket = 'The server can not find requested resource!\n'
    expect(ticket).equal(actualTicket)
})

/**
 * A test for fetching single ticket with invalid id where server responds with bad request.
 */
test("Testing fetch single ticket with negative id", async() => {
    var actualTicket = await model.fetchSingleTicket(-1)
    const ticket = 'Request failed with status code 400: Bad Request\n'
    expect(ticket).equal(actualTicket)
})

/**
 * A test for fetching multiple tickets for valid page number where the length of the result from
 * the api is expected to be 25 and the starting and ending ids of the ticket are 1 and 25
 * respectively. It tests the fetchMultipleTickets method of the model.
 */
test("Testing fetch multiple tickets for page 1", async() => {
    var multipleTicket = await model.fetchMultipleTickets(1)
    expect(25).equal(multipleTicket.length)
    expect(1).equal(multipleTicket[0].id)
    expect(25).equal(multipleTicket[24].id)
})

/**
 * A test for fetching multiple tickets for last page where a single ticket is fetched.
 */
test("Testing fetch multiple tickets for page 5", async() => {
    var multipleTicket = await model.fetchMultipleTickets(5)
    expect(1).equal(multipleTicket.length)
    expect(101).equal(multipleTicket[0].id)
})

/**
 * A test for fetching mutiple tickets with invalid page number where the response from the server
 * is an empty ticket list.
 */
test("Testing fetch multiple tickets for invalid page 20", async() => {
    var multipleTicket = await model.fetchMultipleTickets(20)
    assert(multipleTicket.length == 0)
})

/**
 * A test for fetching mutiple tickets with invalid page number where the response from the server
 * is an empty ticket list.
 */
test("Testing fetch multiple tickets for invalid page -1", async() => {
    var multipleTicket = await model.fetchMultipleTickets(-1)
    assert(multipleTicket.length == 0)
})