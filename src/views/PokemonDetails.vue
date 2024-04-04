<template>
  <v-container>
    <v-img :src="pokemon?.sprites.front_default" width="300" />
    {{ pokemon?.name }}
    #{{ pokemon?.id }}
    <div v-for="type in pokemon?.types">
      {{ type.type.name }}
    </div>
    height: {{ pokemon?.height }} weight: {{ pokemon?.weight }}
    <div v-for="ability in pokemon?.abilities">
      {{ ability.ability.name }}
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePokemonsStore } from "@/stores/pokemons";
import { useRoute } from "vue-router";

const route = useRoute();
const pokemons = usePokemonsStore();
const pokemon = ref(null);

onMounted(() => {
  pokemon.value = pokemons.getPokemon(route.params.id);
  console.log(pokemon.value);
  console.log("Pokemon Details is mounted");
});
</script>
