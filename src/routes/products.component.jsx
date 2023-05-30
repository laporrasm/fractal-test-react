import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
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

import { deleteProduct, fetchProducts } from '../store/slices/productsSlice';
import ConfirmationModal from '../components/confirmation-modal.component';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState('');

  const goToWriteProduct = (id) =>
    navigate(`/add-product${id ? `/${id}` : ''}`);

  const onDelete = (id) => {
    setProductToDelete(id);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirm = () => {
    dispatch(deleteProduct(productToDelete));
    setProductToDelete('');
  };

  const handleCancel = () => {
    setProductToDelete('');
    setIsConfirmationModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <h1>My Products</h1>
        <Button endIcon={<Add />} onClick={() => goToWriteProduct()}>
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
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.unitPrice}</TableCell>
                <TableCell>
                  <Button onClick={() => goToWriteProduct(product.id)}>
                    Edit
                  </Button>
                  <Button onClick={() => onDelete(product.id)}>Delete</Button>
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
        title='Delete Product'
        description='Are you sure?'
      />
    </div>
  );
};

export default Products;
