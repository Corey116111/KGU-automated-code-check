import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StudentDashboard from './pages/StudentDashboard';
import TaskPage from './pages/TaskPage';
import TeacherDashboard from './pages/TeacherDashboard';
import TaskConstructor from './pages/TaskConstructor';
import AntiCheatPage from './pages/AntiCheatPage';
import AnalyticsPage from './pages/AnalyticsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="tasks" element={<StudentDashboard />} />
        <Route path="task/:id" element={<TaskPage />} />
        <Route path="teacher" element={<TeacherDashboard />} />
        <Route path="constructor" element={<TaskConstructor />} />
        <Route path="anticheat" element={<AntiCheatPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
    </Routes>
  );
}
