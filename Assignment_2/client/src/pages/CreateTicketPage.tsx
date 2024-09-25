import axios from "axios";
import React, { useEffect, useState } from "react";

const CreateTicketPage = () => {
  const [ticketData, setTicketData] = useState([]);
  const [specificTicketData, setSpecificTicketData] = useState<any>(null);
  const [ticketId, setTicketId] = useState("");
  const [formData, setFormData] = useState({
    driverName: "",
    companyName: "",
    chemical: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [validationResult, setValidationResult] = useState<any>(null);

  useEffect(() => {
    handleGetAllTickets();
  }, []);

  const handleGetAllTickets = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tickets");
      setTicketData(response.data);
    } catch (error) {
      console.error("Error fetching all tickets", error);
    }
  };

  const handleGetTicketById = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (!ticketId) return;

      const response = await axios.get(`http://localhost:8080/api/tickets/${ticketId}`);
      setSpecificTicketData(response.data);
    } catch (error) {
      setError("Error fetching ticket by ID");
      setSpecificTicketData(null);
    }
  };

  const handleValidateTicket = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/tickets/validate", {
        ticketId: specificTicketData.id,
        driverName: specificTicketData.driverName,
        companyName: specificTicketData.companyName,
        chemical: specificTicketData.chemical,
      });
      setValidationResult(response.data);
    } catch (error) {
      console.error("Error validating ticket", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/tickets", formData);
      console.log("Ticket created successfully", response);
      await handleGetAllTickets();
    } catch (error) {
      console.error("Error creating ticket", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* CREATE TICKET */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Create Ticket</h1>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Driver name</label>
            <input
              type="text"
              name="driverName"
              value={formData.driverName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Company name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Chemical</label>
            <input
              type="text"
              name="chemical"
              value={formData.chemical}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
            Submit
          </button>
        </form>
      </div>

      {/* GET ALL TICKETS */}
      <div className="mb-8">
        <button
          onClick={handleGetAllTickets}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 mb-4"
        >
          Get All Tickets
        </button>
        <pre className="bg-white p-4 rounded-lg border border-gray-300">
          {ticketData.length ? JSON.stringify(ticketData, null, 2) : "No tickets available."}
        </pre>
      </div>

      {/* GET TICKET BY ID */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Get Ticket by ID</h2>
        <form onSubmit={handleGetTicketById} className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Ticket ID</label>
            <input
              type="text"
              name="ticketId"
              value={ticketId}
              onChange={(e) => setTicketId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <pre className="bg-white p-4 rounded-lg border border-gray-300 mt-4">
          {specificTicketData ? JSON.stringify(specificTicketData, null, 2) : "No ticket found."}
        </pre>

        {/* Validate Ticket Button */}
        {specificTicketData && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Validate Ticket</h3>
            <button
              onClick={handleValidateTicket}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
            >
              Validate Ticket
            </button>
            {validationResult && (
              <pre className="bg-white p-4 rounded-lg border border-gray-300 mt-4">
                {JSON.stringify(validationResult, null, 2)}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTicketPage;
