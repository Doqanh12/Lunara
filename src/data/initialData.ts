import { Product, BlogPost, Customer, Order, BrandDesignConfig } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aloe Vera Scrub',
    nameVi: 'Tẩy tế bào chết Nha đam',
    nameEn: 'Aloe Vera Scrub',
    slug: 'aloe-vera-scrub',
    price: 125000,
    originalPrice: 150000,
    category: 'scrub',
    mainIngredient: 'aloe_vera',
    skinTypes: ['all', 'sensitive', 'dry', 'combination'],
    skinConcerns: ['dullness', 'pores', 'sensitivity'],
    description: 'Tẩy tế bào chết nha đam hữu cơ dịu nhẹ với hạt jojoba tự nhiên giúp làm sạch sâu mà không gây vi xước da.',
    detailedDescription: 'Aloe Vera Scrub được chiết xuất từ 100% gel nha đam tươi hữu cơ kết hợp cùng các hạt sáp Jojoba phân hủy sinh học siêu mịn. Công thức giúp nhẹ nhàng cuốn trôi lớp tế bào sừng già cỗi, làm thông thoáng lỗ chân lông và cấp ẩm làm dịu tức thì cho làn da nhạy cảm.',
    benefits: [
      'Loại bỏ tế bào sừng chết nhẹ nhàng, không gây khô rát',
      'Chiết xuất nha đam tươi 95% làm dịu kích ứng và phục hồi màng ẩm',
      'Hạt tẩy từ sáp Jojoba tự nhiên 100% tự phân hủy, bảo vệ sinh thái biển',
      'Độ pH 5.5 cân bằng sinh lý lý tưởng cho mọi loại da'
    ],
    ingredientsList: 'Aloe Barbadensis Leaf Juice (Nha đam hữu cơ), Hydrogenated Jojoba Oil, Glycerin thực vật, Camellia Sinensis Leaf Water, Xanthan Gum, Allantoin, Citric Acid, Natri Benzoate (Chiết xuất tự nhiên bảo quản an toàn).',
    usageSteps: [
      'Bước 1: Làm ướt mặt bằng nước ấm để giãn nở lỗ chân lông.',
      'Bước 2: Lấy một lượng scrub cỡ đồng xu, massage nhẹ nhàng theo chuyển động tròn từ trong ra ngoài khoảng 1-2 phút.',
      'Bước 3: Rửa sạch lại bằng nước mát và lau khô bằng khăn bông mềm.',
      'Tần suất: Sử dụng 1-2 lần/tuần vào buổi tối trước bước toner.'
    ],
    volume: '100ml',
    stock: 45,
    batchNo: 'LN-ALOE-2401',
    expiryDate: '12/2026',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free', 'Dermatologically Tested'],
    rating: 4.9,
    reviewsCount: 128,
    isBestSeller: true,
  },
  {
    id: 'prod-2',
    name: 'Chamomile Serum',
    nameVi: 'Tinh chất phục hồi Hoa cúc',
    nameEn: 'Chamomile Serum',
    slug: 'chamomile-serum',
    price: 250000,
    originalPrice: 290000,
    category: 'serum',
    mainIngredient: 'chamomile',
    skinTypes: ['sensitive', 'dry', 'combination', 'oily'],
    skinConcerns: ['sensitivity', 'wrinkles', 'acne'],
    description: 'Tinh chất phục hồi hoa cúc La Mã chamomile cô đặc, làm dịu tức thì vùng da đỏ rát, tăng cường hàng rào bảo vệ.',
    detailedDescription: 'Chamomile Serum là cứu tinh cho làn da nhạy cảm, treatment quá đà hoặc chịu ảnh hưởng bởi khói bụi ô nhiễm. Chứa nồng độ cao Bisabolol và Apigenin từ hoa cúc La Mã trồng theo tiêu chuẩn hữu cơ, serum giúp dập tắt phản ứng viêm đỏ chỉ sau 15 phút thoa, tái tạo lớp màng lipid sinh học tự nhiên.',
    benefits: [
      'Làm dịu vết đỏ, cảm giác ngứa rát và châm chích ngay lập tức',
      'Tăng cường hàng rào ceramide thực vật tự nhiên bảo vệ da',
      'Chống oxy hóa, ngăn ngừa nếp nhăn vi thể do đứt gãy sợi đàn hồi',
      'Kết cấu giọt nước lỏng nhẹ, thẩm thấu nhanh trong 10 giây'
    ],
    ingredientsList: 'Chamomilla Recutita Flower Extract (Chiết xuất hoa cúc 82%), Centella Asiatica Extract (Rau má), Sodium Hyaluronate (HA đa tầng), Niacinamide tinh khiết 2%, Panthenol (B5), Chiết xuất rễ cam thảo tự nhiên.',
    usageSteps: [
      'Bước 1: Sau bước làm sạch và toner, lấy 3-4 giọt serum ra lòng bàn tay ấm.',
      'Bước 2: Vỗ nhẹ đều khắp mặt và cổ, tập trung vào vùng má và trán dễ ửng đỏ.',
      'Bước 3: Khóa ẩm bằng kem dưỡng GreenCalm.',
      'Tần suất: Dùng mỗi sáng và tối.'
    ],
    volume: '30ml',
    stock: 62,
    batchNo: 'LN-CHAM-2402',
    expiryDate: '10/2026',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free', 'Hypoallergenic Tested'],
    rating: 5.0,
    reviewsCount: 214,
    isBestSeller: true,
  },
  {
    id: 'prod-3',
    name: 'Green tea toner',
    nameVi: 'Nước hoa hồng Trà xanh',
    nameEn: 'Green tea toner',
    slug: 'green-tea-toner',
    price: 230000,
    originalPrice: 260000,
    category: 'toner',
    mainIngredient: 'green_tea',
    skinTypes: ['oily', 'combination', 'sensitive'],
    skinConcerns: ['pores', 'acne', 'dullness'],
    description: 'Nước hoa hồng hữu cơ từ lá trà xanh tươi Thái Nguyên, cân bằng độ pH chuẩn 5.5, se khít lỗ chân lông và kiềm dầu.',
    detailedDescription: 'Được chưng cất thủy phân từ búp trà xanh hữu cơ tươi hái vào sáng sớm tại vùng cao Thái Nguyên, Green tea toner giàu hoạt chất EGCG kháng khuẩn tự nhiên, kiểm soát bã nhờn dư thừa suốt 12 giờ mà không làm mất đi độ ẩm tự nhiên của da.',
    benefits: [
      'Kháng viêm, ức chế vi khuẩn gây mụn trứng cá P.acnes',
      'Thu nhỏ kích thước lỗ chân lông rõ rệt sau 2 tuần',
      'Thanh lọc độc tố từ bụi mịn PM 2.5 tại đô thị',
      'Cân bằng màng acid bảo vệ da sau khi rửa mặt'
    ],
    ingredientsList: 'Camellia Sinensis Leaf Extract 88% (Chiết xuất trà xanh hữu cơ), Hamamelis Virginiana Water (Cây phỉ), Glycerin, Zinc PCA, Melaleuca Alternifolia Leaf Extract, Allantoin, L-Arginine.',
    usageSteps: [
      'Cách 1: Thấm một lượng vừa đủ ra bông tẩy trang phân hủy sinh học, lau nhẹ nhàng từ trong ra ngoài.',
      'Cách 2: Đổ trực tiếp ra lòng bàn tay và vỗ đều theo phương pháp 7-skin dưỡng ẩm sâu.',
      'Cách 3: Chiết ra chai xịt khoáng để làm dịu da trong ngày.'
    ],
    volume: '150ml',
    stock: 58,
    batchNo: 'LN-TEA-2403',
    expiryDate: '11/2026',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free', 'Eco-Packaging Certified'],
    rating: 4.8,
    reviewsCount: 167,
    isBestSeller: false,
    isNew: true,
  },
  {
    id: 'prod-4',
    name: 'Sun Veil SPF 50+',
    nameVi: 'Kem chống nắng phổ rộng Sun Veil',
    nameEn: 'Sun Veil SPF 50+',
    slug: 'sun-veil-spf-50',
    price: 250000,
    originalPrice: 280000,
    category: 'sunscreen',
    mainIngredient: 'green_tea',
    skinTypes: ['all', 'sensitive', 'dry', 'oily'],
    skinConcerns: ['wrinkles', 'sensitivity', 'dullness'],
    description: 'Kem chống nắng thuần chay vật lý phổ rộng SPF 50+ PA++++, kết cấu mỏng nhẹ vô hình, an toàn cho da nhạy cảm và rạn san hô.',
    detailedDescription: 'Sun Veil SPF 50+ kết hợp màng lọc khoáng chất Nano Zinc Oxide không bít tắc cùng chiết xuất trà xanh và dầu dừa Bến Tre ép lạnh. Tạo lớp màng chắn vô hình ngăn chặn 98% tia UVA/UVB và ánh sáng xanh từ thiết bị điện tử, đồng thời dưỡng ẩm chống lão hóa nếp nhăn không gây bóng nhờn.',
    benefits: [
      'Chỉ số bảo vệ thực tế SPF 50+ PA++++ được kiểm nghiệm độc lập tại viện da liễu',
      '100% màng lọc vật lý lành tính không gây cay mắt, không vệt trắng bệt',
      'Bổ sung chất chống oxy hóa tự nhiên giúp làm chậm quá trình xuất hiện nếp nhăn',
      'Công thức Reef-Safe: Hoàn toàn không chứa Oxybenzone & Octinoxate gây hại san hô'
    ],
    ingredientsList: 'Zinc Oxide 15%, Titanium Dioxide 4%, Camellia Sinensis Leaf Extract, Cocos Nucifera Oil (Dầu dừa ép lạnh Bến Tre), Tocopherol (Vitamin E tự nhiên), Silica, Bisabolol, Chiết xuất cúc Calendula.',
    usageSteps: [
      'Thoa trước khi ra ngoài 15-20 phút.',
      'Lấy lượng kem bằng khoảng hai đốt ngón tay trỏ chấm đều lên 5 điểm khuôn mặt và cổ.',
      'Vỗ nhẹ nhàng cho kem tiệp vào da.',
      'Thoa lại sau mỗi 2-3 giờ nếu hoạt động ngoài trời nắng gắt hoặc đổ mồ hôi nhiều.'
    ],
    volume: '50ml',
    stock: 80,
    batchNo: 'LN-SUN-2404',
    expiryDate: '01/2027',
    imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free', 'Reef-Friendly Certified'],
    rating: 4.9,
    reviewsCount: 310,
    isBestSeller: true,
  },
  {
    id: 'prod-5',
    name: 'GreenCalm Night Cream',
    nameVi: 'Kem dưỡng chống nhăn ban đêm GreenCalm',
    nameEn: 'GreenCalm Wrinkle Cream',
    slug: 'greencalm-night-cream',
    price: 285000,
    originalPrice: 320000,
    category: 'cream',
    mainIngredient: 'shea_butter',
    skinTypes: ['dry', 'sensitive', 'combination'],
    skinConcerns: ['wrinkles', 'dryness', 'sensitivity'],
    description: 'Kem dưỡng tái sinh ban đêm từ bơ hạt mỡ hữu cơ và trà xanh, phục hồi tế bào và nâng cơ làm mờ nếp nhăn chuyên sâu.',
    detailedDescription: 'Với công thức đặc trị nếp nhăn 100% Organic Wrinkle Care, GreenCalm Night Cream cung cấp nguồn acid béo thiết yếu và squalane thực vật từ bơ hạt mỡ, thúc đẩy chu trình tự tái tạo của da trong giấc ngủ, mang lại làn da căng bóng và mịn màng khi thức giấc.',
    benefits: [
      'Xóa mờ rãnh nhăn nông quanh miệng và đuôi mắt sau 28 ngày',
      'Khóa ẩm 24 giờ mà không gây bí tắc tuyến bã nhờn',
      'Tăng mật độ collagen tự thân cho làn da đàn hồi khỏe mạnh',
      'Hương thảo mộc tự nhiên từ hoa cúc giúp thư giãn tinh thần trước khi ngủ'
    ],
    ingredientsList: 'Butyrospermum Parkii Butter (Bơ hạt mỡ hữu cơ), Aloe Barbadensis Water, Camellia Sinensis Seed Oil, Phytosqualane thực vật, Palmitoyl Tripeptide-5 thực vật, Hyaluronic Acid, Ceramide NP.',
    usageSteps: [
      'Sử dụng vào bước cuối cùng của chu trình skincare buổi tối.',
      'Chấm một lượng kem nhỏ lên trán, má, cằm và cổ.',
      'Massage nhẹ nhàng theo chiều vuốt nâng cơ từ dưới lên trên.'
    ],
    volume: '50g',
    stock: 32,
    batchNo: 'LN-CRM-2405',
    expiryDate: '09/2026',
    imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=800&q=80',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free'],
    rating: 4.9,
    reviewsCount: 94,
    isBestSeller: false,
  },
  {
    id: 'prod-6',
    name: 'Matcha Detox Mask',
    nameVi: 'Mặt nạ bùn khoáng Matcha Bảo Lộc',
    nameEn: 'Matcha Detox Mask',
    slug: 'matcha-detox-mask',
    price: 210000,
    originalPrice: 240000,
    category: 'mask',
    mainIngredient: 'matcha',
    skinTypes: ['oily', 'combination'],
    skinConcerns: ['pores', 'acne', 'dullness'],
    description: 'Mặt nạ đất sét hữu cơ thanh lọc độc tố từ bột matcha Bảo Lộc, hút sạch sợi bã nhờn và se khít lỗ chân lông.',
    detailedDescription: 'Mặt nạ đất sét trắng Kaolin kết hợp bột matcha tươi hữu cơ giúp hút sạch tạp chất, bã nhờn và độc tố tích tụ sâu trong lỗ chân lông. Công thức bổ sung tinh dầu dừa không gây cảm giác căng cứng nứt nẻ sau khi khô.',
    benefits: [
      'Làm sạch sâu bã nhờn và mụn đầu đen vùng chữ T',
      'Cung cấp chất chống oxy hóa Polyphenol bảo vệ tế bào da',
      'Không gây khô nứt nẻ hay xót da'
    ],
    ingredientsList: 'Kaolin Clay, Camellia Sinensis Leaf Powder (Matcha Organic), Cocos Nucifera Oil, Glycerin, Centella Asiatica Extract.',
    usageSteps: [
      'Đắp lớp mặt nạ đều lên da sạch trong 10-15 phút.',
      'Rửa sạch lại với nước ấm khi mặt nạ vừa se bề mặt, không để khô cứng hoàn toàn.',
      'Dùng 1-2 lần/tuần.'
    ],
    volume: '80g',
    stock: 50,
    batchNo: 'LN-MSK-2406',
    expiryDate: '11/2026',
    imageUrl: 'https://images.unsplash.com/photo-1567928815104-b7980ee5032e?auto=format&fit=crop&w=800&q=80',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free'],
    rating: 4.7,
    reviewsCount: 88,
    isBestSeller: false,
  },
  {
    id: 'prod-7',
    name: 'Green Tea Gentle Wash',
    slug: 'green-tea-gentle-wash',
    price: 180000,
    originalPrice: 200000,
    category: 'cleanser',
    mainIngredient: 'green_tea',
    skinTypes: ['all', 'sensitive', 'oily'],
    skinConcerns: ['acne', 'sensitivity', 'pores'],
    description: 'Sữa rửa mặt tạo bọt dịu nhẹ pH 5.5, làm sạch bụi bẩn và dầu nhờn mà vẫn giữ trọn màng ẩm sinh học.',
    detailedDescription: 'Gel rửa mặt tạo bọt mịn từ gốc dừa tự nhiên, không chứa sulfate SLS/SLES. Kết hợp nước cất trà xanh và lô hội giữ cho làn da sạch sẽ, mát dịu và mềm mượt ngay sau khi sử dụng.',
    benefits: [
      'Độ pH chuẩn 5.5 không phá vỡ màng acid bảo vệ da',
      'Chất làm sạch dịu nhẹ từ gốc dừa tự nhiên (Decyl Glucoside)',
      'Hỗ trợ giảm viêm và làm dịu nốt mụn sưng đỏ'
    ],
    ingredientsList: 'Aqua, Camellia Sinensis Leaf Water, Decyl Glucoside, Coco-Betaine, Aloe Barbadensis Leaf Juice, Panthenol, Citric Acid.',
    usageSteps: [
      'Lấy 1 lần nhấn gel ra tay ướt và tạo bọt mịn.',
      'Massage nhẹ nhàng lên mặt trong 60 giây.',
      'Rửa sạch lại với nước mát.'
    ],
    volume: '150ml',
    stock: 75,
    batchNo: 'LN-WSH-2407',
    expiryDate: '01/2027',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    certifications: ['The Vegan Society', 'PETA Cruelty-Free'],
    rating: 4.9,
    reviewsCount: 195,
    isBestSeller: true,
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Chiến dịch Green Bottle Take-Back: Đổi 5 vỏ chai rỗng nhận ngay Voucher 50.000đ',
    slug: 'chien-dich-thu-gom-vo-chai-rong-green-bottle',
    excerpt: 'LUNARA đồng hành cùng cộng đồng sống xanh trong hành trình tái chế bao bì mỹ phẩm, giảm thiểu rác thải nhựa đại dương và trao tặng quà xanh tri ân.',
    content: `
      <h2>Chung tay kiến tạo chu trình làm đẹp tuần hoàn</h2>
      <p>Mỗi năm, ngành công nghiệp làm đẹp toàn cầu thải ra hơn 120 tỷ đơn vị bao bì nhựa. Tại LUNARA, chúng tôi tin rằng vẻ đẹp thực sự phải đến từ sự tử tế với Mẹ Thiên Nhiên.</p>
      <p>Chính vì vậy, chiến dịch <strong>Green Bottle Take-back</strong> được triển khai liên tục và dài hạn:</p>
      <ul>
        <li><strong>Bước 1:</strong> Dùng hết sản phẩm LUNARA và giữ lại vỏ chai, hũ thủy tinh đã làm sạch.</li>
        <li><strong>Bước 2:</strong> Gom đủ từ <strong>5 vỏ chai rỗng</strong> bất kỳ của LUNARA.</li>
        <li><strong>Bước 3:</strong> Gửi trực tiếp về kho LUNARA qua đối tác Viettel Post / J&T Express (miễn phí cước gửi) hoặc mang đến các điểm tiếp nhận đối tác (Guardian, Hasaki).</li>
        <li><strong>Bước 4:</strong> Nhận ngay mã <strong>Voucher 50.000 VND</strong> và tích 100 điểm thưởng thành viên xanh trên hệ thống Sapo CRM.</li>
      </ul>
      <blockquote>"Sự lựa chọn của bạn ngày hôm nay quyết định sự sống của hệ sinh thái ngày mai."</blockquote>
      <p>Toàn bộ vỏ chai thu gom sẽ được phân loại và chuyển đến nhà máy tái chế Kapac & SCG Packaging để tái sinh thành vật liệu đóng gói thân thiện môi trường.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    author: 'Nguyễn Thị Phương Mai',
    publishDate: '15/10/2025',
    readTime: '3 phút',
    category: 'Chiến dịch xanh',
    tags: ['Tái chế', 'Sống xanh', 'Green Bottle', 'Bền vững'],
    isFeatured: true,
    published: true,
  },
  {
    id: 'blog-2',
    title: '100% Organic Wrinkle Cosmetics: Chống nhăn tự nhiên cho làn da nhạy cảm',
    slug: 'chong-nhan-tu-nhien-cho-lan-da-nhay-cam',
    excerpt: 'Khám phá cơ chế xóa mờ nếp nhăn không xâm lấn, không retinol hóa học, an toàn tuyệt đối với chiết xuất bơ hạt mỡ và thảo mộc hữu cơ.',
    content: `
      <h2>Làn da nhạy cảm cần giải pháp chống lão hóa chuyên biệt</h2>
      <p>Rất nhiều phụ nữ gặp phải tình trạng da kích ứng, bong tróc và nổi mụn sau khi sử dụng các hoạt chất chống nhăn nồng độ cao như Retinol hay AHA tổng hợp. Tại sao phải chấp nhận tổn thương da khi thiên nhiên ban tặng cho chúng ta những siêu dưỡng chất tuyệt vời?</p>
      <h3>Sức mạnh từ thực vật thuần khiết</h3>
      <p>Dòng sản phẩm nếp nhăn hữu cơ của LUNARA khai thác nguồn <strong>Phytosqualane thực vật</strong> và <strong>Peptide chuỗi ngắn từ đậu nành lên men</strong>, giúp phục hồi mạng lưới elastin và collagen dưới da mà không làm mỏng da.</p>
      <p>Sự kết hợp giữa Dầu dừa Bến Tre và Hoa cúc La Mã còn giúp làm dịu những tổn thương vi thể do ánh sáng xanh và khói bụi đô thị.</p>
    `,
    coverImage: 'https://images.unsplash.com/photo-1512290900672-1f41d916bb49?auto=format&fit=crop&w=1200&q=80',
    author: 'Đỗ Quỳnh Anh',
    publishDate: '28/09/2025',
    readTime: '5 phút',
    category: 'Chăm sóc da tự nhiên',
    tags: ['Chống lão hóa', 'Mỹ phẩm hữu cơ', 'Organic Wrinkle', 'Da nhạy cảm'],
    isFeatured: true,
    published: true,
  },
  {
    id: 'blog-3',
    title: 'Hành trình nguyên liệu: Từ vườn trà Thái Nguyên đến giọt tinh chất LUNARA',
    slug: 'hanh-trinh-nguyen-lieu-tra-thai-nguyen',
    excerpt: 'Tự hào khai thác nguồn nông sản xanh của đất mẹ Việt Nam theo tiêu chuẩn hữu cơ và canh tác tái sinh bền vững.',
    content: `
      <h2>Tôn vinh nguồn thảo mộc bản địa Việt Nam</h2>
      <p>Thay vì chạy theo những hoạt chất hóa học tổng hợp từ phòng thí nghiệm xa xôi, LUNARA quay về với nguồn nguyên liệu tinh hoa của nông sản Việt:</p>
      <ul>
        <li><strong>Trà xanh Thái Nguyên:</strong> Thu hoạch thủ công vào sáng sớm khi sương đọng trên búp lá, mang lại hàm lượng EGCG chống lão hóa cao gấp 3 lần trà thông thường.</li>
        <li><strong>Dừa Bến Tre ép lạnh:</strong> Hợp tác trực tiếp cùng Peroma và Vietcoco đảm bảo chuỗi cung ứng minh bạch, giữ nguyên acid lauric kháng khuẩn lành tính.</li>
        <li><strong>Nha đam tươi miền Trung:</strong> Cấp ẩm mọng nước, nuôi dưỡng tế bào da dịu lành.</li>
      </ul>
    `,
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    author: 'Nguyễn Thị Đan Phượng',
    publishDate: '10/09/2025',
    readTime: '4 phút',
    category: 'Nghiên cứu thành phần',
    tags: ['Nông sản Việt', 'Trà xanh Thái Nguyên', 'Dừa Bến Tre', 'Minh bạch'],
    published: true,
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    fullName: 'Lê Thảo My',
    email: 'thaomy.le@gmail.com',
    phone: '0988123456',
    address: 'Quận 1, TP. Hồ Chí Minh',
    skinType: 'Da nhạy cảm',
    primaryConcern: 'Kích ứng & Mẩn đỏ',
    segment: 'sensitive_skin',
    totalSpent: 980000,
    ordersCount: 4,
    loyaltyPoints: 180,
    bottlesRecycled: 10,
    loyaltyTier: 'Cây Xanh',
    isMember: true,
    joinedDate: '12/01/2025',
    lastPurchaseDate: '01/11/2026',
    notes: 'Khách hàng thân thiết, đặc biệt yêu thích Chamomile Serum và kem chống nắng Sun Veil.'
  },
  {
    id: 'CUST-002',
    fullName: 'Trần Gia Hân (Gen Z)',
    email: 'giahan.genz@gmail.com',
    phone: '0912345678',
    address: 'Cầu Giấy, Hà Nội',
    skinType: 'Da dầu',
    primaryConcern: 'Mụn & Lỗ chân lông',
    segment: 'gen_z',
    totalSpent: 410000,
    ordersCount: 2,
    loyaltyPoints: 75,
    bottlesRecycled: 5,
    loyaltyTier: 'Chồi Non',
    isMember: true,
    joinedDate: '15/03/2025',
    lastPurchaseDate: '25/10/2026',
    notes: 'Đến từ kênh TikTok Shop của reviewer Trinh Meow, quan tâm tẩy da chết nha đam và trà xanh.'
  },
  {
    id: 'CUST-003',
    fullName: 'Nguyễn Bích Ngọc',
    email: 'bichngoc.ngo@gmail.com',
    phone: '0903456789',
    address: 'Hải Châu, Đà Nẵng',
    skinType: 'Da hỗn hợp',
    primaryConcern: 'Nếp nhăn & Lão hóa',
    segment: 'office_worker',
    totalSpent: 1250000,
    ordersCount: 5,
    loyaltyPoints: 240,
    bottlesRecycled: 8,
    loyaltyTier: 'Rừng Lunara',
    isMember: true,
    joinedDate: '05/02/2025',
    lastPurchaseDate: '03/11/2026',
    notes: 'Nhân viên văn phòng thường xuyên ngồi điều hòa, chuộng dòng 100% Organic Wrinkle GreenCalm.'
  },
  {
    id: 'CUST-004',
    fullName: 'Hoàng Minh Quân',
    email: 'quan.eco@outlook.com',
    phone: '0977889900',
    address: 'Bình Thạnh, TP. Hồ Chí Minh',
    skinType: 'Da khô',
    primaryConcern: 'Thiếu ẩm & Bong tróc',
    segment: 'eco_lifestyle',
    totalSpent: 625000,
    ordersCount: 3,
    loyaltyPoints: 120,
    bottlesRecycled: 12,
    loyaltyTier: 'Cây Xanh',
    isMember: true,
    joinedDate: '20/04/2025',
    lastPurchaseDate: '18/10/2026',
    notes: 'Tích cực tham gia chiến dịch gửi vỏ chai rỗng qua bưu điện Viettel Post đổi voucher.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-1082',
    customerName: 'Lê Thảo My',
    phone: '0988123456',
    email: 'thaomy.le@gmail.com',
    shippingAddress: '12 Nguyễn Thị Minh Khai, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    items: [
      {
        productId: 'prod-2',
        productName: 'Chamomile Serum',
        price: 250000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-4',
        productName: 'Sun Veil SPF 50+',
        price: 250000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalAmount: 500000,
    discountAmount: 50000, // Áp dụng voucher vỏ chai GREENBOTTLE
    finalAmount: 450000,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    orderStatus: 'stock_validated',
    shippingCarrier: 'J&T Express',
    trackingNumber: 'JT98127391VN',
    channel: 'Website D2C',
    createdAt: '04/11/2026 14:32'
  },
  {
    id: 'ORD-2026-1081',
    customerName: 'Trần Gia Hân',
    phone: '0912345678',
    email: 'giahan.genz@gmail.com',
    shippingAddress: 'Ký túc xá Đại học Quốc gia, Cầu Giấy, Hà Nội',
    items: [
      {
        productId: 'prod-1',
        productName: 'Aloe Vera Scrub',
        price: 125000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80'
      },
      {
        productId: 'prod-3',
        productName: 'Green tea toner',
        price: 230000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalAmount: 355000,
    discountAmount: 0,
    finalAmount: 355000,
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    shippingCarrier: 'Viettel Post',
    trackingNumber: 'VP88491029VN',
    channel: 'TikTok Shop',
    createdAt: '04/11/2026 10:15'
  },
  {
    id: 'ORD-2026-1080',
    customerName: 'Nguyễn Bích Ngọc',
    phone: '0903456789',
    email: 'bichngoc.ngo@gmail.com',
    shippingAddress: '45 Lê Duẩn, Quận Hải Châu, Đà Nẵng',
    items: [
      {
        productId: 'prod-5',
        productName: 'GreenCalm Night Cream',
        price: 285000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=400&q=80'
      }
    ],
    totalAmount: 285000,
    discountAmount: 0,
    finalAmount: 285000,
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    orderStatus: 'shipped',
    shippingCarrier: 'Viettel Post',
    trackingNumber: 'VP88291038VN',
    channel: 'Website D2C',
    createdAt: '03/11/2026 18:20'
  }
];

export const INITIAL_BRAND_DESIGN: BrandDesignConfig = {
  philosophyTitle: 'Triết lý THƯƠNG HIỆU LUNARA',
  philosophySubtitle: 'Vẻ đẹp có đạo đức · Minh bạch · Bền vững · An toàn cho làn da',
  philosophyDescription: 'Là những người yêu thiên nhiên và trân quý các nguồn nông sản đặc hữu của Việt Nam, chúng tôi kiến tạo LUNARA với niềm tin kiên định: Mỹ phẩm phải thực sự thuần chay, đạo đức với muôn loài và dịu lành tuyệt đối cho làn da phụ nữ Việt.',
  philosophyBgImage: '/assets/aistudio/image_8e4ffaa6.png', // Reference user-provided native farm photo with bunny & rich fruits
  cardBadgeText: 'LUNARA ORIGINAL VIETNAM',
  enableFloatingMotion: true,
  spotlightProductId: 'prod-2', // Chamomile Serum (or Aloe / Sun Veil)
  spotlightCustomTitle: 'Chamomile Serum',
  spotlightCustomDescription: 'Giải pháp làm dịu và phục hồi da tổn thương với chiết xuất 82% hoa cúc La Mã chamomile cô đặc, rau má Việt Nam và Niacinamide 2%. Tác động đa tầng làm giảm mẩn đỏ đến 100%, cân bằng hệ vi sinh da, thúc đẩy tái tạo màng lipid sinh học tự nhiên. Công thức 100% thuần chay không cồn, không sulfate, an toàn tuyệt đối cho làn da nhạy cảm.',
  displayLayout: 'cocoon_both',
  pillarsHeadline: '4 Trụ Cột Giá Trị Cốt Lõi',
  showPetaBadge: true,
  showVeganSocietyBadge: true,
  customQuoteAuthor: 'Nhóm nghiên cứu sáng lập LUNARA'
};

