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
    intro: "We design buildings that hold their form for decades, not just their first photograph. Every structure begins with how it will be lived in, used, and maintained — not how it will look in a launch shoot.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Stunning-Structures-1.jpg',
    projectCategories: ['architecture'],
  },
  'interior-design': {
    title: 'Interior Design',
    intro: "Interiors that read as one continuous idea, not a collection of separately chosen finishes. We design the experience of a room first, and let the surfaces follow.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/The-Unruffled.jpg',
    projectCategories: ['residential', 'hospitality'],
  },
  'turnkey-projects': {
    title: 'Turnkey Projects',
    intro: "From first sketch to final handover, held under one accountable team. You deal with a single studio, not a chain of contractors passing the blame between them.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/04/Innovative-Spaces-1.jpg',
    projectCategories: ['residential', 'hospitality', 'architecture'],
  },
  pmc: {
    title: 'PMC',
    intro: "Procurement, scheduling, and on-site quality control, run by the same team that designed the space. One point of contact, one standard, held from groundbreaking to move-in.",
    banner: 'https://raameshsinghaldesign.com/wp-content/uploads/2023/01/RSD-3.jpg',
    projectCategories: ['residential', 'hospitality', 'architecture'],
  },
}

export default servicesContent