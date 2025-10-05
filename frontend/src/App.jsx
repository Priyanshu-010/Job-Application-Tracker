import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateJobApplicationPage from "./pages/CreateJobApplicationPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetailsPage from "./pages/JobDetailsPage";

function App() {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/create" element={<CreateJobApplicationPage />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route path="/details/:id" element={<JobDetailsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
