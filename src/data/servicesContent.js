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
    intro: "We provide end-to-end interior design solutions that combine creativity, functionality, and technical expertise. Our services include concept development, space planning, material selection, custom furniture, lighting, 3D visualizations, working drawings, BOQs, and turnkey execution. We design luxury residences, hotels, offices, retail spaces, restaurants, and public interiors, delivering every project with precision, quality craftsmanship, and on-time execution.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg',
    projectCategories: ['interior'],
  },
  'turnkey-projects': {
    title: 'Turnkey Projects',
    intro:"We provide complete end-to-end interior turnkey solutions, managing every stage of your project with a single point of accountability.\n\nConcept Design & Planning – Functional, creative layouts.\n3D Visualizations – Realistic project previews.\nWorking Drawings – Detailed execution plans.\nBOQ & Budgeting – Transparent cost estimates.\nMaterial Selection – Quality sourcing support.\nCustom Furniture – Bespoke premium designs.\nExecution & Supervision – End-to-end site management.\nProject Monitoring – Timely, quality-controlled delivery.\nFinal Handover – Ready-to-use spaces within budget.",
    banner: '/images/turnkey/turnkey.jpeg',
    projectCategories: ['turnkey'],
    singlePhoto: true,
  },
  pmc: {
    title: 'PMC',
    intro: "Our Project Management Consultancy (PMC) services ensure projects are delivered on time, within budget, and to the highest quality standards. We oversee planning, scheduling, consultant coordination, tendering, BOQ verification, procurement, site supervision, quality inspections, cost control, and risk management. Through transparent reporting, milestone tracking, and proactive coordination, we streamline execution, minimize delays, control costs, and ensure successful project delivery.",
    banner: '/images/pmc/pmc.jpeg',
    projectCategories: ['pmc'],
    singlePhoto: true,
  },
}

export default servicesContent