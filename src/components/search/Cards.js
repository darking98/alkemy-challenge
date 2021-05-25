import React, {useState} from 'react'
import styled from 'styled-components'
import {icons} from '../../icons/icons'

const Cards = ({hero, showDetails, addTeam, team, badCounting, goodCounting}) => {
    const appearance = Object.entries(hero.appearance) 
    const powerStats = Object.values(hero.powerstats) 


    console.log(powerStats)

    return (
        <Container id="card">
            <CardWrapper>
                <CardExit
                    onClick={() => showDetails(false)}
                >
                    x
                </CardExit>
                <CardName>
                    // What is this doing?
                    <h2>{hero.name}{Object.values(hero.biography)[0]!== '' ? ` (${Object.values(hero.biography)[0]})` : ""}</h2>
                </CardName>
                <CardImage>
                    // Maybe use styled components for this as well?
                    <img src={hero.image.url} alt="" width="200px" height="250px"/>
                </CardImage>
                <CardAppearance>
                    {
                        // You can use array deconstruct to give a more meaninful name to this if you decide to implement it this way: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
                        // Ej: appearance.map([label, value] => ()
                        // Still seems shady to me, some times you'll need to decide if cleverness and short code is better than more verbose and more self explained one. I tend to favor the later one
                        // remember that you write code for others, not for yourself. Even if you are the only one that's going to read the code you'll be amazed to know that you won't remember this :D
                        appearance.map(element => (
                            <div>
                                <h3>{element[0]}: </h3>
                                <p>{element[1][2] ? element[1] : element[1][1]}</p>
                            </div>
                        ))
                    }

                </CardAppearance>
                <CardPowerStats>
                    <IconWrapper>
                        {
                            // As commented in the icons.js file, this seems to be working out of luck. You could add the icon below in the 'powerStats.map' code
                            icons.map(icon =>(
                                <span>{icon.icon}</span>
                            ))

                        }
                    </IconWrapper>
                    <StatsWrapper>
                        {
                            powerStats.map(element => (
                                <StatBar widthBar = {`${element}%`}>-</StatBar>
                            ))
                        }
                    </StatsWrapper>
                    
                </CardPowerStats>
                // Maybe you could have 3 different classNames for the 'AlignmentWrapper', and pass down hero.biography.alignment as a class so you don't have to do this ternary operator here.
                // the alignment good would just translate to the css class 'good' that adds the 'var(--green)' and so on.
                <AlignmentWrapper textColor ={hero.biography.alignment === 'good' ? 'var(--green)' : hero.biography.alignment === 'neutral' ? 'var(--gray)' :'red' }>
                    <p  >
                        {hero.biography.alignment}
                    </p>
                </AlignmentWrapper>
                <AddButton
                    onClick={() => addTeam(hero)}
                >
                    {
                        // 6 seems an arbitrary magic number, consider moving it to the constants file as well as MAX_TEAM_SIZE/MAZ_TEAM_MEMBERS or whatever you sit fit best.
                        team.length >= 6 && !team.includes(hero)  ? 'Team is full' 
                        : team.includes(hero) ? 
                        'Delete' : 'Add' 
                    }
                </AddButton>
                <Warning>
                    {
                       hero.biography.alignment === 'good' && goodCounting >= 3 ? 
                       'You already have three Good Heros.' 
                       : hero.biography.alignment === 'bad' && badCounting >= 3 ? 
                       'You already have three Bad Heroes. ' 
                       : hero.biography.alignment === 'neutral' && 
                       "You can't add neutral heroes to your team."
                    }
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
`

const CardWrapper = styled.div`
    display:grid;
    grid-template-columns:repeat(2,1fr);
    gap:20px;
    background-color: var(--pink);
    border:4px solid var(--pink-hover);
    padding:30px;
    position:relative;

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
    font-size:15px;
`

const CardImage = styled.div`
    grid-row:2 / span 2;
    align-self:center;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;

    img{
        object-fit:cover;
    }
`

const CardAppearance = styled.div`
    display:flex;
    color:black;
    flex-direction:column;
    text-transform:capitalize;
    div{
        display:flex;
        justify-content:space-between;
        font-size:12px;
    }
`

const CardPowerStats = styled.div`
    grid-column:2;
    display:flex;
    align-items:center;

    > div > *{
        margin:5px 10px 5px 0px;

    }
`

const IconWrapper = styled.div`
    display:flex;
    flex-direction:column;

    span{
        color:var(--darkest-blue);
    }
`

const StatsWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
`

const StatBar = styled.div`

    flex:1;
    position:relative;
    width:100%;
    background:var(--gray);
    border-radius:10px;
    :before{
        content:"";
        position:absolute;
        border-radius:15px;
        height:100%;
        left:0;
        z-index:100;    
        background:red;
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

const AlignmentWrapper = styled.div`
    display:flex;
    justify-content:center;
    align-items:flex-end;
    color:${props => props.textColor};  

    p{
        text-transform:capitalize;
    }
`

const AddButton = styled.button`
    width:50%;
    justify-self:center;
    background-color: var(--darkest-blue);
    border:none;
    color:var(--white);
    padding:10px 20px;
    border-radius:10px;
    cursor:pointer;
    transition:300ms ease-in-out;
    :hover{
        background-color: var(--black);
    }
`

const Warning = styled.p`
    color:red;
`

export default Cards
