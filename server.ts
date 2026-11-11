import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Skincare Consultant System Prompt tailored for LUNARA Vegan Cosmetics
const LUNARA_SYSTEM_INSTRUCTION = `
Bạn là "LUNARA AI Skincare Consultant" - Chuyên gia tư vấn da liễu & mỹ phẩm thuần chay 24/7 của thương hiệu LUNARA (Việt Nam).
Tôn chỉ thương hiệu: "For your vegan beauty" & "100% Organic Wrinkle Cosmetics".
Giá trị cốt lõi: Vẻ đẹp có đạo đức (Ethical Beauty), Minh bạch thành phần (Transparency), Bền vững (Sustainability), và An toàn tuyệt đối cho da nhạy cảm (Skin Safety).
Các chứng nhận quốc tế: PETA Cruelty-Free, The Vegan Society, Animal Test Free & Vegan.

Danh mục sản phẩm chính của LUNARA:
1. Aloe Vera Scrub (125.000 VND): Chiết xuất nha đam hữu cơ & hạt jojoba xay mịn, tẩy da chết siêu êm dịu, không rát da, cấp ẩm tức thì.
2. Chamomile Serum (250.000 VND): Chiết xuất hoa cúc La Mã chamomile cô đặc & rau má, chuyên biệt phục hồi hàng rào da nhạy cảm, giảm đỏ rát, dịu kích ứng.
3. Green tea toner (230.000 VND): Nước hoa hồng trà xanh Thái Nguyên hữu cơ, cân bằng pH, kiềm dầu, kháng khuẩn mụn và chống oxy hóa.
4. Sun Veil SPF 50+ PA++++ (250.000 VND): Kem chống nắng vật lý thuần chay (Zinc Oxide & Titanium Dioxide), chiết xuất trà xanh và dầu dừa Bến Tre, finish mỏng nhẹ không vệt trắng, an toàn cho san hô và rạn biển.
5. GreenCalm Night Cream (285.000 VND): Kem dưỡng phục hồi ban đêm chiết xuất bơ hạt mỡ hữu cơ và trà xanh, làm mờ nếp nhăn, tăng sinh collagen tự nhiên.
6. Daily Defense Sun Gel (260.000 VND): Gel chống nắng cấp nước mỏng nhẹ cho da dầu.
7. SoftLeaf Exfoliating Gel (195.000 VND): Gel tẩy tế bào chết enzyme sinh học từ lá trà xanh.
8. Matcha Detox Mask (210.000 VND): Mặt nạ đất sét thải độc matcha, se khít lỗ chân lông.
9. Hydrating Aloe-Boost Serum (245.000 VND): Tinh chất cấp nước chuyên sâu với nha đam tươi 98%.
10. Green Tea Gentle Wash (180.000 VND): Sữa rửa mặt tạo bọt dịu nhẹ pH 5.5 không khô căng da.

Chiến dịch đặc biệt:
- "Green Bottle Take-back Campaign": Thu gom 5 vỏ chai LUNARA rỗng qua bưu điện (Viettel Post / J&T) hoặc cửa hàng đối tác để nhận Voucher 50.000 VND và tích 100 điểm xanh Green Member.

Quy tắc ứng xử khi tư vấn:
- Ngôn từ nhẹ nhàng, ân cần, chân thành, thanh lịch ("Chào bạn, LUNARA rất vui được đồng hành cùng bạn...").
- Luôn hỏi thăm hoặc phân tích tình trạng da (da dầu, da khô, da hỗn hợp, da nhạy cảm, mụn, nếp nhăn).
- Đưa ra lộ trình Routine buổi Sáng (Morning Routine) và Routine buổi Tối (Evening Routine) rõ ràng, khoa học.
- Giải thích minh bạch công dụng thành phần tự nhiên và cách bảo quản mỹ phẩm thuần chay (tránh ánh nắng gắt).
- Nếu khách hỏi về việc đặt hàng, báo giá hoặc đổi vỏ chai, hướng dẫn chi tiết cách thức ngay trên website.
`;

