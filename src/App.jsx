import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Template from "./pages/template/Template";
import Tabulio from "./pages/tabulio/Tabulio";
import About from "./pages/about/About";
import { useUser } from "@clerk/clerk-react"
import SignInPage from "./pages/auth/sign-in/Login";
import Dashboard from "./pages/dashboard";
import MainSpinner from "./components/MainSpinner";
import EditResume from "./pages/dashboard/resume/[resumeId]/edit";
import { Toaster } from "@/components/ui/sonner"
import ViewResume from "./my-resume/[resumeId]/view";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <MainSpinner />;

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }
  return children;
};

const App = () => {
  return (
    <div>
        <Toaster/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="template" element={<Template />} />
        <Route path="join" element={<Tabulio />} />
        <Route path="about" element={<About />} />
        <Route path="/auth/sign-in" element={<SignInPage/>} />
        <Route path="dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/resume/:resumeId/edit" element={<EditResume/>}/>
        <Route path="/my-resume/:resumeId/view" element={<ViewResume/>}/>
      </Routes>
    </Router>
        </div>
  );
};

export default App;