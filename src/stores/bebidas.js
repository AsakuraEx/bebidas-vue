import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import axios from "axios";

export const useBebidasStore = defineStore('bebidas',()=>{

    const categorias = ref([])
    const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`;

    onMounted(async () => {
        const { data } = await axios(url);
        categorias.value = data.drinks;
        console.log(categorias.value)
    }

    )

    return { 
        categorias 
    }
})