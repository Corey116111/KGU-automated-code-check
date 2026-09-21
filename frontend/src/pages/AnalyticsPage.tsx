import { TopicsBar, EloLine } from '../components/Charts';

export default function AnalyticsPage() {
  const topics = [
    { topic: 'Массивы', solved: 220 }, { topic: 'Списки', solved: 140 },
    { topic: 'Графы', solved: 85 },    { topic: 'ДП', solved: 42 },
    { topic: 'Строки', solved: 160 },
  ];
  const dist = [
    { day: '<1000', elo: 12 }, { day: '1000-1200', elo: 28 },
    { day: '1200-1500', elo: 54 }, { day: '1500-1800', elo: 22 },
    { day: '>1800', elo: 8 },
  ];

  return (
    <>
      <h1>BI и аналитика</h1>
      <div className="grid cols-2">
        <TopicsBar data={topics} />
        <EloLine   data={dist} />
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Распределение студентов по уровню</h3>
        <table>
          <thead><tr><th>Диапазон Elo</th><th>Студентов</th><th>Рекомендация</th></tr></thead>
          <tbody>
            <tr><td>&lt; 1000</td><td>12</td><td><span className="badge err">Базовые задачи</span></td></tr>
            <tr><td>1000–1200</td><td>28</td><td><span className="badge warn">Закрепление</span></td></tr>
            <tr><td>1200–1500</td><td>54</td><td><span className="badge ok">Норма</span></td></tr>
            <tr><td>1500–1800</td><td>22</td><td><span className="badge ok">Опережение</span></td></tr>
            <tr><td>&gt; 1800</td><td>8</td><td><span className="badge elo">Олимпиадные</span></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
