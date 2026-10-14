from pydantic import BaseModel
from typing import Optional

class TestCaseBase(BaseModel):
    input_data: str       
    expected_output: str     
    is_public: bool = True      


class TestCase(TestCaseBase):
    test_id: int
    task_id: str
    model_config = {'from_attributes': True}


class TestCaseUpdate(BaseModel):
    input_data: Optional[str] = None 
    expected_output: Optional[str] = None  
    is_public: Optional[bool] = None      
