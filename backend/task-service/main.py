from fastapi import FastAPI
from app.api.tasks import router

app = FastAPI(title='Task Service', description='Микросервис для управления учебными задачами', version='1.0.0')
app.include_router(router, prefix="/api/tasks")