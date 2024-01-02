/*
용도: 관리자 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: ADMIN 권한 유저만 접근 가능
*/
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../layout/Header";


const AdminBox = styled.div`
    padding: 0 20px;
`;


const InputBox = styled.input`
    display: block;
    border: none;
    padding: 15px 3%;
    margin-top: 10px;
    width: 94%;
    font-size: 15px;
    font-weight: 800;
    color: #333333;
    border-radius: 10px;
    border: 1px solid #E8E8E8;
    outline: none;
    &::placeholder {
        color: #aaaaaa; 
    }
    &:focus {
      border-color: #38d9a9;
    }
`;

const SummitBtn = styled.button`
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: 800;
    border: none;
    color: #ffffff;
    margin-top: 20px;
    border-radius: 10px;
    background: #38d9a9;
`;

const Details = styled.details`
    position: relative;
    margin-top: 10px;
    width: 100%;
    font-size: 15px;
    font-weight: 800;
    background: #ffffff;
    border-radius: 10px;
    border: 1px solid #E8E8E8;

    &[open] summary:after {
    transform: rotate(-45deg) translate(0%, 0%);
    }

`;
const ListBox = styled.ul`
    width: 100%;
    background: #ffffff;
    position: absolute;
    top: 55px;
    left: -1px;
    margin: 0;
    border-radius: 10px;
    border: 1px solid #E8E8E8;
    overflow: hidden;
`;

const List = styled.li`
    border-bottom: 1px solid #eeeeee;
    list-style: none;
    padding: 10px 20px;
    &:hover{
        background: #e9fff8;
    }
    &:last-child {
    border-bottom: none;
    }
`;


const Summary = styled.summary`
    padding: 15px 10px;
    border-radius: 5px;
    border-radius: 10px;
    list-style: none;
    color:  ${({ isDefault }) => ( isDefault ? '#aaaaaa' : '#333333')};
    &:after {
        content: '';
        float: right;
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #aaaaaa;
        border-left: 2px solid #aaaaaa;
        transform: rotate(45deg) translate(50%, 0%);
        transform-origin: center center;
        transition: transform ease-in-out 100ms
    }
`;

const Button = styled.button`
    color: #777777;
    font-weight: 700;
    border: none;
    background: none;
    font-size: 17px;
    width: 100%;
    text-align: center;
    display: block;
`;


const CouncillItemCreate = () => {
    const [name, setName] = useState("");
    const [type, setType] = useState("물품 유형"); 
    const [key, setKey] = useState(0); 
    // const { id } = useParams();
    

    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해


    const handleAddCouncil = async (e) => {
        e.preventDefault();
    
        // 입력을 아에 안했는지 검사
        if (name.length < 1) {
          window.alert("학과를 입력해주세요.");
          setName('');
          return;
        }
        if (type == "물품 유형") {
          window.alert("물품 유형을 선택해주세요.");
          return;
        }

        try {
          // 회원가입 api 요청
        //   const councilId = id;
          const signUpResponse = await axios.post("http://"+process.env.REACT_APP_BACK_URL+"/manage/council-item",
            {
                name,
                type,
            },
            {
                headers: {
                Authorization: `Bearer ${cookies.token}`,
                },
            }
          );
          // 성공시
          if (signUpResponse.status === 200) {
            window.alert("생성 성공");
            setKey(key+1);
            navigate("/council/manage");
          }
        } catch (error) {
            console.error("오류 발생:", error);
          
        }
      };
    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"물품 추가"}></Header>
            <div>
                <InputBox type="text" name="name" placeholder="물품명"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                  }}
                  />

                <Details>
                    <Summary isDefault={type == "물품 유형"}>
                        {type}
                    </Summary>
                    <ListBox>
                        <List>
                            <Button onClick={() => setType("RENTAL")}>
                                RENTAL
                            </Button>
                        </List>
                        <List>
                            <Button onClick={() => setType("PROVIDED")}>
                         PROVIDED
                            </Button>
                        </List>
                    </ListBox>
                    </Details>
                {/* 제출 버튼 */}
                <SummitBtn onClick={handleAddCouncil}>추가</SummitBtn>
            </div>
        </AdminBox>
    );
  };

export default CouncillItemCreate;