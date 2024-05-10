import axios from 'axios';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import { products } from 'src/_mock/products';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState({
    data: [], // Ensure that data is initialized as an array
    metadata: [],
  });

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  useEffect(() => {
    axios
      .get('https://java-api-production.up.railway.app/products?page=1&size=24&sort=id')
      .then((response) => {
        // handle success
        console.log('products response', response.data);
        setProducts((prevState) => ({
          ...prevState,
          data: response.data.content, // the array of products is under 'content'
        }));
      })
      .catch((error) => {
        // handle error
        console.error('Error fetching products:', error);
      });
  }, []);

  console.log("what is data now ? " , products.data);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.data &&
          products.data.map((product) => (
            <Grid key={product.id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
