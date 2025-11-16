import React, { useState } from 'react';
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
import { Button, Chip, TextField } from '@mui/material';
import { AccountBalance, Mail } from '@mui/icons-material';
import { generateToken } from '../../utils/token';
import { enqueueNotification } from '../../utils/notifications';

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

  const [feeApprovals, setFeeApprovals] = useState([
    {
      id: 1,
      agent: 'Chinedu Okoro',
      agentId: 'AGENT-001',
      client: 'John Adebayo',
      verificationId: 'VER-2024-001',
      amount: 17000,
      platformFee: 2000,
      status: 'pending',
      date: new Date().toLocaleString(),
      token: generateToken('TK'),
    }
  ]);

  const [agents, setAgents] = useState([
    {
      id: 1,
      name: 'Chinedu Okoro',
      personalEmail: 'chinedu@gmail.com',
      officialEmail: 'chinedu.okoro@digiagis.com',
      agisId: 'ABJ-AGIS-2847',
      status: 'active',
      joinDate: '2024-01-15',
      tempPassword: 'digiagis2024',
    }
  ]);

  const [newAgent, setNewAgent] = useState({
    name: '',
    personalEmail: '',
    agisId: ''
  });

  const handleApproveFee = (id) => {
    setFeeApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' } : a));

    const approval = feeApprovals.find(a => a.id === id);
    if (approval) {
      enqueueNotification(approval.agent, 'fee_approved', {
        verificationId: approval.verificationId,
        token: approval.token,
        amount: approval.amount,
        platformFee: approval.platformFee,
        date: new Date().toISOString(),
      });
    }
  };

  const handleRejectFee = (id) => {
    setFeeApprovals(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' } : a));

    const approval = feeApprovals.find(a => a.id === id);
    if (approval) {
      enqueueNotification(approval.agent, 'fee_rejected', {
        verificationId: approval.verificationId,
        token: approval.token,
        amount: approval.amount,
        platformFee: approval.platformFee,
        date: new Date().toISOString(),
      });
    }
  };

  const handleCreateAgent = () => {
    if (!newAgent.name || !newAgent.personalEmail || !newAgent.agisId) {
      return;
    }

    // Generate official email
    const officialEmail = `${newAgent.name.toLowerCase().replace(/\s+/g, '.')}@digiagis.com`;
    
    const agent = {
      id: agents.length + 1,
      ...newAgent,
      officialEmail,
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0],
      tempPassword: 'digiagis2024'
    };

    setAgents(prev => [...prev, agent]);
    
    // Enqueue notification
    enqueueNotification(newAgent.name, 'agent_account_created', {
      officialEmail,
      personalEmail: newAgent.personalEmail,
      agisId: newAgent.agisId,
      tempPassword: agent.tempPassword,
      date: new Date().toISOString(),
    });

    setNewAgent({ name: '', personalEmail: '', agisId: '' });
  };

  const AgentManagementSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Agent Management
      </Typography>

      {/* Create New Agent */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Create Official Agent Account
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Agent Name"
              value={newAgent.name}
              onChange={(e) => setNewAgent(prev => ({ ...prev, name: e.target.value }))}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Personal Email"
              type="email"
              value={newAgent.personalEmail}
              onChange={(e) => setNewAgent(prev => ({ ...prev, personalEmail: e.target.value }))}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="AGIS ID"
              value={newAgent.agisId}
              onChange={(e) => setNewAgent(prev => ({ ...prev, agisId: e.target.value }))}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button 
              variant="contained" 
              onClick={handleCreateAgent}
              disabled={!newAgent.name || !newAgent.personalEmail || !newAgent.agisId}
            >
              Create Agent
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Agents List */}
      <Typography variant="subtitle1" gutterBottom>
        Registered Agents
      </Typography>
      <Grid container spacing={2}>
        {agents.map((agent) => (
          <Grid item xs={12} key={agent.id}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2">
                      {agent.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AGIS: {agent.agisId}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="body2">
                      Official Email:
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {agent.officialEmail}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Chip 
                      label={agent.status} 
                      color={agent.status === 'active' ? 'success' : 'warning'}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Typography variant="body2">
                      Temp Pass: <code>{agent.tempPassword}</code>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={2}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      startIcon={<Mail />}
                    >
                      Send Creds
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

  const FeeApprovalsSection = () => (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Platform Fee Approvals
      </Typography>

      <Grid container spacing={2}>
        {feeApprovals.map((approval) => (
          <Grid item xs={12} key={approval.id}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      Agent: {approval.agent}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {approval.agentId}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography variant="body2">
                      Amount: <strong>₦{approval.amount.toLocaleString()}</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography variant="body2">
                      Fee: <strong>₦{approval.platformFee.toLocaleString()}</strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Typography variant="body2">
                      Token: <code>{approval.token}</code>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        size="small" 
                        color="success"
                        onClick={() => handleApproveFee(approval.id)}
                      >
                        Approve
                      </Button>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        color="error"
                        onClick={() => handleRejectFee(approval.id)}
                      >
                        Reject
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );

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

      {/* Agent Management Section */}
      <AgentManagementSection />

      {/* Fee Approvals Section */}
      <FeeApprovalsSection />

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