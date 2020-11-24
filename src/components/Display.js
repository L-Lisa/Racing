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
    const startsArrays = racesArr.map(startItem => startItem.starts)
    console.log(startsArrays)
    /*  const singleStart = startsArrays.map(aStart => aStart) */
    //first start
    /*   console.log(startsArrays[0].map(team => team.driver.firstName)) */
    /* 
    const [driver, setDriver] = useState("")
    const [starts, setStarts] = useState([""])
   
    console.log(startsArrays)
    console.log(racesArr)
    console.log(startsArrays.map(oneStart => oneStart.id))
 */

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
    }
    return (
        <Wrapper>
            <p>{gameType}</p>
            <div> Sort on time {startTime}</div>
            {racesArr.map(raceItem =>
                <>
                    <RacesInfo>
                        <RacesDiv onClick={ShowDetails}>
                            <p>Race number: {raceItem.number}</p>
                            <p>Race name: {raceItem.name}</p>
                            <p>Scheduled start time: {raceItem.scheduledStartTime}</p>
                        </RacesDiv>

                        {/*   {raceItem.starts.map(start =>
                            <p>{start.number}</p>)}
         {raceItem.starts.map(start => start.map(team =>
                            <p> {team.driver.firstName}</p>
                        ))}  */}


                        {showInfo && <Expanded startsArrays={startsArrays} />}
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
background:black;
`;

const RacesDiv = styled.article`
background:pink;
`;