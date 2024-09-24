import prisma from "../../prisma/client";
import { ITicketData } from "../types/tickets.type";

export const getTickets = async () => {
  const tickets = await prisma.ticket.findMany();
  return tickets;
};

export const getTicketById = async (ticketId: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  return ticket;
};

export const createTicket = async (ticketData: ITicketData) => {
  const ticket = await prisma.ticket.create({
    data: {
      driverName: ticketData.driverName,
      companyName: ticketData.companyName,
      chemical: ticketData.chemical,
    },
  });

  return ticket;
};

export const validateTicket = async (ticketId: string, driverName: string, companyName: string, chemical: string) => {
  const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
  if (!ticket) {
    return false;
  }
  if (ticket.driverName === driverName && ticket.companyName === companyName && ticket.chemical === chemical) {
    await prisma.ticket.update({
      where: { id: ticketId },
      data: { valid: "APPROVED" },
    });
    return true;
  }
};

export const updateTicket = async (ticketId: string, ticketData: ITicketData) => {
  const isValidTicket = await prisma.ticket.findUnique({ where: { id: ticketId } });

  if (!isValidTicket) {
    return null;
  }

  const ticket = await prisma.ticket.update({
    where: { id: ticketId },
    data: ticketData,
  });
  return ticket;
};
