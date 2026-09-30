<template>
  <div class="event-list-page">
    <div class="header-section">
      <h2 class="section-title">Upcoming Events</h2>
      <p class="section-desc">Discover the latest gatherings and activities happening near you.</p>
    </div>

    <div class="event-grid">
      <div class="event-card" v-for="i in 6" :key="i">
        <div class="event-body">
          <div class="event-meta">
            <span class="event-date">Oct {{ 10 + i }}, 2026</span>
            <span class="event-category">Community</span>
          </div>
          <h3>Community Gathering {{ i }}</h3>
          <p class="event-loc">📍 Main Auditorium, City Center</p>
          <p class="event-desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at velit vel magna
            interdum scelerisque.
          </p>
          <div class="card-footer">
            <router-link :to="`/browse/events/${i}`" class="btn-link">
              View Details &rarr;
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-section {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: #666;
  font-size: 1.1rem;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.event-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  border: 1px solid #f0f0f0;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  display: flex;
  flex-direction: column;
}

.event-card:hover {
  transform: translateY(-5px);
  border-color: #ddd;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
}

.event-body {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.event-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.event-date {
  background: rgba(102, 68, 255, 0.1);
  color: #6644ff;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.event-category {
  color: #888;
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.event-body h3 {
  color: #1c1948;
  margin-bottom: 0.8rem;
  font-size: 1.4rem;
}

.event-loc {
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.event-desc {
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  flex-grow: 1;
}

.card-footer {
  border-top: 1px solid #f0f0f0;
  padding-top: 1.5rem;
}

.btn-link {
  display: inline-block;
  color: #1c1948;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.btn-link:hover {
  color: #6644ff;
}
</style>
