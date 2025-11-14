import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../contexts/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
n;
import useSalonConfig from "../public/config/salonConfig";

const PaymentsView = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { viewingUserEmail } = useAuth();
  const { services } = useSalonConfig();

  useEffect(() => {
    const fetchPayments = async () => {
      if (!viewingUserEmail) return;

      setLoading(true);
      try {
        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("ownerEmail", "==", viewingUserEmail),
          orderBy("date", "desc")
        );

        const querySnapshot = await getDocs(appointmentsQuery);

        const paymentsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          paymentsData.push({
            id: doc.id,
            clientName:
              data.clientName || data.clientInstagramName || "Nieznany klient",
            serviceType: data.serviceType,
            serviceDetails: data.serviceDetails,
            date: data.date,
            price: data.price,
            depositPaid: data.depositPaid,
            paymentStatus: data.paymentStatus,
          });
        });

        setPayments(paymentsData);
      } catch (error) {
        console.error("Błąd podczas pobierania płatności:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [viewingUserEmail]);

  const getServiceLabel = (category) => {
    const service = services.find((s) => s.category === category);
    return service ? service.title : category;
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.serviceDetails.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" || payment.paymentStatus === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}.${month}.${year}`;
  };

  const formatCurrency = (amount) => {
    return amount.toLocaleString("pl-PL", {
      style: "currency",
      currency: "PLN",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "cash":
        return {
          icon: CheckCircleIcon,
          text: "Gotówka",
          classes: "bg-green-100 text-green-800",
        };
      case "transfer":
        return {
          icon: CheckCircleIcon,
          text: "Przelew",
          classes: "bg-blue-100 text-blue-800",
        };
      default:
        return {
          icon: XCircleIcon,
          text: "Nieopłacone",
          classes: "bg-red-100 text-red-800",
        };
    }
  };

  const totalRevenue = filteredPayments.reduce(
    (sum, payment) => sum + (payment.price || 0),
    0
  );

  const paidRevenue = filteredPayments
    .filter((p) => p.paymentStatus === "cash" || p.paymentStatus === "transfer")
    .reduce((sum, payment) => sum + (payment.price || 0), 0);

  const unpaidRevenue = filteredPayments
    .filter((p) => p.paymentStatus === "unpaid")
    .reduce((sum, payment) => sum + (payment.price || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
            Płatności
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Całkowity przychód</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalRevenue)}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Opłacone</p>
            <p className="text-2xl font-bold text-green-700">
              {formatCurrency(paidRevenue)}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Nieopłacone</p>
            <p className="text-2xl font-bold text-red-700">
              {formatCurrency(unpaidRevenue)}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Szukaj płatności..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent appearance-none bg-white"
            >
              <option value="all">Wszystkie</option>
              <option value="cash">Gotówka</option>
              <option value="transfer">Przelew</option>
              <option value="unpaid">Nieopłacone</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
            <p className="mt-2 text-gray-500">Ładowanie płatności...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usługa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kwota
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zadatek
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => {
                  const statusBadge = getStatusBadge(payment.paymentStatus);
                  const StatusIcon = statusBadge.icon;

                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.clientName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {getServiceLabel(payment.serviceType)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {payment.serviceDetails}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(payment.price)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.classes}`}
                        >
                          <StatusIcon className="h-4 w-4 mr-1" />
                          {statusBadge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {payment.depositPaid ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Opłacony
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <ClockIcon className="h-4 w-4 mr-1" />
                            Brak
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredPayments.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              Nie znaleziono żadnych płatności.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsView;
