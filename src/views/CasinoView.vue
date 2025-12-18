<template>
    <div class="view-container">
        <CasinoJuego/>
    </div>
  
</template>

<script>
import CasinoJuego from '@/components/CasinoJuego.vue'; 

export default {
    components: {
        CasinoJuego
    }
}
</script>

<style scoped>

.view-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid black;
   
}

</style>