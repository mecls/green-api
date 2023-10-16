const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
const http = require('https');
const {google} = require('googleapis');

const CLIENT_ID = '686654606509-tjn5u20p3uds82kp16c2qf94uadubmq8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//046u90lyGqqz-CgYIARAAGAQSNwF-L9Irwo18_DlyupSjkc9qHqURuD_bmmOub2pXkR_eMJ5GcjZ4FOnd8VbpqNptJ9obBnxLZUo';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET, REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


// const axios = require('axios');
//  const apiUrl = 'https://api.beehiiv.com/v2/publications/pub_375a4bc6-a5e4-4053-ad0c-833a7a848aed/subscriptions';
// const apiKey= 'Rxl9nqn1nb8QbUYAmCmqRrC820R1eCdKGizWaKCKvXZvpVG41P4ZYyDM2WuNRwBm';

app.use(express.json());
app.use(cors());
const nodemailer = require('nodemailer');

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb "}));
app.use((req,res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});




//Contact Us Form to receive emails from clients directly from the website
 function sendMail({recipient_email, subject, name, message, phone_number}){

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
         
        const accessToken = oAuth2Client.getAccessToken()

        const transporter = nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        type:'oauth2',
                        user:myemail,
                       clientId:CLIENT_ID,
                       clientSecret:CLIENT_SECRET,
                       refreshToken:REFRESH_TOKEN,
                       accessToken: accessToken
                    },
                    tls:{
                        rejectUnauthorized:false
                    }
                })

         const mailOptions ={
            from: 'CONTACT US FORM <green.ajuda@gmail.com>',
            to: 'green.ajuda@gmail.com',
            subject: subject,
            text: message,
            html: output
              };

     
        
        
        // return new Promise((resolve ,reject) =>{
        //    
        // const transporter = nodemailer.createTransport({
        //     service:'gmail',
        //     auth:{
        //         type:'oauth2',
        //         user:myemail,
        //        clientId:CLIENT_ID,
        //        clientSecret:CLIENT_SECRET,
        //        refreshToken:REFRESH_TOKEN,
        //        accessToken: accessToken
        //     },
        //     tls:{
        //         rejectUnauthorized:false
        //     }
        // })
        //     var messages = {
        //         from: "green.ajuda@gmail.com",
        //         to: "green.ajuda@gmail.com",
        //         subject: subject,
        //         text: message,
        //         html: output
               
        //       };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error)
                    return reject({message: "An error has occured"})
                }
                return resolve({message: "Email sent successfuly"})
            })
        })
   
    
}



// get method to get the message from the form 
app.get('/',  (req,res) =>{  
    sendMail()
    .then(response => res.send(response.message))
})


// post method that sends the email
app.post("/send_email",  (req,res)=>{
    sendMail(req.body)
    .then(response => res.send(response.messages))
    .catch(error => res.status(500).send(error.message))
})


app.listen(3001,()=>{
    console.log('app is running on port 3001');
});




/*
/ --> res = this is working
/ signin --> POST = success / fail
/ register --> POST = user
/ profile/:userId --> GET = user
*/


const myemail = "green.ajuda@gmail.com"
