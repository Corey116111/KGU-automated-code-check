from pydantic import BaseModel


class LanguageBase(BaseModel):
    code: str
    name: str


class Language(LanguageBase):
    language_id: int

    model_config = {"from_attributes": True}