import { useState, useContext } from 'react';
// import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
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

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

// ----------------------------------------------------------------------

export default function LoginView() {
  const authContext = useContext(AuthContext);

  const navigate = useNavigate(); // useNavigate kancasını kullanarak navigate fonksiyonunu tanımlayın
  const theme = useTheme();

  // eslint-disable-next-line no-unused-vars
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // const handleClick = async () => {
  //   try {
  //     // Perform an API request to authenticate the user
  //     const response = await fetch('https://express-app-1.up.railway.app/api/v1/users/sign-in', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: userEmail,
  //         password: userPassword
  //       })
  //     });

  //     if (response.ok) {
  //       // If authentication is successful, get user data from the response
  //       const userData = await response.json();

  //       // Save user data to session context
  //       authContext.setSession(userData);

  //       // Save user data to local storage
  //       localStorage.setSession('userData', JSON.stringify(userData));

  //       // Navigate to the dashboard or product page
  //       navigate('/dashboard');
  //     } else {
  //       // Handle authentication failure (e.g., show an error message)
  //       console.error('Authentication failed');
  //     }
  //   } catch (error) {
  //     console.error('Error occurred during authentication:', error);
  //   }
  // };

  const handleClick = async () => {
    try {
      // Perform an API request to authenticate the user
      const data = {
        email: userEmail,

        password: userPassword,
      }; // Gather user input data
      // Make POST request to the API
      const response = await axios.post(
        'https://express-app-1.up.railway.app/api/v1/users/sign-in',
        data
      );

      console.log('Sign-in response', response);

      if (response.status === 200) {
        const token = response.data.token
        localStorage.setItem("token",token);
        const userData = await axios.get(
          'https://express-app-1.up.railway.app/api/v1/users/account',
          {
            headers: {
              authorization: token,
            }, 


          }
        );
        console.log("Auth userdata" , userData);
        const session = {
          user : userData.data.data
        };

        authContext.setSession(session);
        navigate('/products');



        


      }
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };

  const handleCreateAccountClick = () => {
    // Navigate to the create account page
    navigate('/register');
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          onChange={(e) => setUserPassword(e.target.value)}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        Login
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">Sign in</Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            To create an account
            {/* <Link variant="subtitle2" sx={{ ml: 0.5 }}  >
              Create Account.
            </Link>  */}
            <Button onClick={handleCreateAccountClick} color="primary">
              Register
            </Button>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:google-fill" color="#DF3E30" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:facebook-fill" color="#1877F2" />
            </Button>

            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
            >
              <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
