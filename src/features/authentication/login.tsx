import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const LoginPage: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                />
                <Button variant="contained" color="primary" fullWidth>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default LoginPage;