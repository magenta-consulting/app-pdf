const puppeteer = require('puppeteer');

var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(async function(request, response) {
   let url = decodeURIComponent('http://fujioh.swarranty.magentapulse.com/front/service-sheet%3Fcases%5B0%5D=67&cases%5B1%5D=64');
   let downloadStr = '/download-pdf/';
   let lastSlashIndex = request.url.lastIndexOf('/');

   encodedUrl = request.url.substr(downloadStr.length, lastSlashIndex - downloadStr.length);
   url = decodeURIComponent(encodedUrl);
   
   let filename = request.url.substr(lastSlashIndex+1);
  console.log(request.url, url, filename);

  const browser = await puppeteer.launch();
  console.log(puppeteer.product);
  const page = await browser.newPage();
  page.once('load', () => 
  {
    console.log('Page loaded!')
    // page.pdf({path: 'invoice.pdf'})
  }
  );
  
//  await page.goto('http://account-manager.magenta-wellness.com/invoice/client/view-invoice/INVOICE_5e9706fb1fa68?printable=1', {waitUntil: 'networkidle0'});

  
  await page.goto(url, {waitUntil: 'networkidle0'});  

  await page.pdf({path: 'invoice123.pdf', format: 'A4'});

  await browser.close();

    var filePath = path.join(__dirname, 'invoice123.pdf');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition':'attachment; filename="'+filename+'.pdf"',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
})
.listen(2000);