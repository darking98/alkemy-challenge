import React, {useState} from 'react'
import styled from 'styled-components'
import Cards from './Cards'
import {Link} from 'react-scroll'

const Search = ({results, addTeam, team, goodCounting, badCounting, powerStatsIcons}) => {
    
    const [showDetails, setShowDetails] = useState(false);
    const[cardDetails, setcardDetails] = useState([]);

    const showCardDetails = (hero) => {
        setcardDetails(hero)
        setShowDetails(true)
    }
    
    
    return (
        <Container>
            <ResultsContainer>
                {
                    results ? (
                        results.map(hero => (
                            <HeroCard>
                                <h3>{hero.name}</h3>
                                <img src={hero.image.url} alt="" width="200px" height="250px"/>
                                <Link
                                    to="center"
                                    spy={true}
                                    smooth={true}
                                    offset={-500}
                                    duration={500}
                                    >
                                        <Button
                                            onClick={() => showCardDetails(hero)}
                                        >
                                            Show Details
                                        </Button>
                                </Link>
                            </HeroCard>
                        ))
                    ) : <SearchDefault>
                            <h3>Heros will be here...</h3>
                        </SearchDefault>
                    
                }
                {
                    showDetails && (
                        <Cards 
                            hero={cardDetails}
                            showDetails = {setShowDetails}
                            addTeam={addTeam}
                            team = {team}
                            goodCounting ={goodCounting}
                            badCounting = {badCounting}
                            powerStatsIcons={powerStatsIcons}
                        />
                    )
                }

                <div id="center"/>
            </ResultsContainer>
        </Container>
    )
}

const Container = styled.div`
    display:grid;
    grid-template-columns:150px 1fr 150px;
    margin:30px 0px;
    position:relative;

    @media (max-width:600px){
        display: block;
    }
`

const ResultsContainer = styled.div`
    grid-column:2;
    display:grid;
    grid-template-columns: repeat(4,1fr);
    gap:20px;
    justify-items:center;

    #center{
        position:absolute;
        left:50%;
        top:50%;
        color:white;
    }

    @media (max-width:1024px){
        grid-template-columns: repeat(2,1fr);
    }

    @media (max-width:600px){
        display: flex;
        flex-direction: column;
        padding:0px 30px;
    }
`

const HeroCard = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:30px;
    background-color: var(--black);
    border-radius:8px;
    color:var(--white);

        img{
            margin:10px 0px;
        }
    
    @media (max-width:600px){
        padding:30px;
    }
`

const Button = styled.button`
    padding:10px 30px;
    outline:none;
    border:none;
    background-color: var(--orange);
    color:white;
    cursor:pointer;
    border-radius:5px;
`

const SearchDefault = styled.div`
    grid-column:1 / span 4;
    color:var(--white);
    text-align: center;
`
export default Search
