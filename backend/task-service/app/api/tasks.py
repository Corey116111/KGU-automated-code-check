from typing import List
from fastapi import APIRouter, HTTPException
from db.database import fake_database
from app.models.tasks import Task, TaskBase
import uuid

router = APIRouter()

@router.get("", response_model=List[Task])
async def get_all_tasks():
    """Возвращает список всех доступных задач"""
    return list(fake_database.values())

@router.get("/{task_id}", response_model=Task)
async def get_task_by_id(task_id: str):
	"""Возвращает конкретную задачу по ее айди"""
	task = fake_database.get(task_id)

	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")

	return task


@router.post("", response_model=Task)
async def create_task(new_task: TaskBase):
	"""Создает новую задачу и добавляет ее в базу"""
	task_id = str(uuid.uuid4())

	created_task = Task(id=task_id, **new_task.model_dump())

	fake_database[task_id] = created_task

	return created_task
