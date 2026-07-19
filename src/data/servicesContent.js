// Content for the 4 "Our Expertise" service pages.
// projectCategories maps each service to the project `category` values
// in src/data/projects.js used to populate that page's project grid.
// Projects aren't currently tagged by service type (only by residential /
// hospitality / architecture), so these mappings are a reasonable starting
// point — adjust them, or add a dedicated field to projects.js, for
// more precise filtering later.
const servicesContent = {
  architecture: {
    title: 'Architecture',
    intro: "We provide end-to-end architectural solutions, from concept design and master planning to detailed working drawings, 3D visualizations, BOQs, and construction documentation. Our multidisciplinary team coordinates architecture, structure, MEP, and landscape design to ensure seamless execution. Through expert planning, technical precision, and project management, we create functional, sustainable, and timeless spaces delivered on time and within budget.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg',
    projectCategories: ['architecture'],
  },
  'interior-design': {
    title: 'Interior Design',
    intro: "We provide comprehensive interior design solutions that blend creativity, functionality, and technical expertise to create exceptional spaces. Our services include concept development, space planning, mood boards, material and finish selection, custom furniture design, lighting design, false ceiling layouts, detailed working drawings, 3D visualizations, BOQs, and turnkey execution support. We design luxury residences, hotels, commercial offices, retail spaces, restaurants, clubhouses, and public areas tailored to your vision and budget. With a multidisciplinary team of designers, engineers, and project managers, we ensure every project is executed with precision, superior craftsmanship, timely delivery, and uncompromising attention to detail.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg',
    projectCategories: ['interior'],
  },
  'turnkey-projects': {
    title: 'Turnkey Projects',
    intro: "We provide complete end-to-end interior turnkey solutions, managing every stage of your project with a single point of accountability.\n* Concept Design & Space Planning – Creative layouts tailored to your vision and functional requirements.\n* 3D Visualizations – Realistic renders for better decision-making before execution.\n* Detailed Working Drawings – Complete architectural, interior, and execution drawings.\n* BOQ & Cost Planning – Accurate budgeting and transparent cost management.\n* Material Selection & Procurement – Assistance in selecting and sourcing quality materials.\n* Custom Furniture Manufacturing – Bespoke furniture crafted with precision and premium finishes.\n* Site Execution & Coordination – Complete management of civil, electrical, plumbing, HVAC, and interior works.\n* Quality Control & Supervision – Regular inspections to ensure superior workmanship.\n* Project Scheduling & Monitoring – System-driven planning with milestone tracking and progress updates.\n* Final Handover – Timely delivery of a beautifully finished, ready-to-use space within budget and to the highest quality standards.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Innovative-Spaces-1.jpg',
    projectCategories: ['architecture'],
  },
  pmc: {
    title: 'PMC',
    intro: "Procurement, scheduling, and on-site quality control, run by the same team that designed the space. One point of contact, one standard, held from groundbreaking to move-in.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-3.jpg',
    projectCategories: ['residential', 'hospitality', 'architecture'],
  },
}

export default servicesContent