/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes library
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';


function ProductCard({ product }) {
  return (
    <Card>
      <CardActions>
              {/* eslint-disable-next-line */}
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

// Add prop type validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};


export default ProductCard;