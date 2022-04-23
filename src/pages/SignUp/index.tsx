import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import logoSource from '../../assets/logo.svg';
import { Form, Input } from '../../components/FormComponents';
import { LoadingSpinner } from '../../components/Loader';
import { StyledLink } from '../../components/StyledLink';
import { toastSuccess } from '../../components/toasts';
import { signUp } from '../../services/axios';
import { errorHandler } from '../../utils/errorHandler';
import {
  required,
  maxLength,
  minLength,
  pattern,
} from '../../utils/reactHookFormConfig';
import {
  Viewport,
  Logo,
  Container,
  SignUpOptions,
  PageName,
  Button,
} from './styles';

export interface IForm {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
export const SignUp: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialFormValues: IForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValues });

  const password = watch('password');

  async function submitForm(formValues: IForm) {
    try {
      setLoading(true);
      const { confirmPassword, ...formData } = formValues;
      await signUp({ ...formData });
      setLoading(false);
      toastSuccess('Usuário criado! Entrando na página de login...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }
  return (
    <Viewport>
      <Container>
        <Logo src={logoSource} />
        <SignUpOptions>
          <PageName>Cadastro</PageName>
          <Form
            onSubmit={handleSubmit((formData) => {
              submitForm(formData);
            })}
          >
            <Input
              type='text'
              placeholder='Nome'
              disabled={loading}
              autoComplete='off'
              error={!!errors?.name?.message}
              {...register('name', {
                required,
                maxLength,
              })}
            />
            <p>{errors?.name?.message}</p>
            <Input
              type='text'
              placeholder='Email'
              disabled={loading}
              autoComplete='off'
              error={!!errors?.email?.message}
              {...register('email', {
                required,
                maxLength,
                pattern,
              })}
            />
            <p>{errors?.email?.message}</p>

            <Input
              type='password'
              placeholder='Senha'
              error={!!errors?.password?.message}
              {...register('password', {
                required,
                minLength,
              })}
              disabled={loading}
            />
            <p>{errors?.password?.message}</p>

            <Input
              type='password'
              placeholder='Confirme a senha'
              error={!!errors?.confirmPassword?.message}
              {...register('confirmPassword', {
                required,
                minLength,
                validate: (confirmPassword) =>
                  password === confirmPassword || 'As senhas não são iguais',
              })}
              disabled={loading}
            />
            <p>{errors?.confirmPassword?.message}</p>
            <Button type='submit'>
              {loading ? <LoadingSpinner /> : 'Cadastrar'}
            </Button>
          </Form>
          <StyledLink to='/'>Já possuo cadastro</StyledLink>
        </SignUpOptions>
      </Container>
    </Viewport>
  );
};