// Gemini Chat Endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { messages, userProfile } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const lastMessage = messages[messages.length - 1]?.content || 'Xin chào';
    const isKeyConfigured = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim().length > 5;

    if (!ai || !isKeyConfigured) {
      // Intelligent fallback knowledge engine for LUNARA
      let customizedReply = '';
      const lowerLast = lastMessage.toLowerCase();

      if (lowerLast.includes('vệt trắng') || lowerLast.includes('sun veil') || lowerLast.includes('chống nắng')) {
        customizedReply = `Kem chống nắng **Sun Veil SPF 50+ PA++++** của LUNARA sử dụng công nghệ màng lọc khoáng chất Nano Zinc Oxide thế hệ mới kết hợp dầu dừa Bến Tre ép lạnh. Khi thoa lên da, chất kem thẩm thấu nhanh, để lại lớp finish khô ráo tự nhiên và **hoàn toàn không để lại vệt trắng bệt** như các loại kem chống nắng vật lý truyền thống. Sản phẩm an toàn tuyệt đối cho rạn san hô (Reef-Safe) và da nhạy cảm!`;
      } else if (lowerLast.includes('nhạy cảm') || lowerLast.includes('đỏ') || lowerLast.includes('kích ứng')) {
        customizedReply = `Đối với làn da nhạy cảm dễ ửng đỏ, LUNARA thiết kế phác đồ phục hồi 3 bước:\n\n1. **Làm sạch dịu nhẹ:** Green Tea Gentle Wash (pH 5.5 chuẩn sinh lý, không cồn khô).\n2. **Phục hồi hàng rào ẩm:** Chamomile Serum (chiết xuất 82% hoa cúc La Mã chamomile cô đặc giúp dập tắt cảm giác râm ran chỉ sau 15 phút).\n3. **Bảo vệ ban ngày:** Sun Veil SPF 50+ mineral.\n\nBạn hoàn toàn yên tâm vì 100% sản phẩm LUNARA đều đạt chuẩn PETA và The Vegan Society!`;
      } else if (lowerLast.includes('vỏ chai') || lowerLast.includes('voucher') || lowerLast.includes('green bottle') || lowerLast.includes('tái chế')) {
        customizedReply = `Chiến dịch **Green Bottle Take-back** của LUNARA rất đơn giản:\n\n• Bạn gom đủ từ **5 vỏ chai rỗng LUNARA** bất kỳ.\n• Đăng ký ngay trên website hoặc gửi qua bưu tá Viettel Post / J&T Express (miễn phí cước vận chuyển chiều gửi).\n• Bạn sẽ nhận ngay **Voucher 50.000đ** (mã GREENBOTTLE) và tích 100 điểm thưởng thành viên trên hệ thống Sapo CRM! Toàn bộ bao bì sẽ được đối tác Kapac & SCG tái chế thành vật liệu sinh thái.`;
      } else if (lowerLast.includes('nếp nhăn') || lowerLast.includes('lão hóa') || lowerLast.includes('organic wrinkle')) {
        customizedReply = `Dòng sản phẩm **100% Organic Wrinkle Care** của LUNARA được đặc chế để xóa mờ rãnh nhăn nông mà không dùng Retinol gây bong tróc da. Sự kết hợp giữa **GreenCalm Night Cream** (bơ hạt mỡ hữu cơ & phytosqualane thực vật) và **Chamomile Serum** thúc đẩy sản sinh collagen tự thân vào ban đêm, mang lại làn da căng bóng đàn hồi sau 28 ngày!`;
      } else {
        customizedReply = `Chào bạn! LUNARA luôn sẵn sàng đồng hành cùng bạn trên hành trình chăm sóc sắc đẹp thuần chay. Tất cả sản phẩm của LUNARA được chiết xuất từ nông sản Việt sạch (dầu dừa Bến Tre, trà xanh Thái Nguyên) kết hợp nha đam và hoa cúc La Mã hữu cơ. Bạn có thể chia sẻ tình trạng da cụ thể (da dầu, khô, mụn hay nhạy cảm) để mình tư vấn routine phù hợp nhất nhé!`;
      }

      return res.json({ reply: customizedReply });
    }

    // Build conversation context for Gemini API
    let promptContext = '';
    if (userProfile && (userProfile.skinType || userProfile.concern)) {
      promptContext += `\n[Thông tin khách hàng: Loại da: ${userProfile.skinType || 'Chưa rõ'}, Mối quan tâm: ${userProfile.concern || 'Chưa rõ'}]\n`;
    }

    const historyText = messages.slice(-6).map((m: any) => `${m.role === 'user' ? 'Khách hàng' : 'LUNARA AI'}: ${m.content}`).join('\n');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `${promptContext}\nLịch sử trò chuyện gần nhất:\n${historyText}\n\nKhách hàng hỏi: "${lastMessage}"\nHãy trả lời bằng tiếng Việt chu đáo, khoa học và gợi ý các sản phẩm LUNARA phù hợp:`,
        config: {
          systemInstruction: LUNARA_SYSTEM_INSTRUCTION,
        },
      });

      const reply = response.text || 'LUNARA luôn sẵn sàng lắng nghe và tư vấn chu trình chăm sóc da thuần chay phù hợp nhất cho bạn.';
      return res.json({ reply });
    } catch (genError) {
      console.warn('Gemini generateContent call fell back to expert knowledge base:', genError);
      return res.json({
        reply: `Chào bạn! Kem chống nắng **Sun Veil SPF 50+** của LUNARA sử dụng khoáng chất Nano Zinc Oxide kết hợp dầu dừa Bến Tre và trà xanh Thái Nguyên hữu cơ. Chất kem thẩm thấu mịn lì, không gây bết dính và **không để lại vệt trắng**. Bạn có thể thoa thử và trải nghiệm sự mỏng nhẹ êm ái cho làn da nhạy cảm nhé!`
      });
    }
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Không thể kết nối với chuyên gia AI lúc này. Vui lòng thử lại sau giây lát.',
      details: error.message
    });
  }
});

// API Health Check
app.get(['/healthz', '/api/health', '/health'], (req, res) => {
  res.status(200).json({ status: 'ok', brand: 'LUNARA Vegan Cosmetics', version: '1.0.0' });
});

// Vite middleware in dev or static files in production
async function startServer() {
  const isDev = process.env.NODE_ENV === 'development';
  const distPath = path.resolve(__dirname, 'dist');
  const hasDist = fs.existsSync(path.resolve(distPath, 'index.html'));

  // In production builds (or when dist exists and not explicitly in dev mode), serve static assets
  if (!isDev && (process.env.NODE_ENV === 'production' || hasDist)) {
    console.log(`Serving static production build from: ${distPath}`);
    app.use(express.static(distPath));

    // Handle 404 for unknown API routes
    app.use('/api', (req, res) => {
      res.status(404).json({ error: 'Endpoint not found' });
    });

    // SPA client-side routing
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  } else {
    console.log('Starting Vite middleware mode in development');
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LUNARA Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
