import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Header from './Header'
import Team from './Team'
import {BsSearch} from 'react-icons/bs'
import Search from './search/Search'
import Pagination from './search/Pagination'


const Home = () => {

    const[name, setName] = useState('')
    const[heros, setHeros] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [team, setTeam] = useState([]);
    const [goodCounting, setGoodCounting] = useState(0)
    const [badCounting, setBadCounting] = useState(0)

    
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleAddTeam = (hero) => {

        if(!team.includes(hero)){
            Object.values(hero).forEach(element => {
                if(element.alignment === "good" && goodCounting < 3){
                    setGoodCounting(goodCounting + 1);
                    setTeam(team.concat(hero));
                }else if(element.alignment === "bad" && badCounting < 3){
                    setBadCounting(badCounting + 1);
                    setTeam(team.concat(hero));
                }
            })
            
        }else{
            Object.values(hero).forEach(element => {
                if(element.alignment == "good" ){
                    setGoodCounting(goodCounting - 1);
                }else if(element.alignment == "bad"){
                    setBadCounting(badCounting - 1);
                }
                
            })
            setTeam(team.filter(element => element !== hero))

        }
        
        
    }

    const powerStatsIcons = (icons, powerstats) => {
        const stats = Object.entries(powerstats).map(([label,value]) =>(
            icons.map(element => element.description.includes(label) &&
             <StatIcons title ={label}>
                 {element.icon}
                 <StatBar title={value} widthBar = {`${value}%`}>-</StatBar>
             </StatIcons>
            )
        ))
        
        return stats;
    }


    useEffect(() => {
        fetch(`https://superheroapi.com/api.php/10219535131153487/search/${name}`,{
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setHeros(data);
        })
        
    }, [name]);



  

    return (
        <HomeContainer>
            <Header/>
            <SearchForm id = "search">
                <SearchWrapper>
                    <BsSearch/>

                    <input 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="text"
                        placeholder="Search for a hero"
                    />
                    {
                        name !== '' ? (
                            <p onClick={() => setName('')}>
                                x
                            </p>

                        )
                        : ''
                    }
                </SearchWrapper>
                
                
            </SearchForm>
            <Search
                results={heros.results ? heros.results.slice(indexOfFirstPost, indexOfLastPost) : ""}
                addTeam ={handleAddTeam}
                team = {team}
                goodCounting = {goodCounting}
                badCounting = {badCounting}
                powerStatsIcons = {powerStatsIcons}
            />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts = {heros.results ? heros.results.length : ""}
                paginate ={paginate}
            />
            <Team
                team ={team}
                setTeam = {setTeam}
                goodCounting ={setGoodCounting}
                badCounting = {setBadCounting}
                powerStatsIcons = {powerStatsIcons}
            />
            
        </HomeContainer>
        
    )
}

const HomeContainer = styled.div`
    display:flex;
    flex-direction:column;
    min-height:100vh;
    background-color: var(--darkest-blue);
`

const SearchForm = styled.form`
    display:flex;
    justify-content:center;
    color:var(--black);
    margin:100px 0px;
`

const SearchWrapper = styled.div`
    display:flex;
    align-items:center;
    background-color: #fff;
    border-radius:5px;
    padding:0px 10px;
    input{
        width:300px;
        color:var(--black);
        border:none;
        outline:none;
        padding:8px 20px;
        position:relative;

        ::placeholder{
            color:var(--gray);
        }

        @media (max-width:600px){
            width:200px;
        }
    }

    p{
        cursor:pointer;
    }

    svg{
        margin:0px 10px;
        z-index:12;
    }
    
`

const StatIcons = styled.div`
    display:flex;

    svg{
        margin-right: 10px;
    }
`
const StatBar = styled.div`
    flex:1;
    position:relative;
    width:100%;
    background:var(--lightest-black);
    border-radius:10px;
    
    :before{
        content:"";
        position:absolute;
        border-radius:15px;
        height:100%;
        left:0;
        z-index:100;    
        background:var(--orange);
        width:${props => props.widthBar};
    }

    
`
export default Home
