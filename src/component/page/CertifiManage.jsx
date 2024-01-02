/*
용도: 관리자 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: ADMIN 권한 유저만 접근 가능
*/
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../layout/Header";


const AdminBox = styled.div`
    padding: 0 20px;
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
const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

const Dashboard = styled.div`
    background: #ffffff;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  padding: 10px 20px;
`;
const RequestsBox = styled.ul`
    margin: 30px 0px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px;
    overflow: hidden;
    & a:not(:last-child) li{
        border-bottom: 1px solid #dddddd;
    }
`;

const UserImg = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid #eeeeee;
    border-radius: 50px;
    float: left;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    & img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    ${({ isVertical }) => (isVertical ? 'width: 50px' : 'height: 50px')};
   }
`;


const Council = styled.li`
    display: inline-block;
    width: calc(100% - 20px);
    list-style: none;
    padding: 15px 10px; 
    position: relative;
`;



const UserInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    color: #4f4f4f;
    display: inline-block;
    & span{
        font-weight: 700;
        margin: 0px 10px;
    }
`;
const CertifiState = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    & img{
        ${({ isCertifi }) => (isCertifi ? null : 'opacity: 30%')};
        width: 50px;
    }
`;
const CiManage = () => {
    const [certiRequest, setCertiRequest] = useState([]); // 채팅방 리스트 상태
    const [key, setKey] = useState(0); 
    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해
    
  
    useEffect(() => {
      const fetchCouncils = async () => {
        try {
          // 토큰 쿠키가 없다면 로그인 페이지로 이동
        //   if (!cookies.token) {
        //     navigate("/signin");
        //     return;
        //   }
  
          // 유저의 채팅방 모두 가져오기 api 요청
          const response = await axios.get("http://"+process.env.REACT_APP_BACK_URL+"/certification/requests", {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          });

          setCertiRequest(response.data);
          console.log(response.data);

        } catch (error) {
          console.error("오류 발생:", error);
        }
      };

      fetchCouncils();
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.

    const update = async (id) => {
        try {
            console.log(id);
            const response = await axios.delete("http://"+process.env.REACT_APP_BACK_URL+"/council/"+id, {
            headers: {
                Authorization: `Bearer ${cookies.token}`,
            },
            });
            window.alert("삭제되었습니다.");
            setKey(key+1);
            console.log(response);
        } catch (error) {
            console.error("오류 발생:", error);
        }
    };

    const getImage =  (path) => {
        var img = new Image();
        var isVertical = true;
        img.src = "http://" + process.env.REACT_APP_BACK_URL + "/image/" + path;
        
        img.onload = function() {
            var width = img.width;
            var height = img.height;
            isVertical = width<=height;
            // return { path: img.src, isVertical};
        };
        return { path: img.src, isVertical};
    };

    // const isImageVertical =  (path) => {
    //     var img = new Image();
    //     img.src = "http://" + process.env.REACT_APP_BACK_URL + "/image/" + path;
    //     img.onload = function() {
    //         var width = img.width;
    //         var height = img.height;
    //         var IsVertical = width<=height;
    //     };
    //     return (img.src);
    // };

    

    return (
        <AdminBox>
            <Header headerType={"admin"} headerText={"학생증 인증 관리"}></Header>
            <Subtitle>DASHBOARD</Subtitle>
            <Dashboard>
                <ul>
                    <DashBoardDataLine>
                        <DashBoardDataName>승인되지 않은 회원 수</DashBoardDataName>
                        <DashBoardData>명</DashBoardData>
                    </DashBoardDataLine>
                    <DashBoardDataLine>
                        <DashBoardDataName>승인된 회원 수</DashBoardDataName>
                        <DashBoardData>명</DashBoardData>
                    </DashBoardDataLine>
                </ul>
            </Dashboard>
            <RequestsBox>
            {certiRequest.map((request, index) => {
                const imgInfo = getImage(request.imgPath);
                return (
                    <Link to={"/admin/certimanage/"+request.certiId} key={request.certiId} >
                    <Council key={request.certiId}>
                        <UserImg isVertical={imgInfo.isVertical}>
                            <img src={imgInfo.path} />
                        </UserImg>
                        <UserInfo>
                            <span>아이디</span>{request.user.userId} <span>닉네임</span>{request.user.nickName}<br/>
                            <span>이름</span>{"양태석"} <span>학번</span>{202235277}<br/>
                            <span>요청 시각</span>{request.requestAt[1]}/{request.requestAt[2]} {request.requestAt[3]}:{request.requestAt[4]}
                        </UserInfo>
                        <CertifiState isCertifi={request.user.certification}>
                            <img src={"/image/check.svg"}></img>
                        </CertifiState>
                    </Council>
                    </Link>
                    );
                })}
            </RequestsBox>
        </AdminBox>
    );
  };

export default CiManage;