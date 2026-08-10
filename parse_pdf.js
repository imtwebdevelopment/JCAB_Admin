const fs = require('fs');

const ocrText = `
JCAB-001
JCAB Minimalist T-Bar Light Pole boasts a sleek, contemporary design with a
horizontal light bar. Perfect for urban landscapes, it provides ample
illumination while adding a touch of modern elegance to public spaces.

JCAB002
JCABLinear Frame Light Pole offers a refined structure with open-frame sides,
delivering both illumination and modern aesthetic appeal. Ideal for pathways
and public spaces, it enhances visibility while adding a sleek architectural
element to the surroundings.

JCAB-003
JCAB Single Arm Light Pole combines minimalism with functionality, offering
focused lighting for pathways and urban spaces. Its streamlined design ensures
efficient illuminationwithamodern aesthetic, ideal for contemporary outdoor
settings.

ARPL-004
JCAB T-Bar Light Pole combines minimalist design with practical lighting. Its
streamlined, horizontal bar offers balanced illumination, making it ideal for
modern streetscapes and urban environments. This pole enhances functionality
while adding a sleek, contemporary aesthetic to any public space.

JCAB-005
JCAB Double Arm Light Pole provides balanced illumination from both sides,
ideal for wide pathways and open spaces. Its sleek, modern design enhances
visibility while maintaining an aesthetic appeal, perfect for urban landscapes.

JCAB-006
JCAB Y-Shaped Light Pole offers a unique design with dual arms angled
outward, providing wide-spread illumination for expansive areas. Its
contemporary aesthetic is ideal for modern urban settings, enhancing both
function and style in public spaces.

JCAB-007
JCAB Inclined Light Pole offers a sleek, modern design with an angled arm,
providing focused illumination. Ideal for pathways and public spaces, this
pole adds both function and architectural flair to contemporary
environments.

JCAB-008
JCAB Angular Light Pole features a modern, geometric design with sharp
angles, adding a bold architectural element to any urban setting. Its sleek
structure provides focused illumination, perfect for contemporary streetscapes
and commercial areas.

JCAB-009
JCAB Modern Zigzag Light Pole features a unique angular design that
adds character to any urban setting. Its distinctive shape provides
targeted illumination, ideal for contemporary landscapes, walkways,
and plazas, blending functionality with artistic flair.

JCAB-010
JCABCross Diamond Light Pole brings a modern touch with its intersecting
diamond shapes. Designed to provide dynamic lighting and a unique
aesthetic, it's ideal for contemporary cityscapes and innovative outdoor
settings.

JCAB-011
JCAB Dual Diamond Light Pole combines geometric elegance with
practical lighting. Its twin-diamond structure provides wide illumination
coverage, making it a standout feature for urban landscapes and stylish
outdoor spaces.

JCAB-012
JCAB Y-Shaped Light Pole combines dual light arms with a sleek, minimalist
design, perfect for illuminating wide urban pathways and public spaces. Its
unique Y-structure not only enhances visibility but also adds a distinctive
modern touch to any environment.

JCAB-013
JCAB Slimline Light Pole features a streamlined, single-arm design that
complements urban environments with modern aesthetics. Its simple
structure provides effective illumination while seamlessly blending into
streetscapes and pedestrian areas.

JCAB-014
JCAB Double Arm Staggered Light Pole showcases a contemporary, layered
design ideal for urban landscapes. With dual staggered arms, it provides
enhanced lighting coverage for pathways, streets, and plazas, adding both
functionality and a unique visual appeal.

JCAB-015
JCAB Single Arm Light Pole with a sleek, minimalist design enhances
contemporary spaces with efficient illumination. Its straight arm layout
provides focused lighting, ideal for walkways,parks,and public areas, ensuring
a blend of style and functionality.

JCAB-016
JCAB Single-ArmLightPolewithintegratedambientlightingcombines practical
illumina- tion with a decorative glow. Perfect for modern streetscapes and
pathways, it enhances both visibility and aesthetic appeal, creating a welcoming
environment.

JCAB-017
JCAB Double-Arm Light Pole merges functionality with style, featuring dual
light fixtures for broader illumination. Ideal for highways, pedestrian zones,
and expansive urban areas, it ensures comprehensive lighting coverage with a
sleek, modern profile.

JCAB-018
JCAB Double Arm Light Pole offers versatile lighting solutions for broader
urban spaces. Its dual fixtures enhance illumination coverage, making it ideal for
large pathways, parks, andstreets,allwhilemaintaininga sleek, contemporary
design.
`;

const lines = ocrText.split('\n');
const products = [];
let currentProduct = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  if (line.match(/^(JCAB|ARPL|DHL|AX-ARM)-?\s*\d+/i)) {
    if (currentProduct) products.push(currentProduct);
    const code = line.replace(/\s/g, '').toUpperCase();
    currentProduct = {
      code: code,
      title: code,
      description: ''
    };
  } else if (currentProduct) {
    // If the line looks like "JCAB <something> Pole..." it's the title + description
    if (currentProduct.description === '' && line.toLowerCase().startsWith('jcab')) {
      const match = line.match(/^(JCAB[^ ]+ [A-Z].*?Pole)(.*)/i);
      if (match) {
        currentProduct.title = match[1].trim();
        currentProduct.description += match[2].trim() + ' ';
      } else {
        currentProduct.title = line.split(' ').slice(0, 5).join(' ');
        currentProduct.description += line + ' ';
      }
    } else {
      currentProduct.description += line + ' ';
    }
  }
}
if (currentProduct) products.push(currentProduct);

fs.writeFileSync('parsed_products.json', JSON.stringify(products, null, 2));
console.log('Parsed ' + products.length + ' products.');
