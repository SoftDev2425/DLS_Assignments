import express from "express";
import ticketsController from "../controllers/tickets.controller";

const router = express.Router();

router.get("/", ticketsController.handleGetTickets);
router.get("/:id", ticketsController.handleGetTicketById);
router.post("/", ticketsController.handleCreateTicket);
router.post("/validate", ticketsController.handleValidateTicket);
router.put("/:id", ticketsController.handleUpdateTicket);

export default router;
