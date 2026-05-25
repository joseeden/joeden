from task_store import TaskStore


def run_app():
    store = TaskStore()

    for i in range(1000):
        store.add_task(i, f"Task {i}")

    store.get_task(10)
    store.mark_done(10)

    return store


if __name__ == "__main__":
    run_app()
    print("App finished")
