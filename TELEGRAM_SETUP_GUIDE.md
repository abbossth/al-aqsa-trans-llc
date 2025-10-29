# Telegram Bot Setup Guide

This guide will help you set up a Telegram bot to receive form submissions in your Telegram group.

## 📋 Step-by-Step Setup

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Start a conversation by clicking "Start"
3. Send the command: `/newbot`
4. Follow the prompts:
   - Choose a **name** for your bot (e.g., "Al Aqsa Quote Bot")
   - Choose a **username** (must end with 'bot', e.g., "alaqsa_quote_bot")
5. BotFather will give you a **BOT TOKEN** like: `1234567890:ABCdefGHIjklMNOpqrsTUVwxyz`
   
   ⚠️ **SAVE THIS TOKEN** - you'll need it for the code!

### Step 2: Create or Choose a Telegram Group

**Option A: New Group**
1. In Telegram, click "New Group" (or "New Channel" if you prefer)
2. Add members you want to receive notifications
3. Add your bot to the group

**Option B: Existing Group**
1. Go to your existing group
2. Click on the group name at the top
3. Click "Add Members"
4. Search for your bot's username and add it

### Step 3: Get Your Group Chat ID

**Method 1: Using a Helper Bot (Easiest)**

1. Search for `@userinfobot` in Telegram
2. Start a conversation
3. It will show your personal chat ID
4. If you want the group ID:
   - Go to your group
   - Forward any message from the group to `@userinfobot`
   - It will show the group chat ID

**Method 2: Using Raw API (Alternative)**

1. Make sure your bot is added to the group
2. Send a message in the group
3. Open this URL in your browser (replace YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Look for `"chat":{"id":-123456789` - that number is your CHAT_ID
   - Note: Group IDs are usually negative numbers

### Step 4: Update Your Code

Open `script.js` and replace these values on lines 117-118:

```javascript
const BOT_TOKEN = 'YOUR_ACTUAL_BOT_TOKEN_HERE';  // Line 117
const CHAT_ID = 'YOUR_ACTUAL_CHAT_ID_HERE';      // Line 118
```

**Example:**
```javascript
const BOT_TOKEN = '1234567890:ABCdefGHIjklMNOpqrsTUVwxyz';
const CHAT_ID = '-987654321';
```

### Step 5: Test It!

1. Open your website
2. Fill out the quote form
3. Submit it
4. Check your Telegram group - you should see a formatted message!

---

## 🎨 What the Message Looks Like

When a form is submitted, you'll receive a message like this in your Telegram group:

```
🚛 New Quote Request

👤 Contact Information
Name: John Doe
Email: john@example.com
Phone: (619) 555-1234

📍 Route Details
Pickup: San Diego, CA 92101
Delivery: Los Angeles, CA 90001

🚗 Vehicle Information
Vehicle: 2020 Toyota Camry
Transport Type: Open Transport (Most Popular)
Condition: Running (Starts & Drives)

📅 Date Preferences
Preferred Date: 2025-02-15
Flexibility: Moderate (±1 day)

📝 Notes
Please call me before pickup.

🕐 Submitted: 1/23/2025, 3:45:12 PM
```

---

## 🔒 Security Notes

⚠️ **Important:** Since your bot token is in the JavaScript code, it will be visible to anyone who views your website source. 

**Solutions:**

1. **Use a Backend Proxy** (Recommended for production):
   - Create a simple backend endpoint
   - Store the bot token on your server
   - Have your form send to your backend, which forwards to Telegram

2. **Use Token for Read-Only Operations Only**
   - The bot can only send messages to your group
   - Users can't abuse it for other purposes

3. **Restrict Bot Permissions**
   - Only allow the bot to send messages (not read or delete)

---

## 🛠️ Troubleshooting

### Bot not receiving messages?

1. **Check if bot is in the group:**
   - Go to your group settings > Members
   - Make sure your bot is listed

2. **Verify bot token:**
   - Copy the token exactly as shown by @BotFather
   - No extra spaces

3. **Check chat ID:**
   - Make sure you're using the group chat ID (not personal chat ID)
   - Group IDs start with a minus sign (-)
   - Personal chat IDs are positive numbers

4. **Look at browser console:**
   - Press F12 in your browser
   - Check for error messages
   - Look for "Message sent to Telegram successfully"

### Getting "Unauthorized" error?

- Your bot token is incorrect
- Re-check the token from @BotFather

### Getting "chat not found" error?

- Your bot is not in the group
- Add the bot to the group again
- Wait a few minutes and try again

### Getting "parse error"?

- Check your BOT_TOKEN and CHAT_ID variables
- Make sure there are no extra quotes or spaces

---

## 📱 Advanced: Using Telegram Channel Instead of Group

If you want to use a **Telegram Channel** instead:

1. Create a channel in Telegram
2. Add your bot as an admin
3. Get the channel ID (usually starts with `@`, like `@yourchannel`)
4. Use the channel handle as CHAT_ID

---

## 🎯 Optional: Customize the Message Format

You can customize how the message looks by editing the `formatMessageForTelegram()` function in `script.js`.

**Available modifications:**
- Add or remove fields
- Change emoji
- Modify text formatting
- Add links or buttons

---

## ✅ Quick Checklist

- [ ] Created bot with @BotFather
- [ ] Saved bot token
- [ ] Created/chose Telegram group
- [ ] Added bot to the group
- [ ] Got group chat ID
- [ ] Updated BOT_TOKEN in script.js (line 117)
- [ ] Updated CHAT_ID in script.js (line 118)
- [ ] Tested form submission
- [ ] Received message in Telegram group

---

## 💡 Need Help?

If you're stuck, check:
1. Browser console for errors (F12)
2. Make sure you saved the file after updating tokens
3. Verify bot is in the group
4. Double-check token and chat ID are correct

Good luck! 🚀

