from pydantic import BaseModel
from typing import Optional

class TaskBase(BaseModel):
	title: str
	topic: str
	difficulty: str
	description: str
	time_limit: int = 20 # секунды
	memory_limit: int = 256 # лимит памяти на задачу
	archived: bool = False


class Task(TaskBase):
	task_id: str	# айдишник конкретной задачи


class TaskUpdate(BaseModel):
	title: Optional[str] = None
	topic: Optional[str] = None
	difficulty: Optional[str] = None
	description: Optional[str] = None
	time_limit: Optional[int] = None
	memory_limit: Optional[int] = None
	archived: Optional[bool] = None