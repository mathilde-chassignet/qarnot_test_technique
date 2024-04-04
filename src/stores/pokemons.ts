import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const usePokemonsStore = defineStore("pokemons", {
  state: () => {
    return { array: [] };
  },
  actions: {
    async getFirstGenPokemons(startID: number, amount: number) {
      try {
        if (startID > 141) {
          amount = 151 - startID;
        }
        console.log("amout: ", amount);
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${startID}&limit=${amount}`
        );
        data.results.forEach(async (pokemon) => {
          const { data } = await axios.get(pokemon.url);
          this.array.push(data);
        });
        console.log("First Gen Pokemon fetch completed");
      } catch (error) {
        console.log(error);
      }
    },
    getPokemon(id: number) {
      return this.array[id];
    },
  },
});
