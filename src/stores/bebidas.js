import { defineStore } from "pinia";
import { ref, onMounted, reactive, computed } from "vue";
import apiService from "@/services/apiService";
import { useModalStore } from "./modal";

export const useBebidasStore = defineStore('bebidas',()=>{

    const modal = useModalStore()

    const categorias = ref([])
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    });

    const recetas = ref([])
    const bebida = ref({})

    onMounted(async () => {
        const { data } = await apiService.obtenerCategorias();
        categorias.value = data.drinks;
    })

    async function obtenerRecetas(){
        const { data: {drinks} } = await apiService.buscarRecetas(busqueda);
        recetas.value = drinks
    }

    async function seleccionarBebida(id){
        const { data: {drinks} } = await apiService.buscarReceta(id)
        bebida.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(()=>recetas.value.length === 0)

    return { 
        categorias,
        busqueda,
        recetas,
        bebida,
        noRecetas,
        obtenerRecetas,
        seleccionarBebida
    }
})