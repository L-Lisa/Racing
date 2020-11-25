import React, { useState, useEffect } from "react"
import moment from "moment"
import { Display } from '../components/Display'
import styled from "styled-components/macro";
import trav from "../images/trav.jpg"

const Background = styled.main`
background-image: url(${trav});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
height:100vh;
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


export const RaceInfo = () => {
    const [gameType, setGameType] = useState("")
    const [selectedInfo, setSelectedInfo] = useState([])
    const [selectedId, setSelectedId] = useState("")

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
                console.log(json.results)
                console.log(json.upcoming)
                console.log(json.upcoming[0].id)
                console.log(json.results[0].id)
                console.log(json.results[0].startTime)
                setSelectedInfo(json.upcoming)
                console.log(selectedId)
            })
    }
    return (
        <Background>

            <h1> Games to play</h1>
            {selectedInfo.sort(item => moment(item.startTime).fromNow).map(item =>
                <ul>
                    <li> <Display key={item.startTime} {...item} gameType={gameType} /></li >
                </ul>
            )
            }
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
                {gameType}
            </form>
        </Background>
    )
}


