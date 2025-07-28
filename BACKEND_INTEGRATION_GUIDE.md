# Backend Integration Guide

## 🎯 **Current Setup**

Your form submissions are now configured to work with both local API routes and external backend services.

### **🔧 Environment Configuration**

**Development (.env.local):**
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

**Production (.env or hosting platform):**
```bash
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.com/api
```

## 📡 **API Endpoints Created**

### **1. Contact Form**
- **Endpoint**: `POST /api/contacts`
- **URL**: `{BASE_URL}/contacts`
- **Purpose**: Handle contact form submissions

### **2. Newsletter**
- **Endpoint**: `POST /api/newsletter` 
- **URL**: `{BASE_URL}/newsletter`
- **Purpose**: Handle newsletter subscriptions

## 🚀 **Integration Options**

### **Option 1: Use Next.js API Routes (Current)**
✅ **Already set up** - Works out of the box
- Local API routes in `/app/api/`
- Good for simple forms and prototyping
- Hosted with your Next.js app

### **Option 2: External Backend Service**
Change `NEXT_PUBLIC_API_BASE_URL` to your backend:

```bash
# Examples:
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com/v1
NEXT_PUBLIC_API_BASE_URL=https://yourapp.herokuapp.com/api
NEXT_PUBLIC_API_BASE_URL=https://backend.vercel.app/api
```

### **Option 3: Third-Party Services**

#### **Email Services:**
```typescript
// Mailchimp integration example
const mailchimpSubmit = async (email: string) => {
  const response = await fetch('/api/mailchimp', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
};
```

#### **Form Services:**
```typescript
// Formspree, Netlify Forms, etc.
const formspreeSubmit = async (data: FormData) => {
  const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};
```

## 🛠️ **Backend Implementation Examples**

### **Node.js/Express Backend**
```javascript
// contacts endpoint
app.post('/api/contacts', async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  
  try {
    // Save to database
    await db.contacts.create({
      firstName, lastName, email, phone, message,
      createdAt: new Date()
    });
    
    // Send email notification
    await sendEmail({
      to: 'admin@yourdomain.com',
      subject: 'New Contact Form Submission',
      body: `From: ${firstName} ${lastName} (${email})\n\n${message}`
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### **Python/FastAPI Backend**
```python
@app.post("/api/contacts")
async def submit_contact(contact: ContactForm):
    try:
        # Save to database
        db_contact = Contact(
            first_name=contact.firstName,
            last_name=contact.lastName,
            email=contact.email,
            phone=contact.phone,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        
        # Send email
        await send_email(
            to="admin@yourdomain.com",
            subject="New Contact Form",
            body=f"From: {contact.firstName} {contact.lastName}"
        )
        
        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### **PHP/Laravel Backend**
```php
Route::post('/api/contacts', function (Request $request) {
    $validated = $request->validate([
        'firstName' => 'required|string',
        'lastName' => 'required|string', 
        'email' => 'required|email',
        'message' => 'required|string'
    ]);
    
    // Save to database
    Contact::create($validated);
    
    // Send email
    Mail::to('admin@yourdomain.com')->send(new ContactFormMail($validated));
    
    return response()->json(['success' => true]);
});
```

## 📊 **Database Integration**

### **Contact Form Schema**
```sql
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'new'
);
```

### **Newsletter Schema**
```sql
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active'
);
```

## 📧 **Email Integration**

### **SendGrid Integration**
```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendContactNotification = async (contactData: FormData) => {
  const msg = {
    to: 'admin@yourdomain.com',
    from: 'noreply@yourdomain.com',
    subject: 'New Contact Form Submission',
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${contactData.firstName} ${contactData.lastName}</p>
      <p><strong>Email:</strong> ${contactData.email}</p>
      <p><strong>Phone:</strong> ${contactData.phone}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
    `
  };
  
  await sgMail.send(msg);
};
```

### **Mailgun Integration**
```typescript
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(FormData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY
});

const sendEmail = async (data: any) => {
  await mg.messages.create(process.env.MAILGUN_DOMAIN, {
    from: 'noreply@yourdomain.com',
    to: 'admin@yourdomain.com',
    subject: 'New Contact Form',
    html: emailTemplate(data)
  });
};
```

## 🔐 **Security Considerations**

### **Rate Limiting**
```typescript
// Add to your API routes
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5 // limit each IP to 5 requests per windowMs
};
```

### **Input Validation**
```typescript
import { z } from 'zod';

const ContactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10).max(1000)
});
```

### **CORS Configuration**
```typescript
// For external backends
const corsOptions = {
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  methods: ['POST'],
  credentials: true
};
```

## 🧪 **Testing Your Backend**

### **Manual Testing**
```bash
# Test contact form
curl -X POST http://localhost:3001/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe", 
    "email": "john@example.com",
    "message": "Test message"
  }'

# Test newsletter
curl -X POST http://localhost:3001/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

### **Frontend Testing**
1. Fill out contact form
2. Check browser console for API calls
3. Check Network tab for request/response
4. Verify backend logs

## 🚀 **Deployment Setup**

### **Vercel (Frontend + API Routes)**
```bash
# Environment variables in Vercel dashboard:
NEXT_PUBLIC_API_BASE_URL=https://yourapp.vercel.app/api
SENDGRID_API_KEY=your_sendgrid_key
DATABASE_URL=your_database_url
```

### **Separate Backend Deployment**
```bash
# Frontend (Vercel/Netlify):
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com

# Backend (Heroku/Railway/DigitalOcean):
DATABASE_URL=postgres://...
EMAIL_SERVICE_KEY=...
CORS_ORIGIN=https://yourdomain.com
```

## 🎯 **Next Steps**

1. **Choose your backend approach** (Next.js API routes or external)
2. **Set up database** (if needed)
3. **Configure email service** (SendGrid, Mailgun, etc.)
4. **Test thoroughly** in development
5. **Deploy and configure** production environment
6. **Set up monitoring** and error tracking

Your forms are now ready to work with any backend configuration! 🎉
