import { FC, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import * as api from '../../api/api';
import AuthPagesContainer from '../../components/AuthPagesContainer/AuthPagesContainer';
import { Form, Input } from '../../components/FormStyledComponents';
import { Logo } from '../../components/Logo';
import { PageName } from '../../components/PageName';
import { StyledLink } from '../../components/styled components/StyledLink';
import { SubmitButton } from '../../components/SubmitButton';
import { toastSuccess } from '../../components/toasts';
import { AuthContext } from '../../contexts/AuthContext';
import { errorHandler } from '../../utils/errorHandler';
import { required, pattern } from '../../utils/reactHookFormConfig';

interface Form {
  email: string;
  password: string;
}

export const LogIn: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const initialFormValues: Form = {
    email: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialFormValues });

  async function submitForm(formValues: Form) {
    try {
      setLoading(true);
      const { data: token }: { data: string } = await api.logIn(formValues);
      login(token);
      toastSuccess('Entrando...');
      setTimeout(() => {
        navigate('/home');
        setLoading(false);
      }, 1500);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
    }
  }
  return (
    <AuthPagesContainer>
      <Logo />
      <div>
        <PageName name='Login' />
        <Form
          onSubmit={handleSubmit((formData) => {
            submitForm(formData);
          })}
        >
          <Input
            type='text'
            placeholder='Email'
            disabled={loading}
            autoComplete='off'
            error={!!errors?.email?.message}
            {...register('email', {
              required,
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
            })}
            disabled={loading}
          />
          <p>{errors?.password?.message}</p>

          <SubmitButton text='Entrar' loading={loading} />
          <StyledLink to='/signup'>Não possuo cadastro</StyledLink>
        </Form>
      </div>
    </AuthPagesContainer>
  );
};
