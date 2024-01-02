/*
용도: 유저 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: 주소의 파라미터로 유저 페이지 구분
*/
import { Link,useParams, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";

// 로그아웃 버튼
const Logout = styled.button`
   display: block;
   margin: 30px auto 0px auto;
   border: none;
   border-radius: 10px;
   background: none;
   color:#379DFF;
   font-size: 20px;
   line-height: 30px;
   font-weight: 400;
   width: 200px;
   height: 40px;
   &:hover{
    background: #f7f7f7;
   }
`;

const ProfilImgBox = styled.div`
   display: inline-block;
   width: 80px;
`;

const UserInfoContentBox = styled.div`
  height: 100px;
  width: calc(100% - 100px);
  float: right;
`;
const Nickname = styled.div`
  font-size: 20px;
  font-weight: 800;
  color:#333333;
`;
const CountInfoBox = styled.div`
  background: #EEF6FF;
  border-radius: 10px;
  width: 100%;
  height: 60px;
  margin-top: 10px;
`;
const ProfilImg = styled.div`
   width: 80px;
   height: 80px;
   overflow: hidden;
   border-radius: 100px;
   border: 2px solid #379DFF;
   position: relative;
   & img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ isVertical }) => (isVertical ? 'width: 80px' : 'height: 80px')};
   }
`;

const UserBox = styled.div`
  padding: 10px;
`;

const UserInfoBox = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 10px;
`;

const Certifi = styled.div`
   display: block;
   margin: 10px auto;
   background: none;
   color:#a9a9a9;
   text-align: center;
   font-size: 15px;
   font-weight: 400;

   & span:hover{
    font-size: 16px;
   }
   & span{
    color: #9d9d9d;
    border-bottom: 1px solid #9d9d9d;
    text-align: center;
   }
   & span span{
    color: #379DFF;
    text-align: center;
   }
`;

const User = () => {
  const navigate = useNavigate(); // 페이지 이동을 위해
  const [cookies, ,removeCookie] = useCookies();// 쿠키 가져오기, 쿠기 삭제를 위한 함수
  const [userInfo, setUserInfo] = useState({}); // 유저 정보 상태

  const [img, setImg] = useState({}); // 유저 정보 상태
  const [isVertical, setIsVertical] = useState(true); // 유저 정보 상태
  const { userid } = useParams(); // 파라미터 값 가져오기

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }
        // 회원 조회 api 요청
        const response = await axios.get("http://"+process.env.REACT_APP_BACK_URL+"/account?id=" + userid, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        var img = new Image();

        // 이미지의 소스를 설정하여 로드를 시작합니다.
        img.src = "http://" + process.env.REACT_APP_BACK_URL + "/image/" + response.data.imgPath;

        // 이미지가 로드되면 실행되는 콜백 함수를 정의합니다.
        img.onload = function() {
            // 이미지의 가로 길이
            var width = img.width;
            // 이미지의 세로 길이
            var height = img.height;

            // 가로 세로 길이를 출력하거나 다른 작업을 수행합니다.
            setImg(img);
            setIsVertical(width<=height);
            // console.log(width<=height);
            console.log("가로 길이:", width);
            console.log("세로 길이:", height);
        };

        console.log(response.data);
        // 유저 상태 등록
        setUserInfo(response.data);
      } catch (error) {
        // 없는 유저라면 쿠키 지우고 로그인 페이지로 이동
        if (error.response && error.response.status === 404) {
          removeCookies();
          navigate("/signin");
        } else {
          console.error("오류 발생:", error);
        }
      }
    };
    fetchUserInfo();
  }, [cookies.token, navigate, userid]);

  // 쿠키 지우기
  const removeCookies = async (e) => {
    removeCookie('token', { path: '/' });
    removeCookie('certification', { path: '/' });
    removeCookie('roles', { path: '/' });
    removeCookie('nickname', { path: '/' });
    removeCookie('userId', { path: '/' });
    navigate("/");
  };

  return (
    <div>
      <Header headerType={"user"}></Header>
      <UserBox>
        <UserInfoBox>
          <ProfilImgBox>
            <ProfilImg isVertical={isVertical}>
              <img src={img.src}></img>
            </ProfilImg>
          </ProfilImgBox>
          <UserInfoContentBox>
            <Nickname>{userInfo.nickname}</Nickname>
            <CountInfoBox>
              
            </CountInfoBox>
          </UserInfoContentBox>

        </UserInfoBox>
        <Logout onClick={removeCookies}>로그아웃</Logout>
        {cookies.certification == false  ? 
        <Certifi><Link to={"/certification"}><span>물건을 대여하고 싶나요? <span>학생증 인증하기</span></span></Link></Certifi>
        : null}
      </UserBox>
      <MenuBar></MenuBar>
    </div>
  );
};

export default User;