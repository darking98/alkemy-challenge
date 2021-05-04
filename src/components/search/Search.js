import React, {useState} from 'react'
import styled from 'styled-components'
import Cards from './Cards'

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
                                <div className="algo">
                                    <img src={hero.image.url} alt="" width="200px" height="250px"/>

                                </div>
                                <Button
                                    onClick={() => showCardDetails(hero)}
                                >
                                    Show Details
                                </Button>

                                
                            </HeroCard>
                        ))
                    ) : <span>Search for a hero</span>
                    
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
            </ResultsContainer>
        </Container>
    )
}

const Container = styled.div`
    display:grid;
    grid-template-columns:150px 1fr 150px;
    margin:30px 0px;
`

const ResultsContainer = styled.div`
    grid-column:2;
    display:grid;
    grid-template-columns: repeat(4,1fr);
    gap:20px;
    justify-items:center;
`

const HeroCard = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:30px;
    border:4px solid var(--pink-hover);
    background-color: var(--pink);
    border-radius:8px;

    .algo{
        img{
            margin:10px 0px;

        }
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
export default Search
