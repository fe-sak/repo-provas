import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

interface IFormData {
  name: string;
  pdfUrl: string;
  category: string | null;
  discipline: string | null;
  teacher: string | null;
}
const AddTest = () => {
  const [formData, setFormData] = useState<IFormData>({
    name: '',
    pdfUrl: '',
    category: null,
    discipline: null,
    teacher: null,
  });
  console.log(formData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Box sx={{ marginLeft: '5px', marginRight: '5px' }}>
      <Typography variant='h4' sx={{ marginBottom: '10px' }}>
        Adicione uma prova
      </Typography>
      <Box
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
      >
        <TextField
          name='name'
          fullWidth
          variant='outlined'
          label='Nome da prova'
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name='pdfUrl'
          fullWidth
          variant='outlined'
          label='Link da prova'
          value={formData.pdfUrl}
          onChange={handleChange}
        />
        <Autocomplete
          value={formData.category}
          options={['p1', 'p2']}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | null
          ) => {
            setFormData({ ...formData, category: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} label='Categorias' variant='outlined' />
          )}
        />
      </Box>
    </Box>
  );
};

export default AddTest;
