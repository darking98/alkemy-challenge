import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";
import {Link,animateScroll as scroll} from 'react-scroll'

const Header = () => {
    let history = useHistory();

    const handleLogout = () =>{
        localStorage.removeItem('key')
        history.push('/login')
    }
    
    return (
        <Navbar>
            <LogoContainer>
                <h2>SuperHero Legends</h2>
            </LogoContainer>
            <NavbarItems>
                <li>
                    <Link
                        to="home"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        >
                            Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="team"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                        >
                            My Team
                    </Link>
                </li>
                <li
                    onClick={handleLogout}
                ><a href="#">Logout</a></li>
            </NavbarItems>

        </Navbar>
    )
}

const Navbar = styled.nav`
    grid-column:1 / span 4;
    height:7vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color: var(--black);
    padding:0 30px;
`

const LogoContainer = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    color:var(--white);
`

const NavbarItems = styled.ul`
    display:flex;
    list-style:none;

    li{

        color:var(--white);
        padding:10px 20px;
        a{
            cursor:pointer;
            text-decoration:none;
            color:var(--white);
        }

        :nth-child(3n){
            background-color: var(--pink);
            border-radius:10px;
            cursor:pointer;
        }

    }


`

export default Header
