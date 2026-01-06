import { Route, Routes } from "react-router-dom";
import Jobs from "./pages/Jobs";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/common/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden">
      {/* Subtle Background Glow for a "Classy" Dark Feel */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-slate-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12 grow">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Application Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail/:id"
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Optional Footer Space / Bottom Padding */}
        <footer className="py-10 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} JobApplication Tracker
        </footer>
      </div>
    </div>
  );
}

export default App;
