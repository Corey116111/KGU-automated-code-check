from typing import List
from fastapi import APIRouter, HTTPException
from db.database import fake_database
from app.models.tasks import Task, TaskBase, TaskUpdate
from app.models.tests import TestCase, TestCaseBase, TestCaseUpdate
import uuid

router = APIRouter()

@router.get("", response_model=List[Task], tags=['Tasks'])
async def get_all_tasks():
    """Возвращает список всех доступных задач"""
    return list(fake_database.values())

@router.get("/{task_id}", response_model=Task, tags=['Tasks'])
async def get_task_by_id(task_id: str):
	"""Возвращает конкретную задачу по ее айди"""
	task = fake_database.get(task_id)

	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")

	return task


@router.post("", response_model=Task, tags=['Tasks'])
async def create_task(new_task: TaskBase):
	"""Создает новую задачу и добавляет ее в базу"""
	task_id = str(uuid.uuid4())

	created_task = Task(id=task_id, **new_task.model_dump())

	fake_database[task_id] = created_task

	return created_task


@router.patch("/{task_id}/edit", response_model=Task, tags=['Tasks'])
async def edit_task(task_id: str, payload: TaskUpdate):
	"""Редактирует существующую задачу и сохраняет ее"""
	task = fake_database.get(task_id)

	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")

	update_data = payload.model_dump(exclude_unset=True)

	if not update_data:
		return task

	updated_task = task.model_copy(update=update_data)

	fake_database[task_id] = updated_task

	return updated_task


@router.delete("/{task_id}", response_model=Task, tags=['Tasks'])
async def delete_task(task_id: str):
	if task_id not in fake_database:
		raise HTTPException(status_code=404, detail="Задача не найдена")
	del fake_database[task_id]
	return {"ok": True, "deleted_id": task_id}


@router.get("/{task_id}/test-cases", response_model=List[TestCase], tags=['Tests'])
async def get_all_test_cases(task_id: str):
	pass


@router.post("/{task_id}/test-cases", response_model=TestCase, tags=['Tests'])
async def create_test_case(task_id: str, new_test: TestCaseBase):
	pass


@router.get("/{task_id}/test-cases/{test_id}", response_model=TestCase, tags=['Tests'])
async def get_test_case(task_id: str, test_id: str):
	pass


@router.patch("/{task_id}/test-cases/{test_id}", response_model=TestCase, tags=['Tests'])
async def update_test_case(task_id: str, test_id: str, payload: TestCaseUpdate):
	pass


@router.delete("/{task_id}/test-cases/{test_id}", response_model=TestCase, tags=['Tests'])
async def delete_test_case(task_id: str, test_id: str):
	pass