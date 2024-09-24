import { Request, Response } from "express";
import { createTicket, getTicketById, getTickets, updateTicket, validateTicket } from "../services/tickets.service";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";

const handleGetTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getTickets();

    if (tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found" });
    }

    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleGetTicketById = async (req: Request, res: Response) => {
  const ticketId = req.params.id;

  try {
    const ticket = await getTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleCreateTicket = async (req: Request, res: Response) => {
  const { driverName, companyName, chemical } = req.body;

  try {
    const ticket = await createTicket({ driverName, companyName, chemical });

    return res.status(201).json(ticket);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleValidateTicket = async (req: Request, res: Response) => {
  const { ticketId, driverName, companyName, chemical } = req.body;

  try {
    const isValid = await validateTicket(ticketId, driverName, companyName, chemical);

    if (isValid) {
      return res.status(200).json({ message: "Ticket is valid" });
    }

    return res.status(400).json({ message: "Ticket details are invalid" });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateTicket = async (req: Request, res: Response) => {
  const ticketId = req.params.id;
  const { driverName, companyName, chemical } = req.body;

  try {
    const ticket = await updateTicket(ticketId, { driverName, companyName, chemical });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};

export default {
  handleGetTickets,
  handleGetTicketById,
  handleCreateTicket,
  handleValidateTicket,
  handleUpdateTicket,
};
