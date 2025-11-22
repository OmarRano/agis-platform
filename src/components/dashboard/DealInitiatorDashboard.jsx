import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Person,
  BusinessCenter,
  TrendingUp,
  AttachMoney,
  Schedule,
  CheckCircle,
  PendingActions,
  Message,
  Assignment,
  Star,
  LocationOn,
} from '@mui/icons-material';

const DealInitiatorDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);

  const diStats = {
    totalDeals: 24,
    successfulDeals: 18,
    pendingDeals: 6,
    totalEarnings: 450000,
    successRate: 75,
    responseTime: '2.1h',
  };

  const activeDeals = [
    {
      id: 1,
      buyer: 'John Adebayo',
      budget: '₦45M',
      location: 'Maitama, Abuja',
      propertyType: 'Residential Plot',
      status: 'agent_contact',
      priority: 'high',
      daysActive: 2,
      assignedAgent: 'Chinedu Okoro',
    },
    {
      id: 2,
      buyer: 'Sarah Johnson',
      budget: '₦28M',
      location: 'Wuse Zone 4',
      propertyType: 'Commercial Space',
      status: 'initial_contact',
      priority: 'medium',
      daysActive: 1,
      assignedAgent: null,
    },
  ];

  const availableBuyers = [
    {
      id: 101,
      name: 'Michael Chen',
      budget: '₦35M',
      location: 'Gwarinpa',
      propertyType: 'Residential',
      contactTime: '2 hours ago',
      urgency: 'high',
    },
    {
      id: 102,
      name: 'Grace Okafor',
      budget: '₦60M',
      location: 'Asokoro',
      propertyType: 'Luxury Villa',
      contactTime: '5 hours ago',
      urgency: 'medium',
    },
  ];

  const performanceData = [
    { month: 'Jan', deals: 3, earnings: 45000 },
    { month: 'Feb', deals: 5, earnings: 75000 },
    { month: 'Mar', deals: 4, earnings: 60000 },
    { month: 'Apr', deals: 6, earnings: 90000 },
    { month: 'May', deals: 8, earnings: 120000 },
    { month: 'Jun', deals: 10, earnings: 150000 },
  ];

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Deal Initiator Dashboard
          </Typography>
          <Typography variant="h6" color="primary">
            Welcome back, Alex DealMaster! 🎯
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Professional Deal Initiator | AGIS Certified
          </Typography>
        </Box>
        <Chip 
          label="Performance Tier: GOLD" 
          color="warning" 
          variant="filled"
          sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}
        />
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { icon: <BusinessCenter />, label: 'Total Deals', value: diStats.totalDeals, color: '#2E7D32' },
          { icon: <CheckCircle />, label: 'Successful', value: diStats.successfulDeals, color: '#4CAF50' },
          { icon: <PendingActions />, label: 'Pending', value: diStats.pendingDeals, color: '#FF9800' },
          { icon: <AttachMoney />, label: 'Total Earnings', value: `₦${diStats.totalEarnings.toLocaleString()}`, color: '#2196F3' },
          { icon: <TrendingUp />, label: 'Success Rate', value: `${diStats.successRate}%`, color: '#9C27B0' },
          { icon: <Schedule />, label: 'Avg Response', value: diStats.responseTime, color: '#607D8B' },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ textAlign: 'center', p: 2 }}>
              <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
              <Typography variant="h4" fontWeight="bold" color={stat.color}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.label}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Active Deals */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ mr: 1 }} />
              Active Deal Initiations
            </Typography>
            
            <List>
              {activeDeals.map((deal) => (
                <ListItem key={deal.id} sx={{ borderBottom: 1, borderColor: 'divider', py: 2 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6">
                          {deal.buyer}
                        </Typography>
                        <Chip 
                          label={deal.status.replace('_', ' ')} 
                          color={deal.status === 'agent_contact' ? 'primary' : 'warning'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" gutterBottom>
                          💰 {deal.budget} • 📍 {deal.location} • 🏠 {deal.propertyType}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                          <Chip label={`Priority: ${deal.priority}`} size="small" variant="outlined" />
                          <Chip label={`${deal.daysActive} days active`} size="small" variant="outlined" />
                          {deal.assignedAgent && (
                            <Chip 
                              label={`Agent: ${deal.assignedAgent}`} 
                              size="small" 
                              color="success"
                            />
                          )}
                        </Box>
                      </Box>
                    }
                  />
                  <Button variant="outlined" size="small" startIcon={<Message />}>
                    Contact
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>

          {/* Available Buyers */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Person sx={{ mr: 1 }} />
              Available Buyer Leads
            </Typography>
            
            <List>
              {availableBuyers.map((buyer) => (
                <ListItem key={buyer.id} sx={{ borderBottom: 1, borderColor: 'divider', py: 2 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6">
                          {buyer.name}
                        </Typography>
                        <Chip 
                          label={buyer.urgency} 
                          color={buyer.urgency === 'high' ? 'error' : 'warning'}
                          size="small"
                        />
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" gutterBottom>
                          💰 {buyer.budget} • 📍 {buyer.location} • 🏠 {buyer.propertyType}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Contacted: {buyer.contactTime}
                        </Typography>
                      </Box>
                    }
                  />
                  <Button variant="contained" size="small">
                    Claim Lead
                  </Button>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Performance & Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Performance Metrics
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Monthly Target: 12 deals
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={70} 
                sx={{ height: 8, borderRadius: 4, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                7/12 deals completed
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button variant="contained" fullWidth startIcon={<Message />}>
                Contact Support
              </Button>
              <Button variant="outlined" fullWidth startIcon={<BusinessCenter />}>
                View All Deals
              </Button>
              <Button variant="outlined" fullWidth startIcon={<TrendingUp />}>
                Performance Report
              </Button>
            </Box>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <List dense>
              {[
                'New buyer lead: Michael Chen (₦35M)',
                'Deal completed: Sarah Johnson → ₦15,000 commission',
                'Agent assigned: Chinedu Okoro for Maitama property',
                'Document verified: C-of-O for Plot 284',
              ].map((activity, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={activity}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DealInitiatorDashboard;