import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button, Stack, TextField } from '@mui/material';

import { v4 as uuidv4 } from 'uuid';

import { fetchProducts, postProduct } from '../store/slices/productsSlice';

const defaultFormFields = {
  id: uuidv4(),
  name: '',
  unitPrice: 0,
};

const WriteProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formFields, setFormFields] = useState(defaultFormFields);

  const product = useSelector((state) => {
    const productsSlice = state.products;
    const productsArray = productsSlice.products;

    return productsArray.find((prod) => prod.id === id);
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(postProduct(formFields));

    navigate('/products');
  };

  useEffect(() => {
    if (id && !product) dispatch(fetchProducts());
  }, [dispatch, id, product]);

  useEffect(() => {
    if (product) {
      setFormFields(product);
    }
  }, [product]);

  return (
    <Box sx={{ maxWidth: '600px' }} component='form' onSubmit={handleSubmit}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <h1>{id ? 'Edit Product' : 'Add Product'}</h1>

        <Button variant='contained' type='submit'>
          Save
        </Button>
      </Stack>

      <TextField
        label='Name'
        value={formFields.name}
        required
        fullWidth
        margin='normal'
        name='name'
        onChange={handleChange}
      />
      <TextField
        label='Unit Price'
        value={formFields.unitPrice}
        required
        fullWidth
        margin='normal'
        name='unitPrice'
        onChange={handleChange}
      />
    </Box>
  );
};

export default WriteProduct;
