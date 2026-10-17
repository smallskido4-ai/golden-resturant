const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

// Mobile navigation
menuToggle.addEventListener("click", function () {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Menü schließen" : "Menü öffnen"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a link
nav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menü öffnen");
    menuToggle.textContent = "☰";
  });
});

// Display the current year automatically
document.getElementById("year").textContent =
  new Date().getFullYear();

// Prevent reservations for dates in the past
const guestDate = document.getElementById("guestDate");

const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

guestDate.min = localToday;

// Reservation demo form
const reservationForm =
  document.getElementById("reservationForm");

const formMessage =
  document.getElementById("formMessage");

reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("guestName").value.trim();
  const email = document.getElementById("guestEmail").value.trim();
  const date = guestDate.value;
  const guests = document.getElementById("guestCount").value;
  const time = document.getElementById("guestTime").value;

  if (!name || !email || !date || !time) {
    formMessage.textContent =
      "Bitte füllen Sie alle Pflichtfelder aus.";
    return;
  }

  if (date < localToday) {
    formMessage.textContent =
      "Bitte wählen Sie ein zukünftiges Datum.";
    return;
  }

  formMessage.textContent =
    "Vielen Dank, " + name +
    "! Ihre Demo-Anfrage für " + guests +
    " Person(en) am " + date + " um " + time +
    " Uhr wurde geprüft. Dies ist noch keine echte Reservierung.";

  reservationForm.reset();
  guestDate.min = localToday;
});
