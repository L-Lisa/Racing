import React, { useState, useEffect } from "react"
import moment from "moment"
import styled from "styled-components/macro";
import { Expanded } from "./Expanded"

const RacesInfo = styled.div`
background:#ffffffa3;
`;
const Wrapper = styled.main`
background:#ffffffa3;
padding:5px;
`;
const RacesDiv = styled.article`
background:#d9d9de;
`;
const GameInfo = styled.div`
background:#89afdc;
padding:3px;
text-align:center;
`;

export const Display = ({ id, startTime, gameType }) => {
    const errorMessage = { code: 403, message: "cant fetch data from games" };
    const typeURL = `https://www.atg.se/services/racinginfo/v1/api/games/${id}`
    const [racesArr, setRacesArr] = useState([""])
    const [showInfo, setShowInfo] = useState(false)
    const [expand, setExpand] = useState(false)
    const startsArrays = racesArr.map(startItem => startItem.starts)
    console.log(startsArrays)
    useEffect(() => {
        fetch(typeURL)
            .then((res) => {
                if (!res.ok) {
                    throw errorMessage;
                }
                return res.json();
            })
            .then((json) => {
                setRacesArr(json.races)
            })
    }, [id])

    const ShowDetails = () => {
        setShowInfo(!showInfo)
        setExpand(!expand)
    }
    return (
        <Wrapper>
            <GameInfo>
                <h1>{gameType}</h1>
                <div> Closest games & results : {startTime}
                </div>
            </GameInfo>

            {racesArr.map(raceItem =>
                <>
                    <RacesInfo>
                        <RacesDiv >
                            <p>Race number: {raceItem.number}</p>
                            <p>Race name: {raceItem.name}</p>
                            <p>Scheduled start time: {raceItem.scheduledStartTime}</p>
                            <div onClick={ShowDetails}>Start info: ⬇️</div>
                        </RacesDiv>
                        {showInfo && <Expanded startsArrays={startsArrays} setShowInfo={setShowInfo} showInfo={showInfo} expand={expand} />}
                    </RacesInfo>
                </>
            )}
        </Wrapper>
    )
}

