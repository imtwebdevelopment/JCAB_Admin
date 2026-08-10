import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://jcab-server.onrender.com/api';

const subcategoryData = [
  {
    categoryName: 'Architectural',
    name: 'Architectural Pole Lights',
    description: "JCABS Architectural Lighting Poles are designed to do more than illuminate—they shape ambiance and elevate the visual identity of any space. Engineered to blend seamlessly with surrounding architecture, they bring a refined, premium aesthetic to luxury projects and large-scale developments alike. Combining modern design, advanced technology, and timeless appeal, our poles deliver both functionality and style. With JCABS, your project doesn't just light up—it stands out with sophistication and leaves a lasting impression.",
    products: [
      {
        title: 'JCAB Minimalist T-Bar Light Pole',
        description: 'JCAB Minimalist T-Bar Light Pole boasts a sleek, contemporary design with a horizontal light bar. Perfect for urban landscapes, it provides ample illumination while adding a touch of modern elegance to public spaces.',
        code: 'JCAB-001'
      },
      {
        title: 'JCAB Linear Frame Light Pole',
        description: 'JCAB Linear Frame Light Pole offers a refined structure with open-frame sides, delivering both illumination and modern aesthetic appeal. Ideal for pathways and public spaces, it enhances visibility while adding a sleek architectural element to the surroundings.',
        code: 'JCAB-002'
      },
      {
        title: 'JCAB Single Arm Light Pole',
        description: 'JCAB Single Arm Light Pole combines minimalism with functionality, offering focused lighting for pathways and urban spaces. Its streamlined design ensures efficient illumination with a modern aesthetic, ideal for contemporary outdoor settings.',
        code: 'JCAB-003'
      }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Poles',
    description: "Custom made light poles, shaped by your ideas. At JCAB, our success has been based on a solid foundation of identifying our client's requirements for design, functionality, sustainability and reliability. We have always believed in inclusive growth and collaborated with architects, lighting designers, electrical contractors to integrate light into their projects, ranging from bespoke designs to a wide range of lighting solutions. The entire design, development and production process of this is managed in-house.",
    products: [
      { title: 'JCAB-PL-001 Pole', description: 'Make your own custom pole, dimension 76.2 114.3. Ideal for standard installations.', code: 'JCAB-PL-001' },
      { title: 'JCAB-PL-002 Pole', description: 'Make your own custom pole, dimension 88.9 139.7. Engineered for structural integrity.', code: 'JCAB-PL-002' },
      { title: 'JCAB-PL-003 Pole', description: 'Make your own custom pole, tailored perfectly for residential and commercial setups.', code: 'JCAB-PL-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Brackets',
    description: "Crafted from premium materials, JCABS brackets combine strength, durability, and style. From bullhorn setups to cantilever arms,they fiteverydesignneed,seamlessly integrating withourbespokepoles. With sleekfinishes and precise engineering, our brackets enhance both performance and aesthetics, elevating your entire lighting project.",
    products: [
      { title: 'AX-ARM-001 Bracket', description: 'Premium bullhorn bracket setup seamlessly integrating with your bespoke pole.', code: 'AX-ARM-001' },
      { title: 'AX-ARM-002 Bracket', description: 'Cantilever arm bracket for precision lighting delivery and structural strength.', code: 'AX-ARM-002' },
      { title: 'AX-ARM-003 Bracket', description: 'Durable mounting bracket providing aesthetic excellence and optimal support.', code: 'AX-ARM-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Head Lamps',
    description: "JCABS Head Lamps offer precision illumination combined with modern styling. Our lamps are engineered to provide maximum visibility while complementing the architectural design of your poles.",
    products: [
      { title: 'DHL-001 Head Lamp', description: 'High-performance LED head lamp tailored for clear, crisp lighting in public spaces.', code: 'DHL-001' },
      { title: 'DHL-002 Head Lamp', description: 'Minimalist head lamp fixture ensuring elegant light distribution.', code: 'DHL-002' },
      { title: 'DHL-003 Head Lamp', description: 'Robust head lamp designed for high efficiency and longevity.', code: 'DHL-003' }
    ]
  },
  {
    categoryName: 'Commercial',
    name: 'Commercial Poles',
    description: "At JCABS, we craft premium octagonal poles that blend strength, durability, and modern design. With customizable dimensions, IS-compliant hot-dip galvanization, and superior PU or powder-coated finishes, our poles are built to perform and designed to impress. From streetscapes to public spaces, JCAB delivers the perfect balance of form and function.",
    products: [
      { title: 'Octagonal Street Pole', description: 'Premium octagonal pole blending strength, durability, and modern design.', code: 'CP-001' },
      { title: 'Hot-Dip Galvanized Pole', description: 'IS-compliant hot-dip galvanized commercial pole for challenging environments.', code: 'CP-002' },
      { title: 'PU Coated Highway Pole', description: 'Superior PU finished pole built to perform on vast highway networks.', code: 'CP-003' }
    ]
  },
  {
    categoryName: 'Commercial',
    name: 'Conical Poles',
    description: "At JCABS conical poles are more than just tapered structures—they're a fusion of strength, design, and versatility. Their sleek, narrowing profile isn't just aesthetically pleasing but also engineered to ensure optimal weight distribution and wind resistance, making them ideal for challenging environments. From highways to stadiums, residential complexes to smart urban projects, conical poles bring a contemporary touch to every setting. Their streamlined silhouette complements modern architecture, while their functionality supports lighting, signage, and even advanced tech like CCTV systems.",
    products: [
      { title: 'Tapered Conical Pole', description: 'A sleek, narrowing profile engineered to ensure optimal weight distribution.', code: 'CN-001' },
      { title: 'High-Wind Conical Pole', description: 'Versatile tapered structure perfect for wind resistance in challenging environments.', code: 'CN-002' },
      { title: 'Smart Urban Conical Pole', description: 'A streamlined silhouette complementing modern architecture and CCTV systems.', code: 'CN-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Cast Iron',
    description: "Our cast iron poles evoke timeless heritage while delivering modern durability. Perfectly suited for historical districts, parks, and traditional streetscapes.",
    products: [
      { title: 'Heritage Cast Iron Pole', description: 'Classic cast iron design for historical and park settings.', code: 'CI-001' },
      { title: 'Ornamental Iron Base', description: 'Heavy-duty cast iron base with intricate ornamental detailing.', code: 'CI-002' },
      { title: 'Vintage Street Pole', description: 'Vintage aesthetic combining iron strength with modern lighting.', code: 'CI-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Designer Area Lights',
    description: "Elevate your open spaces with our Designer Area Lights. Engineered for expansive coverage while maintaining a stunning contemporary visual footprint.",
    products: [
      { title: 'Contemporary Area Light', description: 'Expansive coverage with a stunning visual footprint.', code: 'DA-001' },
      { title: 'Sleek Plaza Light', description: 'Sleek lighting solution for plazas and pedestrian zones.', code: 'DA-002' },
      { title: 'Urban Designer Fixture', description: 'Modern fixture designed to enhance urban architectural spaces.', code: 'DA-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Bollards',
    description: "JCABS bollards offer essential pathway illumination and security with an unobtrusive, elegant design. Perfect for walkways, gardens, and building perimeters.",
    products: [
      { title: 'Modern LED Bollard', description: 'Sleek LED bollard for pathway illumination and security.', code: 'BL-001' },
      { title: 'Architectural Bollard', description: 'Unobtrusive and elegant design for gardens and perimeters.', code: 'BL-002' },
      { title: 'Heavy-Duty Bollard', description: 'Robust construction providing both lighting and physical security.', code: 'BL-003' }
    ]
  },
  {
    categoryName: 'Architectural',
    name: 'Architectural Outdoor Lights',
    description: "Comprehensive outdoor lighting solutions that seamlessly integrate with your architectural vision, providing brilliant illumination and striking aesthetics.",
    products: [
      { title: 'Facade Spotlight', description: 'Striking illumination designed to highlight building facades.', code: 'AO-001' },
      { title: 'Landscape Accent Light', description: 'Subtle accent lighting to enhance landscape architecture.', code: 'AO-002' },
      { title: 'Urban Floodlight', description: 'Brilliant outdoor illumination for large architectural areas.', code: 'AO-003' }
    ]
  },
  {
    categoryName: 'Commercial',
    name: 'Solar Lights',
    description: "Harness the power of the sun with our high-efficiency Commercial Solar Lights. Sustainable, reliable, and designed for off-grid brilliance in any commercial setting.",
    products: [
      { title: 'Integrated Solar Pole', description: 'High-efficiency solar pole designed for off-grid brilliance.', code: 'SL-001' },
      { title: 'Commercial Solar Fixture', description: 'Sustainable and reliable solar fixture for commercial settings.', code: 'SL-002' },
      { title: 'Smart Solar Streetlight', description: 'Advanced solar streetlight with smart energy management.', code: 'SL-003' }
    ]
  }
];

// Helper function to read image as base64
function getBase64Image(filename) {
  try {
    const file = fs.readFileSync(path.join(__dirname, 'uploads', filename));
    return 'data:image/png;base64,' + file.toString('base64');
  } catch (e) {
    return '';
  }
}

const images = {
  'Architectural Pole Lights': getBase64Image('arch_pole_1_1786358230839.png'),
  'Brackets': getBase64Image('bracket_1_1786358252187.png'),
  'Head Lamps': getBase64Image('head_lamp_1_1786358241912.png'),
  'Commercial Poles': getBase64Image('commercial_pole_1_1786358263254.png'),
  'Poles': getBase64Image('arch_pole_1_1786358230839.png'),
  'Conical Poles': getBase64Image('commercial_pole_1_1786358263254.png')
};

async function seedProducts() {
  try {
    const [catRes, subRes, prodRes] = await Promise.all([
      axios.get(`${API_URL}/categories`),
      axios.get(`${API_URL}/subcategories`),
      axios.get(`${API_URL}/products`)
    ]);

    let categories = catRes.data;
    let subcategories = subRes.data;
    const existingProducts = prodRes.data;

    console.log(`Deleting ${existingProducts.length} old products...`);
    for (const p of existingProducts) {
      await axios.delete(`${API_URL}/products/${p._id}`);
    }

    console.log(`Updating subcategory descriptions...`);
    for (const sub of subcategoryData) {
      const cat = categories.find(c => c.name === sub.categoryName);
      if (!cat) continue;

      let dbSub = subcategories.find(s => s.name === sub.name && (s.parentCategory?._id === cat._id || s.parentCategory === cat._id));
      
      if (dbSub) {
        // Update existing subcategory with the exact description
        await axios.put(`${API_URL}/subcategories/${dbSub._id}`, {
          description: sub.description
        });
      } else {
        // Create it if it doesn't exist
        const newSub = await axios.post(`${API_URL}/subcategories`, {
          name: sub.name,
          parentCategory: cat._id,
          description: sub.description
        });
        dbSub = newSub.data;
        subcategories.push(dbSub); // add to local list
      }

      const imageStr = images[sub.name] || '';

      console.log(`Seeding 3 products for ${sub.name}...`);
      for (const prod of sub.products) {
        await axios.post(`${API_URL}/products`, {
          title: prod.title,
          description: prod.description,
          price: '0',
          category: cat._id,
          subcategory: dbSub._id,
          images: imageStr ? [imageStr] : [],
          code: prod.code,
          specifications: {}
        });
      }
    }

    console.log(`Database seeded successfully! Exactly 3 products per subcategory with exact PDF content.`);
  } catch (err) {
    console.error('Error seeding database:', err.response?.data || err.message);
  }
}

seedProducts();
