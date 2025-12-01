import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import MentorDashboard from "./pages/MentorDashboard.jsx";
import SignInPage from "./pages/SignInPage.jsx";

const App = () => {
  return (
    <Routes>
      {/* ✅ Root route redirects to /sign-in safely */}
      <Route path="/" element={<Navigate to="/sign-in" replace />} />

      {/* 🔑 Sign-in page (no sign-up) */}
      <Route path="/sign-in/*" element={<SignInPage />} />

      {/* 🔒 Mentor Dashboard (protected route) */}
      <Route
        path="/mentor-dashboard"
        element={
          <>
            <SignedIn>
              <MentorDashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default App;
