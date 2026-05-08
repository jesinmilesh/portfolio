const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jesintechnologies@gmail.com',
            pass: 'dughwoircwixhqhb'
        }
    });

    const mailOptions = {
        from: 'Jesin Tech',
        to: email,
        subject: "We received your message -  " + subject,
        html: `<div style='text-align:left;font-family:sans-serif;'>
                  <h2>Hello ${name},</h2>
                  <p>Welcome and thank you for reaching out to Jesin Technologies! We have received your message and will contact you within 2 to 3 working days.</p>
                  <p><b>Your Message:</b><br>${message}</p>
                  <p>Have a good day!</p>
                  <i>"Once your mind stretches to a new level it never goes back to its original dimension."<br> - Dr. A.P.J. Abdul Kalam</i>
               </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('OK');
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
