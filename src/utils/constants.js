export const APP_NAME = 'Sorella Real Estate';
export const APP_TAGLINE = "Africa's Premier Real Estate Platform";

export const USER_ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  DEAL_INITIATOR: 'deal-initiator',
  AGENT: 'agent',
  BUYER: 'buyer',
};

export const ROLE_LABELS = {
  'super-admin': 'Super Admin',
  admin: 'Admin',
  'deal-initiator': 'Deal Initiator',
  agent: 'Agent',
  buyer: 'Buyer',
};

export const ROLE_COLORS = {
  'super-admin': '#7c3aed',
  admin: '#1a365d',
  'deal-initiator': '#c9a227',
  agent: '#059669',
  buyer: '#dc2626',
};

export const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'land', label: 'Land & Plot' },
  { value: 'luxury', label: 'Luxury' },
];

export const VERIFICATION_SERVICES = [
  { id: 'title-search', name: 'Title Document Search', price: 15000, duration: '24-48 hours' },
  { id: 'survey-verify', name: 'Survey Plan Verification', price: 12000, duration: '24 hours' },
  { id: 'deed-check', name: 'Deed of Assignment Check', price: 10000, duration: '12-24 hours' },
  { id: 'full-package', name: 'Complete Verification Package', price: 35000, duration: '48-72 hours' },
];

export const NIGERIAN_STATES = ['Lagos', 'Abuja FCT', 'Rivers', 'Oyo', 'Kano', 'Delta', 'Kaduna', 'Ogun', 'Edo', 'Anambra'];
