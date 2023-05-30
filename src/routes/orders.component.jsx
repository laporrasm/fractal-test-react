import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
} from '@mui/material';
import { Add } from '@mui/icons-material';

import ConfirmationModal from '../components/confirmation-modal.component';

import { deleteOrder, fetchOrders } from '../store/slices/ordersSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.orders.orders);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const goToWriteOrder = (id) => navigate(`/add-order${id ? `/${id}` : ''}`);

  const onDelete = (id) => {
    setOrderToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleCancel = () => {
    setOrderToDelete('');
    setIsConfirmationModalOpen(false);
  };

  const handleConfirm = () => {
    dispatch(deleteOrder(orderToDelete));
    handleCancel();
  };

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <h1>My Orders</h1>
        <Button endIcon={<Add />} onClick={() => goToWriteOrder()}>
          Add
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Order #</TableCell>
              <TableCell>Date</TableCell>
              <TableCell># Products</TableCell>
              <TableCell>Final Price</TableCell>
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.orderNumber}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.numberOfProducts}</TableCell>
                <TableCell>{order.finalPrice}</TableCell>
                <TableCell>
                  <Button onClick={() => goToWriteOrder(order.id)}>Edit</Button>
                  <Button onClick={() => onDelete(order.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        handleClose={handleCancel}
        handleConfirm={handleConfirm}
        title='Delete Order'
        description='Are you sure?'
      />
    </Box>
  );
};

export default Orders;
