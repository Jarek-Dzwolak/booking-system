import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  HomeIcon,
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import AddAppointmentForm from "./AddAppointmentForm";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../public/config/firebase";
import { Helmet } from "react-helmet";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Błąd podczas wylogowywania:", error);
    }
  };

  const toggleAddForm = () => {
    setIsAddFormOpen(!isAddFormOpen);
  };

  const handleAddAppointment = () => {
    setIsAddFormOpen(false);
    window.location.reload();
  };

  const navigation = [
    {
      name: "Dodaj wizytę",
      href: "#",
      icon: PlusIcon,
      onClick: toggleAddForm,
      highlight: true,
    },
    { name: "Przegląd", href: "/dashboard", icon: HomeIcon },
    { name: "Kalendarz", href: "/dashboard/calendar", icon: CalendarIcon },
    { name: "Klienci", href: "/dashboard/clients", icon: UserGroupIcon },
    {
      name: "Płatności",
      href: "/dashboard/payments",
      icon: CurrencyDollarIcon,
    },
    { name: "Raporty", href: "/dashboard/reports", icon: ChartBarIcon },
  ];

  const isActive = (path) => {
    if (path === "/dashboard" && location.pathname === "/dashboard") {
      return true;
    }
    if (path !== "/dashboard" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <title>Panel Administracyjny - Salon Piękności</title>
      </Helmet>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              {/* <Logo /> */}
              <span className="ml-2 text-lg font-semibold">Panel</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) =>
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={() => {
                    setSidebarOpen(false);
                    item.onClick();
                  }}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.highlight
                      ? "text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      item.highlight ? "text-white" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive(item.href) ? "text-pink-600" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {currentUser?.photoURL ? (
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white text-sm font-medium">
                    {currentUser?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser?.displayName || "Użytkownik"}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                >
                  Wyloguj
                  <ArrowRightOnRectangleIcon className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            {/* <Logo /> */}
            <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Panel
            </span>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) =>
              item.onClick ? (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`group flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.highlight
                      ? "text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      item.highlight ? "text-white" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-pink-50 text-pink-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive(item.href) ? "text-pink-600" : "text-gray-400"
                    }`}
                  />
                  {item.name}
                </Link>
              )
            )}
          </nav>

          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center w-full">
              <div className="flex-shrink-0">
                {currentUser?.photoURL ? (
                  <img
                    className="h-9 w-9 rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                ) : (
                  <div className="h-9 w-9 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center text-white font-medium">
                    {currentUser?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {currentUser?.displayName || "Użytkownik"}
                </p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                >
                  Wyloguj się
                  <ArrowRightOnRectangleIcon className="ml-1 h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="px-4 text-gray-500 focus:outline-none lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1 items-center">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                System Zarządzania
              </h1>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-4 sm:py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>

      {isAddFormOpen && (
        <AddAppointmentForm
          onClose={toggleAddForm}
          onSubmit={handleAddAppointment}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
