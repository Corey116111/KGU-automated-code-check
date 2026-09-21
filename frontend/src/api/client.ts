import axios from 'axios';
import type { Task, User, Submission, SuspiciousCase } from '../types';

const api = axios.create({ baseURL: '/api' });

export const mockUser: User = { id: 'u1', name: 'Иван Петров', role: 'student', elo: 1450 };

export const mockSuspicious: SuspiciousCase[] = [
  { id: 's1', studentId: 'u7', taskId: 't2', reason: 'AST-сходство 87% с решением другого студента', severity: 'high',   createdAt: '2026-04-12' },
  { id: 's2', studentId: 'u9', taskId: 't3', reason: 'Решение за 14 сек, объём 68 строк',            severity: 'medium', createdAt: '2026-04-12' },
  { id: 's3', studentId: 'u2', taskId: 't1', reason: 'Совпадение IP с одногруппником',                severity: 'low',    createdAt: '2026-04-11' },
];

export const apiClient = {
  getTasks: async (): Promise<Task[]> => {
    const response = await api.get('/tasks');
    return response.data;
  },
  createTasks: async (taskData: any): Promise<Task> => {
    const response = await api.post('/tasks',taskData);
    return response.data;
  },
  getUser:  async (): Promise<User> => mockUser,
  submitCode: async (_taskId: string, _code: string): Promise<Submission> => ({
    id: 'sub-' + Date.now(),
    taskId: _taskId,
    studentId: mockUser.id,
    verdict: 'AC',
    passed: 10,
    total: 10,
    timeMs: 42,
    memoryKb: 3276,
  }),
  getSuspicious: async (): Promise<SuspiciousCase[]> => mockSuspicious,
};

export default apiClient;
