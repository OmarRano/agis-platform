import React, { useState } from 'react';
import { Box, Card, Chip, Grid, Tab, Tabs, Typography, Button, Avatar } from '@mui/material';
import { Favorite, History, LocationOn, Visibility, Message, Search, Storefront, People, VerifiedUser, BusinessCenter } from '@mui/icons-material';
import DashboardQuickActions from '../common/DashboardQuickActions';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const savedProperties = [
  { title: 'Luxury Villa, Lekki', location: 'Lekki Phase 1, Lagos', price: 'N180M', status: 'available' },
  { title: 'Penthouse Apartment', location: 'Ikoyi, Lagos', price: 'N95M', status: 'under offer' },
  { title: 'Commercial Space', location: 'Victoria Island', price: 'N250M', status: 'available' },
];
const recentActivity = [
  ['Viewed property', 'Oceanview Penthouse, Eko Atlantic', '2 hours ago'],
  ['Contacted agent', 'Chinedu Okoro', '5 hours ago'],
  ['Saved to favorites', 'Modern Villa, Banana Island', '1 day ago'],
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  return <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
    <Box sx={{ mb: 4 }}><Typography variant="h4" fontWeight={800} color="#1a365d">My Dashboard</Typography><Typography color="text.secondary">Welcome back, {user?.name}</Typography></Box>
    <DashboardQuickActions actions={[
      { label: 'Marketplace', description: 'Browse listings', path: '/marketplace', icon: <Storefront />, color: '#1a365d' },
      { label: 'Find Agents', description: 'Connect with experts', path: '/agents', icon: <People />, color: '#059669' },
      { label: 'Verification', description: 'Verify documents', path: '/verification', icon: <VerifiedUser />, color: '#c9a227' },
      { label: 'Agent Preview', description: 'Open agent view', path: '/agent-dashboard', icon: <BusinessCenter />, color: '#7c3aed' },
    ]} />
    <Grid container spacing={3} sx={{ mb: 4 }}>{[['Saved Properties', '12', <Favorite />, '#dc2626'], ['Property Views', '48', <Visibility />, '#1a365d'], ['Inquiries Sent', '5', <Message />, '#c9a227'], ['Searches', '23', <Search />, '#059669']].map(([label, value, icon, color]) => <Grid item xs={6} md={3} key={label}><Card sx={{ p: 2, textAlign: 'center' }}><Box sx={{ color }}>{icon}</Box><Typography variant="h4" fontWeight={800} color="#1a365d">{value}</Typography><Typography variant="body2" color="text.secondary">{label}</Typography></Card></Grid>)}</Grid>
    <Card sx={{ p: 3 }}><Tabs value={tab} onChange={(event, value) => setTab(value)}><Tab label="Saved Properties" icon={<Favorite />} iconPosition="start" /><Tab label="Recent Activity" icon={<History />} iconPosition="start" /></Tabs>
      {tab === 0 && <Grid container spacing={3} sx={{ pt: 3 }}>{savedProperties.map((property) => <Grid item xs={12} md={4} key={property.title}><Card variant="outlined" sx={{ overflow: 'hidden' }}><Box sx={{ height: 140, background: 'linear-gradient(135deg, #d9e2ec, #bcccdc)', position: 'relative' }}><Chip label={property.status} size="small" sx={{ position: 'absolute', top: 12, left: 12, color: 'white', backgroundColor: property.status === 'available' ? '#059669' : '#c9a227' }} /></Box><Box sx={{ p: 2.5 }}><Typography variant="h6" fontWeight={700}>{property.title}</Typography><Typography variant="body2" color="text.secondary" sx={{ my: 1 }}><LocationOn sx={{ fontSize: 16, verticalAlign: 'middle', color: '#c9a227' }} /> {property.location}</Typography><Typography variant="h6" color="#059669" fontWeight={800} sx={{ mb: 2 }}>{property.price}</Typography><Button fullWidth variant="outlined" onClick={() => navigate('/marketplace')}>View Details</Button></Box></Card></Grid>)}</Grid>}
      {tab === 1 && <Box sx={{ pt: 3 }}>{recentActivity.map(([action, detail, time]) => <Box key={action} sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, mb: 1, backgroundColor: '#f8fafc' }}><Avatar sx={{ bgcolor: '#1a365d' }}><History /></Avatar><Box sx={{ flex: 1 }}><Typography fontWeight={600}>{action}</Typography><Typography color="text.secondary">{detail}</Typography></Box><Typography variant="caption" color="text.secondary">{time}</Typography></Box>)}</Box>}
    </Card>
  </Box>;
};

export default BuyerDashboard;
