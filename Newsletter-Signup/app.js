const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: '8607237f04466e75a4fde3c00e789a26-us18',
  server: 'us18',
});

async function callPing() {
  const response = await mailchimp.ping.get();
  console.log(response);
}

callPing();

app.post("/", function(req, res){
  const listID = "790788f4b2";
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(listID, {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName
          }
        }
      ],
    });
    console.log(response);

    if(response.error_count == 0){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();

  console.log(res.statusCode);

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

// app.post("/", function(req, res){
//   const firstName = req.body.firstName;
//   const lastName = req.body.lastName;
//   const email = req.body.email;
//
//   var data = {
//     members: [
//       {
//         email_address: email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: firstName,
//           LNAME: lastName
//         }
//       }
//     ]
//   };
//
//   var jsonData = JSON.stringify(data);
//
//   const url = "https://us18.api.mailchimp.com/3.0/lists/790788f4b2";
//
//   const options = {
//     method: "POST",
//     auth: "joao1:8607237f04466e75a4fde3c00e789a26-us18"
//   };
//
//   const request = https.request(url, options, function(response){
//     response.on("data", function(data){
//       console.log(JSON.parse(data));
//     });
//   });
//
//   request.write(jsonData);
//   request.end();
// });

app.listen(process.env.PORT || 3000, function(req, res){
  console.log("Server running on port 3000");
});
