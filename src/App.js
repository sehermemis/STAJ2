import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogPostDetail from './components/BlogPostDetail';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;