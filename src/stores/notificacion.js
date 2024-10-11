import { ref, watch, watchEffect } from "vue";
import { defineStore } from "pinia";

export const useNotificacionStore = defineStore('notificacion', ()=>{

    const texto = ref('')
    const error = ref(false)
    const show = ref(false)

    watch(show, ()=>{
        if(show.value){
            setTimeout(() => {
                show.value = false;
                error.value = false;
                texto.value = '';
            }, 3000);
        }
    })

    // watchEffect(()=>{
    //     if(show.value){
    //         setTimeout(() => {
    //             show.value = false;
    //             error.value = false;
    //             texto.value = '';
    //         }, 3000);
    //     }
    // })

    return {
        texto,
        error,
        show
    }
})