# CHD ZR Express Proxy Server

## 📋 الوصف
خادم وكيل (Proxy) لحل مشاكل CORS مع ZR Express API. هذا الخادم يعمل كوسيط بين التطبيق الأمامي و ZR Express.

## 🚀 النشر على Vercel

### الخطوة 1: إنشاء حساب Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول أو أنشئ حساب جديد
3. اربط حساب GitHub الخاص بك

### الخطوة 2: رفع المشروع
1. انسخ هذا المجلد إلى GitHub repository
2. في Vercel، اضغط "New Project"
3. اختر repository الخاص بك
4. اضغط "Deploy"

### الخطوة 3: إعداد Environment Variables
في إعدادات المشروع في Vercel، أضف:
- `ZR_EXPRESS_TOKEN`: `3541877f95878892f64c98e16277688e902c9221583857bf68d73d5f5ee29234`
- `ZR_EXPRESS_KEY`: `59cd8026082b4ba995da7cd29e296f9b`

### الخطوة 4: الحصول على الرابط
بعد النشر، ستحصل على رابط مثل:
`https://your-project.vercel.app`

## 🔧 تحديث التطبيق الرئيسي

بعد النشر، قم بتحديث `lib/zr-express-api.ts`:

```typescript
private static async makeRequest(endpoint: string, data: any): Promise<any> {
  try {
    // تغيير من localhost إلى Vercel
    const serverUrl = "https://your-project.vercel.app";
    const apiEndpoint = "/api/zr-express";
    
    const response = await fetch(`${serverUrl}${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderData: data }),
    });
    
    // ... باقي الكود
  } catch (error) {
    console.error("ZR Express API Error:", error);
    throw error;
  }
}
```

## 📁 هيكل الملفات
```
vercel-deploy/
├── package.json          # تبعيات المشروع
├── vercel.json          # تكوين Vercel
├── api/
│   └── zr-express.js   # API endpoint
└── README.md            # هذا الملف
```

## ✅ المميزات
- ✅ حل مشاكل CORS
- ✅ يعمل مع ZR Express API
- ✅ سهل النشر على Vercel
- ✅ يدعم جميع أنواع الطلبات
- ✅ تسجيل مفصل للعمليات

## 🆘 الدعم
إذا واجهت أي مشاكل، تأكد من:
1. صحة Environment Variables
2. صحة بيانات ZR Express
3. صحة رابط API في التطبيق الرئيسي
