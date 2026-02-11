console.log("script1.js loaded");

/* ================= AUTO LOAD PRODUCT FROM JEWELLERY PAGE ================= */
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const productFromURL = params.get("product");
  const priceFromURL = params.get("price");

  if (productFromURL && priceFromURL) {

    const productSelect = document.getElementById("product");

    let found = false;

    // Check if product already exists in dropdown
    for (let opt of productSelect.options) {
      if (opt.value === productFromURL) {
        opt.selected = true;
        found = true;
        break;
      }
    }

    // If not found, add dynamically
    if (!found) {
      const option = document.createElement("option");
      option.value = productFromURL;
      option.text = productFromURL;
      option.setAttribute("data-price", priceFromURL);
      option.selected = true;
      productSelect.appendChild(option);
    }

    // Set price
    document.getElementById("price").value = priceFromURL;
    document.getElementById("priceText").innerText = "Rs. " + priceFromURL;
  }
});


/* ================= BOOKING ================= */
function sendBooking() {

  const bookingForm = document.getElementById("bookingForm");

  let data = new FormData();
  data.append("action", "booking");
  data.append("name", document.getElementById("b_name").value);
  data.append("email", document.getElementById("b_email").value);
  data.append("phone", document.getElementById("b_phone").value);
  data.append("address", document.getElementById("b_address").value);
  data.append("country", document.getElementById("country").value);
  data.append("city", document.getElementById("city").value);
  data.append("product", document.getElementById("product").value);
  data.append("price", document.getElementById("price").value);

  fetch("p.php", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(msg => {
    if (msg.trim() === "success") {
      alert("Booking Successful!");
      bookingForm.reset();
      document.getElementById("priceText").innerText = "Rs. 0";
    } else {
      alert("Server Error: " + msg);
    }
  })
  .catch(() => alert("Network error"));
}


/* ================= PRICE UPDATE (MANUAL SELECT) ================= */
function updatePrice() {
  const productSelect = document.getElementById("product");
  const selectedOption = productSelect.options[productSelect.selectedIndex];

  if (!selectedOption) return;

  const price = selectedOption.getAttribute("data-price") || 0;

  document.getElementById("price").value = price;
  document.getElementById("priceText").innerText = "Rs. " + price;
}


/* ================= CONTACT ================= */
function sendContact() {
  let data = new FormData();
  data.append("action", "contact");
  data.append("name", document.getElementById("c_name").value);
  data.append("email", document.getElementById("c_email").value);
  data.append("message", document.getElementById("c_message").value);

  fetch("p.php", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg.trim() === "success" ? "Message sent successfully!" : "Server Error: " + msg);
  });
}


/* ================= SUPPORT ================= */
function sendComplaint() {
  sendSupport("Complaint", "", document.getElementById("cp_issue").value);
}

function sendFeedback() {
  sendSupport("Feedback", "", document.getElementById("fb_text").value);
}

function sendReturn() {
  sendSupport("Return",
    document.getElementById("rt_order").value,
    document.getElementById("rt_reason").value
  );
}

function sendRefund() {
  sendSupport("Refund",
    document.getElementById("rf_order").value,
    document.getElementById("rf_reason").value
  );
}

function sendSupport(type, order, message) {

  let data = new FormData();
  data.append("action", "support");
  data.append("type", type);
  data.append("order", order);
  data.append("message", message);

  fetch("p.php", {
    method: "POST",
    body: data
  })
  .then(res => res.text())
  .then(msg => {
    alert(msg.trim() === "success" ? type + " submitted successfully!" : "Server Error: " + msg);
    closePopup();
  });
}


/* ================= POPUPS ================= */
function openPopup(id) {
  const popup = document.getElementById(id);
  if (popup) popup.style.display = "block";
}

function closePopup() {
  document.querySelectorAll(".popup").forEach(p => p.style.display = "none");
}
