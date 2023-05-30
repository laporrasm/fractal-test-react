import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Add,
  AddShoppingCart,
  Inventory,
  ShoppingCart,
} from '@mui/icons-material';

import Orders from './routes/orders.component';
import WriteOrder from './routes/write-order.component';
import Products from './routes/products.component';
import WriteProduct from './routes/write-product.component';

const App = () => {
  const navigate = useNavigate();

  const goToOrders = () => navigate('/orders');
  const goToProducts = () => navigate('/products');
  const goToWriteProduct = () => navigate('/add-product');
  const goToWriteOrder = () => navigate('/add-order');

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Drawer
        variant='permanent'
        sx={{
          width: '250px',
          [`& .MuiDrawer-paper`]: { width: '250px', boxSizing: 'border-box' },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={goToOrders}>
              <ListItemIcon>
                <ShoppingCart fontSize='small' />
              </ListItemIcon>
              <ListItemText>My Orders</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={goToWriteOrder}>
              <ListItemIcon>
                <AddShoppingCart fontSize='small' />
              </ListItemIcon>
              <ListItemText>Add Order</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={goToProducts}>
              <ListItemIcon>
                <Inventory fontSize='small' />
              </ListItemIcon>
              <ListItemText>My Products</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={goToWriteProduct}>
              <ListItemIcon>
                <Add fontSize='small' />
              </ListItemIcon>
              <ListItemText>Add Product</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, padding: '2em', overflowY: 'auto' }}>
        <Routes>
          <Route path='orders' element={<Orders />} />
          <Route path='products' element={<Products />} />
          <Route path='add-order' element={<WriteOrder />} />
          <Route path='add-order/:id' element={<WriteOrder />} />
          <Route path='add-product' element={<WriteProduct />} />
          <Route path='add-product/:id' element={<WriteProduct />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
