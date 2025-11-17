import React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function LoadingSkeleton({ type = 'page' }) {
  if (type === 'header') {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton variant="rectangular" height={56} />
      </Box>
    );
  }

  if (type === 'footer') {
    return (
      <Box sx={{ width: '100%' }}>
        <Skeleton variant="rectangular" height={80} />
      </Box>
    );
  }

  if (type === 'card') {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton variant="rectangular" height={180} />
        <Skeleton width="60%" />
        <Skeleton width="40%" />
      </Box>
    );
  }

  // default: page skeleton
  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        <Skeleton variant="rectangular" height={32} width="40%" />
        <Skeleton variant="rectangular" height={220} />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="rectangular" width={260} height={160} />
          <Skeleton variant="rectangular" width={260} height={160} />
          <Skeleton variant="rectangular" width={260} height={160} />
        </Box>
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </Stack>
    </Box>
  );
}
