import React,{useContext} from 'react';
import styled from 'styled-components';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';

function Header() {
    const {userData,updateUserData} = useContext(UserContext);
    const handleLogout=()=>{
        updateUserData({type:"LOGOUT"});
    }
  return (
    <HeaderContainer>
        <LogoImage src={require("../../../assets/images/logo.svg").default} alt="Logo Image"/>
        <RightBox>
            {userData ? (<Button onClick={()=>{handleLogout()}} >Logout</Button>) :(<Button to="/auth/login/">Login</Button>)}
            
        </RightBox>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
    width:90%;
    margin: 0 auto;
    padding:30px 0;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
const LogoImage = styled.img`
    display:block;
    width:150px;
`;
const RightBox = styled.div`
    display:flex;
    align-items:center;
`;
const Button = styled(Link)`
    background-color:#046bf7;
    border-radius:4px;
    padding:13px 45px;
    border:none;
    color:#fff;
    font-size:18px;
    font-weight:bold;
`;

export default Header
