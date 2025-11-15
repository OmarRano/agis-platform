import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  People,
  TrendingUp,
  VerifiedUser,
  BusinessCenter,
  AttachMoney,
  ListAlt,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const FounderDashboard = () => {
  // Mock data for demonstration
  const userGrowthData = [
    { name: 'Jan', users: 100, agents: 20 },
    { name: 'Feb', users: 300, agents: 45 },
    { name: 'Mar', users: 600, agents: 80 },
    { name: 'Apr', users: 1200, agents: 150 },
    { name: 'May', users: 2000, agents: 240 },
    { name: 'Jun', users: 3500, agents: 400 },
  ];

  const revenueData = [
    { name: 'Jan', revenue: 50000 },
    { name: 'Feb', revenue: 120000 },
    { name: 'Mar', revenue: 250000 },
    { name: 'Apr', revenue: 420000 },
    { name: 'May', revenue: 680000 },
    { name: 'Jun', revenue: 950000 },
  ];

  const tierDistribution = [
    { name: 'Basic', value: 65 },
    { name: 'Pro', value: 25 },
    { name: 'Elite', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const stats = [
    { icon: <People />, title: 'Total Users', value: '3,500', change: '+25%' },
    { icon: <VerifiedUser />, title: 'Verified Agents', value: '400', change: '+15%' },
    { icon: <ListAlt />, title: 'Active Listings', value: '1,200', change: '+30%' },
    { icon: <BusinessCenter />, title: 'Verification Jobs', value: '850', change: '+40%' },
    { icon: <AttachMoney />, title: 'Monthly Revenue', value: '₦950K', change: '+35%' },
    { icon: <TrendingUp />, title: 'Success Rate', value: '94%', change: '+5%' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Founder Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Real-time platform performance and growth metrics
      </Typography>

      {/* Key Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: '#2E7D32', mr: 2 }}>{stat.icon}</Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="success.main">
                  {stat.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              User & Agent Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#2E7D32" strokeWidth={2} />
                <Line type="monotone" dataKey="agents" stroke="#FF6F00" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Subscription Tiers */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Agent Subscription Tiers
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={tierDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tierDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Growth
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`₦${value.toLocaleString()}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FounderDashboard;