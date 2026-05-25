class TaskStore:
    def __init__(self):
        self.tasks = []

    def add_task(self, task_id, name, done=False):
        self.tasks.append({
            "id": task_id,
            "name": name,
            "done": done
        })

    def get_task(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                return task
        return None

    def mark_done(self, task_id):
        for task in self.tasks:
            if task["id"] == task_id:
                task["done"] = True
                return True
        return False
