import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PhotoAnalysisPage from './pages/PhotoAnalysisPage';
import BioAnalysisPage from './pages/BioAnalysisPage';
import MessageAssistancePage from './pages/MessageAssistancePage';
import FirstMessagePage from './pages/FirstMessagePage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/photo-analysis" element={<PhotoAnalysisPage />} />
          <Route path="/bio-analysis" element={<BioAnalysisPage />} />
          <Route path="/message-assistance" element={<MessageAssistancePage />} />
          <Route path="/first-message" element={<FirstMessagePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;