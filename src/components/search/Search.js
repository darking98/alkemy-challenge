import React, {useState} from 'react'
import styled from 'styled-components'
import Cards from './Cards'
// Is scroll used?
import {Link,animateScroll as scroll} from 'react-scroll'

const Search = ({results, addTeam, team, goodCounting, badCounting}) => {
    
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
`

const HeroCard = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:30px;
    border:4px solid var(--pink-hover);
    background-color: var(--pink);
    border-radius:8px;

        img{
            margin:10px 0px;
        }
    
`

const Button = styled.button`
    padding:10px 30px;
    outline:none;
    border:none;
    background-color: var(--darkest-blue);
    color:white;
    cursor:pointer;
    border-radius:5px;
`

const SearchDefault = styled.div`
    grid-column:1 / span 4;
    color:var(--white);
`
export default Search
