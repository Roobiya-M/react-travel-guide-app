import React,{useState,useEffect, useContext} from 'react';
import Helmet from 'react-helmet';
import Header from './includes/Header'
import axios from 'axios';
import styled from 'styled-components';
import {useParams,Link} from 'react-router-dom';
import { BASE_URL } from '../../axiosConfig';
import { UserContext } from '../../App';

function Place() {
    const params = useParams();
    const [place,setPlaces]= useState({
        name:"",
        gallery:[]
    });
    const {userData} = useContext(UserContext)
    useEffect(()=>{
        // console.log(userData)
        axios
        .get(`${BASE_URL}places/protected/${params.id}`,{
            headers:{
                Authorization:`Bearer ${userData?.access}`
            }
        })
        .then((response)=>{
            // console.log(response);
            setPlaces(response.data.data);
        })
        .catch((error)=>{
            console.log(error);
        })

    },[]);
    return (
        <>
            <Helmet>
                <title>{place.name} | Travel Guide App</title>
            </Helmet>
            <Header />
            <BackContainer>
                <Button to="/">Back</Button>
            </BackContainer>
            <MainContainer>
                <Title>{place.name}</Title>
                <InfoContainer>
                    <CategoryName>{place.category_name}</CategoryName>
                    <LocationContainer>
                        <LocationIcon src={require("../../assets/images/place.svg").default} alt="location image" />
                        <LocationName>{place.location}</LocationName>
                    </LocationContainer>
                </InfoContainer>
                <GalleryContainer>
                    <GalleryImageItem>
                        <GalleryImage src={place.image} alt="image"/>
                    </GalleryImageItem>
                    {
                        place.gallery.map((galleryItem)=>(
                            <GalleryImageItem>
                                <GalleryImage src={galleryItem.image} alt=""/>
                            </GalleryImageItem>
                        ))
                    }
                </GalleryContainer>
                <SubHeading>Place Details</SubHeading>
                <Description>{place.description}</Description>
            </MainContainer>
        </>
    )
}

const MainContainer = styled.div`
    width:70%;
    margin:70px auto 0;
`;
const Title = styled.h1`
    font-size:48px;
    margin-bottom:15px;
`;
const InfoContainer = styled.div`
    display:flex;
    align-items:center;
    margin-bottom:15px;
`;
const CategoryName = styled.span`
    padding:5px 10px;
    border-radius:20px;
    display:inline-block;
    border: 1px solid #9c9c9c;
    color:#9c9c9c;
    margin-right:15px;
`;
const LocationContainer = styled.div`
    display:flex;  
    justify-content:space-between;
    align-items:center; 
`;
const LocationIcon = styled.img`
    margin-right:5px;
`;
const LocationName = styled.span`
    color:#9c9c9c;
    font-size:16px;
    font-weight:bold;
`;
const GalleryContainer = styled.ul`
    display:grid;
    grid-template-columns:repeat(4, 1fr);
    grid-gap:20px;
    border-radius:15px;
    overflow:hidden;
    margin-bottom:35px;
`;
const GalleryImageItem = styled.li`
    &:first-child{
        grid-column-end:span 2;
        grid-row-end:span 2;
    }
`;
const GalleryImage = styled.img`
    width:100%;
    display:block;
`;
const SubHeading = styled.h3`
    font-size:28px;
    margin-bottom:20px;
`;
const Description = styled.p`
    font-size:16px;
    line-height:1.6em;
`;
const BackContainer = styled.div`
    display:flex;
    align-items:center;
    width:90%;
    margin:0 auto;
    justify-content:flex-end;
`;
const Button = styled(Link)`
    background-color:#046bf7;
    border-radius:4px;
    padding:13px 54px;
    border:none;
    color:#fff;
    font-size:18px;
    font-weight:bold;
`;


export default Place;
