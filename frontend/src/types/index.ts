export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  elo: number;
}

export interface Task {
  id: string;
  title: string;
  difficulty: number; // 800..3000 (Elo-подобная)
  topic: string;      // "Циклы", "Массивы"...
  solved?: boolean;
}

export type Verdict =
  | 'AC'    // Accepted
  | 'WA'    // Wrong Answer
  | 'TLE'   // Time Limit
  | 'MLE'   // Memory Limit
  | 'RE'    // Runtime Error
  | 'CE';   // Compilation Error

export interface Submission {
  id: string;
  taskId: string;
  studentId: string;
  verdict: Verdict;
  passed: number;
  total: number;
  timeMs: number;
  memoryKb: number;
  suspicious?: boolean;
  reason?: string;
}

export interface SuspiciousCase {
  id: string;
  studentId: string;
  taskId: string;
  reason: string;
  severity: 'low' | 'medium' | 'high';
  createdAt: string;
}
