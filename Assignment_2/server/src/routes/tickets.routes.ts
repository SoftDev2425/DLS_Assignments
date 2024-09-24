import express from "express";
import ticketsController from "../controllers/tickets.controller";

const router = express.Router();

router.get("/", ticketsController.handleGetTickets);
router.get("/:id", ticketsController.handleGetTicketById);
router.post("/create-ticket", ticketsController.handleCreateTicket);
router.post("/validate-ticket", ticketsController.handleValidateTicket);
router.put("/:id", ticketsController.handleUpdateTicket);

export default router;
