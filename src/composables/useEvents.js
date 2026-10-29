import { ref, computed, watch } from 'vue';

// DATA AWAL (Initial State): Dimulai dari array kosong untuk menguji Empty State
const defaultEvents = [];

// STORAGE KEYS
const EVENTS_STORAGE_KEY = 'gatherly_events';
const REGISTRATIONS_STORAGE_KEY = 'gatherly_user_registrations';

// SINGLE SOURCE OF TRUTH (Module-level Singleton)
const savedData = localStorage.getItem(EVENTS_STORAGE_KEY);
const events = ref(savedData ? JSON.parse(savedData) : defaultEvents);

const savedRegs = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
const userRegistrations = ref(savedRegs ? JSON.parse(savedRegs) : []);

// WATCHERS (Side Effect: Sinkronisasi ke LocalStorage)
watch(
  events,
  (newEvents) => {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(newEvents));
  },
  { deep: true }
);

watch(
  userRegistrations,
  (newRegs) => {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(newRegs));
  },
  { deep: true }
);

export function useEvents() {
  // DERIVED STATE (Dihitung otomatis menggunakan computed)
  const totalEvents = computed(() => events.value.length);
  const activeEvents = computed(() => events.value.filter(e => !e.done));
  const completedEvents = computed(() => events.value.filter(e => e.done));
  const totalRegistrations = computed(() => userRegistrations.value.length);

  // MUTASI STATE: TAMBAH DATA EVENT (Create)
  const createEvent = (eventData) => {
    const cleanLoc = eventData.loc.replace(/^[📍\s]+/, '').trim();
    const newEvent = {
      id: Date.now(),
      title: eventData.title.trim(),
      date: eventData.date,
      loc: cleanLoc,
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      desc: eventData.desc.trim(),
      done: false
    };
    events.value.unshift(newEvent);
    return newEvent;
  };

  // MUTASI STATE: UBAH STATUS (Toggle/Mark as Completed)
  const completeEvent = (id) => {
    const target = events.value.find(e => e.id === Number(id));
    if (target) {
      target.done = true;
    }
  };

  // MUTASI STATE: HAPUS DATA EVENT (Delete with Cascading Cleanup)
  const deleteEvent = (id) => {
    const numId = Number(id);
    const index = events.value.findIndex(e => e.id === numId);
    if (index !== -1) {
      events.value.splice(index, 1);
    }
    // CASCADING DELETE: Hapus seluruh tiket pendaftaran yang terikat dengan event yang dimusnahkan
    userRegistrations.value = userRegistrations.value.filter(r => r.eventId !== numId);
  };

  // PENCARIAN DATA BERDASARKAN ID
  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id));
  };

  // MUTASI STATE: PENDAFTARAN PESERTA (Register Attendee)
  const registerAttendee = (eventId, participantData) => {
    const event = events.value.find(e => e.id === Number(eventId));
    if (!event || event.quota <= 0) return null;

    const bookingCode = 'GTH-' + Date.now().toString().slice(-4);
    const regRecord = {
      id: Date.now(),
      eventId: Number(eventId),
      eventTitle: event.title,
      eventCat: event.cat,
      eventDate: event.date,
      eventLoc: event.loc,
      bookingCode,
      registeredAt: new Date().toISOString(),
      fullName: participantData.fullName.trim(),
      email: participantData.email.trim(),
      phone: participantData.phone.trim(),
      dob: participantData.dob,
      reason: participantData.reason.trim()
    };

    // Kurangi kuota event secara reaktif
    event.quota = Math.max(0, event.quota - 1);

    // Simpan pendaftaran ke riwayat registrasi pengguna
    userRegistrations.value.unshift(regRecord);

    return regRecord;
  };

  // HELPER CEK STATUS PENDAFTARAN (Hanya bernilai true jika event masih aktif di sistem)
  const isUserRegistered = (eventId) => {
    const numId = Number(eventId);
    const eventExists = events.value.some(e => e.id === numId);
    if (!eventExists) return false;
    return userRegistrations.value.some(r => r.eventId === numId);
  };

  // MENGAMBIL DATA TIKET BERDASARKAN EVENT ID
  const getRegistrationByEventId = (eventId) => {
    return userRegistrations.value.find(r => r.eventId === Number(eventId));
  };

  // MUTASI STATE: PEMBATALAN PENDAFTARAN (Reset Registrasi Tertentu)
  const cancelRegistration = (eventId) => {
    const regIdx = userRegistrations.value.findIndex(r => r.eventId === Number(eventId));
    if (regIdx !== -1) {
      userRegistrations.value.splice(regIdx, 1);

      // Pulihkan kuota event masternya
      const event = events.value.find(e => e.id === Number(eventId));
      if (event) {
        event.quota += 1;
      }
      return true;
    }
    return false;
  };

  // FUNGSI RESET DATA PENGUJIAN PRAKTIKUM
  const clearAllEvents = () => {
    events.value = [];
    localStorage.removeItem(EVENTS_STORAGE_KEY);
  };

  const clearAllRegistrations = () => {
    userRegistrations.value = [];
    localStorage.removeItem(REGISTRATIONS_STORAGE_KEY);
  };

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    userRegistrations,
    totalRegistrations,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    registerAttendee,
    isUserRegistered,
    getRegistrationByEventId,
    cancelRegistration,
    clearAllEvents,
    clearAllRegistrations
  };
}
