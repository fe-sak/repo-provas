import React, { FC } from 'react';

import { LoadingSpinner } from '../Loader/Loader';
import { Button } from './styles';

type Props = { loading: boolean; text: string };

export const SubmitButton: FC<Props> = ({ loading, text }) => {
  return <Button type='submit'>{loading ? <LoadingSpinner /> : text}</Button>;
};
