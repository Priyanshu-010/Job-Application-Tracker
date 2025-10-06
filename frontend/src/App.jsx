import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateJobApplicationPage from "./pages/CreateJobApplicationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetailsPage from "./pages/JobDetailsPage";
import { useEffect, useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
  });

  return (
    <div data-theme={theme}>
      <div>
        <nav>
          <Navbar theme={theme} handleTheme={handleTheme} />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateJobApplicationPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/details/:id" element={<JobDetailsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
