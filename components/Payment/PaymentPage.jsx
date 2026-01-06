import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '../../hooks/useBooks';
import { Button } from '../Common/Button';
import { Toast } from '../Common/Toast';
import { QRCodeSVG } from 'qrcode.react';
import { generatePDFBill } from '../../utils/pdfGenerator';
import '../styles/PaymentPage.css';

export function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getBookById } = useBooks();
  const book = getBookById(id);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const YOUR_UPI_ID = 'mohanrajkrish2006@okicici';
  const YOUR_UPI_NAME = 'Books Management';

  useEffect(() => {
    if (!book) {
      navigate('/books');
    }
  }, [book, navigate]);

  if (!book) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentConfirm = () => {
    if (!validateForm()) {
      setToast({
        show: true,
        message: 'Please fill in all required fields correctly.',
        type: 'error',
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentConfirmed(true);
      
      const orderId = `ORD-${Date.now()}`;
      const totalAmount = price + 50;

      setToast({
        show: true,
        message: 'Payment confirmed! Generating your bill...',
        type: 'success',
      });

      setTimeout(() => {
        generatePDFBill({
          book,
          customer: formData,
          amount: totalAmount,
          orderId,
          date: new Date().toISOString(),
          upiId: YOUR_UPI_ID,
        });
        
        setToast({
          show: true,
          message: 'Bill downloaded successfully!',
          type: 'success',
        });
      }, 1000);
    }, 2000);
  };

  const handleDownloadBill = () => {
    const orderId = `ORD-${Date.now()}`;
    const totalAmount = price + 50;
    
    generatePDFBill({
      book,
      customer: formData,
      amount: totalAmount,
      orderId,
      date: new Date().toISOString(),
      upiId: YOUR_UPI_ID,
    });
    
    setToast({
      show: true,
      message: 'Bill downloaded successfully!',
      type: 'success',
    });
  };

  const price = 299;
  const totalAmount = price + 50;

  const upiPaymentUrl = `upi://pay?pa=${YOUR_UPI_ID}&pn=${encodeURIComponent(YOUR_UPI_NAME)}&am=${totalAmount}&cu=INR&tn=Book%20Purchase%20${encodeURIComponent(book.title)}`;

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <button className="payment-back-btn" onClick={() => navigate('/books')}>
            ← Back to Books
          </button>
          <h1 className="payment-title">Complete Your Purchase</h1>
          <p className="payment-subtitle">Choose your payment method and complete the transaction</p>
        </div>

        <div className="payment-content">
          <div className="payment-book-summary">
            <div className="book-summary-card">
              <div className="book-summary-image">
                <svg width="80" height="107" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="160" rx="8" fill="url(#bookGradient)" />
                  <rect x="10" y="20" width="100" height="12" rx="2" fill="white" opacity="0.3" />
                  <rect x="10" y="38" width="80" height="6" rx="1" fill="white" opacity="0.2" />
                  <rect x="10" y="48" width="70" height="6" rx="1" fill="white" opacity="0.2" />
                  <defs>
                    <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E3A8A" />
                      <stop offset="100%" stopColor="#3B82F6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="book-summary-details">
                <h3 className="book-summary-title">{book.title}</h3>
                <p className="book-summary-author">by {book.author}</p>
                <p className="book-summary-category">{book.category}</p>
                <p className="book-summary-isbn">ISBN: {book.isbn}</p>
                <div className="book-summary-price">
                  <span className="price-label">Price:</span>
                  <span className="price-amount">₹{price}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-main">
            <form className="payment-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-section">
                <h2 className="form-section-title">Customer Information</h2>
                
                <div className="form-row">
                  <div className="form-field-wrapper">
                    <label htmlFor="name" className="form-label">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      disabled={paymentConfirmed}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-field-wrapper">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      disabled={paymentConfirmed}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-field-wrapper">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    disabled={paymentConfirmed}
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-field-wrapper">
                  <label htmlFor="address" className="form-label">
                    Delivery Address <span className="required">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    className={`form-input form-textarea ${errors.address ? 'error' : ''}`}
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete delivery address"
                    rows="4"
                    disabled={paymentConfirmed}
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>
              </div>
            </form>

            {!paymentConfirmed ? (
              <div className="payment-methods-section">
                <h2 className="form-section-title">Payment Methods</h2>
                
                <div className="payment-methods-grid">
                  <div className="payment-method-card">
                    <div className="payment-method-header">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span>Pay via UPI ID</span>
                    </div>
                    <div className="upi-id-placeholder">
                      <div className="upi-id-display">
                        <span className="upi-label">UPI ID:</span>
                        <span className="upi-value">{YOUR_UPI_ID}</span>
                        <button
                          type="button"
                          className="upi-copy-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(YOUR_UPI_ID);
                            setToast({
                              show: true,
                              message: 'UPI ID copied to clipboard!',
                              type: 'success',
                            });
                          }}
                          title="Copy UPI ID"
                        >
                          📋
                        </button>
                      </div>
                      <p className="upi-instruction">
                        Copy the UPI ID above and use it in your UPI app (PhonePe, Google Pay, Paytm, etc.) to complete the payment of ₹{totalAmount}.
                      </p>
                    </div>
                  </div>

                  <div className="payment-method-card">
                    <div className="payment-method-header">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                      <span>Scan QR Code</span>
                    </div>
                    <div className="qr-code-placeholder">
                      <div className="qr-code-container">
                        <QRCodeSVG
                          value={upiPaymentUrl}
                          size={150}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="qr-instruction">
                        Scan this QR code with any UPI app to make the payment of ₹{totalAmount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Book Price</span>
                    <span>₹{price}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery Charges</span>
                    <span>₹50</span>
                  </div>
                  <div className="summary-row summary-total">
                    <span>Total Amount</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                <div className="payment-actions">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/books')}
                    disabled={isProcessing}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={handlePaymentConfirm}
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? 'Processing...' : 'I Have Paid'}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="payment-success">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                </div>
                <h2 className="success-title">Payment Confirmed!</h2>
                <p className="success-message">
                  Thank you for your purchase. Your order has been confirmed and the bill has been downloaded automatically.
                </p>
                <div className="success-actions">
                  <Button variant="primary" onClick={handleDownloadBill} size="lg">
                    Download Bill Again
                  </Button>
                  <Button variant="secondary" onClick={() => navigate('/books')}>
                    Back to Books
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
}
