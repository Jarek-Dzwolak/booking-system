import React, { useState, useEffect, useRef } from "react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  addWeeks,
  subWeeks,
  setHours,
  eachHourOfInterval,
} from "date-fns";
import { pl } from "date-fns/locale";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  XMarkIcon,
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../contexts/firebase-config";
import { useAuth } from "../contexts/AuthContext";
import { useSalonConfig } from "../public/config/useSalonConfig";

const DeleteConfirmationModal = ({
  appointment,
  onClose,
  onConfirm,
  deleting,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-sm p-4 sm:p-6 shadow-xl">
        <div className="mb-4 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Usunąć wizytę?</h3>
          <p className="text-sm text-gray-500 mt-2">
            Wizyta zostanie trwale usunięta. Tej operacji nie można cofnąć.
          </p>
        </div>
        <div className="p-3 bg-gray-50 rounded-md mb-4 text-xs sm:text-sm">
          <p className="font-medium">{appointment?.client}</p>
          <p className="text-gray-600">{appointment?.serviceDetails}</p>
          <p className="text-gray-500 mt-1">
            {appointment?.date}, {appointment?.startTime} -{" "}
            {appointment?.endTime}
          </p>
        </div>
        <div className="flex flex-col-reverse sm:flex-row-reverse gap-2">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            disabled={deleting}
          >
            {deleting ? "Usuwanie..." : "Usuń wizytę"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            disabled={deleting}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

const EditAppointmentModal = ({
  appointment,
  onClose,
  onSave,
  onDelete,
  updating,
}) => {
  const [formData, setFormData] = useState({
    price: appointment?.price || "",
    depositPaid: appointment?.depositPaid || false,
    paymentStatus: appointment?.paymentStatus || "unpaid",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-4 sm:p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <h3 className="text-lg font-semibold">Edytuj wizytę</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="font-medium text-sm sm:text-base">
            {appointment?.client}
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {appointment?.serviceDetails}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {appointment?.startTime} - {appointment?.endTime}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cena (zł)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-sm"
              disabled={updating}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status płatności
            </label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 text-sm"
              disabled={updating}
            >
              <option value="unpaid">Nie opłacone</option>
              <option value="cash">Gotówka</option>
              <option value="transfer">Przelew</option>
            </select>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="depositPaid"
              name="depositPaid"
              checked={formData.depositPaid}
              onChange={handleChange}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
              disabled={updating}
            />
            <label
              htmlFor="depositPaid"
              className="ml-2 block text-sm font-medium text-gray-700"
            >
              Zadatek opłacony
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t">
          <button
            type="button"
            onClick={onDelete}
            className="order-1 sm:order-first px-4 py-2 text-sm rounded-md text-white bg-red-600 hover:bg-red-700 flex items-center justify-center"
            disabled={updating}
          >
            <TrashIcon className="h-4 w-4 mr-1" /> Usuń
          </button>

          <div className="flex flex-col sm:flex-row gap-2 order-first sm:order-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
              disabled={updating}
            >
              Anuluj
            </button>
            <button
              type="button"
              onClick={() => onSave(formData)}
              className="px-4 py-2 text-sm rounded-md text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={updating}
            >
              {updating ? "Zapisywanie..." : "Zapisz"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [showDayView, setShowDayView] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { viewingUserEmail } = useAuth();
  const { services } = useSalonConfig();

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const hoursContainerRef = useRef(null);

  useEffect(() => {
    const fetchAppointmentsForWeek = async () => {
      try {
        setLoading(true);

        const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
        const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

        const startDateStr = format(startDate, "yyyy-MM-dd");
        const endDateStr = format(endDate, "yyyy-MM-dd");

        const appointmentsQuery = query(
          collection(db, "appointments"),
          where("date", ">=", startDateStr),
          where("date", "<=", endDateStr)
        );

        const querySnapshot = await getDocs(appointmentsQuery);

        const appointmentsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (!viewingUserEmail || data.ownerEmail === viewingUserEmail) {
            appointmentsData.push({
              id: doc.id,
              ...data,
              client:
                data.clientName ||
                data.clientInstagramName ||
                "Klient bez nazwy",
              service: data.serviceDetails,
              type: data.serviceType,
              startTime: data.startTime,
              endTime: data.endTime,
            });
          }
        });

        setAppointments(appointmentsData);
      } catch (err) {
        console.error("Błąd podczas pobierania wizyt:", err);
        setError("Nie udało się pobrać wizyt. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsForWeek();
  }, [currentDate, viewingUserEmail]);

  const onDayClick = (day) => {
    setSelectedDay(day);
    setShowDayView(true);
  };

  const backToWeekView = () => {
    setShowDayView(false);
  };

  const nextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const prevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };

  const handleEditClick = (appointment) => {
    setEditingAppointment(appointment);
    setShowEditModal(true);
  };

  const handleEditSave = async (formData) => {
    if (!editingAppointment) return;

    try {
      setUpdating(true);

      const appointmentRef = doc(db, "appointments", editingAppointment.id);
      await updateDoc(appointmentRef, {
        price: parseFloat(formData.price),
        depositPaid: formData.depositPaid,
        paymentStatus: formData.paymentStatus,
        updatedAt: Timestamp.now(),
      });

      setAppointments((prev) =>
        prev.map((apt) =>
          apt.id === editingAppointment.id
            ? {
                ...apt,
                price: parseFloat(formData.price),
                depositPaid: formData.depositPaid,
                paymentStatus: formData.paymentStatus,
              }
            : apt
        )
      );

      setShowEditModal(false);
      setEditingAppointment(null);
    } catch (err) {
      console.error("Błąd podczas aktualizacji wizyty:", err);
      alert("Nie udało się zaktualizować wizyty. Spróbuj ponownie.");
    } finally {
      setUpdating(false);
    }
  };

  const handleEditCancel = () => {
    setShowEditModal(false);
    setEditingAppointment(null);
  };

  const handleDeleteClick = () => {
    setShowEditModal(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setEditingAppointment(null);
  };

  const handleDeleteConfirm = async () => {
    if (!editingAppointment) return;

    try {
      setDeleting(true);

      const appointmentRef = doc(db, "appointments", editingAppointment.id);
      await deleteDoc(appointmentRef);

      setAppointments((prev) =>
        prev.filter((apt) => apt.id !== editingAppointment.id)
      );

      setShowDeleteConfirm(false);
      setEditingAppointment(null);

      const remainingAppointments = appointments.filter(
        (apt) =>
          apt.id !== editingAppointment.id &&
          apt.date === format(selectedDay, "yyyy-MM-dd")
      );

      if (remainingAppointments.length === 0 && showDayView) {
        setShowDayView(false);
      }
    } catch (err) {
      console.error("Błąd podczas usuwania wizyty:", err);
      alert("Nie udało się usunąć wizyty. Spróbuj ponownie.");
    } finally {
      setDeleting(false);
    }
  };

  const getAppointmentsForDay = (day) => {
    const dateStr = format(day, "yyyy-MM-dd");
    return appointments.filter((appointment) => appointment.date === dateStr);
  };

  const sortAppointmentsByTime = (appointments) => {
    return [...appointments].sort((a, b) => {
      return a.startTime.localeCompare(b.startTime);
    });
  };

  const renderWeekHeader = () => {
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
    const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

    return (
      <div className="flex items-center justify-between py-3 sm:py-4">
        <button
          onClick={prevWeek}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-sm sm:text-base font-semibold text-gray-900">
          {format(startDate, "d MMM", { locale: pl })} -{" "}
          {format(endDate, "d MMM yyyy", { locale: pl })}
        </h2>
        <button
          onClick={nextWeek}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    );
  };

  const getServiceColor = (category) => {
    const service = services.find((s) => s.category === category);
    const colorMap = {
      hands: {
        bg: "bg-pink-50",
        border: "border-pink-500",
        text: "text-pink-700",
      },
      makeup: {
        bg: "bg-purple-50",
        border: "border-purple-500",
        text: "text-purple-700",
      },
      face: {
        bg: "bg-blue-50",
        border: "border-blue-500",
        text: "text-blue-700",
      },
      spa: {
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-700",
      },
      "hair-removal": {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        text: "text-yellow-700",
      },
      eyes: {
        bg: "bg-indigo-50",
        border: "border-indigo-500",
        text: "text-indigo-700",
      },
    };
    return colorMap[category] || colorMap.hands;
  };

  const renderDayButtons = () => {
    const days = [];
    const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      const day = addDays(startDate, i);
      const dayAppointments = getAppointmentsForDay(day);
      const isToday = isSameDay(day, new Date());

      const serviceTypeCounts = {};
      dayAppointments.forEach((a) => {
        serviceTypeCounts[a.serviceType] =
          (serviceTypeCounts[a.serviceType] || 0) + 1;
      });

      days.push(
        <button
          key={i}
          className={`flex flex-col items-center p-2 sm:p-3 rounded-lg transition-all hover:bg-gray-50 ${
            isToday
              ? "bg-gradient-to-br from-pink-50 to-purple-50 ring-2 ring-pink-200"
              : ""
          }`}
          onClick={() => onDayClick(day)}
        >
          <div className="text-xs font-medium capitalize text-gray-500">
            {format(day, "EEE", { locale: pl })}
          </div>
          <div
            className={`text-lg sm:text-xl font-bold mt-1 ${
              isToday ? "text-pink-600" : "text-gray-900"
            }`}
          >
            {format(day, "d", { locale: pl })}
          </div>
          {dayAppointments.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2 justify-center">
              {Object.entries(serviceTypeCounts).map(([type, count]) => {
                const colors = getServiceColor(type);
                return (
                  <div
                    key={type}
                    className={`text-[10px] sm:text-xs px-1.5 py-0.5 rounded-full font-medium ${colors.bg} ${colors.text}`}
                  >
                    {count}
                  </div>
                );
              })}
            </div>
          )}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 sm:gap-2 border-b pb-3 mb-3">
        {days}
      </div>
    );
  };

  const renderDayHeader = () => {
    return (
      <div className="flex items-center mb-3 sm:mb-4">
        <button
          onClick={backToWeekView}
          className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-base sm:text-lg font-semibold capitalize text-gray-900">
          {format(selectedDay, "EEEE, d MMMM yyyy", { locale: pl })}
        </h2>
      </div>
    );
  };

  const organizeAppointmentsInColumns = (sortedAppointments) => {
    if (!sortedAppointments.length) return [];

    const columns = [];

    sortedAppointments.forEach((appointment) => {
      const [startHour, startMinute] = appointment.startTime
        .split(":")
        .map(Number);
      const [endHour, endMinute] = appointment.endTime.split(":").map(Number);

      const start = new Date();
      start.setHours(startHour, startMinute, 0);

      const end = new Date();
      end.setHours(endHour, endMinute, 0);

      let columnIndex = 0;
      let foundColumn = false;

      while (!foundColumn && columnIndex < columns.length) {
        const column = columns[columnIndex];
        const hasOverlap = column.some((existingAppt) => {
          const [exStartHour, exStartMinute] = existingAppt.startTime
            .split(":")
            .map(Number);
          const [exEndHour, exEndMinute] = existingAppt.endTime
            .split(":")
            .map(Number);

          const exStart = new Date();
          exStart.setHours(exStartHour, exStartMinute, 0);

          const exEnd = new Date();
          exEnd.setHours(exEndHour, exEndMinute, 0);

          return (
            (start <= exEnd && end >= exStart) ||
            Math.abs(end - exStart) < 1000 * 60 * 15 ||
            Math.abs(exEnd - start) < 1000 * 60 * 15
          );
        });

        if (!hasOverlap) {
          foundColumn = true;
          column.push(appointment);
        } else {
          columnIndex++;
        }
      }

      if (!foundColumn) {
        columns.push([appointment]);
      }
    });

    const resultAppointments = [];
    columns.forEach((column, colIndex) => {
      column.forEach((appointment) => {
        resultAppointments.push({
          ...appointment,
          columnIndex: colIndex,
          totalColumns: columns.length,
        });
      });
    });

    return resultAppointments;
  };

  const renderDayAppointments = () => {
    const dayAppointments = getAppointmentsForDay(selectedDay);
    const sortedAppointments = sortAppointmentsByTime(dayAppointments);
    const organizedAppointments =
      organizeAppointmentsInColumns(sortedAppointments);

    if (loading) {
      return (
        <div className="text-center py-8 text-gray-500">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          <p className="mt-2 text-sm">Ładowanie wizyt...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-8 text-red-500 text-sm">{error}</div>
      );
    }

    if (organizedAppointments.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <p className="text-sm sm:text-base">Brak wizyt na ten dzień</p>
        </div>
      );
    }

    const workdayStart = 8;
    const workdayEnd = 22;
    const dayStart = setHours(new Date(), workdayStart);
    const dayEnd = setHours(new Date(), workdayEnd);
    const hours = eachHourOfInterval({ start: dayStart, end: dayEnd });

    return (
      <div className="relative" ref={hoursContainerRef}>
        <div className="grid grid-cols-[48px_1fr] divide-y">
          {hours.map((hour, index) => (
            <React.Fragment key={index}>
              <div className="py-3 text-right pr-2 text-xs sm:text-sm text-gray-500 font-medium">
                {format(hour, "HH:00")}
              </div>
              <div className="h-16 py-1"></div>
            </React.Fragment>
          ))}
        </div>

        <div className="absolute inset-0 grid grid-cols-[48px_1fr] pointer-events-none">
          <div></div>
          <div className="relative">
            {organizedAppointments.map((appointment) => {
              const [startHour, startMinute] = appointment.startTime
                .split(":")
                .map(Number);
              const [endHour, endMinute] = appointment.endTime
                .split(":")
                .map(Number);

              const startPosition =
                (startHour - workdayStart) * 64 + (startMinute / 60) * 64;

              const durationInHours =
                endHour - startHour + (endMinute - startMinute) / 60;

              const blockHeight = Math.max(durationInHours * 64, 40);

              const { columnIndex, totalColumns } = appointment;
              const columnWidth = 100 / (totalColumns || 1);
              const leftPosition = (columnIndex || 0) * columnWidth;

              const blockStyle = {
                top: `${startPosition}px`,
                height: `${blockHeight}px`,
                left: `${leftPosition}%`,
                width: `${columnWidth}%`,
                padding: "0 2px",
              };

              const colors = getServiceColor(appointment.serviceType);
              const blockClasses = `absolute flex flex-col items-start rounded-lg shadow-sm border-l-4 text-sm pointer-events-auto overflow-hidden ${colors.bg} ${colors.border}`;

              return (
                <div
                  key={appointment.id}
                  className={blockClasses}
                  style={blockStyle}
                >
                  <div className="flex justify-between items-center w-full p-1 sm:p-2">
                    <div className="font-medium truncate max-w-[70%] text-xs sm:text-sm">
                      {appointment.client}

                      {durationInHours <= 1 && (
                        <span className="inline-flex ml-1 gap-1">
                          {appointment.depositPaid && (
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-yellow-500"
                              title="Zadatek"
                            ></span>
                          )}
                          {appointment.paymentStatus === "cash" && (
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-green-500"
                              title="Gotówka"
                            ></span>
                          )}
                          {appointment.paymentStatus === "transfer" && (
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-blue-500"
                              title="Przelew"
                            ></span>
                          )}
                          {appointment.paymentStatus === "unpaid" && (
                            <span
                              className="inline-block w-2 h-2 rounded-full bg-red-500"
                              title="Nieopłacone"
                            ></span>
                          )}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center">
                      {appointment.price && (
                        <span className="font-medium text-xs mr-1">
                          {appointment.price} zł
                        </span>
                      )}
                      <button
                        onClick={() => handleEditClick(appointment)}
                        className="text-gray-500 hover:text-gray-700 p-1"
                        title="Edytuj"
                      >
                        <PencilIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>

                  {durationInHours > 1 && (
                    <>
                      <div className="px-1 sm:px-2 text-xs truncate w-full">
                        {appointment.serviceDetails}
                      </div>

                      <div className="mt-auto w-full px-1 sm:px-2 pb-1">
                        <div className="flex items-center justify-between text-xs gap-1">
                          <span className="text-gray-500 text-xs">
                            {appointment.startTime}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1 mt-1">
                          {renderPaymentStatus(appointment)}
                          {renderDepositStatus(appointment)}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-3 sm:p-6">
        <div className="mb-3 sm:mb-4">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
            Harmonogram Wizyt
          </h1>
        </div>

        {showDayView ? (
          <>
            {renderDayHeader()}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
              {renderDayAppointments()}
            </div>
          </>
        ) : (
          <>
            {renderWeekHeader()}
            {renderDayButtons()}
            {loading ? (
              <div className="p-4 text-center text-gray-500 text-sm">
                Ładowanie wizyt...
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                Wybierz dzień, aby zobaczyć szczegóły wizyt
              </div>
            )}
          </>
        )}

        <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 sm:gap-3 text-xs">
          {services.map((service) => {
            const colors = getServiceColor(service.category);
            return (
              <div key={service.category} className="flex items-center">
                <div
                  className={`w-3 h-3 ${colors.bg} border-l-4 ${colors.border} mr-1`}
                ></div>
                <span>{service.title}</span>
              </div>
            );
          })}
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
            <span>Gotówka</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-100 mr-1"></div>
            <span>Przelew</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-100 mr-1"></div>
            <span>Nieopłacone</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-yellow-100 mr-1"></div>
            <span>Zadatek</span>
          </div>
        </div>
      </div>

      {showEditModal && editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          onClose={handleEditCancel}
          onSave={handleEditSave}
          onDelete={handleDeleteClick}
          updating={updating}
        />
      )}

      {showDeleteConfirm && editingAppointment && (
        <DeleteConfirmationModal
          appointment={editingAppointment}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          deleting={deleting}
        />
      )}
    </div>
  );
};

const renderPaymentStatus = (appointment) => {
  let statusColor;
  let statusText;

  switch (appointment.paymentStatus) {
    case "cash":
      statusColor = "bg-green-100 text-green-800";
      statusText = "Gotówka";
      break;
    case "transfer":
      statusColor = "bg-blue-100 text-blue-800";
      statusText = "Przelew";
      break;
    default:
      statusColor = "bg-red-100 text-red-800";
      statusText = "Nie opłacono";
  }

  return (
    <span className={`text-xs px-1.5 py-0.5 rounded ${statusColor}`}>
      {statusText}
    </span>
  );
};

const renderDepositStatus = (appointment) => {
  if (appointment.depositPaid) {
    return (
      <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-800">
        Zadatek
      </span>
    );
  }
  return null;
};

export default DashboardHome;
