from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship         
from db.database import Base
from app.models.tasks import task_languages


class LanguageModel(Base):
    __tablename__ = "languages"

    language_id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    tasks = relationship("TaskModel", secondary=task_languages, back_populates="allowed_languages")