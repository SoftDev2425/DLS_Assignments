import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTicketPage from "./pages/CreateTicketPage";
import ValidateTicketPage from "./pages/ValidateTicketPage";
import CreateJobPage from "./pages/CreateJobPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" Component={() => <HomePage />} />
      <Route path="/createticket" Component={() => <CreateTicketPage />} />
      <Route path="/validateticket" Component={() => <ValidateTicketPage />} />
      <Route path="/createjob" Component={() => <CreateJobPage />} />
      <Route path="*" Component={() => <NotFoundPage />} />
    </Routes>
  );
}

export default App;
