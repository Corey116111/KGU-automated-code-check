import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import VerdictPanel from '../components/VerdictPanel';
import { useStore } from '../store/useStore';
import apiClient from '../api/client';
import type { Task } from '../types';

export default function TaskPage() {
  const { id } = useParams();
  
  const [task, setTask] = useState<Task | null>(null);
  
  const [code, setCode] = useState('print("Hello World")\n');
  const { runCode, lastSubmission } = useStore();

  useEffect(() => {
    if (id) {
      apiClient.getTasks()
        .then(tasks => {
          const foundTask = tasks.find(t => t.id === id);
          setTask(foundTask || null);
        })
        .catch(err => {
          console.error("Ошибка загрузки задачи:", err);
          setTask(null);
        });
    }
  }, [id]);

  if (!task) {
    return <h1>Загрузка задачи или задача не найдена...</h1>;
  }

  return (
    <>
      <h1>{task.title}</h1>
      <p className="muted">{task.topic} · сложность {task.difficulty}</p>
      
      <div className="grid cols-2" style={{ marginTop: 16 }}>
        <CodeEditor value={code} onChange={setCode} language="Python" />
        
        <div>
          <div className="card">
            <h3>Действия</h3>
            <button className="btn" onClick={() => runCode(task.id, code)}>
              Отправить на проверку
            </button>
          </div>
          
          <div style={{ marginTop: 16 }}>
            <VerdictPanel sub={lastSubmission} />
          </div>
        </div>
      </div>
    </>
  );
}