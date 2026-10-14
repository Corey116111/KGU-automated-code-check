from sqlalchemy import Column, String, Integer, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db.database import Base  

class TestCaseModel(Base):
    __tablename__ = "test_cases"

    test_id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String, ForeignKey("tasks.task_id", ondelete="CASCADE"), nullable=False)
    input_data = Column(String, nullable=False)
    expected_output = Column(String, nullable=False)   
    is_public = Column(Boolean, default=True, nullable=False)  

    task = relationship("TaskModel", back_populates="test_cases")