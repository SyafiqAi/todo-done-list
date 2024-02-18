<template>
    <div class="about">
    <input v-model="text" @keyup.enter="getInput">
    <h2>Todo</h2>
    <ul>
        <li v-for="item in todoList" @click="toggleDone(item.id, item.done)" :key="item.id"> {{ item.task }} </li>
    </ul>

    <h2>Done</h2>
    <ul>
        <li v-for="item in doneList" @click="toggleDone(item.id, item.done)" :key="item.id"> {{ item.task }} </li>
    </ul>
    </div>
</template>

<script setup>
  import { ref,computed } from 'vue'
  import { addTask, getTasks, toggleDone } from '@/firebase'

  const text = ref('')
  function getInput() {
    if (text.value == '') 
      return

    const task = {
      task: text.value,
      done: false,
      dateAdded: new Date().toLocaleString(),
      dateCompleted: null
    }
    text.value = ''
    addTask(task)
  }

  const taskList = getTasks()

  const doneList = computed(() =>{
    return taskList.value.filter((item)=>{
      return item.done == true
    })
  })

  const todoList = computed(() =>{
    return taskList.value.filter((item)=>{
      return item.done == false
    })
  })

  

</script>

<style>

</style>