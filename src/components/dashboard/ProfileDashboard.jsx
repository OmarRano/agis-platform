import React, { useState } from 'react';
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	Avatar,
	Button,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Chip,
	LinearProgress,
} from '@mui/material';
import {
	Person,
	Email,
	Phone,
	LocationOn,
	BusinessCenter,
	CalendarToday,
	Star,
	TrendingUp,
	Assignment,
	Payment,
	Security,
} from '@mui/icons-material';

const ProfileDashboard = () => {
	const [user] = useState({
		name: 'Alex DealMaster',
		email: 'alex.dealmaster@digiagis.com',
		phone: '+234 812 345 6789',
		location: 'Abuja, Nigeria',
		userType: 'Deal Initiator',
		joinDate: '2024-01-15',
		trustScore: 92,
		totalDeals: 24,
		successRate: 75,
		avgRating: 4.8,
	});

	const recentActivities = [
		{ action: 'Deal Completed', details: 'Sarah Johnson → ₦15,000', time: '2 hours ago' },
		{ action: 'New Lead', details: 'Michael Chen (₦35M budget)', time: '5 hours ago' },
		{ action: 'Document Verified', details: 'C-of-O for Plot 284', time: '1 day ago' },
		{ action: 'Agent Assigned', details: 'Chinedu Okoro', time: '2 days ago' },
	];

	return (
		<div className="p-4 md:p-8 bg-gray-50 min-h-screen">
			<h1 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">My Profile</h1>
			<Grid container spacing={3}>
				{/* Profile Overview */}
				<Grid item xs={12} md={4}>
					<Card sx={{ textAlign: 'center', p: 3 }}>
						<Avatar
							sx={{
								width: 120,
								height: 120,
								margin: '0 auto 16px',
								backgroundColor: 'primary.main',
								fontSize: '2.5rem',
							}}
						>
							AD
						</Avatar>
						<Typography variant="h5" gutterBottom fontWeight="bold">
							{user.name}
						</Typography>
						<Chip 
							label={user.userType} 
							color="primary" 
							sx={{ mb: 2 }}
						/>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
							<Star sx={{ color: '#FFD700', mr: 0.5 }} />
							<Typography variant="h6">{user.avgRating}</Typography>
							<Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
								({user.totalDeals} deals)
							</Typography>
						</Box>
						<Divider sx={{ my: 2 }} />
						<List dense>
							<ListItem>
								<ListItemIcon>
									<Email fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={user.email} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<Phone fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={user.phone} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<LocationOn fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={user.location} />
							</ListItem>
							<ListItem>
								<ListItemIcon>
									<CalendarToday fontSize="small" />
								</ListItemIcon>
								<ListItemText primary={`Member since ${user.joinDate}`} />
							</ListItem>
						</List>
						<Button variant="outlined" fullWidth sx={{ mt: 2 }}>
							Edit Profile
						</Button>
					</Card>
				</Grid>
				{/* ...existing code for performance metrics and recent activity... */}
			</Grid>

			{/* Performance Metrics */}
			<Grid item xs={12} md={8}>
				<Card sx={{ p: 3, mb: 3 }}>
					<Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
						<TrendingUp sx={{ mr: 1 }} />
						Performance Overview
					</Typography>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<Box sx={{ mb: 3 }}>
								<Typography variant="body2" gutterBottom>
									Trust Score
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
									<LinearProgress 
										variant="determinate" 
										value={user.trustScore} 
										sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
									/>
									<Typography variant="body2" fontWeight="bold">
										{user.trustScore}/100
									</Typography>
								</Box>
							</Box>
							<Box sx={{ mb: 3 }}>
								<Typography variant="body2" gutterBottom>
									Success Rate
								</Typography>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
									<LinearProgress 
										variant="determinate" 
										value={user.successRate} 
										sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
										color="success"
									/>
									<Typography variant="body2" fontWeight="bold">
										{user.successRate}%
									</Typography>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
								<Card variant="outlined" sx={{ p: 2 }}>
									<Typography variant="body2" color="text.secondary">
										Total Deals
									</Typography>
									<Typography variant="h4" color="primary">
										{user.totalDeals}
									</Typography>
								</Card>
								<Card variant="outlined" sx={{ p: 2 }}>
									<Typography variant="body2" color="text.secondary">
										Monthly Target
									</Typography>
									<Typography variant="h4" color="secondary">
										12/15
									</Typography>
								</Card>
							</Box>
						</Grid>
					</Grid>
				</Card>
				{/* Recent Activity */}
				<Card sx={{ p: 3 }}>
					<Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
						<Assignment sx={{ mr: 1 }} />
						Recent Activity
					</Typography>
					<List>
						{recentActivities.map((activity, index) => (
							<ListItem key={index} sx={{ borderBottom: index < recentActivities.length - 1 ? 1 : 0, borderColor: 'divider' }}>
								<ListItemIcon>
									<BusinessCenter color="primary" />
								</ListItemIcon>
								<ListItemText
									primary={activity.action}
									secondary={
										<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
											<Typography variant="body2">{activity.details}</Typography>
											<Typography variant="caption" color="text.secondary">
												{activity.time}
											</Typography>
										</Box>
									}
								/>
							</ListItem>
						))}
					</List>
				</Card>
				</Grid>
		</div>
	);
};

export default ProfileDashboard;