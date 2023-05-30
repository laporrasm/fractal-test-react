import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

import AddProductModal from '../components/add-product-modal.component';

import { fetchOrders, postOrder } from '../store/slices/ordersSlice';
import ConfirmationModal from '../components/confirmation-modal.component';

const defaultOrderObject = {
  id: '',
  orderNumber: '',
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
  items: [],
  numberOfProducts: 0,
  finalPrice: 0,
};

const WriteOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [orderObject, setOrderObject] = useState(defaultOrderObject);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [orderItemToDelete, setItemToDelete] = useState('');
  const [orderItemToEdit, setItemToEdit] = useState(null);
  const order = useSelector((state) => {
    const ordersSlice = state.orders;
    const { orders } = ordersSlice;
    return orders.find((o) => o.id === id);
  });

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    if (!id) {
      setOrderObject(defaultOrderObject);
    }
  }, [id]);

  useEffect(() => {
    if (order) {
      setOrderObject(order);
    }
  }, [order]);

  useEffect(() => {
    const finalPrice =
      orderObject.items.reduce(
        (price, item) => price + item.product.unitPrice * item.quantity,
        0
      ) || 0;

    const numberOfProducts =
      orderObject.items.reduce((total, item) => total + item.quantity, 0) || 0;

    setOrderObject({ ...orderObject, finalPrice, numberOfProducts });
  }, [orderObject]);

  const addItem = (itemToAdd) => {
    const itemIndex = orderObject.items.findIndex(
      (item) => item.id === itemToAdd.id
    );

    setOrderObject({
      ...orderObject,
      items:
        itemIndex >= 0
          ? orderObject.items.map((item, index) =>
              index === itemIndex ? itemToAdd : item
            )
          : [...orderObject.items, itemToAdd],
    });
  };

  const deleteItem = () => {
    const newItems = orderObject.items.filter(
      (item) => item.id !== orderItemToDelete
    );
    setOrderObject({
      ...orderObject,
      items: newItems,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(postOrder({ ...orderObject, id: id || uuidv4() }));

    navigate('/my-orders');
  };

  const onEdit = (orderItem) => {
    setItemToEdit(orderItem);
    setIsAddModalOpen(true);
  };

  const onDelete = (orderItemId) => {
    setItemToDelete(orderItemId);
    setIsConfirmationModalOpen(true);
  };

  const onEditCancelation = () => {
    setItemToEdit(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteCancelation = () => {
    setItemToDelete('');
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfirmation = () => {
    deleteItem();
    handleDeleteCancelation();
  };

  return (
    <Box sx={{ maxWidth: '800px' }} component='form' onSubmit={handleSubmit}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <h1>{id ? 'Edit Order' : 'Add Order'}</h1>

        <Button variant='contained' type='submit'>
          Save
        </Button>
      </Stack>

      <TextField
        label='Order Number'
        value={orderObject.orderNumber}
        required
        fullWidth
        margin='normal'
        onChange={(event) =>
          setOrderObject({ ...orderObject, orderNumber: event.target.value })
        }
      />
      <TextField
        label='Date Created'
        disabled
        value={orderObject.date}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Number of Products'
        disabled
        value={orderObject.numberOfProducts}
        fullWidth
        margin='normal'
      />
      <TextField
        label='Final Price'
        disabled
        value={orderObject.finalPrice}
        fullWidth
        margin='normal'
      />

      <Box>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <h3>Products</h3>
          <Button onClick={() => setIsAddModalOpen(true)} endIcon={<Add />}>
            Add
          </Button>
        </Stack>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total Price</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderObject.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.product.unitPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    {item.quantity * item.product.unitPrice || 1}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onEdit(item)}>Edit</Button>
                    <Button onClick={() => onDelete(item.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <AddProductModal
        isOpen={isAddModalOpen}
        handleClose={onEditCancelation}
        handleSubmit={addItem}
        orderItemToEdit={orderItemToEdit}
      />

      <ConfirmationModal
        title='Delete Order Item'
        description='Are you sure?'
        isOpen={isConfirmationModalOpen}
        handleClose={handleDeleteCancelation}
        handleConfirm={handleDeleteConfirmation}
      />
    </Box>
  );
};

export default WriteOrder;
