import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from "./styles/global";

import { AppProvider } from './context/index';

import { PageRoutes } from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <PageRoutes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}

export default App;
