$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["Software Engineer", "Python Developer", "Ethical Hacker ", "Starter"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
       strings: ["Software Engineer", "Python Developer", "Ethical Hacker ", "Starter"],
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
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
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

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('section.contact form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Use fetch to send form data to the API endpoint
            fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    form.reset();
                } else {
                    alert('Failed to send message. Please try again later.');
                }
            })
            .catch(error => {
                alert('Error sending message: ' + error.message);
            });
        });
    }
});
function sendEmail(){
    const templateParams={
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value
    };

    emailjs.send("service_ly1z5dg","template_banowuo",templateParams).then(
        ()=> alert("Email Sent!!").catch(()=>alert("Email Not Sent!!"))
    );
}

function sendBoth(){
    const form = document.querySelector('#contact-form');
    const templateParams={
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        subject: document.querySelector("#subject").value,
        message: document.querySelector("#message").value
    };

    // Send email via emailjs
    emailjs.send("service_ly1z5dg","template_banowuo",templateParams).then(
        () => {
            alert("Email Sent !! kindly check your Mail");
        },
        () => {
            alert("Email Not Sent !! Kindly Check the given Details");
        }
    );

    // Prepare data for web3forms
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send form data to web3forms API
    fetch(form.action, {
        method: form.method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
       
}
