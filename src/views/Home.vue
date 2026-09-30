<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-content">
        <span class="badge">Welcome to Gatherly</span>
        <h1 class="hero-title">Connect, Discover, and Experience</h1>
        <p class="hero-subtitle">
          Join our vibrant community to explore the best events tailored for you.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </p>
        <div class="hero-actions">
          <router-link to="/browse/events" class="btn btn-primary">Discover Events</router-link>
          <router-link to="/about" class="btn btn-secondary">Learn More</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="feature-card" v-for="i in 3" :key="i">
        <div class="feature-icon">{{ ['🎯', '🌐', '👥'][i - 1] }}</div>
        <h3>{{ ['Curated Events', 'Global Reach', 'Community Driven'][i - 1] }}</h3>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    </section>

    <section class="sitemap-visual">
      <h2>Website Structure / Site-Map</h2>
      <p class="sitemap-desc">
        A quick overview of how this application is structured via Vue Router.
      </p>
      <ul class="tree">
        <li>
          <router-link to="/">Home</router-link>
          <ul>
            <li><router-link to="/about">About</router-link></li>
            <li>
              <router-link to="/browse">Browse</router-link>
              <ul>
                <li>
                  <router-link to="/browse/events">Event List</router-link>
                  <ul>
                    <li><router-link to="/browse/events/1">Event Detail (Example)</router-link></li>
                  </ul>
                </li>
                <li><router-link to="/browse/category">Category</router-link></li>
              </ul>
            </li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  animation: fadeIn 0.5s ease;
}

.hero {
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 5rem 2rem;
  background: #fdfdfd;
  border-radius: 24px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.hero-content {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  background: rgba(102, 68, 255, 0.08);
  color: #6644ff;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 2rem;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  color: #1c1948;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 600px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background: #6644ff;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 68, 255, 0.2);
}

.btn-primary:hover {
  background: #5533ee;
  transform: translateY(-2px);
}

.btn-secondary {
  background: white;
  color: #1c1948;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  border-color: #6644ff;
  color: #6644ff;
  transform: translateY(-2px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  border-color: #e0e0e0;
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  color: #1c1948;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.sitemap-visual {
  padding: 3rem;
  background: #fafafa;
  border-radius: 16px;
  border: 1px solid #f0f0f0;
}

.sitemap-visual h2 {
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.sitemap-desc {
  color: #666;
  margin-bottom: 2.5rem;
}

.tree,
.tree ul {
  list-style: none;
  padding-left: 20px;
}

.tree li {
  margin: 12px 0;
  position: relative;
}

.tree li::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -15px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 10px;
  height: 30px;
}

.tree a {
  text-decoration: none;
  color: #444;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  display: inline-block;
  transition: all 0.2s;
  background: white;
  border: 1px solid #eee;
}

.tree a:hover {
  border-color: #ccc;
  color: #1c1948;
}

.tree .router-link-exact-active {
  background: #6644ff;
  color: white;
  border-color: #6644ff;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
