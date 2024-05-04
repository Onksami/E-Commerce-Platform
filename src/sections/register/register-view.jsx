import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

// import { useRouter } from 'src/routes/hooks';

import axios from 'axios';

import { bgGradient } from 'src/theme/css';
import {AuthContext}  from 'src/context/AuthContext';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const authContext = useContext(AuthContext);
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const {session, setSession} = useContext(AuthContext);

  const navigate = useNavigate();
 

  // const router = useRouter();  it has been commented out to use the onclick funtion

  const [showPassword, setShowPassword] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState('');
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [userValid, setUserValid] = useState();




  const [loading, setLoading] = useState(false);



  

const handleRegister = async () => {
  try {
    // Perform an API request to authenticate the user

    const urlSignUp = 'https://java-api-production.up.railway.app/auth/register';
    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };
    const data = {
      email: userEmail,


      password: userPassword,

      firstName: userFirstName,

      lastName: userLastName,


    };  // Gather user input data
    // Make POST request to the API
    const response = await axios.post(
      urlSignUp,
      data,
      { headers },
    );

    console.log('Sign-up response', response);

    if (response.status === 201) {
      const accessToken = response.data.accessToken
      localStorage.setItem("accessToken",accessToken);
      const userData = await axios.get(
        'https://java-api-production.up.railway.app/users/account',
        {
          headers: {
            Authorization: accessToken,
          }, 


        }
      );
      console.log("Auth userdata" , userData);
      const session = {
        user : userData.data
      };

      authContext.setSession(session);
      navigate('/products');

    }
  } catch (error) {
    console.error('Error occurred during authentication:', error);
  }
};



  return (
    <Box sx={{...bgGradient({ color: alpha(theme.palette.background.default, 0.9), imgUrl: '/assets/background/overlay_4.jpg', }), height: 1, }} >
      <Logo sx={{ position: 'fixed', top: { xs: 16, md: 24 }, left: { xs: 16, md: 24 }, }} />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card sx={{ p: 5, width: 1, maxWidth: 420, }} >
          <Typography  variant="h4">Register</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}> Are you        already a member ? 
            <Button onClick={() => navigate('/login')} color="primary"> 
              Sign in
            </Button>
          </Typography>


          <Stack direction="row" spacing={2}>
            <Button
              fullWidth size="large" color="inherit" variant="outlined" sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth size="large" color="inherit" variant="outlined" sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined" sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }} >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}> OR </Typography>
          </Divider>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}> Fulfill the blank below to create an account </Typography>
          <>
      <Stack spacing={3}>
        <TextField name="firstname" onChange={ (e) => setUserFirstName(e.target.value)} label="Name" />
        <TextField name="lastname" onChange={ (e) => setUserLastName(e.target.value)} label="Surname" />
        <TextField name="email" onChange={ (e) => setUserEmail(e.target.value)} label="Email address" />

        <TextField 
          name="password"
          onChange={ (e) => setUserPassword(e.target.value)}
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} /> </IconButton> 
                  </InputAdornment> ), }} />


      </Stack>



      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleRegister}
        loading={loading}
        style={{ marginTop: '20px' }}
        
      >
        Register
      </LoadingButton>
    </>
        </Card>


      </Stack>

    </Box>
    
    

    
  );
}
