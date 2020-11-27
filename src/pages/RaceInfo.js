import React, { useState, useEffect } from "react"
import moment from "moment"
import { Display } from '../components/Display'
import styled from "styled-components/macro";
import trav from "../images/trav.jpg"

export const RaceInfo = () => {
    const [gameType, setGameType] = useState("")
    const [selectedInfo, setSelectedInfo] = useState([])
    const [selectedId, setSelectedId] = useState("")
    const [upcoming, setUpcoming] = useState([])

    //closest upcoming or closest results game
    const handleSubmit = () => {
        const errorMessage = { code: 403, message: "cant fetch data" };
        const typeURL = `https://www.atg.se/services/racinginfo/v1/api/products/${gameType}`

        fetch(typeURL)
            .then((res) => {
                if (!res.ok) {
                    throw errorMessage;
                }
                return res.json();
            })
            .then((json) => {
                console.log(json)
                /*  console.log(json.results)
                 console.log(json.results[0].id)
                 console.log(json.results[0].startTime) */

                console.log(json.results)
                setSelectedInfo(json.results)
                console.log(selectedId)
                if (upcoming !== null) {
                    setUpcoming(json.upcoming)
                } else {
                    return (<></>)
                }
            })



    }
    return (
        <Background>
            {/* Game has to be selected from the game schedule table */}
            <form onSubmit={(e) => handleSubmit(e.preventDefault())} >
                <label>
                    <select onChange={(e) => setGameType(e.target.value)}>
                        <option >Choose your Game</option>
                        <option value='V75'>V75</option>
                        <option value='V65'>V65</option>
                        <option value='V64'>V64</option>
                        <option value='V4'>V4</option>
                    </select>
                    <button type="submit">SELECT</button>
                </label>

            </form>
            <h1>  Games info</h1>
            <>
                <Bettable>
                    {upcoming && <h2>UPCOMING GAMES TO PLAY</h2>}
                    {upcoming.sort(item => moment(item.startTime).fromNow).map(item =>
                        <ul>
                            <li> <Display key={item.startTime} {...item} gameType={gameType} /></li >
                        </ul>
                    )
                    }
                </Bettable>


                <Results>
                    {selectedInfo && <h2>RESULTS</h2>}
                    {selectedInfo.sort(item => moment(item.startTime).fromNow).map(item =>
                        <ul>
                            <li> <Display key={item.startTime} {...item} gameType={gameType} /></li >
                        </ul>
                    )
                    }
                </Results>
            </>
        </Background>
    )
}


const Background = styled.main`
background-image: url(${trav});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height:100vh;
display:flex;
flex-direction: column;
align-items: center;
h1{
    text-align: center;
    background: #ffffffa3;
    padding: 5px;
    width: fit-content;
    margin: 0 auto;
}
ul{
    width: 80%;
    list-style: none;
    margin-block-start: unset;
    margin-block-end: unset;
    padding-inline-start: unset;
    margin: 0 auto;
}
li{
    list-style: none;
}
`;
const Results = styled.section`
border: 1px solid red;
h2{
    text-align:center
}
`;

const Bettable = styled.section`
border: 1px solid green;
h2{
    text-align:center
}
`;

