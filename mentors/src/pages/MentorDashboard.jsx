import React, { useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import Spline from "@splinetool/react-spline";
import { Users, Trash2, Activity, ShieldOff, CheckCircle, Briefcase, Zap } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

// --- MOCK REGISTERED SERVICE PROVIDER DATA ---
const initialRegisteredUsers = [
  { id: 1, name: "Ravi Electricals", email: "ravi@example.com", status: "Active", service: "Minor Repairs (Electrical)", rating: 4.8, isSuspicious: false },
  { id: 2, name: "Priya Tutors", email: "priya@example.com", status: "Active", service: "Tutoring (Math & Science)", rating: 4.9, isSuspicious: false },
  { id: 3, name: "CleanSweep Team", email: "cleansweep@example.com", status: "Inactive", service: "Deep Cleaning (Home/Office)", rating: 4.6, isSuspicious: false },
  { id: 4, name: "Event Decor Masters", email: "event@example.com", status: "Active", service: "Event Decorating", rating: 4.5, isSuspicious: true }, // Suspicious example
  { id: 5, name: "Plumbing Pro", email: "pro@example.com", status: "Active", service: "Plumbing Fixes", rating: 4.4, isSuspicious: false },
];

const adminInfo = {
  name: "HELPIE Admin",
  description: "Centralized Service Provider and Activity Management Panel.",
};

export default function ServiceAdminDashboard() { // Changed Component Name
  const { user } = useUser();
  const [registeredUsers, setRegisteredUsers] = useState(initialRegisteredUsers);

  // --- Admin Actions ---

  const handleDeleteUser = (userId, userName) => {
    // 🛑 Added Confirmation Warning
    const isConfirmed = window.confirm(`WARNING: Are you sure you want to permanently delete the service provider: ${userName}? This action cannot be undone.`);

    if (isConfirmed) {
        toast.warn("Deleting user...");
        setTimeout(() => {
          setRegisteredUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
          toast.success("🗑️ Service Provider successfully deleted.");
        }, 800);
    } else {
        toast.info("Deletion cancelled.");
    }
  };

  const handleViewActivity = (userName, isSuspicious) => {
    const activity = isSuspicious 
        ? "High volume of cancelled jobs or rating discrepancies detected." 
        : "Normal job flow and customer interaction history.";
    toast.info(`Viewing ${userName}'s Activity: ${activity}`, {
        autoClose: 3500,
        icon: isSuspicious ? <ShieldOff className="text-red-500" /> : <Activity className="text-indigo-400" />,
    });
  };
  
  const handleToggleSuspicious = (userId) => {
    setRegisteredUsers(prevUsers => prevUsers.map(u => 
        u.id === userId ? {...u, isSuspicious: !u.isSuspicious} : u
    ));
    toast.info("Suspicious status toggled.");
  };

  return (
    <div className="relative min-h-screen bg-[#070713] text-white font-inter overflow-hidden">
      {/* 🌌 Spline Background */}
      <div className="absolute bottom-0 left-0 w-[450px] h-[400px] opacity-90 z-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/GLppA6onwN7gQhEs/scene.splinecode" />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510]/95 via-[#0a0a1a]/90 to-[#0e0e22]/95 backdrop-blur-sm z-[1]" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <ToastContainer position="top-right" autoClose={2500} />

        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-gray-700/50 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              <Briefcase className="inline-block w-8 h-8 mr-2 text-red-400"/> HELPIE Admin: <span className="text-indigo-400">Service Provider Control</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {adminInfo.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right text-sm hidden sm:block">
                <div className="text-gray-400">Signed in as</div>
                <div className="font-medium text-indigo-200">
                  {adminInfo.name}
                </div>
              </div>
            )}
            <SignOutButton>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg shadow font-medium transition">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </header>

        {/* Main User Management Layout */}
        <div className="grid md:grid-cols-4 gap-8">
          {/* 📄 Statistics/Summary Card */}
          <aside className="md:col-span-1 bg-[#1b1b2f]/85 backdrop-blur-md border border-indigo-600/30 rounded-2xl p-6 shadow-2xl h-fit">
            <h3 className="text-lg font-semibold text-indigo-300 mb-4 border-b border-gray-700/50 pb-2">
              📊 Platform Metrics
            </h3>
            <div className="space-y-4 text-sm">
              <p className="flex justify-between items-center">
                <span className="text-gray-400">Total Providers:</span>{" "}
                <span className="font-bold text-white">{registeredUsers.length}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-400">Suspicious Flags:</span>{" "}
                <span className="font-bold text-red-400">{registeredUsers.filter(u => u.isSuspicious).length}</span>
              </p>
              <p className="flex justify-between items-center">
                <span className="text-gray-400">Active Service Providers:</span>{" "}
                <span className="font-bold text-green-400">{registeredUsers.filter(u => u.status === 'Active').length}</span>
              </p>
            </div>
          </aside>
          
          {/* 👥 Registered Users List (Main Content) */}
          <div className="md:col-span-3 bg-[#1b1b2f]/85 backdrop-blur-md border border-indigo-600/30 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold text-red-300 mb-6 flex items-center gap-2 border-b border-gray-700/50 pb-2">
              Registered Service Providers ({registeredUsers.length})
            </h2>
            
            {/* User Table Header */}
            <div className="grid grid-cols-7 text-sm font-medium text-gray-400 border-b border-gray-700 pb-2 mb-3">
                <div className="col-span-2">Provider Name</div>
                <div>Service Offered</div>
                <div>Rating</div>
                <div>Status</div>
                <div>Flagged</div>
                <div>Actions</div>
            </div>

            {/* User List */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              {registeredUsers.map((u) => (
                <div 
                    key={u.id} 
                    className={`grid grid-cols-7 items-center p-3 rounded-lg transition-all ${
                        u.isSuspicious ? 'bg-red-900/40 border border-red-500/50' : 'bg-gray-800/50 hover:bg-gray-700/70'
                    }`}
                >
                    {/* Provider Info */}
                  <div className="col-span-2 text-sm font-medium text-white">
                        {u.name}
                        <div className="text-xs text-gray-400 truncate">{u.email}</div>
                    </div>
                    
                    {/* Service Offered */}
                    <div className="text-xs text-indigo-300 font-medium flex items-center">
                        <Zap className="w-3 h-3 mr-1"/> {u.service}
                    </div>

                    {/* Rating */}
                    <div className="text-xs text-yellow-400">{u.rating}/5</div>

                    {/* Status */}
                    <div className="text-xs">
                        <span className={`px-2 py-0.5 rounded-full font-semibold ${
                            u.status === 'Active' ? 'bg-green-600/30 text-green-300' : 'bg-yellow-600/30 text-yellow-300'
                        }`}>
                            {u.status}
                        </span>
                    </div>

                    {/* Flagged */}
                    <div className="text-xs">
                        {u.isSuspicious ? (
                            <ShieldOff className="w-5 h-5 text-red-500 cursor-pointer" title="Suspicious" onClick={() => handleToggleSuspicious(u.id)} />
                        ) : (
                            <CheckCircle className="w-5 h-5 text-green-500/50 cursor-pointer" title="Safe" onClick={() => handleToggleSuspicious(u.id)} />
                        )}
                    </div>
                    
                    {/* Actions */}
                    <div className="flex gap-2">
                        <button 
                            onClick={() => handleViewActivity(u.name, u.isSuspicious)} 
                            className="p-1.5 rounded-full bg-indigo-600/50 hover:bg-indigo-600 transition"
                            title="View Activity"
                        >
                            <Activity className="w-4 h-4 text-indigo-200" />
                        </button>
                        <button 
                            onClick={() => handleDeleteUser(u.id, u.name)} 
                            className="p-1.5 rounded-full bg-red-600/50 hover:bg-red-600 transition"
                            title="Delete Provider"
                        >
                            <Trash2 className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}