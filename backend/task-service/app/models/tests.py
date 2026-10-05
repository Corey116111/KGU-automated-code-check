from pydantic import BaseModel
from typing import Optional

class TestCaseBase(BaseModel):
    input_data: str          # входные данные
    expected_output: str     # ожидаемый результат
    is_public: bool = True         # показывать ли студенту


class TestCase(TestCaseBase):
    test_id: str


class TestCaseUpdate(BaseModel):
    input_data: Optional[str] = None 
    expected_output: Optional[str] = None  
    is_public: Optional[bool] = None      
