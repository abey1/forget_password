import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home, Signup, Login, Forgetpassword } from "./pages";
import { Navbar } from "./components";
import { useUserContext } from "./contexts/UserContext";
import { server_url, LOGIN } from "./utilities/constants";

import "./App.scss";

function App() {
  const { email, userDispatch } = useUserContext();
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${server_url}/user/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        if (response.ok) {
          const json = await response.json();
          const { email, token } = json;
          // save upadated token
          localStorage.setItem("token", token);
          userDispatch({ type: LOGIN, payload: email });
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    verifyToken();
  }, []);
  return (
    <div className="app">
      <div className="app_container">
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={email === "" ? <Navigate to="/login" /> : <Home />}
            />
            <Route
              path="/login"
              element={email === "" ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={email === "" ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/forgetpassword"
              element={email === "" ? <Forgetpassword /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
