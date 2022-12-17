//Componets

import { Button } from "./components/Button";
import { Card } from "./components/Card";

//Styles
import './sass/App.scss';

//Icons
import { TiArrowLeftOutline } from "react-icons/ti";
import { TiArrowRightOutline } from "react-icons/ti";

//Hooks
import { useState, useEffect } from "react";


const App = () => {

    const [pokemonId, setPokemonId] = useState(1);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([])

    useEffect(() => { getEvolution(pokemonId) }, [pokemonId])

    async function getEvolution(id) {
        const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${id}/`)
        const data = await response.json()

        let pokemonEvoArray = []

        let pokemonLv1 = data.chain.species.name
        let pokemonLv1Img = await getPokemonImgs(pokemonLv1)
        pokemonEvoArray.push([pokemonLv1, pokemonLv1Img])


        if (data.chain.evolves_to.lenght !== 0) {
            let pokemonLv2 = data.chain.evolves_to[0].species.name;
            let pokemonLv2Img = await getPokemonImgs(pokemonLv2)
            pokemonEvoArray.push([pokemonLv2, pokemonLv2Img])

            if (data.chain.evolves_to[0].evolves_to !== 0) {
                let pokemonLv3 = data.chain.evolves_to[0].evolves_to[0].species.name;
                let pokemonLv3Img = await getPokemonImgs(pokemonLv3);
                pokemonEvoArray.push([pokemonLv3, pokemonLv3Img])
                
            }

    }
        setPokemonEvolutions(pokemonEvoArray);    
}


async function getPokemonImgs(name) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    const data = await response.json()
    return data.sprites.other['official-artwork'].front_default;
}
//Functions button
const prevClick = () => { (pokemonId === 1) ? setPokemonId(1) : setPokemonId(pokemonId - 1) };
const nextClick = () => { setPokemonId(pokemonId + 1) };

return (

    <div className="app">
        {/*Cards*/}
        <div className="card_container">
            {pokemonEvolutions.map(pokemon =>
                <Card
                    key={pokemon[0]}
                    name={pokemon[0]}
                    img={pokemon[1]}
                />)}
        </div>

        {/*Button*/}
        <div className="buttons_container">
            <Button icon={<TiArrowLeftOutline />} handleClick={prevClick} />



            <Button icon={<TiArrowRightOutline />} handleClick={nextClick} />
        </div>

    </div>

)
}

export { App }