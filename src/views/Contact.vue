<template>
  <div class="contact-page">
    <div class="contact-header">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you. Please fill out the form below or reach out via our contact
        info.
      </p>
    </div>

    <div class="contact-content">
      <div class="contact-info">
        <div class="info-item">
          <div class="info-icon">📍</div>
          <div>
            <h3>Our Office</h3>
            <p>123 Event Street, Tech City, 10101</p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">📞</div>
          <div>
            <h3>Phone</h3>
            <p>+62 812 3456 7890</p>
          </div>
        </div>

        <div class="info-item">
          <div class="info-icon">✉️</div>
          <div>
            <h3>Email</h3>
            <p>hello@gatherly.com</p>
          </div>
        </div>
      </div>

      <div class="contact-form">
        <form @submit.prevent>
          <div class="form-group">
            <label>Name</label>
            <input type="text" placeholder="John Doe" class="form-control" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input type="email" placeholder="john@example.com" class="form-control" />
          </div>

          <div class="form-group">
            <label>Message</label>
            <textarea placeholder="How can we help you?" rows="5" class="form-control"></textarea>
          </div>

          <button class="btn-submit">Send Message</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
  animation: fadeIn 0.5s ease;
}

.contact-header {
  text-align: center;
  margin-bottom: 4rem;
}

.contact-header h1 {
  font-size: 2.8rem;
  color: #1c1948;
  margin-bottom: 1rem;
}

.contact-header p {
  font-size: 1.1rem;
  color: #666;
}

.contact-content {
  display: flex;
  gap: 4rem;
  max-width: 1000px;
  margin: 0 auto;
}

.contact-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
}

.info-icon {
  font-size: 2rem;
  background: rgba(102, 68, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
}

.info-item h3 {
  color: #1c1948;
  margin-bottom: 0.5rem;
}

.info-item p {
  color: #555;
  line-height: 1.5;
}

.contact-form {
  flex: 1.5;
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
}

.form-control {
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
}

.form-control:focus {
  border-color: #6644ff;
}

.btn-submit {
  width: 100%;
  padding: 1rem;
  background: #6644ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #5533ee;
}

@media (max-width: 768px) {
  .contact-content {
    flex-direction: column;
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
