import React from "react"
import styled from "styled-components/macro";

const DetailsDiv = styled.div`
display:flex;
flex-wrap: wrap;
`;
const StartsInfo = styled.div`
background:lightgray;
`;
const Team = styled.div`
background:grey;
display:flex;
border: 1px solid black;
margin:4px;
.expand {
display: inline;
}
.hidden{
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip: rect(0, 0, 0, 0);
white-space: nowrap; 
border: 0; 
}
`;
const Astart = styled.article`
background:cornflowerblue;
margin:4px;
`;

export const Expanded = ({ startsArrays, expand }) => {
    return (
        <>
            <StartsInfo>
                <>
                    {startsArrays.map(singleStart =>
                        <>
                            {singleStart.map(team =>
                                <Team className={expand ? `hidden` : `expand`}>
                                    <DetailsDiv>
                                        <span> Startnr: {team.number}  {" "}</span>{" "}
                                        <span> {team.driver.firstName}
                                            {team.driver.lastName}  </span>{" "}
                                        <span>   Horse: {team.horse.name}</span>
                                        <span>   Father: {team.horse.pedigree.father.name}</span>
                                        <span>   Trainer: {team.horse.trainer.firstName} {team.horse.trainer.lastName}</span>
                                    </DetailsDiv>
                                </Team>
                            )}
                        </>
                    )}
                </>
            </StartsInfo>
        </>
    )
}


