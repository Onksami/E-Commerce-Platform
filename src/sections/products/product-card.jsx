import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';


export default function Component( props ) {

  const receivedData = props.product;

  console.log("Product card - ", receivedData );

  return (

  
    <Stack>
    
      <Container>

          <Grid key={id} container spacing={3}>

          <Typography> {receivedData.price ? receivedData.price : 'Price not available' }</Typography>

          </Grid>

        </Container>

      </Stack>
      

  )
}