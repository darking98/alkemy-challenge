import React,{useState} from "react";
import styled from 'styled-components'


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  

  return (
    <Container>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="#" >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.nav`
    grid-column:2;
    background-color: var(--darkest-blue);
    ul{
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        list-style:none;
        li{
            padding:20px;

            a{
                color:var(--orange);
                font-weight:800;
                text-decoration:none;
            }
        }
    }
`

export default Pagination;
