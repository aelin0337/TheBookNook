/* ===== Bootstrap Button Override ===== */

/* Primary button (View details) */
.btn-primary {
  background-color: #6A6F4C;
  border: none;
  color: #EDE1D2;
  border-radius: 12px;
  font-size: 0.85rem;
  padding: 8px 12px;
  transition: all 0.25s ease;
}

.btn-primary:hover,
.btn-primary:focus {
  background-color: #5D2510;
  box-shadow: 0 6px 16px rgba(93, 37, 16, 0.35);
  transform: translateY(-2px);
}

/* Success button (Add to cart) */
.btn-success {
  background-color: #806044;
  border: none;
  color: #EDE1D2;
  border-radius: 12px;
  font-size: 0.85rem;
  padding: 8px 12px;
  transition: all 0.25s ease;
}

.btn-success:hover,
.btn-success:focus {
  background-color: #412F26;
  box-shadow: 0 6px 16px rgba(65, 47, 38, 0.35);
  transform: translateY(-2px);
}


/* ===== Add to Cart Button ===== */
.btn-add-to-cart {
  background-color: #6A6F4C;
  border: none;
  color: #EDE1D2;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 10px 14px;
  border-radius: 12px;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;
}

/* Hover */
.btn-add-to-cart:hover {
  background-color: #5D2510;
  color: #EDE1D2;
  box-shadow: 0 6px 16px rgba(93, 37, 16, 0.35);
  transform: translateY(-2px);
}

/* Active (click) */
.btn-add-to-cart:active {
  background-color: #412F26;
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(65, 47, 38, 0.35);
}

/* Focus (keyboard / accessibility) */
.btn-add-to-cart:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(203, 184, 157, 0.6);
}


/* ===== Global ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", "Segoe UI", sans-serif;
}

body {
  min-height: 100vh;
  background-color: #412F26;
  color: #412F26;
}


/* ===== Book Grid ===== */
.books-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  padding: 40px;
}

/* ===== Book Card ===== */

.book-card,
.card {
  background-color: #EDE1D2;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid #CBB89D;
  box-shadow: 0 10px 25px rgba(65, 47, 38, 0.25);
  color: #412F26;
}


.book-card {
  background: #EDE1D2;
  border-radius: 18px;
  padding: 18px;
  border: 1px solid #CBB89D;
  box-shadow: 0 10px 25px rgba(65, 47, 38, 0.25);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  animation: fadeUp 0.6s ease;
}

.book-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(65, 47, 38, 0.35);
}

/* ===== Book Image ===== */
.book-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 14px;
  border: 1px solid #806044;
}

/* ===== Book Title ===== */
.book-card h5 {
  font-size: 1rem;
  font-weight: 600;
  color: #5D2510;
  margin-bottom: 6px;
  line-height: 1.3;
}

/* ===== Book Info ===== */
.book-card p {
  font-size: 0.85rem;
  color: #412F26;
  margin: 4px 0;
  line-height: 1.4;
}

/* ===== Price ===== */
.book-card .price {
  margin-top: auto;
  font-size: 1rem;
  font-weight: 600;
  color: #6A6F4C;
}

/* ===== Buttons ===== */
.book-card button {
  margin-top: 12px;
  padding: 10px;
  background: #6A6F4C;
  color: #EDE1D2;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.25s ease;
}

.book-card button:hover {
  background: #5D2510;
  box-shadow: 0 6px 16px rgba(93, 37, 16, 0.35);
  transform: translateY(-2px);
}

/* ===== Badges ===== */
.badge {
  display: inline-block;
  background: #806044;
  color: #EDE1D2;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.7rem;
  margin-bottom: 8px;
  width: fit-content;
}

/* ===== Animations ===== */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
