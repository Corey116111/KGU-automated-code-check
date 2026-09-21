from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title='Task Service', description='Микросервис для управления учебными задачами', version='1.0.0')


class TaskBase(BaseModel):
	title: str
	topic: str
	difficulty: str
	description: str
	time_limit: int = 2 # секунды
	memory_limit: int = 256 # лимит памяти наз адачу


class Task(TaskBase):
	id: str	# айдишник конкретной задачи


fake_database: List[Task] = [
	Task(
		id = '1',
		title='Сумма элементов массива',
		topic='Массивы',
		difficulty='Easy',
		description='Дан массив целых чисел. Найдите сумму всех элементов'
	),
	Task(
        	id='2', 
        	title="Обратный связный список", 
        	topic="Списки", 
        	difficulty='Hard', 
        	description="Дан односвязный список. Разверните его так, чтобы последний элемент стал первым."
    	)
]

@app.get("/api/tasks", response_model=List[Task])
async def get_all_tasks():
    """Возвращает список всех доступных задач"""
    return fake_database

@app.get("/api/tasks/{task_id}", response_model=Task)
async def get_task_by_id(task_id: str):
	"""Возвращает конкретную задачу по ее айди"""
	for task in fake_database:
		if task.id == task_id:
			return task
	raise HTTPException(status_code=404, detail="Задача не найдена")


@app.post("/api/tasks", response_model=Task)
async def create_task(new_task: TaskBase):
	"""Создает новую задачу и добавляет ее в базу"""
	task_id = str(uuid.uuid4())

	created_task = Task(id=task_id, **new_task.dict())

	fake_database.append(created_task)

	return created_task
