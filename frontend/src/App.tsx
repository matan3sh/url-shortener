import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "./components/Header";

import { AdminPage } from "./pages/Admin";
import { UrlPage } from "./pages/Url";
import { NewUrlPage } from "./pages/NewUrl";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />

            <Route path="/new-url" element={<NewUrlPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/:id" element={<UrlPage />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
