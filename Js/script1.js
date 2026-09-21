const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// =========================
// MOBILE MENU
// =========================

const navbar = document.getElementById("navbar");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


/* =========================
   MOBILE NAVIGATION
   ========================= */

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");

    menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("show");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
    });
});


/* =========================
   NAVBAR SCROLL EFFECT
   ========================= */

if (navbar) {
    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    });
}


// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


// =========================
// STATISTICS COUNTER
// =========================

const stats = document.querySelectorAll(".stat strong");

let statsStarted = false;

const statsObserver = new IntersectionObserver(
    (entries) => {

        if (entries[0].isIntersecting && !statsStarted) {

            statsStarted = true;

            stats.forEach((counter) => {

                const target = parseFloat(
                    counter.dataset.target
                );

                let current = 0;

                const increment = target / 60;

                const updateCounter = () => {

                    current += increment;

                    if (current < target) {

                        if (target === 4.9) {

                            counter.textContent =
                                current.toFixed(1);

                        } else {

                            counter.textContent =
                                Math.floor(current).toLocaleString();

                        }

                        requestAnimationFrame(updateCounter);

                    } else {

                        if (target === 4.9) {

                            counter.textContent = "4.9";

                        } else {

                            counter.textContent =
                                target.toLocaleString();
                        }

                    }

                };

                updateCounter();

            });

        }

    },
    {
        threshold: 0.5
    }
);


const statsSection =
    document.querySelector(".stats-container");

if (statsSection) {

    statsObserver.observe(statsSection);

}
// =========================
// MENU FILTERS
// =========================

const filterButtons =
    document.querySelectorAll(".filter-btn");

const foodCards =
    document.querySelectorAll(".food-card");


filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        // Remove active from all buttons
        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        // Add active to clicked button
        button.classList.add("active");

        const category =
            button.dataset.category;


        // Filter food cards
        foodCards.forEach((card) => {

            const cardCategory =
                card.dataset.category;

            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


// =========================
// FOOD MODAL
// =========================

const foodModal =
    document.getElementById("foodModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalPrice =
    document.getElementById("modalPrice");

const modalDescription =
    document.getElementById("modalDescription");

const orderBtn =
    document.getElementById("orderBtn");


// Open food modal

document.querySelectorAll(".view-food")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const title =
                button.dataset.title;

            const price =
                button.dataset.price;

            const description =
                button.dataset.description;

            const image =
                button.dataset.image;


            modalTitle.textContent =
                title;

            modalPrice.textContent =
                price;

            modalDescription.textContent =
                description;

            modalImage.src =
                image;

            modalImage.alt =
                title;


            foodModal.classList.add("show");

            document.body.classList.add(
                "modal-open"
            );

        });

    });


// =========================
// CLOSE MODAL
// =========================

function closeModal() {

    foodModal.classList.remove("show");

    document.body.classList.remove(
        "modal-open"
    );

}


// Close button

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


// Click outside modal

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeModal
    );

}


// ESC key

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            foodModal.classList.contains("show")
        ) {

            closeModal();

        }

    }
);


// =========================
// ADD TO ORDER BUTTON
// =========================

if (orderBtn) {

    orderBtn.addEventListener(
        "click",
        () => {

            orderBtn.textContent =
                "Added ✓";

            orderBtn.style.background =
                "#fff";


            setTimeout(() => {

                orderBtn.textContent =
                    "Add to Order";

                orderBtn.style.background =
                    "";

            }, 1500);

        }
    );

}


console.log(
    "SAVORÉ restaurant website loaded successfully."
);
// =========================
// RESERVATION FORM
// =========================

const reservationForm = document.getElementById("reservationForm");
const reservationMessage = document.getElementById("reservationMessage");
const reservationDate = document.getElementById("reservationDate");

if (reservationDate) {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    reservationDate.min = `${year}-${month}-${day}`;
}


if (reservationForm && reservationMessage) {

    reservationForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const guestName =
            document.getElementById("guestName").value.trim();

        const guestPhone =
            document.getElementById("guestPhone").value.trim();

        const guestEmail =
            document.getElementById("guestEmail").value.trim();

        const guestCount =
            document.getElementById("guestCount").value;

        const selectedDate =
            reservationDate.value;

        const selectedTime =
            document.getElementById("reservationTime").value;


        /* Basic validation */

        if (
            !guestName ||
            !guestPhone ||
            !guestEmail ||
            !guestCount ||
            !selectedDate ||
            !selectedTime
        ) {
            reservationMessage.textContent =
                "Please complete all required fields.";

            reservationMessage.style.color = "#e6a05c";

            return;
        }


        /* Phone validation */

        const phonePattern = /^[0-9+\-\s()]{10,15}$/;

        if (!phonePattern.test(guestPhone)) {

            reservationMessage.textContent =
                "Please enter a valid phone number.";

            reservationMessage.style.color = "#e6a05c";

            return;
        }


        /* Success */

        reservationMessage.textContent =
            `Thank you, ${guestName}! Your reservation request has been received.`;

        reservationMessage.style.color = "#d9ad5b";


        reservationForm.reset();


        setTimeout(() => {
            reservationMessage.textContent = "";
        }, 5000);

    });

}
// =========================
// NEWSLETTER
// =========================

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterMessage =
    document.getElementById("newsletterMessage");


if (newsletterForm && newsletterMessage) {

    newsletterForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const email =
            document.getElementById("newsletterEmail").value.trim();


        if (!email) {
            newsletterMessage.textContent =
                "Please enter your email.";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            newsletterMessage.textContent =
                "Please enter a valid email.";

            return;
        }


        newsletterMessage.textContent =
            "You're subscribed ✓";

        newsletterMessage.style.color = "#d9ad5b";

        newsletterForm.reset();


        setTimeout(() => {
            newsletterMessage.textContent = "";
        }, 4000);

    });

}