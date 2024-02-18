import UserRoutes from "./routes/UserRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { AppContextProvider } from "./context/useAppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifySettings } from "./utils/constants";

function App() {
  return (
    <>
      <ToastContainer {...toastifySettings} />
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </>
  );
}

function AppRoutes() {
  return (
    <>
      <Router>
        <UserRoutes />
      </Router>
    </>
  );
}

export default App;
