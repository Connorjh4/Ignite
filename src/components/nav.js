import React, {useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import logo from '../img/logo.svg';
import {fetchSearch} from '../actions/gameActions';
import {useDispatch} from 'react-redux';
import {fadeIn} from '../animations';

const Nav = () => {
    const dispatch = useDispatch();
    const [textInput, setTextInput] = useState('');
    const inputHandle = (e) => {
        setTextInput(e.target.value);
    }
    const submitSearch = e => {
        e.preventDefault();
        if (textInput) {
            dispatch(fetchSearch(textInput));
            setTextInput("");
        } else {
            dispatch({ type: "CLEAR_SEARCH" });
        }
    };
    return(
        <StyledNav variants={fadeIn} initial='hidden' animate='show'>
            <Logo onClick={submitSearch}>
                <img src={logo} alt="logo" />
                <h1>Ignite</h1>
            </Logo>
            <form className="search">
                <input value={textInput} onChange={inputHandle} type="text" />
                <button onClick={submitSearch} type="submit">Search</button>
            </form>
        </StyledNav>
    );
};

const StyledNav = styled(motion.div)`
    padding: 3rem 5rem;
    text-align:center;
    input{
        width:30%;
        font-size:1.5rem;
        padding:.5rem;
        border:none;
        box-shadow: 0px 0px 30px rgba(0,0,0,.2);
        outline: none;
        border-radius: .5rem 0rem 0rem .5rem;
        margin:1rem 0rem;
        height: 4vh;
    }
    button{
        font-size:1.5rem;
        border:none;
        padding: .5rem 2rem;
        cursor: pointer;
        background: #ff7676;
        color: white;
        border-radius: 0rem .5rem .5rem 0rem;
        box-shadow: 10px 0px 30px 5px rgba(0,0,0,.2);
        margin:1rem 0rem;
        height: 4vh;
        :hover{
            color: #ff7676;
            background: white;
        }
    }
`;
    const Logo = styled(motion.div)`
    display: flex;
    justify-content: center;
    padding: 2rem;
    cursor: pointer;
    img{
        height: 2.5rem;
        width: 2.5rem;
        margin-right: 1rem;
    }

`;

export default Nav;