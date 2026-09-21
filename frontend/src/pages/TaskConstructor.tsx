import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';

export default function TaskConstructor() {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Массивы');
  const [difficulty, setDifficulty] = useState('Easy');
  const [statement, setStatement] = useState('');
  const [timeLimit, setTimeLimit] = useState(2);
  const [memLimit, setMemLimit] = useState(256);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title || !statement) {
      alert("Заполните название и условие задачи!");
      return;
    }

    setIsSaving(true);
    try {
      const newTaskData = {
        title: title,
        topic: topic,
        difficulty: difficulty,
        description: statement, 
        time_limit: Number(timeLimit),
        memory_limit: Number(memLimit)
      };

      console.log("Отправляем на бэкенд:", newTaskData);
      
      await apiClient.createTasks(newTaskData);
      
      alert("Задача успешно создана!");
      navigate('/'); 
    } catch (error) {
      console.error("Ошибка при создании задачи:", error);
      alert("Ошибка при сохранении. Проверьте консоль (F12) и запущен ли Python.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h1>Конструктор задачи</h1>
      <div className="grid cols-2">
        <div className="card">
          <h3>Основное</h3>
          
          <label className="muted">Название</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Например: Сумма двух чисел" />

          <label className="muted" style={{ display: 'block', marginTop: 12 }}>Тема</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option>Массивы</option><option>Списки</option><option>Графы</option>
            <option>ДП</option><option>Строки</option><option>SQL</option>
          </select>

          <label className="muted" style={{ display: 'block', marginTop: 12 }}>Сложность</label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label className="muted" style={{ display: 'block', marginTop: 12 }}>Time Limit (сек)</label>
          <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} />

          <label className="muted" style={{ display: 'block', marginTop: 12 }}>Memory Limit (МБ)</label>
          <input type="number" value={memLimit} onChange={(e) => setMemLimit(Number(e.target.value))} />
        </div>

        <div className="card">
          <h3>Условие</h3>
          <textarea 
            style={{ minHeight: 260 }} 
            value={statement} 
            onChange={(e) => setStatement(e.target.value)} 
            placeholder="Опишите условие задачи..."
          />
          <div style={{ marginTop: 12, display: 'flex', gap: '10px' }}>
            <button className="btn" onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Сохранение...' : 'Сохранить задачу'}
            </button>
            <button className="btn secondary" type="button">Добавить тест-кейс (в разработке)</button>
          </div>
        </div>
      </div>
    </>
  );
}