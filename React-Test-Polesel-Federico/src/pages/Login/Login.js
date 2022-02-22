import './Login.styles.css';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const router = useHistory();
  const { handleSubmit, register } = useForm();
  const { token, signIn, getProfile } = useLogin();
  const storage = useLocalStorage();

  const onSubmit = React.useCallback(
    async (data) => {
      await signIn(data);
    },
    [signIn]
  );

  React.useEffect(() => {
    if (token) {
      getProfile();
      storage.save('@reactlab_token', token);
      router.push('/posts');
    }
  }, [getProfile, router, storage, token]);

  React.useEffect(() => {
    const token = storage.get('@reactlab_token');

    if (token) {
      router.push('/posts');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='Username'
          {...register('username', { required: true })}
        />
        <input
          placeholder='Password'
          type='password'
          {...register('password', { required: true })}
        />
        <input type='submit' value='Sign in' />
      </form>
    </div>
  );
};

export default Login;
