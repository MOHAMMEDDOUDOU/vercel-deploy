const cors = require('cors');

// تكوين CORS للسماح لجميع الأصول (يمكن تقييدها لاحقاً)
const corsOptions = {
  origin: true, // السماح لجميع الأصول
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
};

// تطبيق CORS
const corsMiddleware = cors(corsOptions);

// دالة معالجة الطلبات
async function handler(req, res) {
  // تطبيق CORS
  await new Promise((resolve) => {
    corsMiddleware(req, res, resolve);
  });

  // السماح فقط بـ POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'يسمح فقط بطريقة POST' 
    });
  }

  try {
    console.log('🚀 Server: استقبال طلب من Frontend');
    
    const { orderData } = req.body;
    
    if (!orderData) {
      return res.status(400).json({ 
        error: 'Missing order data', 
        message: 'بيانات الطلبية مطلوبة' 
      });
    }

    console.log('📦 البيانات المستلمة:', JSON.stringify(orderData, null, 2));

    // إعداد البيانات للإرسال إلى ZR Express
    const zrExpressData = {
      Colis: orderData.Colis || [],
      token: process.env.ZR_EXPRESS_TOKEN || '3541877f95878892f64c98e16277688e902c9221583857bf68d73d5f5ee29234',
      key: process.env.ZR_EXPRESS_KEY || '59cd8026082b4ba995da7cd29e296f9b'
    };

    console.log('🌐 إرسال طلب إلى ZR Express: https://procolis.com/api_v1/add_colis');

    // استخدام fetch المدمج في Vercel
    const response = await fetch('https://procolis.com/api_v1/add_colis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(zrExpressData)
    });

    console.log('📡 استجابة ZR Express:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ خطأ من ZR Express:', errorText);
      return res.status(response.status).json({
        success: false,
        error: `HTTP error! status: ${response.status}`,
        message: 'فشل في الاتصال بـ ZR Express',
        details: errorText
      });
    }

    const responseData = await response.json();
    console.log('✅ نجح الطلب إلى ZR Express:', JSON.stringify(responseData, null, 2));

    // إرسال الاستجابة للمستخدم
    res.status(200).json({
      success: true,
      message: 'تم إرسال الطلبية إلى ZR Express بنجاح',
      data: responseData
    });

  } catch (error) {
    console.error('❌ خطأ في الخادم:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'خطأ داخلي في الخادم'
    });
  }
}

// تصدير الدالة لـ Vercel
module.exports = handler;
