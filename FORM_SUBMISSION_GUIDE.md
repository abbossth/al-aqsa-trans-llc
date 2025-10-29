# Form Data Collection Guide

This guide explains how to collect form data from your Al Aqsa Auto Transport quote form.

## Current Setup
The form currently logs data to the browser console (for testing). Choose one of the methods below to actually collect the data.

---

## **Option 1: EmailJS (Recommended - Easiest)**

### What it does:
Sends form submissions directly to your email inbox. No backend required!

### Setup Steps:

1. **Sign up at [EmailJS](https://www.emailjs.com/)** (Free tier: 200 emails/month)

2. **Connect your email service:**
   - Go to Email Services
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create an email template:**
   - Go to Email Templates
   - Click "Create New Template"
   - Use this template:
   ```
   New Quote Request
   
   From: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   
   Pickup: {{pickup_location}}
   Delivery: {{delivery_location}}
   
   Vehicle: {{vehicle_year}} {{vehicle_make}} {{vehicle_model}}
   Transport Type: {{transport_type}}
   Condition: {{vehicle_condition}}
   Preferred Date: {{pickup_date}}
   Flexibility: {{flexibility}}
   
   Notes: {{notes}}
   ```

4. **Get your credentials:**
   - Public Key (found in Integration Settings)
   - Service ID (from your email service)
   - Template ID (from your email template)

5. **Update the code:**
   In `index.html` line 19, replace `"YOUR_PUBLIC_KEY"` with your actual key.
   
   In `script.js` lines 70-72, uncomment and replace:
   - `'YOUR_SERVICE_ID'` with your service ID
   - `'YOUR_TEMPLATE_ID'` with your template ID

6. **Uncomment the EmailJS code** in `script.js` (lines 53-73)

---

## **Option 2: Google Sheets (Free)**

### What it does:
Saves all form submissions to a Google Spreadsheet for easy tracking.

### Setup Steps:

1. **Create a Google Form:**
   - Go to [Google Forms](https://docs.google.com/forms)
   - Create a new form with fields matching your quote form
   - Note the form action URL (right-click Form > Inspect)

2. **Use Zapier/Integromat** (Free tier available):
   - Create a zap that sends webhook data to Google Sheets
   - Set up the webhook URL

3. **Alternative: Use FormSubmit.co:**
   - Visit [FormSubmit.co](https://formsubmit.co/)
   - Copy the provided form action URL
   - Add `method="POST"` and `action="YOUR_FORMSUBMIT_URL"` to your form tag

---

## **Option 3: Backend API (Most Control)**

### What it does:
Sends data to your own server for custom processing.

### Setup with Node.js:

1. **Install Node.js and create a simple server:**

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/submit-quote', async (req, res) => {
  const formData = req.body;
  
  // Save to database, send email, etc.
  console.log('Received quote:', formData);
  
  // Send email notification
  // (Use nodemailer, sendgrid, etc.)
  
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

2. **Update `script.js`:**
   - Uncomment lines 76-90
   - Replace `'YOUR_BACKEND_API_URL'` with your server URL

---

## **Option 4: FormBackend / FormSpree (Simple Backend Services)**

### Setup:

1. **Sign up at [FormSpree](https://formspree.io/)** or [FormBackend](https://www.formbackend.com/)

2. **Get your form endpoint URL**

3. **Update the HTML form:**
   Add to your `<form>` tag in `index.html`:
   ```html
   <form id="quoteForm" class="quote-form-container" method="POST" action="YOUR_ENDPOINT_URL">
   ```

4. **Keep the JavaScript validation** for better UX

---

## **Option 5: Database Collection**

### Using Firebase (Google):

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)

2. **Enable Firestore Database**

3. **Add to your script:**
```javascript
// Add before </body> tag
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js"></script>

<script>
const firebaseConfig = {
  // Your config
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
</script>
```

4. **Update form handler** to save to Firestore:
```javascript
await db.collection('quotes').add(data);
```

---

## **Recommendation**

For quick setup, I recommend **Option 1 (EmailJS)** because:
- ✅ Free tier is generous
- ✅ No backend required
- ✅ Emails arrive immediately
- ✅ Easy to set up (5 minutes)
- ✅ Professional notification emails

---

## **Testing**

After implementing any option:

1. Fill out the form on your website
2. Submit the form
3. Check that data appears in:
   - Your email inbox (EmailJS)
   - Google Sheet (Sheets integration)
   - Database console (Backend/Firebase)
   - Browser console (check for errors)

---

## **Need Help?**

If you need help implementing any of these options, let me know which one you prefer!

