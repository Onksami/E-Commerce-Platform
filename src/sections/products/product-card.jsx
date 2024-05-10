import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


function ProductCard({ product }) {
  return (
    <Card>
      <CardActions>
      <img src={product.image} alt="product image" style={{ width: '100%', marginTop: '10px' }} />
      </CardActions>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {product.description}
        </Typography>
        <CardActions style={{ justifyContent: 'center' }}>
        <Button size="medium" color="primary">Add to card</Button>
      </CardActions>

      </CardContent>
    </Card>
  );
}


export default ProductCard;