import React from 'react';
import { BrowserRouter, Routes as Swicth, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Swicth>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<OrphanagesMap />} />
      </Swicth>
    </BrowserRouter>
  );
}

export default Routes;
