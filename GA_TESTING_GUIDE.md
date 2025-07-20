# Google Analytics Testing Guide

## 🎯 **Quick Test Checklist**

### ✅ **Step 1: Visual Confirmation**
1. Open http://localhost:3001
2. Look for the **GA Test Panel** (top-right corner)
3. Panel should show 4 test buttons

### ✅ **Step 2: Console Verification**
1. Press **F12** → Go to **Console** tab
2. Look for: **"🔍 Google Analytics Debug Info"**
3. Should show:
   - ✅ Enabled: Yes
   - 🐛 Debug Mode: Yes
   - 🔧 gtag available: Yes

### ✅ **Step 3: Network Requests**
1. Press **F12** → Go to **Network** tab
2. Filter by "google" or "analytics"
3. Should see requests to:
   - `googletagmanager.com/gtag/js?id=G-2H1KZ0DHN7`
   - Various analytics calls

### ✅ **Step 4: Manual Event Testing**
Click the test buttons and check console for:
```
🎯 Fired event: Button Click
🎯 Fired event: Form Interaction
🎯 Fired event: Custom Event
🎯 Fired event: Navigation Test
```

### ✅ **Step 5: Page Navigation Test**
1. Navigate between pages (Home → About → Offers)
2. Check console for automatic page view tracking
3. Each route change should trigger a new page view

## 🔧 **Advanced Testing**

### **Manual Console Commands**
```javascript
// Test if gtag is working
gtag('event', 'manual_test', {
  event_category: 'testing',
  event_label: 'console_test',
  value: 123
});

// Test page view
gtag('config', 'G-2H1KZ0DHN7', {
  page_title: 'Manual Test Page',
  page_location: window.location.href
});

// Check if dataLayer exists
console.log('dataLayer:', window.dataLayer);
```

### **Form Testing**
1. Go to contact section
2. Fill out and submit the form
3. Check console for form events:
   - `form_submit_start`
   - `form_submit_success` or `form_submit_error`

## 📊 **Google Analytics Dashboard Testing**

### **Real-Time Reports**
1. Go to https://analytics.google.com
2. Select your property (G-2H1KZ0DHN7)
3. Navigate to **Reports** → **Real-time**
4. Should see:
   - Active users on site
   - Page views
   - Events (within 1-2 minutes)

### **Debug View (Recommended)**
1. Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) Chrome extension
2. Enable the extension
3. Reload your page
4. Check console for detailed GA debug info

## 🚨 **Troubleshooting**

### **Issue: No GA Test Panel Visible**
- Check if you're in development mode
- Panel only shows when `NODE_ENV=development`

### **Issue: gtag not available**
- Check Network tab for script loading errors
- Verify `NEXT_PUBLIC_GA_FORCE_ENABLE=true` in .env.local

### **Issue: Events not showing in GA**
- Events may take 1-30 minutes to appear in reports
- Use Real-time reports for faster feedback
- Check browser console for errors

### **Issue: Real-time not showing data**
- Ensure you're testing from a different IP than your GA property filters
- Check if ad blockers are blocking GA scripts
- Verify the tracking ID is correct

## 📈 **What Success Looks Like**

### **Console Output:**
```
🔍 Google Analytics Debug Info
📊 Tracking ID: G-2H1KZ0DHN7
✅ Enabled: Yes
🐛 Debug Mode: Yes
🌍 Environment: development
🔧 gtag available: Yes

🎯 Fired event: Button Click
```

### **Network Tab:**
- Multiple requests to `googletagmanager.com`
- Status 200 (successful)
- Regular ping requests for analytics

### **Google Analytics:**
- Real-time users count increases
- Page views appear in real-time
- Events show up in real-time events report

## 🎉 **Ready for Production**

Once testing is successful:
1. Set `NODE_ENV=production` for deployment
2. Set `NEXT_PUBLIC_GA_FORCE_ENABLE=false`
3. Set `NEXT_PUBLIC_GA_DEBUG=false`
4. Remove the GATestPanel from production builds

## 📞 **Need Help?**

If tests are failing:
1. Check all environment variables are set
2. Restart the development server
3. Clear browser cache and cookies
4. Try in incognito/private browsing mode
5. Check browser console for JavaScript errors
