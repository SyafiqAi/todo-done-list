<template>
    <div class="tli-container" 
        @mouseover="hover = true" @mouseleave="hover = false"
    >
        <div class="tli" @click="taskClicked">
            {{ item.task }}
        </div>
        <div :class="{invisible: !hover}" class="delete-button"
            @click="deleteClicked"
        >✖</div>
    </div>

</template>

<script setup>
    import { ref } from "vue";
    import { deleteTask, toggleDone } from "../firebase"
    // import 

    const hover = ref(false)

    const props = defineProps(['item'])
    
    function taskClicked() {
        toggleDone(props.item.id, props.item.done, new Date())
    }
    function deleteClicked() {
        deleteTask(props.item.id)
    }
</script>
<style scoped>
    .tli:hover {
        /* transition: 0.4s; */
        background-color: hsla(160, 100%, 37%, 0.2);
        cursor: pointer;
    }
    .tli {
        /* color: hsla(160, 100%, 37%, 1); */
        font-size: 105%;
        display: flex;
        padding: 5px;
        width: fit-content;
        border-right: 1px solid hsla(160, 100%, 37%, 0.5);
        border-bottom: 1px solid hsla(160, 100%, 37%, 0.5);
    }
    .tli-container {
        display: flex;
        width: fit-content
    }
    .delete-button {
        padding: 0px 10px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .invisible {
        visibility: hidden;
    }
</style>