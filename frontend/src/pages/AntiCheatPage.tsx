import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import type { SuspiciousCase } from '../types';

const sevCls: Record<string, string> = { low: 'ok', medium: 'warn', high: 'err' };

export default function AntiCheatPage() {
  const [cases, setCases] = useState<SuspiciousCase[]>([]);
  useEffect(() => { apiClient.getSuspicious().then(setCases); }, []);

  return (
    <>
      <h1>Академическая честность</h1>
      <p className="muted">Модуль анализирует AST-сходство, поведенческие аномалии и совпадения по IP.</p>
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Подозрительные решения</h3>
        <table>
          <thead>
            <tr><th>Студент</th><th>Задача</th><th>Причина</th><th>Уровень</th><th>Дата</th><th></th></tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id}>
                <td>{c.studentId}</td>
                <td>{c.taskId}</td>
                <td>{c.reason}</td>
                <td><span className={`badge ${sevCls[c.severity]}`}>{c.severity}</span></td>
                <td>{c.createdAt}</td>
                <td><button className="btn secondary">Открыть</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
