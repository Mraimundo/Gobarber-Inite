import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import {Route} from './Route';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const PageRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes>
)