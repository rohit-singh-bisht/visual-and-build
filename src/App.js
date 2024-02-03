import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./context/useAppContext";

function App() {
  return (
    <>
      <AppContextProvider>
        <Router>
          <UserRoutes />
        </Router>
      </AppContextProvider>
    </>
  );
}

export default App;
