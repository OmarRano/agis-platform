import React from 'react';
import { Box, Card, Grid, Typography, Avatar, Chip, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { People, AdminPanelSettings, AttachMoney, Security, Dashboard, Storefront, VerifiedUser, Person } from '@mui/icons-material';
import DashboardQuickActions from '../common/DashboardQuickActions';

const stats = [
  { label: 'Total Users', value: '12,450', change: '+12%', icon: <People />, color: '#1a365d' },
  { label: 'Total Admins', value: '8', change: '+1', icon: <AdminPanelSettings />, color: '#7c3aed' },
  { label: 'Revenue', value: 'N45M', change: '+18%', icon: <AttachMoney />, color: '#059669' },
  { label: 'Platform Health', value: '99.9%', change: '+0.1%', icon: <Security />, color: '#c9a227' },
];

const admins = [
  { name: 'James Admin', email: 'james@sorella.admin', status: 'active', lastLogin: '2 hours ago' },
  { name: 'Mary Manager', email: 'mary@sorella.admin', status: 'active', lastLogin: '5 hours ago' },
];

const SuperAdminDashboard = () => (
  <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={800} color="#1a365d">Super Admin Control Center</Typography>
      <Typography variant="body2" color="text.secondary">Complete system oversight and management</Typography>
    </Box>
    <DashboardQuickActions actions={[
      { label: 'Admin Dashboard', description: 'Manage operations', path: '/admin', icon: <Dashboard />, color: '#1a365d' },
      { label: 'Marketplace', description: 'Browse listings', path: '/marketplace', icon: <Storefront />, color: '#059669' },
      { label: 'Verification', description: 'Review documents', path: '/verification', icon: <VerifiedUser />, color: '#c9a227' },
      { label: 'Buyer Preview', description: 'Open buyer view', path: '/buyer-dashboard', icon: <Person />, color: '#dc2626' },
    ]} />
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.label}>
          <Card sx={{ p: 2, borderLeft: `4px solid ${stat.color}` }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box><Typography variant="body2" color="text.secondary">{stat.label}</Typography><Typography variant="h4" fontWeight={800} color="#1a365d">{stat.value}</Typography><Typography variant="caption" color="#059669">{stat.change}</Typography></Box>
              <Avatar sx={{ bgcolor: `${stat.color}18`, color: stat.color }}>{stat.icon}</Avatar>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Platform Administrators</Typography>
      <Table>
        <TableHead><TableRow><TableCell>Admin</TableCell><TableCell>Email</TableCell><TableCell>Status</TableCell><TableCell>Last Login</TableCell></TableRow></TableHead>
        <TableBody>{admins.map((admin) => <TableRow key={admin.email} hover><TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><Avatar sx={{ bgcolor: '#1a365d', width: 32, height: 32 }}>{admin.name.split(' ').map((part) => part[0]).join('')}</Avatar>{admin.name}</Box></TableCell><TableCell>{admin.email}</TableCell><TableCell><Chip label={admin.status} color="success" size="small" /></TableCell><TableCell>{admin.lastLogin}</TableCell></TableRow>)}</TableBody>
      </Table>
    </Card>
  </Box>
);

export default SuperAdminDashboard;
