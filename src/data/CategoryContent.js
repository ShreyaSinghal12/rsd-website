// Content for the 4 "Types of Services" category pages.
// projectCategories maps each card to the project `category` values in
// src/data/projects.js. Only residential, hospitality, architecture, and
// interior exist as real categories today — "Builders & Developers" and
// "Retails & Shop" don't have a dedicated category yet, so they currently
// fall back to the closest related work. Tag projects with their own
// category, or tell me which projects belong where, for precise results.
const categoryContent = {
  residential: {
    title: 'Residential',
    projectCategories: ['residential'],
  },
  hospitality: {
    title: 'Hotels & Hospitality',
    projectCategories: ['hospitality'],
  },
  builders: {
    title: 'Builders & Developers',
    projectCategories: ['residential', 'architecture'],
  },
  retail: {
    title: 'Retails & Shop',
    projectCategories: ['interior'],
  },
}

export default categoryContent