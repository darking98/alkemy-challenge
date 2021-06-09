import React,{useState} from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import {Link} from 'react-scroll'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoMdCloseCircle} from 'react-icons/io'

const Header = () => {
    
    const[hamburger, setHamburger] = useState(false)
    let history = useHistory();

    const handleLogout = () =>{
        localStorage.removeItem('key')
        history.push('/login')
    }
    
    return (
        <Navbar>
            <LogoContainer>
                <h2>
                    <Link
                        to="search"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                    >
                        SuperHero Legends
                    </Link>
                </h2>
            </LogoContainer>
            <NavbarItems hamburger={hamburger}>
                <li
                >
                    <Link
                        to="team"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        onClick={() => hamburger && setHamburger(false)}
                    >
                            My Team
                    </Link>
                </li>
                <li
                    onClick={handleLogout}
                >
                    Logout
                </li>
            </NavbarItems>
            <Hamburger onClick={() => setHamburger(!hamburger)}>
                {
                    hamburger ?

                    <IoMdCloseCircle/> :
                    <GiHamburgerMenu/>
                }
            </Hamburger>
        </Navbar>
    )
}

const Navbar = styled.nav`
    position:fixed;
    grid-column:1 / span 4;
    height:7vh;
    display:flex;
    width:100%;
    justify-content:space-between;
    align-items:center;
    background-color: var(--black);
    padding:0 30px;
    z-index: 99;
`

const LogoContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    color:var(--white);
    font-size:15px;
    cursor: pointer;
`

const NavbarItems = styled.ul`
    display:flex;
    list-style:none;
    text-align: center;
    li{

        color:var(--white);
        padding:10px 20px;
        a{
            cursor:pointer;
            text-decoration:none;
            color:var(--white);
        }

        :nth-child(2){
            background-color: var(--orange);
            border-radius:10px;
            cursor:pointer;

        }

    }

    @media (max-width:600px){
        height: 100vh;
        width:50%;
        position: absolute;
        right:${props => props.hamburger ? '0' : '-100%'};
        top:100%;
        flex-direction: column;
        justify-content: center;
        background-color: var(--menu-color);
        transition:300ms ease-in-out;
        font-size:25px;
        padding:0px 10px;
    }

`

const Hamburger = styled.div`
    display: none;
    color:var(--white);
    cursor:pointer;

    svg{
        font-size:25px;
    }
    
    @media (max-width:600px){
        display: block;
    }


`

export default Header
