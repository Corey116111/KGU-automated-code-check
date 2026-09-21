import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  return (
    <>
      <h1>Панель преподавателя</h1>
      <div className="grid cols-3">
        <div className="card">
          <h3>Студенты</h3>
          <p style={{ fontSize: 28, margin: 0 }}>124</p>
          <p className="muted">Активных за неделю</p>
        </div>
        <div className="card">
          <h3>Отправок</h3>
          <p style={{ fontSize: 28, margin: 0 }}>1 328</p>
          <p className="muted">За последние 7 дней</p>
        </div>
        <div className="card">
          <h3>Подозрительных</h3>
          <p style={{ fontSize: 28, margin: 0, color: 'var(--warn)' }}>17</p>
          <p className="muted">Требуют модерации</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Быстрые действия</h3>
        <Link to="/constructor" className="btn">Создать задачу</Link>{' '}
        <Link to="/anticheat"   className="btn secondary">Открыть античит</Link>{' '}
        <Link to="/analytics"   className="btn secondary">BI-дашборды</Link>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>«Бутылочное горлышко»</h3>
        <table>
          <thead><tr><th>Задача</th><th>Попыток</th><th>Успешных</th><th>% ошибок</th></tr></thead>
          <tbody>
            <tr><td>ДП: рюкзак</td>        <td>87</td><td>19</td><td><span className="badge err">78%</span></td></tr>
            <tr><td>Обратный список</td>   <td>65</td><td>28</td><td><span className="badge warn">57%</span></td></tr>
            <tr><td>Поиск в глубину</td>   <td>54</td><td>31</td><td><span className="badge warn">43%</span></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
