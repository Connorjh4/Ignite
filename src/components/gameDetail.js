import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import playstation from '../img/playstation.svg';
import steam from '../img/steam.svg';
import xbox from '../img/xbox.svg';
import nintendo from '../img/nintendo.svg';
import apple from '../img/apple.svg';
import gamepad from '../img/gamepad.svg';
import StarsRating from 'stars-rating';

const GameDetail = ({pathId}) => {
    const history = useHistory();
    //exit detail
    const exitDetailHandle = (e) => {
        const element = e.target;
        if(element.classList.contains('shadow')){
            document.body.style.overflow = 'auto';
            history.push('/');
        }
    }
    const getStars = () => {
        const rating = Math.abs(game.rating)
        return(<StarsRating
        count={5}
        value={rating}
        edit={false}
        size={32}
        half = {true}
        />)
    }

    const getPlatform = (platform) => {
        if (platform.includes("PlayStation")) {
          return playstation;
        } else if (platform.includes("Xbox")) {
          return xbox;
        } else if (platform === "PC") {
          return steam;
        } else if (platform === "Nintendo Switch") {
          return nintendo;
        } else if (platform.includes("OS")) {
          return apple;
        } else {
          return gamepad;
        }
      };
    

    const {game, screens, isLoading} = useSelector((state) => state.detail)
    
    return(
        <>
        {!isLoading && (
        <CardShadow className="shadow" onClick={exitDetailHandle}>
            <Detail layoutId={pathId}>
                <Stats>
                    <div className="rating">
                        <motion.h3 layoutId={`title ${pathId}`}>{game.name}</motion.h3>
                        <div>Rating: {getStars(game.rating)}</div>
                    </div>
                    <Info>
                        <h3>Platforms</h3>
                        <Platforms>
                            {(game.parent_platforms)?.map(data => (
                                <img 
                                    key={data.platform.id} 
                                    src={getPlatform(data.platform.name)}
                                    alt={data.platform.name}
                                    title={data.platform.name}
                                ></img>
                            ))}
                        </Platforms>
                    </Info>
                </Stats>
                <Media>
                    <motion.img layoutId={`image ${pathId}`} src={game.background_image} alt="image_background"/>
                </Media>
                <Description>
                    <p>{game.description_raw}</p>
                </Description>
                <div className="gallery">
                    {screens.map((screens) => {
                        if(screens.id < 0) return null
                        return (<img src={screens.image}  key={screens.id} alt="screenshot" />)
                    })}
                </div>
                
            </Detail>
        </CardShadow>
        )}
        </>
    )
};

const CardShadow = styled(motion.div)`
    width:100%;
    min-height:100vh;
    overflow-y: scroll;
    background: rgba(0,0,0,.5);
    position: fixed;
    top:0;
    left:0;
    z-index: 5;
    &::-webkit-scrollbar{
        width:.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
    &::-webkit-scrollbar-track{
        background: white;
    }
`

const Detail = styled(motion.div)`
    width:80%;
    border-radius:1rem;
    background:white;
    padding:2rem 5rem;
    color: black;
    position: absolute;
    left:10%;
    z-index: 10;
    img{
        width:100%;
    }
`
const Stats = styled(motion.div)`
    display:flex;
    align-items:center;
    justify-content:space-between;
`
const Info = styled(motion.div)`
    text-align:center;   
`
const Platforms = styled(motion.div)`
    display:flex;
    justify-content:space-evenly;
    img{
        margin-left: 3rem;
    }
`
const Media = styled(motion.div)`
    margin-top: 5rem;
    img{
        width: 100%;
    }
`
const Description = styled(motion.div)`
    margin:1rem 0rem 4rem;
`

export default GameDetail;