document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

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

        navLinks.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "☰";

            });

        });

    }


    /* =========================
       NAVBAR SCROLL
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


    /* =========================
       MENU FILTERS
    ========================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const foodCards =
        document.querySelectorAll(".food-card");


    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;


            /* Active button */

            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* Filter food */

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


    /* =========================
       FOOD MODAL
    ========================= */

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


    document.querySelectorAll(".view-food").forEach((button) => {

        button.addEventListener("click", () => {

            if (!foodModal) return;

            modalTitle.textContent =
                button.dataset.title;

            modalPrice.textContent =
                button.dataset.price;

            modalDescription.textContent =
                button.dataset.description;

            modalImage.src =
                button.dataset.image;

            modalImage.alt =
                button.dataset.title;

            foodModal.classList.add("show");

            document.body.classList.add("modal-open");

        });

    });


    function closeModal() {

        if (!foodModal) return;

        foodModal.classList.remove("show");

        document.body.classList.remove("modal-open");

    }


    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeModal);
    }


    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            foodModal &&
            foodModal.classList.contains("show")
        ) {

            closeModal();

        }

    });


    if (orderBtn) {

        orderBtn.addEventListener("click", () => {

            orderBtn.textContent = "Added ✓";

            setTimeout(() => {

                orderBtn.textContent = "Add to Order";

            }, 1500);

        });

    }


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("revealed");

                            revealObserver.unobserve(
                                entry.target
                            );

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

    }


    /* =========================
       STATS COUNTER
    ========================= */

    const stats =
        document.querySelectorAll(".stat strong");

    let statsStarted = false;


    const statsSection =
        document.querySelector(".stats-container");


    if (
        statsSection &&
        "IntersectionObserver" in window
    ) {

        const statsObserver =
            new IntersectionObserver(
                (entries) => {

                    if (
                        entries[0].isIntersecting &&
                        !statsStarted
                    ) {

                        statsStarted = true;


                        stats.forEach((counter) => {

                            const target =
                                parseFloat(
                                    counter.dataset.target
                                );

                            let current = 0;

                            const increment =
                                target / 60;


                            function updateCounter() {

                                current += increment;


                                if (current < target) {

                                    if (target === 4.9) {

                                        counter.textContent =
                                            current.toFixed(1);

                                    } else {

                                        counter.textContent =
                                            Math.floor(current)
                                            .toLocaleString();

                                    }

                                    requestAnimationFrame(
                                        updateCounter
                                    );

                                } else {

                                    counter.textContent =
                                        target === 4.9
                                            ? "4.9"
                                            : target.toLocaleString();

                                }

                            }


                            updateCounter();

                        });

                    }

                },
                {
                    threshold: 0.5
                }
            );


        statsObserver.observe(statsSection);

    }


    /* =========================
       RESERVATION FORM
    ========================= */

    const reservationForm =
        document.getElementById("reservationForm");

    const reservationMessage =
        document.getElementById("reservationMessage");

    const reservationDate =
        document.getElementById("reservationDate");


    if (reservationDate) {

        const today = new Date();

        const year =
            today.getFullYear();

        const month =
            String(today.getMonth() + 1)
            .padStart(2, "0");

        const day =
            String(today.getDate())
            .padStart(2, "0");

reservationDate.min =
    `${year}-${month}-${day}`;

const maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 90);

const maxYear =
    maxDate.getFullYear();

const maxMonth =
    String(maxDate.getMonth() + 1)
    .padStart(2, "0");

const maxDay =
    String(maxDate.getDate())
    .padStart(2, "0");

reservationDate.max =
    `${maxYear}-${maxMonth}-${maxDay}`;

    }


    if (
        reservationForm &&
        reservationMessage
    ) {

        reservationForm.addEventListener(
    "submit",
    (event) => {

        if (!reservationForm.checkValidity()) {
            return;
        }

        event.preventDefault();


                const guestName =
                    document
                        .getElementById("guestName")
                        .value.trim();


                const guestPhone =
                    document
                        .getElementById("guestPhone")
                        .value.trim();


                const guestEmail =
                    document
                        .getElementById("guestEmail")
                        .value.trim();


                const guestCount =
                    document
                        .getElementById("guestCount")
                        .value;


                const selectedDate =
                    reservationDate.value;


                const selectedTime =
                    document
                        .getElementById("reservationTime")
                        .value;


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

                    return;

                }


                const phonePattern =
    /^(?:\+91[\s-]?)?[6-9]\d{9}$/;

                if (!phonePattern.test(guestPhone)) {

                    reservationMessage.textContent =
                        "Please enter a valid phone number.";

                    return;

                }

reservationMessage.textContent =
    `Thank you, ${guestName}! Your table for ${guestCount} ${guestCount === "1" ? "guest" : "guests"} is requested for ${selectedDate} at ${selectedTime}.`;

                reservationForm.reset();


                setTimeout(() => {

                    reservationMessage.textContent = "";

                }, 5000);

            }
        );

    }


    /* =========================
       NEWSLETTER
    ========================= */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterMessage =
        document.getElementById("newsletterMessage");


    if (
        newsletterForm &&
        newsletterMessage
    ) {

        newsletterForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const email =
                    document
                        .getElementById("newsletterEmail")
                        .value.trim();


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email)) {

                    newsletterMessage.textContent =
                        "Please enter a valid email.";

                    return;

                }


                newsletterMessage.textContent =
                    "You're subscribed ✓";


                newsletterForm.reset();


                setTimeout(() => {

                    newsletterMessage.textContent = "";

                }, 4000);

            }
        );

    }


    console.log(
        "SAVORÉ JavaScript loaded successfully."
    );

});