import jsPDF from 'jspdf';

export function generatePDFBill({ book, customer, amount, orderId, date, upiId }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;

  const addText = (text, x, y, maxWidth, fontSize = 10, align = 'left') => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y, { align });
    return y + (lines.length * fontSize * 0.4);
  };

  doc.setFillColor(30, 58, 138);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Books Management', margin, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Invoice / Bill', pageWidth - margin, 25, { align: 'right' });

  yPosition = 50;

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Order Details', margin, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Order ID: ${orderId}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Date: ${new Date(date).toLocaleString('en-IN')}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 5;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Customer Information', margin, yPosition, pageWidth - 2 * margin);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Name: ${customer.name}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Email: ${customer.email}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Phone: ${customer.phone}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Address: ${customer.address}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Book Details', margin, yPosition, pageWidth - 2 * margin);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPosition = addText(`Title: ${book.title}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Author: ${book.author}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Category: ${book.category}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`ISBN: ${book.isbn}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  yPosition = addText('Payment Summary', margin, yPosition, pageWidth - 2 * margin);
  yPosition += 5;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const bookPrice = amount - 50;
  yPosition = addText(`Book Price: ₹${bookPrice}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition = addText(`Delivery Charges: ₹50`, margin, yPosition, pageWidth - 2 * margin);
  if (upiId) {
    yPosition = addText(`Payment Method: UPI (${upiId})`, margin, yPosition, pageWidth - 2 * margin);
  }
  
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition + 2, pageWidth - margin, yPosition + 2);
  yPosition += 8;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  yPosition = addText(`Total Amount: ₹${amount}`, margin, yPosition, pageWidth - 2 * margin);
  yPosition += 10;

  doc.setFillColor(34, 197, 94);
  doc.rect(margin, yPosition, pageWidth - 2 * margin, 15, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Status: PAID', margin + 5, yPosition + 10);
  yPosition += 25;

  if (yPosition > pageHeight - 40) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for your purchase!', margin, pageHeight - 20);
  doc.text('For any queries, please contact us at support@booksmanagement.com', margin, pageHeight - 15);
  doc.text('This is a computer-generated invoice.', margin, pageHeight - 10);

  const fileName = `Invoice_${orderId}_${new Date().getTime()}.pdf`;
  doc.save(fileName);
}
