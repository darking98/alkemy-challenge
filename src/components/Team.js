import React from 'react'
import styled from 'styled-components'
import Cards from './search/Cards'

const Team = ({team}) => {
    return (
        <Container id="team">
            Equipo: 
            {
                team.map(element => (
                    <div>
                        <span>{element.name}</span>
                        <img src={element.image.url} alt=""/>
                    </div>
                    
                ))
            }   
        </Container>
    )
}

const Container = styled.div`
    background-color: red;
`

export default Team
