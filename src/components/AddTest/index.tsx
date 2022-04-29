import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import React, {
  FormEventHandler,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import * as api from '../../api/api';
import { AuthContext } from '../../contexts/AuthContext';
import { LoadingSpinner } from '../Loader/Loader';
import { toastError, toastSuccess } from '../toasts';

interface FormData {
  name: string;
  pdfUrl: string;
  category: string | null;
  discipline: string | null;
  teacher: string | null;
  categoryId: number | null;
  disciplineTeacherId: number | null;
}
const defaultFormDataValues = {
  name: '',
  pdfUrl: '',
  category: null,
  discipline: null,
  teacher: null,
  categoryId: null,
  disciplineTeacherId: null,
};

const AddTest = () => {
  const { auth } = useContext(AuthContext);

  const [categories, setCategories] = useState<api.categoriesTypes>([]);
  const [disciplines, setDisciplines] = useState<api.disciplinesTypes>([]);
  const [teachers, setTeachers] = useState<api.teachersTypes>([]);
  const [teachersOptions, setTeachersOption] = useState<string[]>([]);
  const [formData, setFormData] = useState<FormData>(defaultFormDataValues);

  const fetchData = useCallback(async () => {
    const { data: categories }: { data: api.categoriesTypes } =
      await api.getCategories(auth);

    setCategories(categories);

    const { data: disciplines }: { data: api.disciplinesTypes } =
      await api.getDisciplines(auth);

    setDisciplines(disciplines);

    const { data: teachers }: { data: api.teachersTypes } =
      await api.getTeachers(auth);

    setTeachers(teachers);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.discipline) {
      const filteredTeachers = teachers
        .filter((teacher) =>
          teacher.disciplinesTeachers.find(
            (disciplineTeacher) =>
              disciplineTeacher.discipline.name === formData.discipline
          )
        )
        .map((teacher) => teacher.name);
      setTeachersOption(filteredTeachers);
    } else {
      setTeachersOption([]);
      formData.teacher = null;
    }
  }, [formData.discipline]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    const selectedCategory = categories.find(
      (category) => category.name === formData.category
    );

    const selectedTeacher = teachers.find(
      (teacher) => teacher.name === formData.teacher
    );
    const selectedDisciplineTeacher = selectedTeacher?.disciplinesTeachers.find(
      (disciplineTeacher) =>
        disciplineTeacher.discipline.name === formData.discipline
    );

    if (!selectedCategory || !selectedDisciplineTeacher) return;

    const formSubmit: api.testTypes = {
      name: formData.name,
      pdfUrl: formData.pdfUrl,
      categoryId: selectedCategory.id,
      disciplineTeacherId: selectedDisciplineTeacher.id,
    };
    api
      .createTest(auth, formSubmit)
      .then(() => {
        toastSuccess('Prova adicionada com sucesso!');
        setFormData(defaultFormDataValues);
      })
      .catch(() => {
        toastError('Algo deu errado! Tente novamente.');
      });
  };

  if (categories === null || disciplines === null || teachers === null)
    return <LoadingSpinner />;

  return (
    <Box sx={{ marginLeft: '5px', marginRight: '5px' }}>
      <Typography variant='h4' sx={{ marginBottom: '10px' }}>
        Adicione uma prova
      </Typography>
      <Box
        onSubmit={handleSubmit}
        component='form'
        sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
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
          options={categories.map((category) => category.name)}
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
        <Autocomplete
          value={formData.discipline}
          options={disciplines.map((discipline) => discipline.name)}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | null
          ) => {
            setFormData({ ...formData, discipline: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} label='Disciplinas' variant='outlined' />
          )}
        />
        <Autocomplete
          disabled={teachersOptions.length <= 0}
          value={formData.teacher}
          options={teachersOptions}
          onChange={(
            event: React.SyntheticEvent<Element, Event>,
            newValue: string | null
          ) => {
            setFormData({ ...formData, teacher: newValue });
          }}
          renderInput={(params) => (
            <TextField {...params} label='Professores' variant='outlined' />
          )}
        />
        <Button
          disabled={
            !(
              formData.name &&
              formData.pdfUrl &&
              formData.category &&
              formData.discipline &&
              formData.teacher
            )
          }
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#1976D2',
            color: 'white',
          }}
        >
          enviar
        </Button>
      </Box>
    </Box>
  );
};

export default AddTest;
