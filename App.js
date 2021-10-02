import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import React, { useContext } from 'react';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import Modal from './components/Modal';
import { AppContext } from 'src/context';

const App = () => {
  const routing = useRoutes(routes);
  const { ChildComponent, modalTitle } = useContext(AppContext);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
      <Modal childComponent={ChildComponent} modalTitle={modalTitle} />
    </ThemeProvider>
  );
};

export default App;
