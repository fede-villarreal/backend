import ticketModel from '../models/ticket.js';

export default class Tickets {

    getTicket = async (tid) => {
        let ticket = await ticketModel.findOne({_id: tid})
        return ticket
    }

    addTicket = async (ticket) => {
        let result = await ticketModel.create(ticket)
        return result
    }

}
