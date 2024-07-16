import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0
            }}
        >
            <CircularProgress />
        </Box>
    );
}
