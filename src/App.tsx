
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/home';
import About from './pages/about';
import LifeInsurance from './pages/lifeInsurance';
import Blog from './pages/blog';
import News from './pages/news';
import FAQ from './pages/faq';
import Contact from './pages/contact';
import NotFound from './pages/NotFound';
import PlanDetailsPage from './pages/planDetailsPage/[planName]';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <Header />
          <main className="relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/life-insurance" element={<LifeInsurance />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/news" element={<News />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/plan-details/:planName" element={<PlanDetailsPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
