import { ref, computed, watch } from 'vue';

// DATA AWAL (Initial State): Dimulai dari array kosong untuk menguji Empty State
const defaultEvents = [];

// SINGLE SOURCE OF TRUTH (Diletakkan di luar fungsi agar shared/singleton)
const savedData = localStorage.getItem('gatherly_events');
const events = ref(savedData ? JSON.parse(savedData) : defaultEvents);

// WATCHERS (Side Effect: Menyimpan ke LocalStorage setiap kali state events berubah)
watch(
  events,
  (newEvents) => {
    localStorage.setItem('gatherly_events', JSON.stringify(newEvents));
  },
  { deep: true }
);

export function useEvents() {
  // DERIVED STATE (Dihitung otomatis menggunakan computed)
  const totalEvents = computed(() => events.value.length);
  const activeEvents = computed(() => events.value.filter(e => !e.done));
  const completedEvents = computed(() => events.value.filter(e => e.done));

  // MUTASI STATE: TAMBAH DATA (Create)
  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date,
      loc: eventData.loc.startsWith('📍') ? eventData.loc : `📍 ${eventData.loc}`,
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      price: eventData.price || 'Free',
      desc: eventData.desc,
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

  // MUTASI STATE: HAPUS DATA (Delete)
  const deleteEvent = (id) => {
    const index = events.value.findIndex(e => e.id === Number(id));
    if (index !== -1) {
      events.value.splice(index, 1);
    }
  };

  // PENCARIAN DATA BERDASARKAN ID
  const getEventById = (id) => {
    return events.value.find(e => e.id === Number(id));
  };

  // FUNGSI RESET DATA (Opsional untuk pengujian praktikum)
  const clearAllEvents = () => {
    events.value = [];
    localStorage.removeItem('gatherly_events');
  };

  return {
    events,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents
  };
}
