import { Helmet } from 'react-helmet-async';

import { ProductsView } from 'src/sections/new-products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> This is the new product page. </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
