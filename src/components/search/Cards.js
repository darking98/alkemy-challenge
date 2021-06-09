import React from 'react'
import styled from 'styled-components'
import {icons} from '../../assets/icons/icons'

const Cards = ({hero, showDetails, addTeam, team, badCounting, goodCounting, powerStatsIcons}) => {

    const appearance = Object.entries(hero.appearance) 
    const MAX_TEAM_SIZE = 6;


    return (
        <Container>
            <CardWrapper>
                <CardExit
                    onClick={() => showDetails(false)}
                >
                    x
                </CardExit>
                <CardName>
                    <h2>{hero.name}</h2>
                    <h3>{Object.values(hero.biography)[0]!== '' && Object.values(hero.biography)[0]}</h3>
                </CardName>
                <CardImage>
                    <img src={hero.image.url} alt="" width="200px" height="250px"/>
                </CardImage>
                <AlignmentWrapper background ={hero.biography.alignment === 'good' ? 'green' : hero.biography.alignment === 'neutral' ? 'var(--gray)' :'red' }>
                    <p  >
                        {hero.biography.alignment}
                    </p>
                </AlignmentWrapper>
                <CardAppearance>
                    {
                        appearance.map(element => (
                            <div>
                                <h3>{element[0]}: </h3>
                                <p>{element[1][2] ? element[1] : element[1][1]}</p>
                            </div>
                        ))
                    }

                </CardAppearance>
                <CardPowerStats>

                    <StatsWrapper>
                        {
                            powerStatsIcons(icons, hero.powerstats)
                        }
                    </StatsWrapper>
                    
                </CardPowerStats>
                
                <AddButton
                    onClick={() => addTeam(hero)}
                >
                    {
                        team.length >= MAX_TEAM_SIZE && !team.includes(hero)  ? 'Team is full' 
                        : team.includes(hero) ? 
                        'Delete' : 'Add' 
                    }
                </AddButton>
                <Warning>
                    <p>

                    {
                        hero.biography.alignment === 'good' && goodCounting >= 3 ? 
                        'You already have three Good Heros.' 
                        : hero.biography.alignment === 'bad' && badCounting >= 3 ? 
                        'You already have three Bad Heroes. ' 
                        : hero.biography.alignment === 'neutral' && 
                        "You can't add neutral heroes to your team."
                    }
                    </p>

                </Warning>
            </CardWrapper>
        </Container>
    )
}

const Container = styled.div`
    height:100%;
    width:100%;
    position:absolute;
    left:0;
    top:0;
    display:flex;
    justify-content:center;
    align-items:center;
    color:white;
    background-color:rgba(0, 0, 0, 0.5) ;
    
    @media (max-width:600px){
        padding:0px 20px;
    }
`

const CardWrapper = styled.div`
    max-height:850px;
    width:500px;
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;
    background-color: var(--black);
    border:2px solid var(--blue);
    border-radius:15px;
    padding:30px;
    position:relative;

    @media (max-width:600px){
        display: flex;
        flex-direction: column;
        padding:10px;
    }
`

const CardExit = styled.p`
    position:absolute;
    right:10px;
    top:0;
    font-size:20px;
    cursor:pointer;
`
const CardName = styled.div`
    grid-column:1 / span 2;
    grid-row:2;
    font-size:22px;
    display: flex;
    flex-direction:column;

    h3{
        color:var(--orange);
        font-size:13px;
    }
`

const CardImage = styled.div`
    grid-row:1;
    grid-column:1 / span 2 ;
    align-self:center;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
    img{
        border-radius:50%;
        object-fit:cover;

        @media (max-width:600px){
            width:100px;
            height:120px;
        }
    }
`

const CardAppearance = styled.div`
    display:flex;
    grid-column:1 / span 2;
    grid-row:4;
    color:black;
    flex-direction:column;
    text-transform:capitalize;

    h3{
        color:var(--orange);

    }
    p{
        color:var(--white);
    }
    div{
        display:flex;
        justify-content:space-between;
        font-size:12px;
    }
`

const CardPowerStats = styled.div`
    grid-column:1 / span 2;
    display:flex;
    align-items:center;

    > div > *{
        margin:5px 10px 5px 0px;

    }
`

const StatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;

`



const AlignmentWrapper = styled.div`
    grid-row:3;
    grid-column:1 / span 2;
    display:flex;
    justify-content:flex-end;
    color:${props => props.textColor};  
    p{
        text-transform:capitalize;
        background-color: ${props => props.background};
        padding:10px;
        border-radius:50px;
    }

    
`

const AddButton = styled.button`
    grid-column: 1/ span 2;
    width:50%;
    justify-self:center;
    background-color: var(--orange);
    border:none;
    color:var(--white);
    padding:10px 20px;
    border-radius:10px;
    cursor:pointer;
    transition:300ms ease-in-out;
    align-self: center;
`

const Warning = styled.div`
    grid-column: 1 / span 2;
    display: flex;
    justify-content: center;
    color:red;
    text-align: center;
`

export default Cards
