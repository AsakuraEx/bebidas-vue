import { ref, watch, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificacion";

export const useFavoritosStore = defineStore('favoritos', ()=>{

    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificacion = useNotificacionStore()
    const favoritos = ref([])

    onMounted(()=>{
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, ()=>{
        sincronizarLocalStorage()
    },{
        deep: true
    })

    function sincronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function existeFavorito(id) {
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter( favorito => favorito.idDrink !== bebidas.bebida.idDrink);
        notificacion.show = true;
        notificacion.texto = 'Se eliminó la receta de sus favoritos'
    }

    function agregarFavorito() {
        favoritos.value.push(bebidas.bebida)
        notificacion.show = true;
        notificacion.texto = 'Se ha agregado la receta a sus favoritos'
    }

    function handleClickFavorito(e) {
        if(existeFavorito(bebidas.bebida.idDrink)){
            eliminarFavorito()
            //e.target.textContent = 'Agregar a Favoritos'
        }else{
            agregarFavorito()
            //e.target.textContent = 'Eliminar de Favoritos'
        }
        modal.modal = false
    }

    const noFavoritos = computed(()=> favoritos.value.length === 0)

    return {
        favoritos,
        noFavoritos,
        handleClickFavorito,
        existeFavorito
    }
})