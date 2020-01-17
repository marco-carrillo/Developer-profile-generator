// this file will try the pdf generator without the HTML

const PDFDocument = require('pdfkit');
const fs = require('fs');
 
// Create a document
const doc = new PDFDocument();

// Embed a font, set the font size, and render some text
doc
  .font('fonts/PalatinoBold.ttf')
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('path/to/image.png', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });

  // Draw a triangle
doc
.save()
.moveTo(100, 150)
.lineTo(100, 250)
.lineTo(200, 250)
.fill('#FF3300');