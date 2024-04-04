<template>
  <v-container>
    <v-row>
      <v-col v-if="pokemons?.array.length" v-for="pokemon in pokemons?.array">
        <v-card
          hover
          @click="router.push({ name: 'pokemon', params: { id: pokemon.id } })"
        >
          <v-img :src="pokemon?.sprites.front_default" width="150"/>
          {{ pokemon?.name }} #{{ pokemon?.id }} </br>
          height: {{ pokemon?.height }} </br>
           weight: {{ pokemon?.weight }} </br>
        <div v-for="ability in pokemon?.abilities">
          {{ ability.ability.name }}
         </div>
       </v-card>
      </v-col>
    </v-row>
    <v-btn @click="handlePreviousPage">PREV PAGE</v-btn>
    <v-btn @click="handleNextPage">NEXT PAGE</v-btn>
  </v-container>
</template>

<script setup>
import { onMounted, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePokemonsStore } from "@/stores/pokemons";

const pokemons = usePokemonsStore();
const router = useRouter();
const route = useRoute();

function getPokemons() {
  console.log("get pokemon: page=", route.query.page);
  let startID = route.query.page ? route.query.page * 10 : 0;
  pokemons.getFirstGenPokemons(startID, 10);
}

function handleNextPage() {
  let nextPage = route.query.page ? Number(route.query.page) + 1 : 1;
  router.push({ path: "/", query: { page: nextPage } });
  getPokemons();
}

function handlePreviousPage() {
  let nextPage = route.query.page ? Number(route.query.page) - 1 : 0;
  nextPage = nextPage < 0 ? 0 : nextPage;
  router.push({ path: "/", query: { page: nextPage } });
  getPokemons();
}

onMounted(() => {
  console.log(`The Home is mounted.`);
  getPokemons();
});
</script>
