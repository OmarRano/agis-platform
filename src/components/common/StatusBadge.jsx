import React from 'react';
import { Chip } from '@mui/material';

const STATUS_COLORS = {
  active: 'success',
  pending: 'warning',
  inactive: 'default',
  rejected: 'error',
};

const StatusBadge = ({ status }) => (
  <Chip
    label={status}
    size="small"
    color={STATUS_COLORS[status?.toLowerCase()] || 'default'}
    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
  />
);

export default StatusBadge;
