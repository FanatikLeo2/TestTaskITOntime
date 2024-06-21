<template>
  <div id="app">
    <h1>Task Manager</h1>
    <TaskForm @save="saveTask" :task="selectedTask || {}" />
    <TaskList :tasks="tasks" @edit="editTask" @task-deleted="fetchTasks" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
// eslint-disable-next-line
import { Task, getTasks, createTask, updateTask, deleteTask } from './services/taskService';

export default defineComponent({
  name: 'App',
  components: {
    TaskForm,
    TaskList
  },
  setup() {
    const tasks = ref<Task[]>([]);
    const selectedTask = ref<Task | null>(null);

    const fetchTasks = async () => {
      tasks.value = await getTasks();
    };

    const saveTask = async (task: Task) => {
      if (task._id) {
        await updateTask(task._id, task);
      } else {
        await createTask(task);
      }
      fetchTasks();
      selectedTask.value = null;
    };

    const editTask = (task: Task) => {
      selectedTask.value = { ...task };
    };

    onMounted(fetchTasks);

    return {
      tasks,
      selectedTask,
      saveTask,
      editTask,
      fetchTasks
    };
  }
});
</script>
