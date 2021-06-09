import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {icons} from '../assets/icons/icons.js'

const Team = ({team, setTeam, goodCounting, badCounting, powerStatsIcons}) => {

    const heroes = [...team]

    const [teamPowerStats, setTeamPowerStats] = useState({
        intelligence:0,
        strength:0,
        speed:0,
        durability:0,
        power:0,
        combat:0
    })

    const [teamAppearance, setTeamAppearance] = useState ({
        height:0,
        weight:0
    })

    const sortStats = Object.entries(teamPowerStats).map(([label,value]) => ([label,value])).sort((a,b) => b[1] - a[1])

    const uploadStats = (stat) => {
        const powerStat = heroes.map(element => element.powerstats[stat])
        .filter(stat => stat !== 'null')
        .reduce((acc, val) => parseInt(acc) + parseInt(val) / heroes.length, 0);
        return powerStat;
    }
    
    const handleRemoveTeam = (hero_) => {
        setTeam(team => team.filter((hero) => hero_ !== hero))
        hero_.biography.alignment === 'good' ? goodCounting(counting => counting -1) : badCounting(counting => counting -1);
    }

    const uploadAppearance = (app) => {
        const letters = ['k','g','c','m'];
        const value = heroes.map(element => element.appearance[app][1])
        .join('')
        .split('')
        .filter(element => !letters.includes(element))
        .join('')
        .split(' ')
        .filter(element => element !== '')
        .reduce((acc, sum) => parseInt(acc) + parseInt(sum) / team.length, 0)
        return value;
    }

    useEffect(() => {
        setTeamPowerStats({
            intelligence : uploadStats('intelligence'),
            strength : uploadStats('strength'),
            speed : uploadStats('speed'),
            durability : uploadStats('durability'),
            power : uploadStats('power'),
            combat : uploadStats('combat')
        });

        setTeamAppearance({
            height: uploadAppearance('height'),
            weight: uploadAppearance('weight')

        })

    }, [team])

    return (
        <Container id="team">
            <Header>
                My Team
            </Header>
            <HerosWrapper>
                <HerosGoodWrapper>                 
                    {
                        team.map(element => (
                            element.biography.alignment === 'good' &&
                                <HeroCard alignment = {element.biography.alignment}>
                                    <h3>{element.name}</h3>
                                    <img src={element.image.url} alt="" width="200px" height="300px"/>
                                    <button
                                        onClick={() => handleRemoveTeam(element)}
                                    >
                                        Remove
                                    </button>
                                </HeroCard>
                            
                        ))
                    }
                </HerosGoodWrapper>
                <HerosBadWrapper>
                    {
                        team.map(element => (
                            element.biography.alignment === 'bad' &&
                                <HeroCard alignment = {element.biography.alignment}>
                                    <h3>{element.name}</h3>
                                    <img src={element.image.url} alt="" width="200px" height="300px"/>
                                    <button
                                        onClick={() => handleRemoveTeam(element)}
                                    >
                                        Remove
                                    </button>
                                </HeroCard>
                            
                        ))
                    }    
                </HerosBadWrapper>   
            </HerosWrapper>
            <HeroStats>
                
                    {
                        team.length >= 1 &&
                        <HeroStatistics>
                            <TeamHighestStat>
                                {
                                    <h3>Your Team highest stat is <span>{sortStats[0][0]}</span></h3>
                                }
                            </TeamHighestStat>
                            <HeroPowersStats>
                                {
                                    powerStatsIcons(icons, teamPowerStats)
                                }
                            </HeroPowersStats>
                            <HeroAppearanceStats>
                                {
                                    <div>
                                        <span>{Math.round(teamAppearance.height)} cm</span>
                                        <span>{Math.round(teamAppearance.weight)} kg</span>
                                    </div>
                                    
                                }
                            </HeroAppearanceStats>
                        </HeroStatistics>

                    }
                    
                
            </HeroStats>
        </Container>
    )
}

const Container = styled.div`
    width:100%;
    min-height:600px;
    display:grid;
    grid-template-columns:100px repeat(2,1fr) 100px;
    padding:50px 0px;
    background-color: var(--black);
    outline:1px solid white;
    align-items:center;

    @media (max-width:1024px){
        display: block;
        padding:50px 100px;
    }

    @media (max-width:600px){
        padding:50px 30px;
    }
`

const Header = styled.h2`
    grid-column:2 / span 4;
    justify-self:center;
    color:white;
    margin-bottom:20px;
    text-align: center;
`

const HerosWrapper = styled.div`
    grid-column:2;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
    color:white;

    @media(max-width:1024px){
        display:flex;
        flex-direction: column;
    }
`

const HerosGoodWrapper = styled.div`
    grid-row:1;
    display:flex;
    
    @media(max-width:1024px){
        flex-direction: column;
        > div{
            margin-bottom:20px;
        }
        
    }
`

const HerosBadWrapper = styled.div`
    grid-row:2;
    display:flex;
    
    @media(max-width:1024px){
        flex-direction: column;
        > div{
            margin-bottom:20px;
        }
        
    }
`

const HeroCard = styled.div`
    padding:20px;
    display:flex;
    align-items:center;
    flex-direction:column;
    border-radius:5px;
    margin:0px 20px;
    background: ${props => props.alignment !== 'bad' ? 'linear-gradient(90deg, rgba(37,82,59,1) 0%, rgba(60,208,112,1) 50%, rgba(37,82,59,1) 100%)' : 'linear-gradient(90deg, rgba(158,26,26,1) 0%, rgba(255,0,0,1) 50%, rgba(158,26,26,1) 100%)'};
    img{
        padding:20px 0px;
    }

    button{
        padding:10px 20px;
        cursor:pointer;
        background:var(--darkest-blue);
        border:none;
        color:var(--white);
        border-radius:4px;
    }
`

const HeroStats = styled.div`
    grid-column:3;
    color:white;
    display:flex;
    flex-direction:column;
`

const HeroStatistics = styled.div`
    display:flex;
    flex-direction: column;

    h3{
        span{
            color:var(--orange);
            text-transform: capitalize;
        }
    }
    
`

const TeamHighestStat = styled.div`
    display:flex;
    justify-content: center;
    margin-bottom:10px;

`

const HeroAppearanceStats = styled.div`
    display: flex;
    justify-content: space-around;

    div{
        span{
            margin-right:10px;
        }
    }
`

const HeroPowersStats = styled.div`
    width:70%;
    margin: auto;

    > div {
        margin-bottom:10px;
    }
`


export default Team
