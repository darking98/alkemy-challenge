import React from 'react'
import styled from 'styled-components'
import { useHistory } from "react-router-dom";


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
                <li><a href="">Home</a></li>
                <li><a href="">My Team</a></li>
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
