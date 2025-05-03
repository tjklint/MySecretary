import React from 'react';
import { Box, Typography } from '@mui/material';

const Secretary: React.FC = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
            <Typography variant="h6" gutterBottom>
                How can I help you today?
            </Typography>
            <Box 
                width="100%" 
                height="200px" 
                border="1px solid #ccc" 
                borderRadius="8px" 
                mt={1} 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
            >
                {/* Content for the box goes here */}
            </Box>
        </Box>
    );
};

export default Secretary;