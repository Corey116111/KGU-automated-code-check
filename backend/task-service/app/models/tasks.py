from pydantic import BaseModel

class TaskBase(BaseModel):
	title: str
	topic: str
	difficulty: str
	description: str
	time_limit: int = 2 # секунды
	memory_limit: int = 256 # лимит памяти на задачу


class Task(TaskBase):
	id: str	# айдишник конкретной задачи