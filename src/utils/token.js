// Simple token generator for verification tracking
export function generateToken(prefix = 'TK') {
  const rand = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  const token = `${prefix}-${Date.now().toString(36)}-${rand()}${rand()}`;
  return token.toUpperCase();
}
