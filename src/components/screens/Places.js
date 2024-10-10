import React,{useState,useEffect} from 'react';
import Helmet from 'react-helmet';
import Header from './includes/Header';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../axiosConfig';

function Places() {
    const [places,setPlaces] = useState([]);
    useEffect(()=>{
        axios
        .get(`${BASE_URL}places/`)
        .then((response)=>{
            console.log(response.data.data);
            setPlaces(response.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[]);
    const renderPlaces = ()=>{
        return places.map((place)=>(
            <PlaceCard>
                    <PlaceCardLink to={`/place/${place.id}`}>
                        <PlaceImage src={place.image} alt="Image" />
                        <PlaceBottomcontainer>
                            <PlaceTitle>
                                {place.name}
                            </PlaceTitle>
                            <Location>
                                <LocationIcon src={require("../../assets/images/place.svg").default} />
                                <LocationName>{place.location}</LocationName>
                            </Location>
                        </PlaceBottomcontainer>
                    </PlaceCardLink>
            </PlaceCard>
        ));
    };
    return (
        <>
            <Helmet>
                <title>Places | Travel Guide App</title>
            </Helmet>
            <Header />
            <TopContainer>
                <Heading>Welcome</Heading>
                <Paragraph>Explore the world around you</Paragraph>
            </TopContainer>
            <PlacesContainer>
                {renderPlaces()}
            </PlacesContainer>
        </>
    );
}

const TopContainer = styled.div`
    width:90%;
    margin:50px auto 0;
`;
const Heading = styled.h1`
    font-size:36px;
    margin-bottom:20px;
`;
const Paragraph = styled.p`
    font-size:22px;
    color:#dfdfe2;
    font-weight:bold;
`;
const PlacesContainer = styled.ul`
    display:flex;
    flex-wrap:wrap;
    width:90%;
    margin: 50px auto 0;
`;
const PlaceCard = styled.li`
    width:23.5%;
    margin-right:2%;
    margin-bottom:40px;
    &:nth-child(4n) {
        margin-right:0;
    }
`;
const PlaceCardLink = styled(Link)`
    display:block;
    appearance:none;
`;
// const PlaceCardLink = styled.li``;
const PlaceImage = styled.img`
    display:block;
    width:100%;
    border-top-left-radius:10px;
    border-top-right-radius:10px;    
`;
const PlaceBottomcontainer = styled.div`
    padding:10px 15px;
`;
const PlaceTitle = styled.h3`
    margin-bottom:10px;
    font-size:20px;
`;
const Location = styled.div`
    display:flex;
`;
const LocationIcon = styled.img`
    margin-right:10px;
`;
const LocationName = styled.span`
    font-size:18px;
`;

export default Places;
