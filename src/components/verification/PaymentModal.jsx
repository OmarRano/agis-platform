import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Paper,
  Divider,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Chip,
  Avatar,
} from '@mui/material';
import {
  AccountBalance,
  Receipt,
  VerifiedUser,
  CopyAll,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { generateToken } from '../../utils/token';
import { enqueueNotification } from '../../utils/notifications';

const PaymentModal = ({ open, onClose, property, agent }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedField, setCopiedField] = useState('');

  const verificationFee = 15000; // Agent's fee
  const platformFee = 2000; // Your commission
  const totalAmount = verificationFee + platformFee;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const steps = [
    'Payment Instructions',
    'Make Payment',
    'Confirm Payment',
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Alert severity="info" sx={{ mb: 3 }}>
              <strong>How it works:</strong> Pay the agent directly, then they pay our platform fee. This ensures both parties are committed.
            </Alert>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <VerifiedUser sx={{ mr: 1 }} />
                    Verification Details
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Property: <strong>{property?.title}</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: <strong>{property?.location}</strong>
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Agent Verification Fee:</Typography>
                    <Typography>₦{verificationFee.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Platform Service Fee:</Typography>
                    <Typography>₦{platformFee.toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total to Pay Agent:</Typography>
                    <Typography variant="h6" color="primary">
                      ₦{totalAmount.toLocaleString()}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalance sx={{ mr: 1 }} />
                    Agent Bank Details
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar src={agent?.profileImage} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="h6">{agent?.name}</Typography>
                      <Chip label="Verified AGIS Agent" color="success" size="small" />
                    </Box>
                  </Box>

                  {[
                    { label: 'Bank Name', value: 'Guaranty Trust Bank', field: 'bank' },
                    { label: 'Account Name', value: agent?.name, field: 'accountName' },
                    { label: 'Account Number', value: '0234567890', field: 'accountNumber' },
                  ].map((detail, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {detail.label}
                      </Typography>
                      <Paper
                        variant="outlined"
                        sx={{
                          p: 2,
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          cursor: 'pointer',
                          '&:hover': { backgroundColor: 'action.hover' }
                        }}
                        onClick={() => handleCopy(detail.value, detail.field)}
                      >
                        <Typography variant="body1" fontWeight="bold">
                          {detail.value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {copiedField === detail.field && (
                            <CheckCircle sx={{ fontSize: 16, color: 'success.main', mr: 1 }} />
                          )}
                          <CopyAll sx={{ fontSize: 16, color: 'primary.main' }} />
                        </Box>
                      </Paper>
                    </Box>
                  ))}

                  <Alert severity="warning" sx={{ mt: 2 }}>
                    <strong>Important:</strong> Pay exactly <strong>₦{totalAmount.toLocaleString()}</strong> and use your name as reference.
                  </Alert>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Warning sx={{ fontSize: 64, color: 'warning.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Payment Terms & Conditions
            </Typography>
            
            <Paper sx={{ p: 3, textAlign: 'left', mb: 3 }}>
              <Typography variant="body2" gutterBottom>
                By proceeding, you agree to:
              </Typography>
              <ul>
                <li><Typography variant="body2">Pay exactly <strong>₦{totalAmount.toLocaleString()}</strong> to the agent's account</Typography></li>
                <li><Typography variant="body2">Use your full name as payment reference</Typography></li>
                <li><Typography variant="body2">The agent will deduct ₦{platformFee.toLocaleString()} platform fee</Typography></li>
                <li><Typography variant="body2">Verification will begin within 2 hours of payment confirmation</Typography></li>
                <li><Typography variant="body2">Refunds are only available if verification cannot be completed</Typography></li>
              </ul>
            </Paper>

            <Alert severity="info">
              After payment, the agent will be notified automatically. You'll receive status updates in your dashboard.
            </Alert>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom color="success.main">
              Payment Instructions Sent!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              We've notified <strong>{agent?.name}</strong> about your verification request.
            </Typography>

            <Paper sx={{ p: 3, maxWidth: 400, margin: '0 auto' }}>
              <Typography variant="h6" gutterBottom>
                Next Steps:
              </Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <span style={{ marginRight: 8 }}>1.</span> Make payment to the agent's bank account
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <span style={{ marginRight: 8 }}>2.</span> Agent confirms receipt and pays platform fee
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <span style={{ marginRight: 8 }}>3.</span> Verification process begins
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: 8 }}>4.</span> Receive verification report
                </Typography>
              </Box>
            </Paper>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Receipt sx={{ mr: 1, color: 'primary.main' }} />
          Verification Payment
        </Box>
      </DialogTitle>

      <DialogContent>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        {activeStep > 0 && (
          <Button onClick={() => setActiveStep(activeStep - 1)}>
            Back
          </Button>
        )}
        
        {activeStep < steps.length - 1 ? (
          <Button 
            variant="contained" 
            onClick={() => setActiveStep(activeStep + 1)}
          >
            {activeStep === 0 ? 'I Understand, Continue' : 'Agree & Continue'}
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              // Generate a tracking token and enqueue a notification for the agent
              const token = generateToken('TK');
              enqueueNotification(agent?.name || 'agent', 'payment_initiated', {
                token,
                property: property?.title,
                amount: totalAmount,
                platformFee,
                date: new Date().toISOString(),
              });

              // Close modal after initiating
              onClose();
            }}
          >
            Close & Make Payment
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default PaymentModal;