import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;

`;

const ContentBox = styled.div`
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

const InputTitle = styled.div`
    margin-top: 20px;
    font-size: 17px;
    font-weight: 700;
    color: #aaaaaa;
`;


const EditCouncilInfo = () => {
  const [councilData, setCouncilData] = useState({ items: [] });
  const [location, setLocation] = useState("");
  const [operatingHours, setOperatingHours] = useState("");
  const [usageGuidelines, setUsageGuidelines] = useState("");

  const [cookies] = useCookies(); // 쿠키 사용하기 위해
  const navigate = useNavigate(); // 페이지 이동 위해

  useEffect(() => {
    const fetchCouncils = async () => {
      try {
        // 토큰 쿠키가 없다면 로그인 페이지로 이동
        if (!cookies.token) {
          navigate("/signin");
          return;
        }

        // 유저의 채팅방 모두 가져오기 api 요청
        const response = await axios.get("http://" + process.env.REACT_APP_BACK_URL + "/manage/council", {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        });

        setCouncilData(response.data);
        setLocation(response.data.location);
        setOperatingHours(response.data.operatingHours);
        setUsageGuidelines(response.data.usageGuidelines);
        console.log(response.data);

      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncils();
  }, [cookies.token, navigate]); // [] 와 같이 비워도 됨.


  const handleAddCouncil = async (e) => {
    e.preventDefault();

    try {

      const PutResponse = await axios.put("http://" + process.env.REACT_APP_BACK_URL + "/manage/council/" + councilData.councilId,
        {
          location,
          operatingHours,
          usageGuidelines,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      // 성공시
      if (PutResponse.status === 200) {
        window.alert("수정 성공");
        navigate("/council/manage");
      }
    } catch (error) {
      console.error("오류 발생:", error);

    }
  };
  return (
    <Container>
      <Header headerType={"noChatIcon"} headerText={"운영 정보 수정"}></Header>
      <ContentBox>
        <InputTitle>위치</InputTitle>
        <InputBox type="text" name="location" placeholder="위치 (ex AI공학관 505호)"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <InputTitle>운영 시간</InputTitle>
        <InputBox type="text" name="operatingHours" placeholder="운영 시간 (ex 9시 ~ 16시)"
          value={operatingHours}
          onChange={(e) => {
            setOperatingHours(e.target.value);
          }}
        />
        <InputTitle>이용 수칙</InputTitle>
        <InputBox type="text" name="usageGuidelines" placeholder="이용 수칙 (ex 뒷정리 필수)"
          value={usageGuidelines}
          onChange={(e) => {
            setUsageGuidelines(e.target.value);
          }}
        />

        {/* 제출 버튼 */}
        <SummitBtn onClick={handleAddCouncil}>수정</SummitBtn>
      </ContentBox>
    </Container>
  );
};

export default EditCouncilInfo;