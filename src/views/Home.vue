<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Connect, Discover, and Experience</h1>
        <p class="hero-subtitle">
          A community event platform designed to bring ideas together. Discover hundreds of events near you.
        </p>
        <div class="hero-action">
          <router-link to="/browse/events" class="btn-primary">Discover Events</router-link>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-header">
        <h2>Why Choose Gatherly?</h2>
        <p>Everything you need to host or attend unforgettable events.</p>
      </div>

      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Discover Easily</h3>
          <p>Find events tailored to your interests using our smart category and location filters.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎟️</div>
          <h3>Seamless Ticketing</h3>
          <p>Register with one click and get your digital QR ticket instantly on your device.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Host Like a Pro</h3>
          <p>Manage attendees, track revenue, and scan QR codes with our comprehensive dashboard.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  /* THE FOLD: Force hero height to viewport minus navbar */
  min-height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: var(--bg-light);
  border-radius: var(--space-6);
  border: 1px solid var(--border-color);
  padding: var(--space-12) var(--space-6);
  margin-bottom: var(--space-12);
}

.hero-content {
  max-width: 800px;
  /* Z-PATTERN: Center aligned cascading elements */
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* SCALE: Massive font sets the highest Ranked Importance */
.hero-title {
  font-size: 4rem;
  font-weight: 800;
  color: var(--text-main);
  line-height: 1.1;
  margin-bottom: var(--space-6);
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-muted);
  margin-bottom: var(--space-8);
  max-width: 600px;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-3) var(--space-8);
  border-radius: 12px;
  transition: transform 0.2s, background-color 0.2s;
  /* Make button pop to pass the Squint Test */
  box-shadow: 0 8px 20px rgba(102, 68, 255, 0.3);
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-2px);
}

/* --- NEW FEATURES SECTION --- */
.features-section {
  padding: 0 0 var(--space-12) 0;
}

.features-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.features-header h2 {
  font-size: 2.2rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.features-header p {
  color: var(--text-muted);
  font-size: 1.1rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-8);
}

.feature-card {
  background: var(--bg-light);
  padding: var(--space-8);
  border-radius: var(--space-4);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--space-4);
}

.feature-card h3 {
  font-size: 1.3rem;
  color: var(--text-main);
  margin-bottom: var(--space-2);
}

.feature-card p {
  color: var(--text-muted);
  line-height: 1.6;
}
</style>

