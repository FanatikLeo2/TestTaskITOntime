<template>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="title">Title</label>
        <input v-model="localTask.title" id="title" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea v-model="localTask.description" id="description" required></textarea>
      </div>
      <div>
        <label for="dueDate">Due Date</label>
        <input type="date" v-model="localTask.dueDate" id="dueDate" />
      </div>
      <div>
        <label for="tags">Tags</label>
        <input v-model="tags" id="tags" @keydown.enter.prevent="addTag" />
        <div>
          <span v-for="tag in localTask.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <button type="submit">Save Task</button>
    </form>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { Task } from '@/services/taskService';
  
  export default defineComponent({
    props: {
      task: {
        type: Object as () => Task,
        required: true
      }
    },
    data() {
      return {
        localTask: {} as Task, 
        tags: ''
      };
    },
    watch: {
      task: {
        immediate: true,
        handler(newVal) {
          this.localTask = { ...newVal };
        }
      }
    },
    methods: {
      onSubmit() {
        this.$emit('save', this.localTask);
      },
      addTag() {
        if (this.tags) {
          this.localTask.tags = this.localTask.tags || [];
          this.localTask.tags.push(this.tags);
          this.tags = '';
        }
      }
    }
  });
  </script>