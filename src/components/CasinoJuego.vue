<template>
    <div class="casino-container">
        <h2>Casino</h2>

        <!-- Pantalla principal del juego -->
        <div v-if="!juegoTerminado && !juegoGanado">
            <p>Intentos: {{ intentos }}/5</p>
            <p>Puntos: {{ puntos }}</p>

            <div class="casino-slots">
                <SlotPokemon :pokemon="pokemon1" />
                <SlotPokemon :pokemon="pokemon2" />
                <SlotPokemon :pokemon="pokemon3" />
            </div>

            <div class="botones">
                <button @click="jugar">JUGAR</button>
            </div>
        </div>

        <!-- Pantalla cuando pierde -->
        <div v-if="juegoTerminado" class="fin">
            <h3>Haz utilizado tus 5 intentos</h3>
            <h4>Juego terminado, intentalo nuevamente</h4>
            <button @click="nuevoJuego">NUEVO JUEGO</button>
        </div>
        
        <!-- Pantalla cuando gana -->
        <div v-if="juegoGanado" class="gano">
            <p>Puntaje: {{ puntos }}</p>
            <h3>¡Felicidades, has ganado el juego!</h3>
            <button @click="nuevoJuego">NUEVO JUEGO</button>
        </div>

        
    </div>
  
</template>

<script>
import { consumirApiFacade } from '@/clients/PokemonClient';
import SlotPokemon from '@/components/SlotPokemon.vue';
export default {
    name: 'CasinoJuego',
    components: {
        SlotPokemon
    },
    data() {
        return {
            pokemonesDisponibles: [1,4,5,7,8],
            pokemon1: null,
            pokemon2: null,
            pokemon3: null,
            intentos: 0,
            puntos: 0,
            
            juegoTerminado: false,
            juegoGanado: false,
            
        };
    },
    methods: {
        randomIndex() {
            return Math.floor(
            Math.random() * this.pokemonesDisponibles.length);
    },
        async jugar() {
            //verificar si el juego ya terminó
            if(this.juegoTerminado || this.juegoGanado){
                return;
            }

            this.intentos += 1;

            const id1 = this.pokemonesDisponibles[this.randomIndex()];
            const id2 = this.pokemonesDisponibles[this.randomIndex()];
            const id3 = this.pokemonesDisponibles[this.randomIndex()];
            // Consumir la API para cada resultado
            this.pokemon1 = await consumirApiFacade(id1);
            this.pokemon2 = await consumirApiFacade(id2);
            this.pokemon3 = await consumirApiFacade(id3);

            // Lógica de puntos
            //si tengo mas de 3 iguales gano 5 puntos
            if(id1 === id2 && id2 === id3){
                this.puntos += 5;
            }
            //si tengo 2 iguales gano 2 puntos
            else if(id1 === id2 || id1 === id3 || id2 === id3){
                this.puntos += 2;
            }
            //si no tengo ninguno igual no gano puntos
            else{
                this.puntos += 0;
            }

            //Gano si tiene mas de 10 puntos
            if(this.puntos >= 10){
                this.juegoGanado = true;
            }


            //Perdio si llega a 5 intentos sin obtener 10 puntos
            if(this.intentos >= 5 && this.puntos < 10){
                this.juegoTerminado = true;
            }

          

            
        },
        nuevoJuego() {
            this.intentos = 0;
            this.puntos = 0;
            this.pokemon1 = null;
            this.pokemon2 = null;
            this.pokemon3 = null;
            this.juegoTerminado = false;
            this.juegoGanado = false;
        }
    }

}
</script>

<style scoped>
.casino-slots {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
}
.botones {
    margin-top: 20px;
    display: flex;
    gap: 10px;
    justify-content: center;
}
.fin {
    border: 2px solid black;
    color: red;
    text-align: center;
}
.gano {
    border: 2px solid black;
    color: rgb(43, 12, 144);
    text-align: center;
}

</style>