import React from 'react';
import { Box, Card, CardActionArea, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward } from '@mui/icons-material';

const DashboardQuickActions = ({ actions }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {actions.map((action) => (
        <Grid item xs={12} sm={6} md={3} key={action.label}>
          <Card sx={{ height: '100%', border: '1px solid transparent', transition: 'all 0.2s ease', '&:hover': { borderColor: action.color, transform: 'translateY(-3px)', boxShadow: 4 } }}>
            <CardActionArea onClick={() => navigate(action.path)} sx={{ height: '100%', p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
                <Box>
                  <Box sx={{ color: action.color, mb: 1 }}>{action.icon}</Box>
                  <Typography variant="subtitle1" fontWeight={700} color="#1a365d">{action.label}</Typography>
                  <Typography variant="body2" color="text.secondary">{action.description}</Typography>
                </Box>
                <ArrowForward sx={{ color: action.color, fontSize: 20 }} />
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardQuickActions;
