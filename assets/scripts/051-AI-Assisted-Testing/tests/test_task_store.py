import pytest
from task_store import TaskStore
from app import run_app


# -----------------------
# Unit Tests
# -----------------------

def test_add_task():
    store = TaskStore()
    store.add_task(1, "pending")

    task = store.get_task(1)
    assert task is not None
    assert task["id"] == 1
    assert task["name"] == "pending"
    assert task["done"] is False


def test_get_task_missing():
    store = TaskStore()
    assert store.get_task(999) is None


def test_mark_done():
    store = TaskStore()
    store.add_task(1, "pending")

    result = store.mark_done(1)

    assert result is True
    assert store.get_task(1)["done"] is True


def test_mark_done_missing_task():
    store = TaskStore()
    result = store.mark_done(123)

    assert result is False


def test_get_task_not_found():
    store = TaskStore()
    assert store.get_task(999) is None


def test_mark_done_not_found():
    store = TaskStore()
    result = store.mark_done(999)
    assert result is False


def test_main():
    from app import main
    assert main() == 0

# -----------------------
# Integration Test
# -----------------------


def test_run_app_integration():
    store = run_app()

    task_10 = store.get_task(10)

    assert task_10 is not None
    assert task_10["done"] is True


def test_run_app_large():
    store = run_app()

    task_10 = store.get_task(10)

    assert task_10 is not None
    assert task_10["done"] is True

    task_0 = store.get_task(0)
    task_999 = store.get_task(999)

    assert task_0["done"] is False
    assert task_999["done"] is False


def test_process_tasks():
    from app import process_tasks  # import the function directly

    store = TaskStore()
    process_tasks(store, 10)

    assert store.get_task(0)["done"] is True
    assert store.get_task(9)["done"] is True
