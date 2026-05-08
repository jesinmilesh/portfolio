$(document).ready(function () {
    $(window).scroll(function () {
        // sticky navbar on scroll script
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // scroll-up button show/hide script
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing-1", {
        strings: ["Cyber Security Student", "Python Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["Cyber Security Student", "Python Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});

// Function to sanitize HTML input to prevent XSS/Injection in email body
function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

function sendEmail() {
    if (typeof Email === 'undefined') {
        alert("Email service (SMTP.js) is not loaded. Please check your internet connection or disable ad blockers.");
        return;
    }

    const button = document.querySelector(".button-area button");
    button.disabled = true;
    button.innerText = "Sending...";

    const rawName    = document.querySelector("#name").value;
    const rawEmail   = document.querySelector("#email").value;
    const rawSubject = document.querySelector("#subject").value;
    const rawMessage = document.querySelector("#message").value;

    // Sanitize inputs to prevent malicious HTML/scripts
    const name    = sanitizeHTML(rawName);
    const email   = sanitizeHTML(rawEmail);
    const subject = sanitizeHTML(rawSubject);
    const message = sanitizeHTML(rawMessage);

    const LOGO = "<img src='https://raw.githubusercontent.com/jesinmilesh/portfolio/main/images/Jeisn%20Tech%20Logo.png' alt='Jesin Tech Logo' width='200'>";

    // 1. Confirmation email â†’ sent to the user
    Email.send({
        Host: "smtp.gmail.com",
        Username: "jesintechnologies@gmail.com",
        Password: "dughwoircwixhqhb",
        To: email,
        From: "jesintechnologies@gmail.com",
        Subject: "We received your message â€“ " + subject,
        Body: "<div style='text-align:left;font-family:sans-serif;'>" +
              LOGO + "<br><br>" +
              "Hello <b>" + name + "</b>,<br><br>" +
              "Welcome and thank you for reaching out to Jesin Technologies! We have received your message and will contact you within 2 to 3 working days.<br><br>" +
              "<b>Your Message:</b><br>" + message + "<br><br>" +
              "Have a good day!<br><br>" +
              "<i>\"Once your mind stretches to a new level it never goes back to its original dimension.\"<br>â€“ Dr. A.P.J. Abdul Kalam</i></div>"
    }).then(msg => {

        // Show success/failure modal
        const modal = document.getElementById("email-modal");
        const icon  = document.getElementById("modal-icon");
        const title = document.getElementById("modal-title");
        const text  = document.getElementById("modal-message");

        if (msg === "OK") {
            icon.className  = "fas fa-check-circle success";
            title.innerText = "Email Sent!";
            text.innerText = "Thank you! Your message has been sent successfully.";
            document.getElementById("contact-form").reset();
        } else {
            icon.className  = "fas fa-times-circle error";
            title.innerText = "Not Sent";
            text.innerText = "Oops! Something went wrong. Please try again.";
        }
        modal.classList.add("show");

        // Enable button again
        button.disabled = false;
        button.innerText = "Send message";
    });
}

function closeModal() {
    document.getElementById("email-modal").classList.remove("show");
}

// Close modal when clicking the dark backdrop
window.addEventListener("click", function(e) {
    const modal = document.getElementById("email-modal");
    if (e.target === modal) closeModal();
});
