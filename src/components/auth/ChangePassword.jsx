import React, { useState } from 'react';
import {
	TextField,
	Button,
	Box,
	Typography,
	Alert,
	CircularProgress,
	Paper,
	IconButton,
	InputAdornment,
} from '@mui/material';
import {
	Visibility,
	VisibilityOff,
	Lock,
	CheckCircle,
} from '@mui/icons-material';

const ChangePassword = () => {
	const [formData, setFormData] = useState({
		currentPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [showPasswords, setShowPasswords] = useState({
		current: false,
		new: false,
		confirm: false,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const handleChange = (e) => {
		setFormData(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setLoading(true);

		// Validation
		if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
			setError('Please fill in all fields');
			setLoading(false);
			return;
		}

		if (formData.newPassword.length < 6) {
			setError('New password must be at least 6 characters long');
			setLoading(false);
			return;
		}

		if (formData.newPassword !== formData.confirmPassword) {
			setError('New passwords do not match');
			setLoading(false);
			return;
		}

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 2000));
			setSuccess(true);
			setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
		} catch (err) {
			setError('Failed to change password. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	const togglePasswordVisibility = (field) => {
		setShowPasswords(prev => ({
			...prev,
			[field]: !prev[field]
		}));
	};

	if (success) {
		return (
			<Paper sx={{ p: 4, textAlign: 'center' }}>
				<CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
				<Typography variant="h5" gutterBottom color="success.main">
					Password Changed!
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Your password has been successfully updated.
				</Typography>
			</Paper>
		);
	}

	return (
		<Paper sx={{ p: 4 }}>
			<Typography variant="h5" gutterBottom fontWeight="bold">
				Change Password
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
				Update your password to keep your account secure
			</Typography>

			<form onSubmit={handleSubmit}>
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}

				<TextField
					fullWidth
					label="Current Password"
					name="currentPassword"
					type={showPasswords.current ? 'text' : 'password'}
					value={formData.currentPassword}
					onChange={handleChange}
					margin="normal"
					required
					InputProps={{
						startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => togglePasswordVisibility('current')}
									edge="end"
								>
									{showPasswords.current ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<TextField
					fullWidth
					label="New Password"
					name="newPassword"
					type={showPasswords.new ? 'text' : 'password'}
					value={formData.newPassword}
					onChange={handleChange}
					margin="normal"
					required
					helperText="Must be at least 6 characters long"
					InputProps={{
						startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => togglePasswordVisibility('new')}
									edge="end"
								>
									{showPasswords.new ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<TextField
					fullWidth
					label="Confirm New Password"
					name="confirmPassword"
					type={showPasswords.confirm ? 'text' : 'password'}
					value={formData.confirmPassword}
					onChange={handleChange}
					margin="normal"
					required
					InputProps={{
						startAdornment: <Lock color="action" sx={{ mr: 1 }} />,
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => togglePasswordVisibility('confirm')}
									edge="end"
								>
									{showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>

				<Button
					type="submit"
					fullWidth
					variant="contained"
					size="large"
					disabled={loading}
					sx={{ mt: 3 }}
				>
					{loading ? <CircularProgress size={24} /> : 'Update Password'}
				</Button>
			</form>
		</Paper>
	);
};

export default ChangePassword;