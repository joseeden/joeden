class TaskStore:
    def __init__(self):
        self.tasks = {}

    def add_task(self, task_id, name):
        self.tasks[task_id] = {
            "id": task_id,
            "name": name,
            "done": False
        }

    def get_task(self, task_id):
        return self.tasks.get(task_id)

    def mark_done(self, task_id):
        if task_id in self.tasks:
            self.tasks[task_id]["done"] = True
            return True
        return False


print("USING OPTIMIZED VERSION")
