// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

export default function Login() {
    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h5" gutterBottom>
                    Log in
                </Typography>
                <form>
                    <TextField label="Email" type="email" fullWidth margin="normal" required />
                    <TextField label="Password" type="password" fullWidth margin="normal" required />
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Log In
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Don’t have an account? <Link to="/">Sign up</Link>
                </Typography>
            </Box>
        </Container>
    );
}
