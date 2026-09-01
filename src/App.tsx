import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Interview from "./pages/Interview";
import Dashboard from "./pages/Dashboard";
import InterviewHistory from "./pages/history/InterviewHistory";
import InterviewDetails from "./pages/history/InterviewDetails";
import AICoach from "./pages/AICoach";
import ResumeAnalyzer from "./pages/resumeAnalyzer/ResumeAnalyzer";
import Settings from "./pages/Settings";
import StartInterview from "./pages/StartInterview";
import ProtectedRoute from "./api/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/Forgot-password";
import ResetPassword from "./pages/Reset-password";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<SignUp />}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/interview"
              element={<Interview />}
            />
            <Route
              path="/history"
              element={<InterviewHistory />}
            />
            <Route
              path="/interviews/:id"
              element={<InterviewDetails />}
            />
            <Route
              path="/ai-coach"
              element={<AICoach />}
            />
            <Route
              path="/resume-review"
              element={<ResumeAnalyzer />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>
        </Route>
        <Route
          path="/interview/start"
          element={<StartInterview />}
        />
      </Routes>
    </BrowserRouter>
  );
}


export default App;