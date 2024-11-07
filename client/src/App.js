import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CommunicationPage from "./CommunicationPage";
import LoginPage from "./LoginPage";
import Pdash, { Dashboard } from "./pdash";
import Teacher from "./Teacher";
import Conference from "./Conference";
import Pay from "./pay";
import Resources from "./resources";
import SignUp from "./SignUp";
import "./App.css";
import DashboardLayout from "./components/Layout";
import NotFound from "./components/NotFound";
import { Toaster } from "sonner";
import { Spin } from "antd";
import ElearningProvider, {
  ElearningContext,
} from "./context/ElearningContext";
import ProtectedRoute from "./secure/ProtectedRoute";
import ProtectLoggedIn from "./secure/ProtectLoggedIn";
import { Grade } from "./pages/Grade/Grade";
import ContactForm from "./ContactForm";
import Index from "./pages/chat";
import { useIsPermitted } from "./hooks/useIsPermitted";
import ServicesPage from "./ServicesPage";
import LeadershipPractice from "./LeadershipPractice"; // Import LeadershipPractice component
import Chatbot from "./Chatbot"; // Import Chatbot component
import BudgetPlanner from "./BudgetPlanner";


function App() {
  const { loading } = useContext(ElearningContext);




  return (
    <>
      <Toaster position="top-center" richColors />
      <Spin spinning={loading} fullscreen />


      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/communicate"
            element={
              <DashboardLayout>
                <CommunicationPage />
              </DashboardLayout>
            }
          /> */}
          <Route
            path="/communicate"
            element={
              <DashboardLayout>
                <Index />
              </DashboardLayout>
            }
          />
          <Route
            path="/teacher"
            element={
              <DashboardLayout>
                <Teacher />
              </DashboardLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <DashboardLayout>
                <ContactForm />
              </DashboardLayout>
            }
          />
          <Route
            path="/Conference"
            element={
              <DashboardLayout>
                <Conference />
              </DashboardLayout>
            }
          />
          <Route
            path="/pay"
            element={
              <DashboardLayout>
                <Pay />
              </DashboardLayout>
            }
          />
          <Route
            path="/grade"
            element={
              <DashboardLayout>
                <Grade />
              </DashboardLayout>
            }
          />
          <Route
            path="/resources"
            element={
              <DashboardLayout>
                <Resources />
              </DashboardLayout>
            }
          />
          <Route
          path="/budget-planner"
          element={
            <DashboardLayout>
              <BudgetPlanner />
            </DashboardLayout>
          }
        />
        <Route
          path="/leadership-practice" // New route for Leadership Practice
          element={
            <DashboardLayout>
              <LeadershipPractice />
            </DashboardLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <DashboardLayout>
              <Chatbot />
            </DashboardLayout>
          }
        />

          <Route
            path="*"
            element={
              <DashboardLayout>
                <NotFound />
              </DashboardLayout>
            }
          />
          <Route
            path="/LoginPage"
            element={
              <ProtectLoggedIn>
                <LoginPage />
              </ProtectLoggedIn>
            }
          />
          <Route
            path="/SignUp"
            element={
              <ProtectLoggedIn>
                <SignUp />
              </ProtectLoggedIn>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default function WrappedApp() {
  return (
    <ElearningProvider>
      <App />
    </ElearningProvider>
  );
}
