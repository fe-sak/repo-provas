import emailPattern from './regular expressions/emailPattern';

export const required = { value: true, message: 'Este campo é obrigatório' };
export const maxLength = {
  value: 40,
  message: 'Este campo não deve ultrapassar 40 caracteres',
};
export const minLength = {
  value: 8,
  message: 'Sua senha deve ter pelo menos 8 caracteres',
};
export const pattern = {
  value: emailPattern,
  message: 'Email inválido',
};
