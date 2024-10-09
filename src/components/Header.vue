<script setup>
    import { RouterLink, useRoute } from 'vue-router';
    import { computed } from 'vue';
    import { useBebidasStore } from '@/stores/bebidas';

    const route = useRoute();
    const store = useBebidasStore();

    const paginaInicio = computed(()=> route.name === 'inicio');

    const handleSubmit = () => {
        //TO DO: Validar

        store.obtenerRecetas();
    }
    
</script>

<template>

    <header class="bg-slate-700"
    :class="{header: paginaInicio}">
        <div class="mx-auto container px-5 py-16">

            <div class="flex justify-between items-center">

                <div>
                    <RouterLink :to="{name: 'inicio'}">
                        <img src="/public/img/logo.svg" alt="logotipo" class="w-32">
                    </RouterLink>

                </div>

                <nav class="flex gap-4">
                    <RouterLink 
                        class="text-white uppercase font-bold"
                        active-class="text-orange-500"
                        :to="{name: 'inicio'}"
                    >
                        Inicio
                    </RouterLink>

                    <RouterLink 
                        class="text-white uppercase font-bold"
                        :to="{name: 'favoritos'}"
                        active-class="text-orange-500"
                    >
                        Favoritos
                    </RouterLink>

                </nav>

            </div>

            <form 
                v-if="paginaInicio"
                class="md:w-1/2 2xl:2-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-extrabold text-lg"
                        for="ingrediente"
                    >
                        Nombre o ingredientes
                    </label>
                    <input 
                        type="text"
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente: ej. Vodka, Tequila, etc"
                        v-model="store.busqueda.nombre"
                    >
                </div>

                <div class="space-y-4">
                    <label 
                        class="block text-white uppercase font-extrabold text-lg"
                        for="categoria"
                    >
                        Categoria
                    </label>
                    <select 
                        id="ingrediente"
                        class="p-3 w-full rounded-lg focus:outline-none"
                        v-model="store.busqueda.categoria"
                    >
                        <option value="">-- Seleccione --</option>
                        <option 
                            v-for="categoria in store.categorias" 
                            :key="categoria.strCategory"
                            :value="categoria.strCategory"
                        >
                            {{ categoria.strCategory }}
                        </option>
                    </select>
                </div>

                <input
                    type="submit"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer 
                    text-white font-extrabold w-full p-2 roundedlg uppercase"
                    value="Buscar recetas"
                />
            </form>
        
        </div>

    </header>

</template>

<style>
    .header {
        background-image: url('../../public/img/bg.jpg');
        background-size: cover;
        background-position: center;
    }

    .text-white {
        color: white;
    }
     
    .text-orange-500 {
        color: orange;
    }
     
    /* Estilo para cuando el enlace está activo */
    .text-orange-500.font-bold {
        font-weight: bold;
    }

</style>

