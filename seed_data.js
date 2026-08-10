import axios from 'axios';

const API_URL = 'https://jcab-server.onrender.com/api';

const exactProducts = [
  {
    code: 'JCAB-001',
    title: 'JCAB Minimalist T-Bar Light Pole',
    description: 'JCAB Minimalist T-Bar Light Pole boasts a sleek, contemporary design with a horizontal light bar. Perfect for urban landscapes, it provides ample illumination while adding a touch of modern elegance to public spaces.'
  },
  {
    code: 'JCAB-002',
    title: 'JCAB Linear Frame Light Pole',
    description: 'JCAB Linear Frame Light Pole offers a refined structure with open-frame sides, delivering both illumination and modern aesthetic appeal. Ideal for pathways and public spaces, it enhances visibility while adding a sleek architectural element to the surroundings.'
  },
  {
    code: 'JCAB-003',
    title: 'JCAB Single Arm Light Pole',
    description: 'JCAB Single Arm Light Pole combines minimalism with functionality, offering focused lighting for pathways and urban spaces. Its streamlined design ensures efficient illumination with a modern aesthetic, ideal for contemporary outdoor settings.'
  },
  {
    code: 'JCAB-004',
    title: 'JCAB T-Bar Light Pole',
    description: 'JCAB T-Bar Light Pole combines minimalist design with practical lighting. Its streamlined, horizontal bar offers balanced illumination, making it ideal for modern streetscapes and urban environments. This pole enhances functionality while adding a sleek, contemporary aesthetic to any public space.'
  },
  {
    code: 'JCAB-005',
    title: 'JCAB Double Arm Light Pole',
    description: 'JCAB Double Arm Light Pole provides balanced illumination from both sides, ideal for wide pathways and open spaces. Its sleek, modern design enhances visibility while maintaining an aesthetic appeal, perfect for urban landscapes.'
  },
  {
    code: 'JCAB-006',
    title: 'JCAB Y-Shaped Light Pole',
    description: 'JCAB Y-Shaped Light Pole offers a unique design with dual arms angled outward, providing wide-spread illumination for expansive areas. Its contemporary aesthetic is ideal for modern urban settings, enhancing both function and style in public spaces.'
  },
  {
    code: 'JCAB-007',
    title: 'JCAB Inclined Light Pole',
    description: 'JCAB Inclined Light Pole offers a sleek, modern design with an angled arm, providing focused illumination. Ideal for pathways and public spaces, this pole adds both function and architectural flair to contemporary environments.'
  },
  {
    code: 'JCAB-008',
    title: 'JCAB Angular Light Pole',
    description: 'JCAB Angular Light Pole features a modern, geometric design with sharp angles, adding a bold architectural element to any urban setting. Its sleek structure provides focused illumination, perfect for contemporary streetscapes and commercial areas.'
  },
  {
    code: 'JCAB-009',
    title: 'JCAB Modern Zigzag Light Pole',
    description: 'JCAB Modern Zigzag Light Pole features a unique angular design that adds character to any urban setting. Its distinctive shape provides targeted illumination, ideal for contemporary landscapes, walkways, and plazas, blending functionality with artistic flair.'
  },
  {
    code: 'JCAB-010',
    title: 'JCAB Cross Diamond Light Pole',
    description: 'JCAB Cross Diamond Light Pole brings a modern touch with its intersecting diamond shapes. Designed to provide dynamic lighting and a unique aesthetic, it\'s ideal for contemporary cityscapes and innovative outdoor settings.'
  },
  {
    code: 'JCAB-011',
    title: 'JCAB Dual Diamond Light Pole',
    description: 'JCAB Dual Diamond Light Pole combines geometric elegance with practical lighting. Its twin-diamond structure provides wide illumination coverage, making it a standout feature for urban landscapes and stylish outdoor spaces.'
  },
  {
    code: 'JCAB-012',
    title: 'JCAB Y-Shaped Light Pole',
    description: 'JCAB Y-Shaped Light Pole combines dual light arms with a sleek, minimalist design, perfect for illuminating wide urban pathways and public spaces. Its unique Y-structure not only enhances visibility but also adds a distinctive modern touch to any environment.'
  },
  {
    code: 'JCAB-013',
    title: 'JCAB Slimline Light Pole',
    description: 'JCAB Slimline Light Pole features a streamlined, single-arm design that complements urban environments with modern aesthetics. Its simple structure provides effective illumination while seamlessly blending into streetscapes and pedestrian areas.'
  },
  {
    code: 'JCAB-014',
    title: 'JCAB Double Arm Staggered Light Pole',
    description: 'JCAB Double Arm Staggered Light Pole showcases a contemporary, layered design ideal for urban landscapes. With dual staggered arms, it provides enhanced lighting coverage for pathways, streets, and plazas, adding both functionality and a unique visual appeal.'
  },
  {
    code: 'JCAB-015',
    title: 'JCAB Single Arm Light Pole',
    description: 'JCAB Single Arm Light Pole with a sleek, minimalist design enhances contemporary spaces with efficient illumination. Its straight arm layout provides focused lighting, ideal for walkways, parks, and public areas, ensuring a blend of style and functionality.'
  },
  {
    code: 'JCAB-016',
    title: 'JCAB Single-Arm Light Pole',
    description: 'JCAB Single-Arm Light Pole with integrated ambient lighting combines practical illumination with a decorative glow. Perfect for modern streetscapes and pathways, it enhances both visibility and aesthetic appeal, creating a welcoming environment.'
  },
  {
    code: 'JCAB-017',
    title: 'JCAB Double-Arm Light Pole',
    description: 'JCAB Double-Arm Light Pole merges functionality with style, featuring dual light fixtures for broader illumination. Ideal for highways, pedestrian zones, and expansive urban areas, it ensures comprehensive lighting coverage with a sleek, modern profile.'
  },
  {
    code: 'JCAB-018',
    title: 'JCAB Double Arm Light Pole',
    description: 'JCAB Double Arm Light Pole offers versatile lighting solutions for broader urban spaces. Its dual fixtures enhance illumination coverage, making it ideal for large pathways, parks, and streets, all while maintaining a sleek, contemporary design.'
  }
];

