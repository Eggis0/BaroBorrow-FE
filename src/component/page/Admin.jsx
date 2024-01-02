/*
용도: 관리자 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: ADMIN 권한 유저만 접근 가능
*/

import styled from "styled-components";
import Header from "../layout/Header";
import { Link } from "react-router-dom";


const AdminBox = styled.div`
    padding: 0 20px;
`;

const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

const DashBoardBox = styled.div`
  background: #ffffff;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  padding: 10px 20px;
  /* box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px; */
`;

const DashBoardDataLine = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;
const DashBoardDataName = styled.span`
    font-weight: bold;
    color:#555555;
`;
const DashBoardData = styled.span`
    color: #aaaaaa;
`;
const ManageBox = styled.div`
`;
const ManageBtn = styled.div`
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  /* background: #e6fcf5; */
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
  color: #38d9a9;

  &:hover{
    color: #ffffff;
    background: #38d9a9;
  }

`;
const Admin = () => {
    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"관리자"}></Header>
            <Subtitle>DASHBOARD</Subtitle>
            <DashBoardBox>
                <ul>
                    <DashBoardDataLine>
                        <DashBoardDataName>회원 수</DashBoardDataName>
                        <DashBoardData>명</DashBoardData>
                    </DashBoardDataLine>
                    <DashBoardDataLine>
                        <DashBoardDataName>인중된 회원 수</DashBoardDataName>
                        <DashBoardData>명</DashBoardData>
                    </DashBoardDataLine>
                    <DashBoardDataLine>
                        <DashBoardDataName>게시물 수</DashBoardDataName>
                        <DashBoardData>개</DashBoardData>
                    </DashBoardDataLine>
                    <DashBoardDataLine>
                        <DashBoardDataName>완료된 게시물 수</DashBoardDataName>
                        <DashBoardData>개</DashBoardData>
                    </DashBoardDataLine>
                    <DashBoardDataLine>
                        <DashBoardDataName>후기 수</DashBoardDataName>
                        <DashBoardData>개</DashBoardData>
                    </DashBoardDataLine>
                </ul>
                
            </DashBoardBox>
            <Subtitle>MANAGE</Subtitle>
            <ManageBox>
                <Link to={"/admin/cimanage"}><ManageBtn>학생회 대여품 관리</ManageBtn></Link>
                <Link to={"/admin/certimanage"}><ManageBtn>인증 관리</ManageBtn></Link>
                <ManageBtn>악성 유저 관리</ManageBtn>
                <ManageBtn>문의함</ManageBtn>
                <ManageBtn>공지사항 관리</ManageBtn>
            </ManageBox>
            
        </AdminBox>
    );
  };

export default Admin;