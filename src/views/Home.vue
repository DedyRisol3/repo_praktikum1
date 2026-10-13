<script setup>
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
</script>

<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">Connect, Discover, and Experience</h1>
        <p class="hero-subtitle">
          A community event platform designed to bring ideas together. Discover hundreds of events near you.
        </p>
        <div class="hero-action">
          <AppButton variant="primary" @click="$router.push('/browse/events')">
            Discover Events
          </AppButton>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="features-header">
        <h2>Why Choose Gatherly?</h2>
        <p>Everything you need to host or attend unforgettable events.</p>
      </div>

      <div class="features-grid">
        <AppCard class="feature-card">
          <div class="feature-icon">🔍</div>
          <h3>Discover Easily</h3>
          <p>Find events tailored to your interests using our smart category and location filters.</p>
        </AppCard>

        <AppCard class="feature-card">
          <div class="feature-icon">🎟️</div>
          <h3>Seamless Ticketing</h3>
          <p>Register with one click and get your digital QR ticket instantly on your device.</p>
        </AppCard>

        <AppCard class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>Host Like a Pro</h3>
          <p>Manage attendees, track revenue, and scan QR codes with our comprehensive dashboard.</p>
        </AppCard>
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
  padding: var(--space-8);
  text-align: center;
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
