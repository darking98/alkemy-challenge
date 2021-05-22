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
    const [loading,setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(12);
    const [team, setTeam] = useState([]);
    const [goodCounting, setGoodCounting] = useState(0)
    const [badCounting, setBadCounting] = useState(0)

    const handleAddTeam = (hero) => {
        console.log(goodCounting, badCounting)
        if(!team.includes(hero)){
            Object.values(hero).forEach(element => {
                if(element.alignment == "good" && goodCounting < 3){
                    setGoodCounting(goodCounting + 1);
                    setTeam(team.concat(hero));
                }else if(element.alignment == "bad" && badCounting < 3){
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

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch(`https://superheroapi.com/api.php/10219535131153487/search/${name}`,{
        })
        .then(res => {
            return res.json()
        })
        .then(data => {
            setHeros(data);
            setLoading(false);
            
        })
        console.log("refreshed")
        
    }, [name]);


    const handleChange = e =>{
        setName(e.target.value)
        setLoading(true);
        
    }


  

    return (
        <HomeContainer id="home">
            <Header/>
            <SearchForm>
                <SearchWrapper>
                    <BsSearch/>

                    <input 
                        onChange={handleChange}
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
    margin:50px 0px;
    
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

    }

    p{
        cursor:pointer;
    }

    svg{
        margin:0px 10px;
        z-index:12;
    }
`

export default Home
