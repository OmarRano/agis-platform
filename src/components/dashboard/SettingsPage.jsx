import React, { useState } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	Switch,
	FormControlLabel,
	Divider,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	TextField,
	Alert,
} from '@mui/material';
import {
	Notifications,
	Security,
	Language,
	Payment,
	Message,
	Email,
} from '@mui/icons-material';
import ChangePassword from '../auth/ChangePassword';

const SettingsPage = () => {
	const [settings, setSettings] = useState({
		// Notification Settings
		emailNotifications: true,
		smsNotifications: false,
		dealAlerts: true,
		priceUpdates: true,
		agentMessages: true,
    
		// Privacy Settings
		profileVisibility: 'public',
		showContactInfo: true,
		allowDirectMessages: true,
    
		// Communication Preferences
		preferredLanguage: 'en',
		timezone: 'WAT',
    
		// Payment Settings
		autoWithdraw: false,
		paymentMethod: 'bank',
	});

	const handleSettingChange = (setting, value) => {
		setSettings(prev => ({
			...prev,
			[setting]: value
		}));
	};

	return (
		<div className="p-4 md:p-8 bg-gray-50 min-h-screen">
			<h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">Settings</h1>
			<Grid container spacing={3}>
				{/* Notification Settings */}
				<Grid item xs={12} md={6}>
					<Card sx={{ p: 3 }}>
						<Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
							<Notifications sx={{ mr: 1 }} />
							Notification Settings
						</Typography>

						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							{[
								{ label: 'Email Notifications', key: 'emailNotifications' },
								{ label: 'SMS Notifications', key: 'smsNotifications' },
								{ label: 'Deal Alerts', key: 'dealAlerts' },
								{ label: 'Price Updates', key: 'priceUpdates' },
								{ label: 'Agent Messages', key: 'agentMessages' },
							].map((item) => (
								<FormControlLabel
									key={item.key}
									control={
										<Switch
											checked={settings[item.key]}
											onChange={(e) => handleSettingChange(item.key, e.target.checked)}
											color="primary"
										/>
									}
									label={item.label}
								/>
							))}
						</Box>
					</Card>
				</Grid>
				{/* ...existing code for other settings sections... */}
			</Grid>
		</div>
	);
};

export default SettingsPage;