import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <UserRoutes />
      </Router>
    </>
  );
}

export default App;
