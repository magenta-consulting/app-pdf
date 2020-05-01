const puppeteer = require('puppeteer');
const fs = require('fs')

var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

http.createServer(async function(request, response) {
  //  let url = decodeURIComponent('http://fujioh.swarranty.magentapulse.com/front/service-sheet%3Fcases%5B0%5D=67&cases%5B1%5D=64');
   let downloadStr = '/download-pdf/';
   let viewStr = '/view-pdf/';
   let actionStr;

   if(request.url.indexOf(downloadStr)==0){
    actionStr = downloadStr;
   }else if(request.url.indexOf(viewStr)==0){
    actionStr = viewStr;
   } else {
     return ;
   }

   let lastSlashIndex = request.url.lastIndexOf('/');

   let encodedUrl = request.url.substr(actionStr.length, lastSlashIndex - actionStr.length);
   let url = decodeURIComponent(encodedUrl);
   
   let filename = request.url.substr(lastSlashIndex+1);
  console.log(request.url, url, filename);

  const browser = await puppeteer.launch();
  console.log(puppeteer.product);
  const page = await browser.newPage();
  
//  await page.goto('http://account-manager.magenta-wellness.com/invoice/client/view-invoice/INVOICE_5e9706fb1fa68?printable=1', {waitUntil: 'networkidle0'});

let rand = Math.random() * 1000000;
let randomNum = Math.round(rand);
try{
  console.log('Requesting URL',url)
  await page.goto(url, {waitUntil: 'networkidle0'});  

  await page.pdf({path: 'tmp/' + randomNum + '.pdf', format: 'A4'});

}catch(e){
  console.log(e)
}finally{
  await browser.close();
}
  

    var filePath = path.join(__dirname, 'tmp/' + randomNum+'.pdf');
    var stat = fileSystem.statSync(filePath);

    if(actionStr === downloadStr){
      response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition':'attachment; filename="'+filename+'.pdf"',
        'Content-Length': stat.size
    });
    }else{
      response.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': stat.size
    });
    }

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err)
        return
      }
    
      //file removed
    })
})
.listen(8000);