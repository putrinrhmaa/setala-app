import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Criteria } from './pages/Criteria';
import { Results } from './pages/Results';
import { Comparison } from './pages/Comparison';
import { Detail } from './pages/Detail';
import { Favorites } from './pages/Favorites';

import { LocationProvider } from './contexts/LocationContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <LocationProvider>
      <FavoritesProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/criteria" element={<Criteria />} />
              <Route path="/results" element={<Results />} />
              <Route path="/compare" element={<Comparison />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Layout>
        </Router>
      </FavoritesProvider>
    </LocationProvider>
  );
}
