import { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Card, Link, Stack, Button, Typography } from '@mui/material';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
// import { ColorPreview } from 'src/components/color-utils';

export default function ShopProductCard({ product }) {
  const renderStatus = (
    <Label
      variant="filled"
      color={(product.id === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.id}
    </Label>
  );

  const [handledProducts, setHandledProducts] = useState([]);

  // eslint-disable-next-line no-shadow
  const handleButtonClick = (product) => {
    // Eğer handledProducts dizisinde bu ürün yoksa, yeni ürünü ekleyelim
    if (!handledProducts.some(handledProduct => handledProduct.id === product.id)) {
      const updatedProducts = [...handledProducts, product];
      setHandledProducts(updatedProducts);
      console.log("updatedProducts", updatedProducts);
    } else {
      console.log("Bu ürün zaten işlenmiş.");
    }
  
    // Tüm ürünleri konsola yazdır
    console.log("Handled Products:", handledProducts);
  };

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.price}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.price && fCurrency(product.price)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {product.status && renderStatus}

        {renderImg}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {product.name}
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="center">
          {renderPrice}
        </Stack>
        <Button onClick={() => handleButtonClick(product)} variant="contained">Add to the Cart</Button>
      </Stack>

    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
