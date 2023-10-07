const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const http = require('https');

// const axios = require('axios');
//  const apiUrl = 'https://api.beehiiv.com/v2/publications/pub_375a4bc6-a5e4-4053-ad0c-833a7a848aed/subscriptions';
// const apiKey= 'Rxl9nqn1nb8QbUYAmCmqRrC820R1eCdKGizWaKCKvXZvpVG41P4ZYyDM2WuNRwBm';

app.use(express.json());
app.use(cors());
const nodemailer = require('nodemailer');
const { emit } = require('process');

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb "}));
app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});




//Contact Us Form to receive emails from clients directly from the website
function sendEmail({ recipient_email, subject, name, message, phone_number}){

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
        <li>Email: ${recipient_email}</li>
        <li>Subject: ${subject}</li>
        <li>Name: ${name}</li>
        <li>Phone: ${phone_number}</li>
        </ul>
    <h3>Message</h3>
    <p>${message}</p>
    `;
    return new Promise((resolve ,reject) =>{
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:myemail,
                pass:mypass
            },
            tls:{
                rejectUnauthorized:false
            }
        })
        var messages = {
            from: recipient_email,
            to: "green.ajuda@gmail.com",
            subject: subject,
            text: message,
            html: output
           
          };
        transporter.sendMail(messages, function(error, info){
            if(error){
                console.log(error)
                return reject({message: "An error has occured"})
            }
            return resolve({message: "Email sent successfuly"})
        })
    })
}



// get method to get the message from the form dont think its needed 
app.get('/', (req,res) =>{  
    sendEmail()
    .then(response => res.send(response.message))
})


// post method that sends the email
app.post("/send_email", (req,res)=>{
    sendEmail(req.body)
    .then(response => res.send(response.messages))
    .catch(error => res.status(500).send(error.message))
})


app.listen(3001,()=>{
    console.log('app is running on port 3001');
});

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'path/to/your/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })


/*
/ --> res = this is working
/ signin --> POST = success / fail
/ register --> POST = user
/ profile/:userId --> GET = user
*/


const myemail = "green.ajuda@gmail.com"
const mypass = "uahmtfcarfdsfjzc"
