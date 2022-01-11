import React, { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import getValidationErrors from '../../utils/getValidationErrors'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import * as S from './styles'

interface Errors {
  [key: string]: string;
}

export function SignUp() {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-email obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minimo 6 digitos')
      });

      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (err) {
      const validationErrors: Errors = {};
      // const validationErrors = {};

      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path!] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      }
      // const errors = getValidationErrors(err)
      // formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <S.Container>
      <S.Background />
      <S.Content>
        <S.AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>

            <h1>Faça seu cadastro</h1>

            <Input
              name="name"
              icon={FiUser}
              placeholder='Nome'
            />

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

            <Button type='submit'>Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </S.AnimationContainer>
      </S.Content>
    </S.Container>
  )
}