import React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import { VerifiedUser } from '@mui/icons-material';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
          <VerifiedUser sx={{ fontSize: 48, color: 'white', mr: 2 }} />
          <Typography variant="h3" fontWeight="bold" color="white">
            Sorella Real Estate
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              width: '100%',
              maxWidth: 500,
              borderRadius: 3
            }}
          >
            <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
                {subtitle}
              </Typography>
            )}
            {children}
          </Paper>
        </Box>

        {/* Trust Indicators */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
            Trusted by 500+ agents • 1,000+ verified properties • AGIS Certified
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthLayout;