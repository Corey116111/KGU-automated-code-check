import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import apiClient from '../api/client';
import type { Task } from '../types';
import TaskCard from '../components/TaskCard';
import EloBadge from '../components/EloBadge';
import { TopicsBar, EloLine } from '../components/Charts';

export default function StudentDashboard() {
  const { user, loadUser } = useStore();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
    
    apiClient.getTasks()
      .then(data => {
        setTasks(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки задач:", err);
        setIsLoading(false);
      });
  }, [loadUser]);

  const eloHistory = [
    { day: 'Пн', elo: 1380 }, { day: 'Вт', elo: 1400 }, { day: 'Ср', elo: 1420 },
    { day: 'Чт', elo: 1410 }, { day: 'Пт', elo: 1450 }, { day: 'Сб', elo: 1460 },
    { day: 'Вс', elo: 1450 },
  ];
  
  const topics = [
    { topic: 'Массивы', solved: 12 }, { topic: 'Списки', solved: 7 },
    { topic: 'Графы', solved: 4 },    { topic: 'ДП', solved: 2 },
    { topic: 'Строки', solved: 9 },
  ];

  return (
    <>
      <h1>Кабинет студента {user && <EloBadge elo={user.elo} />}</h1>
      
      <div className="grid cols-2">
        <TopicsBar data={topics} />
        <EloLine data={eloHistory} />
      </div>
      
      <div className="card" style={{ marginTop: 16 }}>
        <h3>Персональные рекомендации (адаптивный подбор)</h3>
        
        {isLoading ? (
          <p className="muted">Загрузка задач...</p>
        ) : (
          tasks
            .filter(t => !(t as any).solved) 
            .map(t => <TaskCard key={t.id} task={{ ...t, solved: false }} />)
        )}
      </div>
    </>
  );
}