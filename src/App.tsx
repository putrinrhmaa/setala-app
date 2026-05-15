import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Criteria } from './pages/Criteria';
import { Results } from './pages/Results';
import { Comparison } from './pages/Comparison';
import { Detail } from './pages/Detail';

import { LocationProvider } from './contexts/LocationContext';

export default function App() {
  return (
    <LocationProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/criteria" element={<Criteria />} />
            <Route path="/results" element={<Results />} />
            <Route path="/compare" element={<Comparison />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </Layout>
      </Router>
    </LocationProvider>
  );
}
