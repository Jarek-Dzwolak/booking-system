import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../public/config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { format, startOfMonth, startOfWeek, addDays } from "date-fns";
import { pl } from "date-fns/locale";
import useSalonConfig from "../../public/hooks/useSalonConfig";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    todayAppointments: 0,
    weekAppointments: 0,
    totalClients: 0,
    monthRevenue: 0,
    todayRevenue: 0,
    unpaidCount: 0,
  });
  const [todayAppointmentsList, setTodayAppointmentsList] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const { services } = useSalonConfig();

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const today = format(new Date(), "yyyy-MM-dd");
        const monthStart = format(startOfMonth(new Date()), "yyyy-MM-dd");
        const weekStart = format(
          startOfWeek(new Date(), { weekStartsOn: 1 }),
          "yyyy-MM-dd"
        );

        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("ownerEmail", "==", currentUser.email),
          where("date", ">=", monthStart)
        );

        const querySnapshot = await getDocs(appointmentsQuery);
        const appointments = [];

        querySnapshot.forEach((doc) => {
          appointments.push({ id: doc.id, ...doc.data() });
        });

        const todayAppts = appointments.filter((a) => a.date === today);
        const weekAppts = appointments.filter(
          (a) => a.date >= weekStart && a.date <= today
        );
        const unpaidAppts = appointments.filter(
          (a) => a.paymentStatus === "unpaid"
        );

        const monthRevenue = appointments.reduce(
          (sum, a) => sum + (a.price || 0),
          0
        );
        const todayRevenue = todayAppts.reduce(
          (sum, a) => sum + (a.price || 0),
          0
        );

        const clientIds = new Set();
        appointments.forEach((a) => {
          if (a.clientId) clientIds.add(a.clientId);
        });

        const sortedToday = todayAppts.sort((a, b) =>
          a.startTime.localeCompare(b.startTime)
        );

        const upcoming = appointments
          .filter((a) => a.date > today)
          .sort((a, b) => {
            if (a.date === b.date)
              return a.startTime.localeCompare(b.startTime);
            return a.date.localeCompare(b.date);
          })
          .slice(0, 5);

        setStats({
          todayAppointments: todayAppts.length,
          weekAppointments: weekAppts.length,
          totalClients: clientIds.size,
          monthRevenue,
          todayRevenue,
          unpaidCount: unpaidAppts.length,
        });

        setTodayAppointmentsList(sortedToday);
        setUpcomingAppointments(upcoming);
      } catch (error) {
        console.error("Błąd podczas pobierania danych dashboardu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const formatCurrency = (amount) => {
    return amount.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const getServiceLabel = (category) => {
    const service = services.find((s) => s.category === category);
    return service ? service.title : category;
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "cash":
        return "text-green-600";
      case "transfer":
        return "text-blue-600";
      default:
        return "text-red-600";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Podsumowanie
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          {format(new Date(), "EEEE, d MMMM yyyy", { locale: pl })}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-pink-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Dzisiejsze wizyty
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.todayAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Dziś zarobione
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {formatCurrency(stats.todayRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ArrowTrendingUpIcon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Przychód miesiąca
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {formatCurrency(stats.monthRevenue)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Wizyty w tym tygodniu
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.weekAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 sm:h-10 sm:w-10 text-indigo-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Klienci miesiąca
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.totalClients}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-8 w-8 sm:h-10 sm:w-10 text-red-600" />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-500">
                Nieopłacone
              </p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">
                {stats.unpaidCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Dzisiejsze wizyty
              </h2>
              <Link
                to="/dashboard/calendar"
                className="text-xs sm:text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                Zobacz kalendarz →
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {todayAppointmentsList.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CalendarIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Brak wizyt na dziś</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayAppointmentsList.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {appointment.clientName ||
                            appointment.clientInstagramName ||
                            "Klient"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getServiceLabel(appointment.serviceType)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                          {appointment.serviceDetails}
                        </p>
                      </div>
                      <div className="ml-3 text-right flex-shrink-0">
                        <p className="text-sm font-medium text-gray-900">
                          {appointment.startTime}
                        </p>
                        <p
                          className={`text-xs font-medium mt-1 ${getPaymentStatusColor(
                            appointment.paymentStatus
                          )}`}
                        >
                          {formatCurrency(appointment.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                Nadchodzące wizyty
              </h2>
              <Link
                to="/dashboard/calendar"
                className="text-xs sm:text-sm text-pink-600 hover:text-pink-700 font-medium"
              >
                Zobacz więcej →
              </Link>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CheckCircleIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Brak nadchodzących wizyt</p>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-pink-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {appointment.clientName ||
                            appointment.clientInstagramName ||
                            "Klient"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {getServiceLabel(appointment.serviceType)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDate(appointment.date)} •{" "}
                          {appointment.startTime}
                        </p>
                      </div>
                      <div className="ml-3 text-right flex-shrink-0">
                        <p
                          className={`text-sm font-medium ${getPaymentStatusColor(
                            appointment.paymentStatus
                          )}`}
                        >
                          {formatCurrency(appointment.price)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
          Szybkie akcje
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          <Link
            to="/dashboard/calendar"
            className="flex items-center justify-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            <CalendarIcon className="h-5 w-5 mr-2 text-pink-600" />
            Kalendarz
          </Link>
          <Link
            to="/dashboard/clients"
            className="flex items-center justify-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            <UserGroupIcon className="h-5 w-5 mr-2 text-indigo-600" />
            Klienci
          </Link>
          <Link
            to="/dashboard/payments"
            className="flex items-center justify-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            <CurrencyDollarIcon className="h-5 w-5 mr-2 text-green-600" />
            Płatności
          </Link>
          <Link
            to="/dashboard/reports"
            className="flex items-center justify-center px-4 py-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700"
          >
            <ArrowTrendingUpIcon className="h-5 w-5 mr-2 text-blue-600" />
            Raporty
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
