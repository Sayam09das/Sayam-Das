# Sayam Portfolio Backend - Resend Email API 🚀

Modern email system using **Resend** (reliable, developer-friendly).

## Quick Start

```bash
cd backend
npm install
cp .env.example .env  # Add RESEND_API_KEY + OWNER_EMAIL
npm run dev
```

**Resend Setup:**
1. [Sign up](https://resend.com) (free tier: 3k emails/month)
2. Copy API key → `.env`
3. Verify domain (optional)

## Test API
```bash
curl -X POST http://localhost:5000/api/contact \
-H "Content-Type: application/json" \
-d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Hello!"}'
```

## Features
✅ Express + CORS  
✅ Resend emails (no SMTP hassles)  
✅ HTML templates  
✅ Form validation + error handling  
✅ Reply-to sender  

## Production
Vercel/Render friendly. Set env vars in dashboard.

Frontend contact form → POST `/api/contact` → Email to OWNER_EMAIL
