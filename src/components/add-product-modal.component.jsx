import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { fetchProducts } from '../store/slices/productsSlice';

const defaultFormFields = {
  id: '',
  productId: '',
  quantity: 0,
  product: null,
};

const AddProductModal = ({
  isOpen,
  handleClose,
  handleSubmit,
  orderItemToEdit,
}) => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const products = useSelector((state) => state.products.products);

  const closeHandler = () => {
    setFormFields(defaultFormFields);
    handleClose();
  };

  const submitHandler = () => {
    if (!formFields.productId || !formFields.quantity) return;

    const product = products.find((prod) => prod.id === formFields.productId);
    const orderItem = {
      ...formFields,
      id: orderItemToEdit?.id || uuidv4(),
      product,
      quantity: parseInt(formFields.quantity),
    };
    console.log(orderItem);
    handleSubmit(orderItem);
    closeHandler();
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchProducts());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (orderItemToEdit) {
      setFormFields({
        ...orderItemToEdit,
        productId: orderItemToEdit.product.id,
      });
    }
  }, [orderItemToEdit]);

  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <DialogTitle>{
        orderItemToEdit ? 'Edit Order Item' : 'Add Product to Order'}</DialogTitle>
      <DialogContent>
        <FormControl margin='normal' fullWidth required>
          <InputLabel>Product</InputLabel>
          <Select
            label='Product'
            name='productId'
            fullWidth
            value={formFields.productId}
            onChange={handleChange}
            required
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Quantity'
          required
          fullWidth
          margin='normal'
          type='number'
          value={formFields.quantity}
          name='quantity'
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button onClick={submitHandler}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
