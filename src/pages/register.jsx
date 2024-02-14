
import { Helmet } from 'react-helmet-async';

import Register from "src/sections/register/register-view";



// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Register </title>
      </Helmet>

      <Register />
    </>
  );
}