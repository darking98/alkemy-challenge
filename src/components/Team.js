import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
// Is this used?
import Cards from './search/Cards'

const Team = ({team, setTeam, goodCounting, badCounting}) => {


    const heroes = [...team]

    // Remove this
    console.log(heroes)
    const [combat, setCombat] = useState(0);
    const [durability, setDurability] = useState(0);
    const [intelligence, setIntelligence] = useState(0);
    const [power, setPower] = useState(0);
    const [speed,setSpeed] = useState(0);
    const [strength, setStrength] = useState(0);
    // Is this used?
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    
    const handleRemoveTeam = (hero_) => {
        // If this component only handles the removal of a hero, would you think it's better to provide a removeHero instead of setTeam in the props?
        setTeam(team => team.filter((hero) => hero_ != hero))
        hero_.biography.alignment === 'good' ? goodCounting(counting => counting -1) : badCounting(counting => counting -1);
    }

    useEffect(() => {

        // Remove this
        console.log(JSON.stringify(heroes[1]))
        heroes.forEach(element => {
            Object.values(element.powerstats).forEach(stat => {
                if(stat === "null"){
                    stat = 0;
                    console.log(stat)
                }else{
                    setCombat(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.combat) / team.length, 0))
                    setDurability(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.durability) / team.length, 0))
                    setIntelligence(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.intelligence) / team.length, 0))
                    setPower(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.power) / team.length, 0))
                    setSpeed(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.speed) / team.length, 0))
                    setStrength(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.strength) / team.length, 0))
                }
                
            })
        })
        
        
        //setHeight(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.combat) / team.length, 0))
        //setWeight(heroes.reduce((a,b) => parseInt(a) + parseInt(b.powerstats.combat) / team.length, 0))
        
    }, [team])


    // The content of HerosGoodWrapper and HerosBadWrapper seems the same, how can you refactor this to remove duplicated code?
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
                                    <span>{element.name}</span>
                                    <img src={element.image.url} alt="" width="200px" height="300px"/>
                                    <button
                                        onClick={() => handleRemoveTeam(element)}
                                    >
                                        X
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
                                    <span>{element.name}</span>
                                    <img src={element.image.url} alt="" width="200px" height="300px"/>
                                    <button
                                        onClick={() => handleRemoveTeam(element)}
                                    >
                                        X
                                    </button>
                                </HeroCard>
                            
                        ))
                    }    
                </HerosBadWrapper>   
            </HerosWrapper>
            <HeroStats>
                
                    {
                        team.length >= 1 &&
                        <HeroPowersStats>
                            <StatBar widthBar={`${Math.round(combat)}%`}>-</StatBar>
                            <StatBar widthBar={`${Math.round(durability)}%`}>-</StatBar>
                            <StatBar widthBar={`${Math.round(intelligence)}%`}>-</StatBar>
                            <StatBar widthBar={`${Math.round(power)}%`}>-</StatBar>
                            <StatBar widthBar={`${Math.round(speed)}%`}>-</StatBar>
                            <StatBar widthBar={`${Math.round(strength)}%`}>-</StatBar>
                        </HeroPowersStats>

                    }
                    
                
            </HeroStats>
        </Container>
    )
}

// It's a common practice to move this to a different file, check: https://blog.cloudboost.io/separate-your-code-with-styled-components-ec4fd1ee3ef8

const Container = styled.div`
    width:100%;
    min-height:600px;
    display:grid;
    grid-template-columns:100px repeat(2,1fr) 100px;
    padding:50px 0px;
    background-color: var(--darkest-blue);
    outline:1px solid white;
`

const Header = styled.h2`
    grid-column:2 / span 4;
    justify-self:center;
    color:white;
    margin-bottom:20px;

`

const HerosWrapper = styled.div`
    grid-column:2;
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:20px;
    color:white;
`

const HerosGoodWrapper = styled.div`
    grid-row:1;
    display:flex;
    
`

const HerosBadWrapper = styled.div`
    grid-row:2;
    display:flex;
    
`

const HeroCard = styled.div`
    padding:20px;
    display:flex;
    align-items:center;
    flex-direction:column;
    // This is more of a personal preference, but possitive comparsions come more naturally to me. 
    // https://softwareengineering.stackexchange.com/questions/350472/developer-insists-if-statements-shouldnt-have-negated-conditions-and-should-al
    border:${props => props.alignment != 'bad' ? '1px solid green' : '1px solid red'};
    margin:0px 20px;

    img{
        padding:20px 0px;
    }

    button{
        padding:10px 20px;
        cursor:pointer;
    }
`

const HeroStats = styled.div`
    grid-column:3;
    color:white;
    display:flex;
    flex-direction:column;
`

const HeroPowersStats = styled.div``

const StatBar = styled.div`
position:relative;
width:100%;
background:var(--gray);
border-radius:10px;
margin-bottom:10px;

:before{
    content:"";
    position:absolute;
    border-radius:15px;
    height:100%;
    left:0;
    z-index:100;    
    background:red;
    // I woul rename 'widthBar' to something more aligned to what it represents, maybe statPercentage/statValue are some ideas?
    width:${props => props.widthBar};
}

:first-child:before{
    background:var(--combat);
}
:nth-child(2):before{
    background:var(--durability);
}
:nth-child(3):before{
    background-color: var(--purple);
}
:nth-child(4):before{
    background-color: var(--power);
}
:nth-child(5):before{
    background-color: #72151d;
}

`
export default Team
