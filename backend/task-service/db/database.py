from typing import Dict
from app.models.tasks import Task

fake_database: Dict[str, Task] = {
	'1': Task(
		id = '1',
		title='Сумма элементов массива',
		topic='Массивы',
		difficulty='Easy',
		description='Дан массив целых чисел. Найдите сумму всех элементов'
	),
	'2': Task(
        	id='2', 
        	title="Обратный связный список", 
        	topic="Списки", 
        	difficulty='Hard', 
        	description="Дан односвязный список. Разверните его так, чтобы последний элемент стал первым."
    	)
}