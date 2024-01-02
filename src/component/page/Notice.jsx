/*
용도 : 공지사항 페이지
담당자: 박여넛
사용법: 
기타: 
*/
import Header from "../layout/Header";
import styled from "styled-components";
import MenuBar from "../layout/MenuBar";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



const NoticeBox = styled.div`
  /* width: 100%; */
  padding: 20px;
`;
const BoardBox = styled.div`
  border-radius: 20px;
  border: 1px solid #eaeaea;
  background: #fff;
  padding: 5px 0px;
  & a:last-child div{
    border-bottom: none;
  }
`;

const Listbox = styled.div`
  border-bottom: 1px solid #eaeaea;
  margin: 0px;
  flex-shrink: 0;
  display: opacity;
  padding: 20px 20px;
`;

const NoticeTitle = styled.div`
  color: #636363;
  font-size: 15px;
  font-weight: 700;
`;

const NoticeDate = styled.div`
  width: auto;
  padding: 5px 0px;
  color: #636363;
  font-size: 12px;
  font-weight: 500;
  padding-bottom: 2px;
`;

const ImageIcon = styled.img`
  width: 25px;
  height: 35px;
  float: right;
  vertical-align: middle;
  margin-left: auto;
`;

const Notice = () => {
  const [notices, setNotices] = useState([
    {
      title : "말걸지마",
      date : "2023-12-07"
    },
    {
      title : "말걸지마",
      date : "2023-12-07"
    },
    {
      title : "말걸지마",
      date : "2023-12-07"
    }
  ]); 

  return (
    <div>
      <Link to={"/"}>
        <Header headerType={"admin"} headerText={"공지사항"}></Header>
      </Link>
      <NoticeBox>
        <BoardBox>
          {notices.map((notice, index) => (
              <Link to={"/"} key={index}>
                <Listbox>
                  <NoticeTitle>
                    [공지] {notice.title}
                    <ImageIcon src={"/image/arrow.svg"} alt="" />
                  </NoticeTitle>
                  <NoticeDate>{notice.date}</NoticeDate>
                </Listbox>
              </Link>
          ))}
      </BoardBox>
      </NoticeBox>
     
      <MenuBar></MenuBar>
    </div>
  );
};

export default Notice;