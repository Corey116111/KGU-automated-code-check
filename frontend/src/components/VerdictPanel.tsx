import type { Submission } from '../types';

const verdictMap: Record<string, { label: string; cls: string }> = {
  AC:  { label: 'Accepted',           cls: 'ok'   },
  WA:  { label: 'Wrong Answer',       cls: 'err'  },
  TLE: { label: 'Time Limit Exceeded',cls: 'warn' },
  MLE: { label: 'Memory Limit',       cls: 'warn' },
  RE:  { label: 'Runtime Error',      cls: 'err'  },
  CE:  { label: 'Compilation Error',  cls: 'err'  },
};

export default function VerdictPanel({ sub }: { sub: Submission | null }) {
  if (!sub) return <div className="card muted">Нет отправок. Запустите код.</div>;
  const v = verdictMap[sub.verdict];
  return (
    <div className="card">
      <h3>Вердикт</h3>
      <p><span className={`badge ${v.cls}`}>{v.label}</span></p>
      <p className="muted">Тесты: {sub.passed} / {sub.total}</p>
      <p className="muted">Время: {sub.timeMs} мс · Память: {(sub.memoryKb / 1024).toFixed(1)} МБ</p>
    </div>
  );
}
