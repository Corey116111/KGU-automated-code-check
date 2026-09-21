import type { Task } from '../types';
import { Link } from 'react-router-dom';

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="task-item">
      <div>
        <div><b>{task.title}</b></div>
        <div className="muted">{task.topic} · сложность {task.difficulty}</div>
      </div>
      <div>
        {task.solved
          ? <span className="badge ok">Решено</span>
          : <Link to={`/task/${task.id}`} className="btn">Открыть</Link>}
      </div>
    </div>
  );
}
