import React, { useState } from 'react';
import {
	TextField,
	Button,
	Box,
	Typography,
	Alert,
	CircularProgress,
	Paper,
} from '@mui/material';
import {
	Email,
	ArrowBack,
	CheckCircle,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		if (!email) {
			setError('Please enter your email address');
			setLoading(false);
			return;
		}

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			setSuccess(true);
		} catch (err) {
			setError('Failed to send reset instructions. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<AuthLayout
				title="Check Your Email"
				subtitle="We've sent password reset instructions"
			>
				<Box sx={{ textAlign: 'center', py: 4 }}>
					<CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
					<Typography variant="h5" gutterBottom color="success.main">
						Instructions Sent!
					</Typography>
					<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
						We've sent password reset instructions to <strong>{email}</strong>
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
						Check your email and follow the link to reset your password. The link will expire in 1 hour.
					</Typography>
					<Button 
						variant="contained" 
						onClick={() => navigate('/login')}
						sx={{ mb: 2 }}
					>
						Return to Login
					</Button>
				</Box>
			</AuthLayout>
		);
	}

	return (
		<AuthLayout
			title="Reset Your Password"
			subtitle="Enter your email to receive reset instructions"
		>
			<form onSubmit={handleSubmit}>
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<Alert severity="info" sx={{ mb: 3 }}>
					Enter the email address associated with your DigiAGIS account. We'll send you instructions to reset your password.
				</Alert>

				<TextField
					fullWidth
					label="Email Address"
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					margin="normal"
					required
					InputProps={{
						startAdornment: (
							<Email color="action" sx={{ mr: 1 }} />
						),
					}}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={loading}
					sx={{ mt: 3, mb: 2 }}
				>
					{loading ? <CircularProgress size={24} /> : 'Send Reset Instructions'}
				</Button>

				<Box sx={{ textAlign: 'center' }}>
					<Button
						component={RouterLink}
						to="/login"
						startIcon={<ArrowBack />}
						sx={{ textTransform: 'none' }}
					>
						Back to Login
					</Button>
				</Box>
			</form>
		</AuthLayout>
	);
};

export default ForgotPassword;