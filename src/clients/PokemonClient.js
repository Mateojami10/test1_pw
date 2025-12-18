import axios from 'axios';

const consumirPokemon = async (id) => {
  const resp = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(r => r.data);
  return resp;
};

export async function consumirApiFacade(id) {
    return await consumirPokemon(id);
}