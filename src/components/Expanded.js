import React, { useState } from "react"
import moment from "moment"
import styled from "styled-components/macro";


export const Expanded = ({ startsArrays }) => {
    const [showStartInfo, setShowStartInfo] = useState(false)

    return (
        <>
            <StartsInfo>
                <>
                    <div>

                    </div>
                    {startsArrays.map(singleStart =>
                        <>
                            <Astart>

                            </Astart>
                            {singleStart.map(team =>
                                <>

                                    <Team>
                                        <p>Startnr: {team.number} </p>

                                        {team.driver.firstName}
                                        {team.driver.lastName}
                                        <p>{team.horse.name}</p>
                                    </Team>
                                </>
                            )}
                        </>
                    )}
                </>
            </StartsInfo>
        </>
    )
}
const StartsInfo = styled.div`
background:lightgray;
`;
const Team = styled.div`
background:blue;
display:flex;
border: 1px solid red;
`;
const Astart = styled.article`
background:cornflowerblue;
margin:4px;
`;

