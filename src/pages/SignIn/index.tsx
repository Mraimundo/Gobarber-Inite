import React, { useCallback, useRef, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';


import logoImg from '../../assets/logo.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { AuthContext } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

import * as S from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

interface Errors {
  [key: string]: string;
}

export function SignIn() {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { user, signIn } = useContext(AuthContext);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string().required('E-email obrigatório').email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória')
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password
        });

        navigate('/dashboard');

      } catch (err) {
        const validationErrors: Errors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path!] = error.message;
          });

          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
        });

      }
    }, [signIn, addToast, navigate]);

  return (
    <S.Container>
      <S.Content>
        <S.AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>

            <h1>Faça seu logon</h1>

            <Input
              name="email"
              icon={FiMail}
              placeholder='E-mail'
            />

            <Input
              name='password'
              icon={FiLock}
              type='password'
              placeholder='Senha'
            />

            <Button type='submit'>Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>

          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </S.AnimationContainer>
      </S.Content>
      <S.Background />
    </S.Container>
  )
}