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
    subtitle: "Buildings designed to hold their form for decades, not just their first photograph. Structure, planning, and execution held under one team.",
    intro: "We provide end-to-end architectural solutions, from concept design and master planning to detailed working drawings, 3D visualizations, and construction documentation. Our multidisciplinary team coordinates architecture, structure, MEP, and landscape design under one roof, so nothing falls through the gaps between separate firms. Every structure is designed for how it will be lived in and maintained, not just how it looks on day one. The result: functional, sustainable spaces delivered on time and within budget.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg',
    projectCategories: ['architecture'],
  },
  'interior-design': {
    title: 'Interior Design',
    subtitle: "Interiors that read as one continuous idea, not a collection of separately chosen finishes. We design the experience of a room first.",
    intro: "We provide comprehensive interior design solutions that blend creativity, functionality, and technical expertise — concept development, space planning, material and lighting selection, custom furniture, and detailed working drawings, all in-house. We design luxury residences, hotels, offices, and retail spaces tailored to your vision and budget. A single multidisciplinary team of designers, engineers, and project managers sees every project through, so craftsmanship and timelines are never someone else's problem to manage.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg',
    projectCategories: ['interior'],
  },
  'turnkey-projects': {
    title: 'Turnkey Projects',
    subtitle: "From first sketch to final handover, held under one accountable team. You deal with a single studio, not a chain of contractors.",
    intro: "We manage every stage of your project under one point of accountability — concept design, 3D visualization, working drawings, BOQ and procurement, custom furniture manufacturing, and full site execution across civil, electrical, plumbing, and interior works. Regular quality inspections and milestone-tracked scheduling keep the project moving without surprises. You get one schedule, one team, and a finished, ready-to-use space handed over on time and to the standard promised.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Innovative-Spaces-1.jpg',
    projectCategories: ['architecture'],
    singlePhoto: true,
  },
  pmc: {
    title: 'PMC',
    subtitle: "Procurement, scheduling, and on-site quality control, run by the same team that designed the space. One point of contact, start to finish.",
    intro: "Our Project Management Consultancy services keep your project on time, on budget, and to a consistent quality standard — planning, scheduling, tendering, contractor selection, procurement, and on-site supervision, all coordinated by one team. We work directly with architects, engineers, and suppliers to keep communication seamless and execution efficient. Through systematic reporting and milestone tracking, we catch problems before they become delays, and hold the project to full cost and quality transparency throughout.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-3.jpg',
    projectCategories: ['residential', 'hospitality', 'architecture'],
    singlePhoto: true,
  },
}

export default servicesContent