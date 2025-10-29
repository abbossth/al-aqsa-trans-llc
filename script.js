// Mobile Menu Toggle
let menuList = document.getElementById("menuList")
menuList.style.maxHeight = "0px";

function toggleMenu() {
  if (menuList.style.maxHeight == "0px")
  {
    menuList.style.maxHeight = "300px";
  }
  else {
    menuList.style.maxHeight = "0px";
  }
}

// Set minimum date for pickup date (today's date)
document.addEventListener('DOMContentLoaded', function() {
  const pickupDateInput = document.querySelector('input[name="pickupDate"]');
  if (pickupDateInput) {
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
  }
  
  // Handle quote form submission
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', handleFormSubmission);
  }

  // Scroll to quote form when buttons are clicked
  const quoteButtons = document.querySelectorAll('a[href="#quote-form"], button');
  quoteButtons.forEach(button => {
    if (button.textContent.toLowerCase().includes('quote')) {
      button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#quote-form') {
          e.preventDefault();
          document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
});

// Form Submission Handler
async function handleFormSubmission(e) {
  e.preventDefault();
  
  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitBtn = form.querySelector('.quote-submit-btn');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;
  
  try {
    // Send to Telegram Bot
    const telegramMessage = formatMessageForTelegram(data);
    await sendToTelegram(telegramMessage);
    
    console.log("Quote Request Data:", data);
    showMessage("success", "Quote Request Submitted Successfully! We'll contact you soon.");
    
    // Reset form after successful submission
    setTimeout(() => {
      form.reset();
      removeMessage();
    }, 5000);
    
  } catch (error) {
    console.error('Error submitting form:', error);
    showMessage("error", "There was an error submitting your request. Please try again or call us directly at (619) 944-8954");
  } finally {
    // Restore button state
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
  }
}

// Format message for Telegram
function formatMessageForTelegram(data) {
  let message = `🚛 *New Quote Request*\n\n`;
  
  message += `👤 *Contact Information*\n`;
  message += `Name: ${data.fullName}\n`;
  message += `Email: ${data.email}\n`;
  message += `Phone: ${data.phone}\n\n`;
  
  message += `📍 *Route Details*\n`;
  message += `Pickup: ${data.pickupLocation}\n`;
  message += `Delivery: ${data.deliveryLocation}\n\n`;
  
  message += `🚗 *Vehicle Information*\n`;
  message += `Vehicle: ${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}\n`;
  message += `Transport Type: ${data.transportType}\n`;
  message += `Condition: ${data.vehicleCondition}\n\n`;
  
  if (data.pickupDate) {
    message += `📅 *Date Preferences*\n`;
    message += `Preferred Date: ${data.pickupDate}\n`;
    message += `Flexibility: ${data.flexibility}\n\n`;
  }
  
  if (data.notes) {
    message += `📝 *Notes*\n${data.notes}\n\n`;
  }
  
  message += `🕐 Submitted: ${new Date().toLocaleString()}`;
  
  return message;
}

// Send message to Telegram
async function sendToTelegram(message) {
  // ⚠️ REPLACE THESE WITH YOUR ACTUAL VALUES
  const BOT_TOKEN = '8204267654:AAEnU9Vxnu6yrRLJgpb9l8k9onVD4D7akKE'; // Get from @BotFather
  const CHAT_ID = '-1003219746563';    // Get from your Telegram group
  
  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  const response = await fetch(telegramUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    })
  });
  
  const result = await response.json();
  
  if (!response.ok || !result.ok) {
    throw new Error(result.description || 'Failed to send message');
  }
  
  console.log('Message sent to Telegram successfully:', result);
  return result;
}

// Show success/error messages
function showMessage(type, message) {
  removeMessage(); // Remove any existing messages
  
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
  messageDiv.textContent = message;
  
  const form = document.getElementById('quoteForm');
  form.parentNode.insertBefore(messageDiv, form);
  
  // Scroll to message
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeMessage() {
  const existingMessage = document.querySelector('.success-message, .error-message');
  if (existingMessage) {
    existingMessage.remove();
  }
}