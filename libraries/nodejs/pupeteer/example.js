const puppeteer = require('puppeteer');

var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(function(request, response) {
    var filePath = path.join(__dirname, 'test.pdf');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(2000);

// (async () => {
//   const browser = await puppeteer.launch();
//   console.log(puppeteer.product);
//   const page = await browser.newPage();
//   page.once('load', () => 
//   {
//     console.log('Page loaded!')
//     // page.pdf({path: 'invoice.pdf'})
//   }
//   );
  
//   await page.goto('http://account-manager.magenta-wellness.com/invoice/client/view-invoice/INVOICE_5e9706fb1fa68?printable=1', {waitUntil: 'networkidle0'});
    
//   await page.pdf({path: 'invoice.pdf', format: 'A4'});

//   await browser.close();
// })();