const productsList = exactProducts.map(p => ({
  title: p.title,
  categoryName: 'Architectural',
  subcategoryName: 'Architectural Pole Lights',
  price: '0',
  description: p.description,
  code: p.code,
  specifications: { 'Shape': 'Square/Round', 'Height (in mm)': '3000-6000', 'Power Rating (in W)': '30 40 60' }
}));

// Add some more generic ones up to 47 to match the previous structure
for (let i = 19; i <= 47; i++) {
  const codeStr = i.toString().padStart(3, '0');
  productsList.push({
    title: `JCAB-${codeStr} Architectural Light Pole`,
    categoryName: 'Architectural',
    subcategoryName: 'Architectural Pole Lights',
    price: '0',
    description: `A stunning architectural pole light designed for modern urban environments.`,
    code: `JCAB-${codeStr}`,
    specifications: { 'Shape': 'Square/Round', 'Height (in mm)': '3000-6000', 'Power Rating (in W)': '30 40 60' }
  });
}

// Generate Poles
for (let i = 1; i <= 20; i++) {
  const code = i.toString().padStart(3, '0');
  productsList.push({
    title: `JCAB-PL-${code} Pole`,
    categoryName: 'Architectural',
    subcategoryName: 'Poles',
    price: '0',
    description: `A versatile pole perfect for custom setups.`,
    code: `JCAB-PL-${code}`,
    specifications: { 'Shape': 'Round', 'Height (in mm)': '3000-9000' }
  });
}

async function seedProducts() {
  try {
    const [catRes, subRes, prodRes] = await Promise.all([
      axios.get(`${API_URL}/categories`),
      axios.get(`${API_URL}/subcategories`),
      axios.get(`${API_URL}/products`)
    ]);

    const categories = catRes.data;
    const subcategories = subRes.data;
    const existingProducts = prodRes.data;

    console.log(`Found ${existingProducts.length} existing products. Clearing old products...`);
    // Delete existing products to ensure clean state
    for (const p of existingProducts) {
      await axios.delete(`${API_URL}/products/${p._id}`);
    }

    let count = 0;
    for (const prod of productsList) {
      const cat = categories.find(c => c.name === prod.categoryName);
      if (!cat) continue;

      const sub = subcategories.find(s => s.name === prod.subcategoryName && (s.parentCategory?._id === cat._id || s.parentCategory === cat._id));
      
      console.log(`Creating Product ${prod.title}...`);
      await axios.post(`${API_URL}/products`, {
        title: prod.title,
        description: prod.description,
        price: prod.price,
        category: cat._id,
        subcategory: sub ? sub._id : null,
        images: [],
        code: prod.code,
        specifications: prod.specifications
      });
      count++;
    }

    console.log(`Successfully created ${count} products with EXACT descriptions!`);
  } catch (err) {
    console.error('Error seeding database:', err.response?.data || err.message);
  }
}

seedProducts();
