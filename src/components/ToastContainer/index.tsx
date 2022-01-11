import React from 'react';
// import {useTransition} from 'react-spring';

import { ToastMessage } from '../../context/ToastContext';

import * as S from './styles';
import { Toast } from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  // const messagesWithTransitions = useTransition(
  //   messages,
  //   message => message.id,
  //   {
  //     from: {right: '-120%', opacity: 0},
  //     enter: {right: '0%' , opacity: 1},
  //     leave: {right: '-120%' , opacity: 0},
  //   },
  // );

  return (
    <S.Container>
      {messages.map((message) => (
        <Toast
          key={message.id}
          message={message}
        />
      ))}
      {/* {messagesWithTransitions.map(({item, key, props}) => (
        <Toast
          key={key}
          message={item}
          style={props}
        />
      ))} */}
    </S.Container>
  )
}