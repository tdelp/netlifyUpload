import React, { useState }from "react";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
} from "@mui/material";

const AuthForm = ({ user, isLogin, onChange, onSubmit }) => {

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Register"}
        </Typography>
        <Box
          component="form"
          onSubmit={onSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {!isLogin && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    value={user.firstName}
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    value={user.lastName}
                    onChange={onChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={user.email}
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12}>
               <TextField
                 required
                 fullWidth
                 name="password"
                 label="Password"
                 type={showPassword ? "text" : "password"}
                 id="password"
                 value={user.password}
                 onChange={onChange}
                 InputProps={{
                   endAdornment: (
                     <Button onClick={togglePasswordVisibility} size="small">
                       {showPassword ? "Hide" : "Show"}
                     </Button>
                   ),
                 }}
               />
             </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#306b36", color: "white" }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
