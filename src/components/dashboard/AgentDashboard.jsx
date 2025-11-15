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
  ListItemIcon,
  Tab,
  Tabs,
  Badge,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Work,
  TrendingUp,
  VerifiedUser,
  BusinessCenter,
  AttachMoney,
  ListAlt,
  Add,
  Message,
  Notifications,
  Person,
  Schedule,
  Star,
  LocationOn,
  CheckCircle,
  PendingActions,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Tab panel component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`agent-tabpanel-${index}`}
      aria-labelledby={`agent-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AgentDashboard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data for demonstration
  const performanceData = [
    { name: 'Jan', jobs: 5, earnings: 75000, rating: 4.2 },
    { name: 'Feb', jobs: 8, earnings: 120000, rating: 4.5 },
    { name: 'Mar', jobs: 12, earnings: 180000, rating: 4.7 },
    { name: 'Apr', jobs: 15, earnings: 225000, rating: 4.8 },
    { name: 'May', jobs: 18, earnings: 270000, rating: 4.9 },
    { name: 'Jun', jobs: 22, earnings: 330000, rating: 4.9 },
  ];

  const agentStats = [
    { 
      icon: <Work sx={{ color: '#2E7D32' }} />, 
      title: 'Active Jobs', 
      value: '8', 
      change: '+2 this week',
      color: '#2E7D32'
    },
    { 
      icon: <AttachMoney sx={{ color: '#4CAF50' }} />, 
      title: 'Monthly Earnings', 
      value: '₦330K', 
      change: '+25% from last month',
      color: '#4CAF50'
    },
    { 
      icon: <Star sx={{ color: '#FF9800' }} />, 
      title: 'Trust Score', 
      value: '94/100', 
      change: '+4 points',
      color: '#FF9800'
    },
    { 
      icon: <VerifiedUser sx={{ color: '#2196F3' }} />, 
      title: 'Verified Listings', 
      value: '15', 
      change: '3 pending',
      color: '#2196F3'
    },
  ];

  const recentJobs = [
    {
      id: 1,
      client: 'John Adebayo',
      service: 'C-of-O Verification',
      price: '₦15,000',
      status: 'in-progress',
      date: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      client: 'Sarah Johnson',
      service: 'Property Documentation',
      price: '₦25,000',
      status: 'pending',
      date: '1 day ago',
      priority: 'medium'
    },
    {
      id: 3,
      client: 'Michael Chen',
      service: 'AGIS Record Search',
      price: '₦10,000',
      status: 'completed',
      date: '2 days ago',
      priority: 'low'
    },
    {
      id: 4,
      client: 'Grace Okafor',
      service: 'Survey Plan Verification',
      price: '₦18,000',
      status: 'in-progress',
      date: '3 days ago',
      priority: 'high'
    },
  ];

  const availableJobs = [
    {
      id: 101,
      type: 'Urgent Verification',
      location: 'Gwarinpa, Abuja',
      budget: '₦12,000',
      timeframe: '24 hours',
      clientRating: '4.8',
    },
    {
      id: 102,
      type: 'Document Authentication',
      location: 'Maitama, Abuja',
      budget: '₦20,000',
      timeframe: '48 hours',
      clientRating: '4.9',
    },
    {
      id: 103,
      type: 'Property Search',
      location: 'Wuse Zone 4',
      budget: '₦8,000',
      timeframe: '72 hours',
      clientRating: '4.5',
    },
  ];

  const getStatusChip = (status) => {
    const statusConfig = {
      'completed': { color: 'success', icon: <CheckCircle /> },
      'in-progress': { color: 'warning', icon: <PendingActions /> },
      'pending': { color: 'info', icon: <Schedule /> },
    };
    
    const config = statusConfig[status] || { color: 'default', icon: null };
    
    return (
      <Chip
        icon={config.icon}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        color={config.color}
        size="small"
      />
    );
  };

  const getPriorityChip = (priority) => {
    const priorityConfig = {
      'high': { color: 'error', label: 'High' },
      'medium': { color: 'warning', label: 'Medium' },
      'low': { color: 'success', label: 'Low' },
    };
    
    const config = priorityConfig[priority] || { color: 'default', label: priority };
    
    return (
      <Chip
        label={config.label}
        color={config.color}
        size="small"
        variant="outlined"
      />
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Agent Dashboard
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome back, Chinedu Okoro! 👋
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Notifications />}>
            Alerts
          </Button>
          <Button variant="outlined" startIcon={<Message />}>
            Messages
          </Button>
          <Button variant="contained" startIcon={<Add />}>
            New Listing
          </Button>
        </Box>
      </Box>

      {/* Agent Profile Summary */}
      <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)', color: 'white' }}>
        <CardContent>
          <Grid container alignItems="center" spacing={3}>
            <Grid item>
              <Avatar sx={{ width: 80, height: 80, bgcolor: 'white', color: '#2E7D32' }}>
                <Person sx={{ fontSize: 40 }} />
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" gutterBottom>
                Chinedu Okoro
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9, mb: 1 }}>
                Certified AGIS Agent • ABJ-AGIS-2847
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Star sx={{ color: '#FFD700' }} />
                  <Typography>4.9/5.0 (128 reviews)</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  <Typography>Abuja, Nigeria</Typography>
                </Box>
                <Chip 
                  label="ELITE TIER" 
                  sx={{ 
                    backgroundColor: 'gold', 
                    color: 'black', 
                    fontWeight: 'bold' 
                  }} 
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="h3" fontWeight="bold">
                94
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Trust Score
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={94} 
                sx={{ 
                  mt: 1, 
                  height: 8, 
                  borderRadius: 4,
                  backgroundColor: 'rgba(255,255,255,0.3)',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#FFD700'
                  }
                }} 
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {agentStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography 
                  variant="h4" 
                  component="div" 
                  fontWeight="bold" 
                  gutterBottom
                  sx={{ color: stat.color }}
                >
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs for different sections */}
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': { fontWeight: 'bold' }
          }}
        >
          <Tab 
            icon={<BusinessCenter />} 
            iconPosition="start" 
            label="Active Jobs" 
          />
          <Tab 
            icon={<Work />} 
            iconPosition="start" 
            label="Available Jobs" 
          />
          <Tab 
            icon={<TrendingUp />} 
            iconPosition="start" 
            label="Performance" 
          />
          <Tab 
            icon={<ListAlt />} 
            iconPosition="start" 
            label="My Listings" 
          />
        </Tabs>

        {/* Active Jobs Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Recent Job Requests
              </Typography>
              <List>
                {recentJobs.map((job) => (
                  <ListItem 
                    key={job.id}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 2,
                      mb: 2,
                      backgroundColor: 'white'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: '#2E7D32' }}>
                        <Person />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="h6">
                            {job.client}
                          </Typography>
                          <Typography variant="h6" color="primary">
                            {job.price}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {job.service}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                            {getStatusChip(job.status)}
                            {getPriorityChip(job.priority)}
                            <Typography variant="body2" color="text.secondary">
                              {job.date}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                    <Button variant="outlined" size="small">
                      View Details
                    </Button>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Quick Stats */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    ⚡ Response Time
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    2.1h
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Faster than 85% of agents
                  </Typography>
                </CardContent>
              </Card>
              
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    📈 Completion Rate
                  </Typography>
                  <Typography variant="h4" color="primary" gutterBottom>
                    98%
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    49/50 jobs completed
                  </Typography>
                </CardContent>
              </Card>

              <Button variant="contained" fullWidth startIcon={<Add />}>
                Create New Service
              </Button>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Available Jobs Tab */}
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Available Verification Jobs
          </Typography>
          <Grid container spacing={2}>
            {availableJobs.map((job) => (
              <Grid item xs={12} md={6} key={job.id}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6" color="primary">
                        {job.type}
                      </Typography>
                      <Chip label={job.budget} color="success" variant="filled" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">{job.location}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2">Due: {job.timeframe}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Star fontSize="small" sx={{ color: '#FF9800' }} />
                        <Typography variant="body2">{job.clientRating} client rating</Typography>
                      </Box>
                      <Button variant="contained" size="small">
                        Claim Job
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Performance Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Earnings & Job Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'earnings') return [`₦${value.toLocaleString()}`, 'Earnings'];
                      if (name === 'jobs') return [value, 'Jobs Completed'];
                      return [value, 'Rating'];
                    }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="jobs" 
                    stroke="#2E7D32" 
                    strokeWidth={2}
                    name="Jobs Completed"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#FF6F00" 
                    strokeWidth={2}
                    name="Earnings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Service Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { service: 'Verification', count: 45 },
                    { service: 'Documentation', count: 30 },
                    { service: 'Search', count: 15 },
                    { service: 'Consultation', count: 10 },
                  ]}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="service" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>
        </TabPanel>

        {/* My Listings Tab */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              My Property Listings
            </Typography>
            <Button variant="contained" startIcon={<Add />}>
              Add New Property
            </Button>
          </Box>
          
          <Grid container spacing={2}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={6} key={item}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
                      <Typography variant="h6">
                        Plot {item} - Maitama
                      </Typography>
                      <Chip label="Verified" color="success" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      ₦45,000,000 • 500 sqm
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      C-of-O, Survey Plan, AGIS Receipt
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button variant="outlined" size="small">
                        Edit
                      </Button>
                      <Button variant="outlined" size="small">
                        View Analytics
                      </Button>
                      <Button variant="contained" size="small">
                        Promote
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default AgentDashboard;