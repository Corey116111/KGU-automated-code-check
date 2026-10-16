from typing import List
from fastapi import APIRouter, HTTPException, Depends
from db.database import get_db
from sqlalchemy.orm import Session
from app.schemas.tasks import Task, TaskBase, TaskUpdate
from app.schemas.tests import TestCase, TestCaseBase, TestCaseUpdate
from app.models.tasks import TaskModel
from app.models.tests import TestCaseModel
from app.models.language import LanguageModel
from app.schemas.language import Language
import uuid


router = APIRouter()


@router.get("", response_model=List[Task], tags=['Tasks'])
def get_all_tasks(db: Session = Depends(get_db)):
    """Возвращает список всех доступных задач"""

    return db.query(TaskModel).all()

@router.get("/{task_id}", response_model=Task, tags=['Tasks'])
def get_task_by_id(task_id: str, db: Session = Depends(get_db)):
	"""Возвращает конкретную задачу по ее айди"""

	task = db.query(TaskModel).filter(TaskModel.task_id == task_id).first()

	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")
	
	return task


@router.post("", response_model=Task, tags=['Tasks'])
def create_task(new_task: TaskBase, db: Session = Depends(get_db)):
	"""Создает новую задачу и добавляет ее в базу"""

	task_id = str(uuid.uuid4())
	created_task = TaskModel(task_id=task_id, **new_task.model_dump())

	db.add(created_task)
	db.commit()
	db.refresh(created_task)

	return created_task


@router.patch("/{task_id}/edit", response_model=Task, tags=['Tasks'])
def edit_task(task_id: str, payload: TaskUpdate, db: Session = Depends(get_db)):
	"""Редактирует существующую задачу и сохраняет ее"""
	task = db.query(TaskModel).filter(TaskModel.task_id == task_id).first()

	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")

	update_data = payload.model_dump(exclude_unset=True)

	if not update_data:
		return task

	for k, v in update_data.items():
		setattr(task, k, v)

	db.commit()
	db.refresh(task)

	return task


@router.delete("/{task_id}", status_code=204, tags=['Tasks'])
def delete_task(task_id: str, db: Session = Depends(get_db)):
	"""Удаляет задачу из базы данных"""
	task = db.query(TaskModel).filter(TaskModel.task_id == task_id).first()
	
	if not task:
		raise HTTPException(status_code=404, detail="Задача не найдена")
	
	db.delete(task)
	db.commit()

	return 


@router.get("/{task_id}/test-cases", response_model=List[TestCase], tags=['Tests'])
def get_all_test_cases(task_id: str, db: Session = Depends(get_db)):
	"""Возвращает все тест-кейсы для задачи"""
	return db.query(TestCaseModel).filter(TestCaseModel.task_id == task_id).all()


@router.get("/{task_id}/test-cases/{test_id}", response_model=TestCase, tags=['Tests'])
def get_test_case(task_id: str, test_id: int, db: Session = Depends(get_db)):
	"""Возвращает указанный тест-кейс для задачи"""

	test_case = db.query(TestCaseModel).filter(TestCaseModel.task_id == task_id, TestCaseModel.test_id == test_id).first()

	if not test_case:
		raise HTTPException(status_code=404, detail="Тест-кейс не найден")

	return test_case


@router.post("/{task_id}/test-cases", response_model=TestCase, tags=['Tests'])
def create_test_case(task_id: str, new_test: TestCaseBase, db: Session = Depends(get_db)):
    """Создаёт тест-кейс для указанной задачи"""
    task = db.query(TaskModel).filter(TaskModel.task_id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Задача не найдена")

    created_test_case = TestCaseModel(
        task_id=task_id,
        **new_test.model_dump(),
    )

    db.add(created_test_case)
    db.commit()
    db.refresh(created_test_case)

    return created_test_case


@router.patch("/{task_id}/test-cases/{test_id}", response_model=TestCase, tags=['Tests'])
def update_test_case(task_id: str, test_id: int, payload: TestCaseUpdate, db: Session = Depends(get_db)):
	"""Редактирует существующий тест-кейс и возвращает его"""
	test_case = db.query(TestCaseModel).filter(TestCaseModel.task_id == task_id, TestCaseModel.test_id == test_id).first()

	if not test_case:
		raise HTTPException(status_code=404, detail="Тест-кейс не найден")

	update_data = payload.model_dump(exclude_unset=True)

	if not update_data:
		return test_case

	for k, v in update_data.items():
		setattr(test_case, k, v)

	db.commit()
	db.refresh(test_case)

	return test_case


@router.delete("/{task_id}/test-cases/{test_id}", status_code=204, tags=['Tests'])
def delete_test_case(task_id: str, test_id: int, db: Session = Depends(get_db)):
	"""Удаляет тест-кейс у задачи из базы данных"""
	test_case = db.query(TestCaseModel).filter(TestCaseModel.task_id == task_id, TestCaseModel.test_id == test_id).first()
	
	if not test_case:
		raise HTTPException(status_code=404, detail="Тест-кейс не найден")
	
	db.delete(test_case)
	db.commit()

	return 


@router.get("/languages", response_model=List[Language], tags=['Languages'])
def get_languages(db: Session = Depends(get_db)):
    """Возвращает список языков программирования"""
	
    return db.query(LanguageModel).all()