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
    var typed = new Typed(".typing", {
        strings: ["Cyber Security Student", "Python Developer", "Web Developer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed2 = new Typed(".typing-2", {
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

// Function to get user response via prompt and callback
function getUserResponse(promptMessage, callback) {
    const response = window.prompt(promptMessage);
    if (callback && typeof callback === 'function') {
        callback(response);
    }
}


function sendEmail() {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const subject = document.querySelector("#subject").value;
    const message = document.querySelector("#message").value;

    Email.send({
        Host: "smtp.gmail.com",
        Username: "jesintechnologies@gmail.com",
        Password: "dughwoircwixhqhb",
        To: email,
        From: "jesintechnologies@gmail.com",
        Subject: subject,
        Body: "<div style='text-align: left;'><img src='https://raw.githubusercontent.com/jesinmilesh/portfolio/main/images/Jeisn%20Tech%20Logo.png' alt='Jesin Tech Logo' width='200'></div><br>Hello " + name + ",<br><br>Welcome and thank you for reaching out to Jesin Technologies! We have received your message and will contact you within 2 to 3 working days.<br><br><b>Your Message:</b><br>" + message + "<br><br>Have a good day!<br><br><i>\"Once your mind stretches to a new level it never goes back to its original dimension.\" <br>– Dr. A.P.J. Abdul Kalam</i>"
    }).then(
        msg => {
            if (msg === "OK") {
                alert("Email Sent!!");
            } else {
                alert("Email Not Sent!! " + msg);
            }
        }
    );
}
