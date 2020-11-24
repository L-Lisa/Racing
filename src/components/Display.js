import React, { useState, useEffect } from "react"
import moment from "moment"
import { DisplayItem } from './DisplayItem'
import styled from "styled-components/macro";
import { Expanded } from "./Expanded"


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
                console.log(json)
                console.log(json.races)
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
            <p>{gameType}</p>
            <div> Arrange on time 
                
              
                {startTime}
       
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

                        {/*   {raceItem.starts.map(start =>
                            <p>{start.number}</p>)}
         {raceItem.starts.map(start => start.map(team =>
                            <p> {team.driver.firstName}</p>
                        ))}  */}

                        {showInfo && <Expanded startsArrays={startsArrays} setShowInfo={setShowInfo} showInfo={showInfo} expand={expand} />}
                    </RacesInfo>
                </>
            )}
        </Wrapper>
    )
}

const RacesInfo = styled.div`
background:papayawhip;
`;
const Wrapper = styled.main`
background:#fff;
padding:3px;
`;
const RacesDiv = styled.article`
background:pink;
`;
const GameInfo=styled.div`
background:greenyellow;
`