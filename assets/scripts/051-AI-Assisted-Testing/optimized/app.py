from task_store import TaskStore


def process_tasks(store, n):
    for i in range(n):
        store.add_task(i, "pending")

    for i in range(n):
        store.get_task(i)

    for i in range(n):
        store.mark_done(i)


def run_app():
    store = TaskStore()

    for i in range(1000):
        store.add_task(i, f"Task {i}")

    store.get_task(10)
    store.mark_done(10)

    return store


def main():
    run_app()
    print("App finished")
    return 0


if __name__ == "__main__":
    main()
