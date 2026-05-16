/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { VisionGoals } from './pages/VisionGoals';
import { Marketplace } from './pages/Marketplace';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { DataAnalysis } from './pages/DataAnalysis';
import { TrackOrder } from './pages/TrackOrder';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vision" element={<VisionGoals />} />
            <Route path="data-analysis" element={<DataAnalysis />} />
            <Route path="marketplace" element={<Marketplace />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="track-order" element={<TrackOrder />} />
            <Route path="contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
