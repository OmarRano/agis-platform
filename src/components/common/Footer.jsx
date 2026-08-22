import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import Button from './Button';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  LocationOn,
  Phone,
  Email,
  VerifiedUser,
  Security,
  SupportAgent,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        backgroundColor: '#1a1a1a',
        color: 'white',
        mt: 8 
      }}
      component="footer"
    >
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Main Footer Content */}
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VerifiedUser sx={{ fontSize: 32, color: '#4CAF50', mr: 1 }} />
              <Typography variant="h5" fontWeight="bold">
                Sorella Real Estate
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
              Africa's trusted digital marketplace for verified property deals. 
              Connecting buyers, sellers, and certified agents with secure, documented 
              property transactions.
            </Typography>

            {/* Trust Badges */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(76, 175, 80, 0.1)', px: 1.5, py: 0.5, borderRadius: 1 }}>
                <Security sx={{ fontSize: 16, color: '#4CAF50', mr: 1 }} />
                <Typography variant="caption" fontWeight="bold">
                  AGIS Verified
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(255, 111, 0, 0.1)', px: 1.5, py: 0.5, borderRadius: 1 }}>
                <SupportAgent sx={{ fontSize: 16, color: '#FF6F00', mr: 1 }} />
                <Typography variant="caption" fontWeight="bold">
                  24/7 Support
                </Typography>
              </Box>
            </Box>

            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: '#1877F2' }
                }}
              >
                <Facebook sx={{ color: 'white' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: '#1DA1F2' }
                }}
              >
                <Twitter sx={{ color: 'white' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: '#0077B5' }
                }}
              >
                <LinkedIn sx={{ color: 'white' }} />
              </IconButton>
              <IconButton 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': { backgroundColor: '#E4405F' }
                }}
              >
                <Instagram sx={{ color: 'white' }} />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Platform
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/marketplace" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Marketplace
              </Link>
              <Link 
                component={RouterLink} 
                to="/verification" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Verification
              </Link>
              <Link 
                component={RouterLink} 
                to="/agents" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Find Agents
              </Link>
              <Link 
                component={RouterLink} 
                to="/how-it-works" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                How It Works
              </Link>
              <Link 
                component={RouterLink} 
                to="/success-stories" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Success Stories
              </Link>
            </Box>
          </Grid>

          {/* For Agents */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              For Agents
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/agent-dashboard" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Agent Dashboard
              </Link>
              <Link 
                component={RouterLink} 
                to="/agent-verification" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Get Verified
              </Link>
              <Link 
                component={RouterLink} 
                to="/agent-resources" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Resources
              </Link>
              <Link 
                component={RouterLink} 
                to="/subscriptions" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Subscription Plans
              </Link>
              <Link 
                component={RouterLink} 
                to="/agent-community" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Agent Community
              </Link>
            </Box>
          </Grid>

          {/* Support */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/help-center" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Help Center
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Contact Us
              </Link>
              <Link 
                component={RouterLink} 
                to="/faq" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                FAQ
              </Link>
              <Link 
                component={RouterLink} 
                to="/documentation" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Documentation
              </Link>
              <Link 
                component={RouterLink} 
                to="/report-issue" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Report Issue
              </Link>
            </Box>
          </Grid>

          {/* Legal */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Legal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link 
                component={RouterLink} 
                to="/privacy" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Privacy Policy
              </Link>
              <Link 
                component={RouterLink} 
                to="/terms" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Terms of Service
              </Link>
              <Link 
                component={RouterLink} 
                to="/cookie-policy" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Cookie Policy
              </Link>
              <Link 
                component={RouterLink} 
                to="/disclaimer" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Disclaimer
              </Link>
              <Link 
                component={RouterLink} 
                to="/compliance" 
                color="inherit" 
                sx={{ opacity: 0.8, '&:hover': { opacity: 1 } }}
              >
                Compliance
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Contact & Location */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ color: '#4CAF50', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Headquarters
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Central Business District<br />
                      Abuja, Nigeria
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ color: '#4CAF50', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Phone
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      +234 900 DIGIAGIS<br />
                      (+234 900 34442447)
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ color: '#4CAF50', mr: 1 }} />
                  <Box>
                    <Typography variant="body2" fontWeight="bold">
                      Email
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      hello@sorella.realestate<br />
                      support@sorella.realestate
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Business Hours
            </Typography>
            <Box sx={{ opacity: 0.8 }}>
              <Typography variant="body2" gutterBottom>
                <strong>Customer Support:</strong><br />
                Mon - Fri: 8:00 AM - 6:00 PM<br />
                Sat: 9:00 AM - 4:00 PM
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                <strong>Verification Services:</strong><br />
                24/7 Online Requests<br />
                Processing: 9:00 AM - 5:00 PM
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255,255,255,0.2)' }} />

        {/* Bottom Bar */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2 
        }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2024 Sorella Real Estate. All rights reserved. | Verified Property Marketplace
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              <strong>500+</strong> Verified Agents
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              <strong>1,000+</strong> Properties
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              <strong>98%</strong> Success Rate
            </Typography>
          </Box>
        </Box>

        {/* Security Badges */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 3, 
          mt: 3,
          flexWrap: 'wrap'
        }}>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
            <Security sx={{ fontSize: 16, mr: 0.5 }} />
            SSL Secured
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
            <VerifiedUser sx={{ fontSize: 16, mr: 0.5 }} />
            AGIS Partner
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7, display: 'flex', alignItems: 'center' }}>
            <SupportAgent sx={{ fontSize: 16, mr: 0.5 }} />
            24/7 Support
          </Typography>
        </Box>
      </Container>

      {/* Mobile App CTA */}
      <Box sx={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', py: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            justifyContent: 'space-between', 
            alignItems: 'center',
            gap: 2 
          }}>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Get the Sorella Mobile App
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Access verified properties, instant verification, and agent services on the go.
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                variant="outlined" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: '#4CAF50'
                  }
                }}
              >
                App Store
              </Button>
              <Button 
                variant="outlined" 
                sx={{ 
                  color: 'white', 
                  borderColor: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderColor: '#4CAF50'
                  }
                }}
              >
                Google Play
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Paper>
  );
};

export default Footer;