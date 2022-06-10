const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());

const puppeteer = require('puppeteer')


app.post("/replace", async(req, res) => {
//   // Create a document
// const doc = new PDFDocument();
// // Saving the pdf file in root directory.
// doc.pipe(fs.createWriteStream('leave.pdf'));
// let template=`

// Subject: ${req.body.subject}

// Dear Mr./Mrs. ${req.body.recipientName},

// I am writing to request you for a leave of ${req.body.days} days from ${req.body.startDate} to ${req.body.endDate} since I have to attend to a ${req.body.reason}.  

// I will resume work from ${req.body.mentionDate}.

// I shall be reachable on my ${req.body.mobileNumber} and ${req.body.email} during the period. My person in charge, ${req.body.personName} will be handling my tasks in my absence.

// I will be thankful to you for considering my application.

// Yours Sincerely,
// ${req.body.name}`

// // Adding functionality
// doc
//   .fontSize(14)
//   .text(template, 60, 60);
//   // Finalize PDF file
// doc.end();

// pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
//   if (err) return console.log(err);
//   console.log(res); 
// });


//res.json({ message: template });


const browser = await puppeteer.launch();
const page = await browser.newPage()

// We set the page content as the generated html by handlebars
await page.setContent(`<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>A simple</title>
    
    <style>
    .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
    }
    
    .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
    }
    
    .invoice-box table td {
        padding: 5px;
        vertical-align: top;
    }
    
    .invoice-box table tr td:nth-child(2) {
        text-align: right;
    }
    
    .invoice-box table tr.top table td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
    }
    
    .invoice-box table tr.information table td {
        padding-bottom: 40px;
    }
    
    .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
    }
    
    .invoice-box table tr.details td {
        padding-bottom: 20px;
    }
    
    .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
    }
    
    .invoice-box table tr.item.last td {
        border-bottom: none;
    }
    
    .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
    }
    
    @media only screen and (max-width: 600px) {
        .invoice-box table tr.top table td {
            width: 100%;
            display: block;
            text-align: center;
        }
        
        .invoice-box table tr.information table td {
            width: 100%;
            display: block;
            text-align: center;
        }
    }
    
    /** RTL **/
    .rtl {
        direction: rtl;
        font-family: Tahoma, 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
    }
    
    .rtl table {
        text-align: right;
    }
    
    .rtl table tr td:nth-child(2) {
        text-align: left;
    }
    </style>
</head>

<body>
    <div class="invoice-box">
        <table cellpadding="0" cellspacing="0">
            <tr class="top">
                <td colspan="2">
                </td>
            </tr>
            
            <tr class="information">
                <td colspan="2">
                    <table>
                        <tr>
                            <td>
                                Subject: ${req.body.subject}<br>
                                Dear Mr ${req.body.recipientName} sir,<br>
                            </td>
                           </tr>
                    </table>
                </td>
            </tr>
            
            <tr class="details">
                <td>
                I am writing to request you for a leave of ${req.body.days} days from ${req.body.startDate} to ${req.body.endDate} since I have to attend to a ${req.body.reason}.<br><br>  

                I will resume work from ${req.body.mentionDate}.<br><br>
                
                I shall be reachable on my ${req.body.mobileNumber} and ${req.body.email} during the period. My person in charge, ${req.body.personName} will be handling my tasks in my absence.<br><br>
                
                I will be thankful to you for considering my application.<br><br>
                
                </td>
            </tr>
                        
            <tr class="item">
                <td>
                Yours Sincerely,<br>
                ${req.body.name}
                </td>
            </tr>
        </table>
    </div>
</body>
</html>`)

// we Use pdf function to generate the pdf in the same folder as this file.
await page.pdf({ path: 'leaveapplication.pdf', format: 'A4' })

await browser.close();
res.send("PDF Generated")

});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});
