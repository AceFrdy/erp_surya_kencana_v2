import React, { useState } from 'react';
import { Button, Card, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputCustomer() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken') || '';

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    errors: {},
  });

  const handleAddData = () => {
    const data = {
      name: formData.name,
      contact: formData.contact,
      address: formData.address,
    };

    axios
      .post('https://erp.digitalindustryagency.com/api/customers', data, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Customer data successfully added:', response.data);
        navigate('/customer/offline');
        toast.success('Data berhasil ditambahkan', {
          position: 'top-right',
          autoClose: 3000,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error('Server Response Data:', error.response.data);
          // ... your existing error handling code
        }
        console.error('Error adding customer data:', error);
        toast.error('Error adding data');
      });
  };

  const handleCancel = () => {
    navigate('/customer/offline');
  };

  return (
    <Card sx={{ width: '100%', maxWidth: '800px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Customer Data Input Form</h2>
      <div style={{ display: 'grid', gap: '20px' }}>
        <TextField
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <TextField
          label="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />
        <TextField
          label="Contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCancel}
        sx={{ width: '100px', margin: '30px auto', marginRight: '10px' }}
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddData}
        sx={{ width: '100px', margin: '30px auto' }}
      >
        Add
      </Button>
    </Card>
  );
}

export default InputCustomer;
