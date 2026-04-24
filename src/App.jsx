import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ExamStructure from './pages/ExamStructure';
import TopicBank from './pages/TopicBank';
import Methodology from './pages/Methodology';
import EssayExamples from './pages/EssayExamples';
import KnowledgeCheck from './pages/KnowledgeCheck';
import './index.css';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exam-structure" element={<ExamStructure />} />
        <Route path="/topic-bank" element={<TopicBank />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/essay-examples" element={<EssayExamples />} />
        <Route path="/knowledge-check" element={<KnowledgeCheck />} />
      </Routes>
    </Layout>
  );
}
