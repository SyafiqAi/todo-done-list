<template>
    <div class="tli-container" 
        @mouseover="hover = true" @mouseleave="hover = false"
    >
        <div class="tli" @click="taskClicked">
            {{ item.task }}
            <!-- <div v-if="item.done" class="date-display">
                {{ date }}
            </div> -->
        </div>
        <div :class="{invisible: !hover}" class="delete-button"
            @click="deleteClicked"
        >✖</div>
    </div>
    <div style="height:10px" class="spacer"></div>

</template>

<script setup>
    import { computed, ref } from "vue";
    import { deleteTask, toggleDone } from "../firebase"
    // import 

    const hover = ref(false)

    const props = defineProps(['item'])
    
    function taskClicked() {
        toggleDone(props.item.id, props.item.done, Date.now())
    }

    function deleteClicked() {
        deleteTask(props.item.id)
    }

    const date = computed(() => {
        var d = props.item.done ? props.item.dateCompleted : props.item.dateAdded;
        d = new Date(d)
        d = d.toLocaleString()
        // d = props.item.done ? 'Completed: ' + d : 'Added: ' + d;
        return d;
    })

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
        flex-direction: column;
        /* align-items: flex-end; */
        padding: 5px;
        width: fit-content;
        border-right: 1px solid hsla(160, 100%, 37%, 0.5);
        border-bottom: 1px solid hsla(160, 100%, 37%, 0.5);
        /* margin-bottom: 10px; */
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
    .date-display {
        opacity: 0.5;
        font-size: 0.7em;
    }
</style>