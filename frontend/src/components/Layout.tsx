import { NavLink, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>CodeJudge</h2>
        <nav>
          <NavLink to="/"          end>Кабинет студента</NavLink>
          <NavLink to="/tasks">Задачи</NavLink>
          <NavLink to="/teacher">Преподаватель</NavLink>
          <NavLink to="/constructor">Конструктор задач</NavLink>
          <NavLink to="/anticheat">Античит</NavLink>
          <NavLink to="/analytics">BI / Аналитика</NavLink>
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
