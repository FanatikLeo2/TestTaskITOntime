<template>
  <div>
    <table>
      <thead>
        <tr>
            <th>number</th>
          <th>Title</th>
          <th>Description</th>
          <th>Create Date</th>
          <th>Due Date</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <td>{{ task.number }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.createdAt }}</td>
          <td>{{ task.dueDate }}</td>
          <td>{{ task.tags?.join(', ') }}</td>
          <td>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task, deleteTask } from '@/services/taskService';

export default defineComponent({
  props: {
    tasks: {
      type: Array as () => Task[],
      required: true
    }
  },
  methods: {
    editTask(task: Task) {
      this.$emit('edit', task);
    },
    async deleteTask(id: string) {
      if (confirm('Are you sure you want to delete this task?')) {
        await deleteTask(id);
        this.$emit('task-deleted');
      }
    }
  }
});
</script>