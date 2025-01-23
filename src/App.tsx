import React from 'react';

import Home from './pages/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';
import AppTheme from './shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Main from './shared-components/Main';
import AddTrip from './pages/add-trip/AddTrip';

function App(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/main" element={<Main />}>
            <Route path="map" element={<AddTrip />} />
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AppTheme>
  );
}

export default App;
