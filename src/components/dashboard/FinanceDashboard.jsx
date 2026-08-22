import React, { useState } from 'react';
import {
  Box, Button, Card, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControl, Grid, InputLabel, MenuItem, Select, Tab, Tabs, TextField,
  Typography, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
} from '@mui/material';
import {
  AccountBalance, AttachMoney, CheckCircle, PendingActions, Savings,
  Close, Edit,
} from '@mui/icons-material';
import {
  AreaChart, Area, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import StatusBadge from '../common/StatusBadge';
import DashboardQuickActions from '../common/DashboardQuickActions';
import { Storefront, VerifiedUser, People } from '@mui/icons-material';

const revenueData = [
  { month: 'Jan', revenue: 4.2, expenses: 1.4 },
  { month: 'Feb', revenue: 5.1, expenses: 1.7 },
  { month: 'Mar', revenue: 4.8, expenses: 1.5 },
  { month: 'Apr', revenue: 6.2, expenses: 2.1 },
  { month: 'May', revenue: 7.1, expenses: 2.4 },
  { month: 'Jun', revenue: 8.5, expenses: 2.6 },
];

const initialApprovals = [
  { id: 1, property: 'Luxury Villa, Lekki', submittedBy: 'Chinedu Okoro', price: 'N180M', status: 'pending', reviewedDate: '-' },
  { id: 2, property: 'Penthouse Apartment, Ikoyi', submittedBy: 'Amina Bello', price: 'N95M', status: 'approved', reviewedDate: 'Jun 18, 2024' },
  { id: 3, property: 'Commercial Space, Victoria Island', submittedBy: 'John Doe', price: 'N250M', status: 'rejected', reviewedDate: 'Jun 16, 2024' },
];

const stats = [
  { title: 'Total Revenue', value: 'N45.2M', change: '+18%', icon: <AttachMoney />, color: '#059669' },
  { title: 'Total Expenses', value: 'N12.8M', change: '+6%', icon: <AccountBalance />, color: '#dc2626' },
  { title: 'Net Profit', value: 'N32.4M', change: '+24%', icon: <Savings />, color: '#1a365d' },
  { title: 'Pending Approvals', value: '24', change: '-3', icon: <PendingActions />, color: '#c9a227' },
];

const FinanceDashboard = () => {
  const [tab, setTab] = useState(0);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [commission, setCommission] = useState({ agent: '', currentRate: '3', newRate: '', effectiveDate: '', notes: '' });
  const [rateError, setRateError] = useState('');

  const updateApproval = (id, status) => setApprovals((current) => current.map((item) => item.id === id ? { ...item, status, reviewedDate: 'Today' } : item));
  const handleCommissionSave = () => {
    const rate = Number(commission.newRate);
    if (!commission.newRate || rate < 1 || rate > 5) {
      setRateError('New Rate must be between 1% and 5%.');
      return;
    }
    setRateError('');
    setCommissionOpen(false);
    setCommission((current) => ({ ...current, currentRate: current.newRate, newRate: '' }));
  };

  return <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f7f9fc', minHeight: '100vh' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, gap: 2, flexWrap: 'wrap' }}>
      <Box><Typography variant="h4" fontWeight={800} color="#1a365d">Finance Dashboard</Typography><Typography color="text.secondary">Monitor revenue, expenses, and property approvals</Typography></Box>
      <Button variant="contained" startIcon={<Edit />} onClick={() => setCommissionOpen(true)} sx={{ background: 'linear-gradient(135deg, #1a365d, #2c5282)' }}>Edit Commission Rates</Button>
    </Box>
    <DashboardQuickActions actions={[
      { label: 'Admin Dashboard', description: 'Platform operations', path: '/admin', icon: <AccountBalance />, color: '#1a365d' },
      { label: 'Marketplace', description: 'View listings', path: '/marketplace', icon: <Storefront />, color: '#059669' },
      { label: 'Verification', description: 'Review documents', path: '/verification', icon: <VerifiedUser />, color: '#c9a227' },
      { label: 'Find Agents', description: 'Manage agent network', path: '/agents', icon: <People />, color: '#7c3aed' },
    ]} />
    <Grid container spacing={3} sx={{ mb: 4 }}>{stats.map((stat) => <Grid item xs={12} sm={6} md={3} key={stat.title}><Card sx={{ p: 2, borderLeft: `4px solid ${stat.color}` }}><Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}><Box><Typography variant="body2" color="text.secondary">{stat.title}</Typography><Typography variant="h4" fontWeight={800} color="#1a365d">{stat.value}</Typography><Typography variant="caption" color={stat.color}>{stat.change} from last month</Typography></Box><Box sx={{ color: stat.color }}>{stat.icon}</Box></Box></Card></Grid>)}</Grid>
    <Card sx={{ p: { xs: 2, md: 3 }, mb: 4 }}><Tabs value={tab} onChange={(event, value) => setTab(value)}><Tab label="Revenue" /><Tab label="Expenses" /></Tabs><Box sx={{ height: 340, pt: 3 }}><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenueData}><CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" /><XAxis dataKey="month" /><YAxis tickFormatter={(value) => `N${value}M`} /><Tooltip formatter={(value) => [`N${value}M`, tab === 0 ? 'Revenue' : 'Expenses']} /><Area type="monotone" dataKey={tab === 0 ? 'revenue' : 'expenses'} stroke={tab === 0 ? '#059669' : '#dc2626'} fill={tab === 0 ? '#059669' : '#dc2626'} fillOpacity={0.16} strokeWidth={3} /></AreaChart></ResponsiveContainer></Box></Card>
    <Card sx={{ p: { xs: 2, md: 3 } }}><Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Property Approvals</Typography><TableContainer><Table><TableHead><TableRow sx={{ backgroundColor: '#f8fafc' }}><TableCell>Property</TableCell><TableCell>Submitted By</TableCell><TableCell>Price</TableCell><TableCell>Status</TableCell><TableCell>Reviewed Date</TableCell><TableCell>Actions</TableCell></TableRow></TableHead><TableBody>{approvals.map((approval) => <TableRow key={approval.id} hover><TableCell sx={{ fontWeight: 600 }}>{approval.property}</TableCell><TableCell>{approval.submittedBy}</TableCell><TableCell>{approval.price}</TableCell><TableCell><StatusBadge status={approval.status} /></TableCell><TableCell>{approval.reviewedDate}</TableCell><TableCell><Button aria-label="Approve property" color="success" size="small" disabled={approval.status === 'approved'} onClick={() => updateApproval(approval.id, 'approved')}><CheckCircle /></Button><Button aria-label="Reject property" color="error" size="small" disabled={approval.status === 'rejected'} onClick={() => updateApproval(approval.id, 'rejected')}><Close /></Button></TableCell></TableRow>)}</TableBody></Table></TableContainer></Card>
    <Dialog open={commissionOpen} onClose={() => setCommissionOpen(false)} maxWidth="sm" fullWidth><DialogTitle fontWeight={700}>Edit Agent Commission Rate</DialogTitle><DialogContent><Grid container spacing={2} sx={{ pt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Agent</InputLabel><Select label="Agent" value={commission.agent} onChange={(event) => setCommission({ ...commission, agent: event.target.value })}><MenuItem value="chinedu">Chinedu Okoro</MenuItem><MenuItem value="amina">Amina Bello</MenuItem><MenuItem value="john">John Doe</MenuItem></Select></FormControl></Grid><Grid item xs={6}><TextField fullWidth label="Current Rate" value={`${commission.currentRate}%`} InputProps={{ readOnly: true }} /></Grid><Grid item xs={6}><TextField fullWidth required label="New Rate" type="number" inputProps={{ min: 1, max: 5, step: 0.1 }} value={commission.newRate} onChange={(event) => setCommission({ ...commission, newRate: event.target.value })} error={Boolean(rateError)} helperText={rateError || 'Between 1% and 5%'} /></Grid><Grid item xs={12}><TextField fullWidth required label="Effective Date" type="date" InputLabelProps={{ shrink: true }} value={commission.effectiveDate} onChange={(event) => setCommission({ ...commission, effectiveDate: event.target.value })} /></Grid><Grid item xs={12}><TextField fullWidth multiline rows={3} label="Notes" value={commission.notes} onChange={(event) => setCommission({ ...commission, notes: event.target.value })} /></Grid></Grid></DialogContent><DialogActions sx={{ p: 3 }}><Button onClick={() => setCommissionOpen(false)}>Cancel</Button><Button variant="contained" onClick={handleCommissionSave} sx={{ background: 'linear-gradient(135deg, #1a365d, #2c5282)' }}>Save Rate</Button></DialogActions></Dialog>
  </Box>;
};

export default FinanceDashboard;
