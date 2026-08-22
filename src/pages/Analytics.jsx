import React, { useState } from 'react';
import { Box, Card, Grid, Tab, Tabs, Typography } from '@mui/material';
import { People, BusinessCenter, AttachMoney, TrendingUp } from '@mui/icons-material';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const userDistribution = [
  { name: 'Buyers', value: 8500 },
  { name: 'Agents', value: 2100 },
  { name: 'Deal Initiators', value: 450 },
  { name: 'Admins', value: 8 },
];
const COLORS = ['#1a365d', '#059669', '#c9a227', '#7c3aed'];
const stats = [
  { title: 'Total Users', value: '12,450', change: '+12%', icon: <People />, color: '#1a365d' },
  { title: 'Active Listings', value: '2,340', change: '+15%', icon: <BusinessCenter />, color: '#c9a227' },
  { title: 'Monthly Revenue', value: 'N8.5M', change: '+22%', icon: <AttachMoney />, color: '#059669' },
  { title: 'Conversion Rate', value: '18.4%', change: '+3.2%', icon: <TrendingUp />, color: '#7c3aed' },
];

const Analytics = () => {
  const [tab, setTab] = useState(0);
  return <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
    <Box sx={{ mb: 4 }}><Typography variant="h4" fontWeight={800} color="#1a365d">Platform Analytics</Typography><Typography color="text.secondary">Understand user growth, listings, and platform performance</Typography></Box>
    <Grid container spacing={3} sx={{ mb: 4 }}>{stats.map((stat) => <Grid item xs={12} sm={6} md={3} key={stat.title}><Card sx={{ p: 2, borderLeft: `4px solid ${stat.color}` }}><Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Box><Typography variant="body2" color="text.secondary">{stat.title}</Typography><Typography variant="h4" fontWeight={800} color="#1a365d">{stat.value}</Typography><Typography variant="caption" color="#059669">{stat.change} from last month</Typography></Box><Box sx={{ color: stat.color }}>{stat.icon}</Box></Box></Card></Grid>)}</Grid>
    <Card sx={{ p: { xs: 2, md: 3 } }}><Tabs value={tab} onChange={(event, value) => setTab(value)}><Tab label="User Distribution" /><Tab label="Engagement" /></Tabs><Box sx={{ height: 380, pt: 2 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={userDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75} outerRadius={125} paddingAngle={3}>{userDistribution.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></Box><Typography variant="body2" color="text.secondary" textAlign="center">{tab === 0 ? 'Registered users by role' : 'Engagement insights will appear here'}</Typography></Card>
  </Box>;
};

export default Analytics;
