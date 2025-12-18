<template>
    <div class="pokemons">
        <!-- Si YA hay pokemon -->
        <img
            v-if="pokemon"
            :src="pokemon.sprites.front_default"
            alt="Pokemon"
            width="250"
        />
        <!-- Si AÚN NO hay pokemon -->
        <img
            v-else
            src="https://dummyimage.com/250x250"
            alt="No hay imagen"
            width="250"
        />
        
        <p v-if="pokemon">{{ pokemon.name }}</p>
        <p v-if="!pokemon">xxxxxxx</p>
    </div>
  
</template>

<script>
export default {
    name: 'SlotPokemon',
    props: {
        pokemon: Object
    }

}
</script>


<style scoped>
.pokemons {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
}

</style>