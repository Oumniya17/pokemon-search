const form = document.getElementById('pokemon-form');
const input = document.getElementById('pokemon-name');
const pokemonInfoDiv = document.getElementById('pokemon-info');

async function fetchPokemonData(pokemonName) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

        if (!response.ok) {
            throw new Error('Pokémon no encontrado');
        }

        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        pokemonInfoDiv.innerHTML = `<p>${error.message}</p>`;
        pokemonInfoDiv.style.display = 'block';
    }
}

function displayPokemonInfo(pokemon) {
    const { name, sprites, types, abilities } = pokemon;

    // Formatear tipos y habilidades para mostrarlos como texto
    const formattedTypes = types.map(type => type.type.name).join(', ');
    const formattedAbilities = abilities.map(ability => ability.ability.name).join(', ');

    pokemonInfoDiv.innerHTML = `
        <img src="${sprites.front_default}" alt="${name}">
        <h3>${name}</h3>
        <p>Tipo(s): ${formattedTypes}</p>
        <p>Habilidad(es): ${formattedAbilities}</p>
    `;

    pokemonInfoDiv.style.display = 'block';
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const pokemonName = input.value.trim();

    if (pokemonName) {
        fetchPokemonData(pokemonName);
    } else {
        pokemonInfoDiv.innerHTML = '<p>Por favor, ingresa un nombre de Pokémon.</p>';
        pokemonInfoDiv.style.display = 'block';
    }
});

