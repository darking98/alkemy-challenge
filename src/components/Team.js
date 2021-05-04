import React from 'react'
import styled from 'styled-components'
import Cards from './search/Cards'

const Team = ({team}) => {
    return (
        <Container>
            Equipo: 
            {
                team.map(element => (
                    <span>{element.name}</span>
                ))
            }   
        </Container>
    )
}

const Container = styled.div`
    background-color: red;
`

export default Team
