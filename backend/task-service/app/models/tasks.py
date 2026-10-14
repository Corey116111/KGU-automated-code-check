from sqlalchemy import Table, Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base  


task_languages = Table(
    "task_languages",
    Base.metadata,
    Column("task_id", String(36), ForeignKey("tasks.task_id", ondelete="CASCADE"), primary_key=True),
    Column("language_id", Integer, ForeignKey("languages.language_id", ondelete="CASCADE"), primary_key=True),
)


class TaskModel(Base):
    __tablename__ = "tasks"

    task_id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    topic = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    description = Column(String, nullable=False)
    time_limit = Column(Integer, default=20)
    memory_limit = Column(Integer, default=256)
    archived = Column(Boolean, default=False)

    test_cases = relationship(
        "TestCaseModel",
        back_populates="task",
        cascade="all, delete-orphan"
    )

    allowed_languages = relationship(
        "LanguageModel", 
        secondary=task_languages
    )