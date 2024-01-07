import MenuBar from "../../components/layout/MenuBar";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RecentPosts from "../../components/page/Home/RecentPosts";

// 홈 각 박스 제목
const SubTitle = styled.div`
  padding-top: 25px;
  padding-bottom: 5px;
  padding-left: 20px;
  text-align: left;
  line-height: 50px;
  font-weight: 800;
  font-size: 22px;
  color: #505050;
  @media screen and (max-width: 700px) {
    padding-top: 8px;
    padding-bottom: 10px;
    font-size: 18px;
  }
`;

// 아이콘 이미지 조정
const ImageIcon = styled.img`
  width: 30px;
  vertical-align: middle;
  margin-left: 5px;
  margin-bottom: 5px;
  @media screen and (max-width: 700px) {
    width: 24px;
  }
`;

// 학생회 캠퍼스 선택 박스 Parent
const CampusMoveBox = styled.div`
  margin: 0px 20px;
  height: 130px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  border-radius: 20px;
  background: #ffffff;
  @media screen and (max-width: 700px) {
    height: 100px;
    margin-top: -15px;
    gap: 0px;
  }
`;

// 학생회 캠퍼스 선택 박스 Child
const CampusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0px;
  height: 110px;
  ${({ isLeft }) => (isLeft ? "border-right: 1.5px solid #f5f5f5" : null)};
  ${({ isLeft }) => (isLeft ? null : "border-left: 1.5px solid #f5f5f5")};
  @media screen and (max-width: 700px) {
    height: 80px;
  }
`;

// 대여 박스 Parent
const ContentAreaBox = styled.div`
  padding: 0px 20px;
  @media screen and (max-width: 700px) {
    margin-top: -15px;
  }
`;

// 대여 박스 Child
const RecentPostBox = styled.div`
  background: #ffffff;
  border-radius: 20px;
  padding: 10px 0px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  align-items: center;
  justify-content: center;
`;

// 학생회 선택 Text
const CampusText = styled.div`
  width: 100%;
  text-align: center;
  margin: 10px 10px;
  border-radius: 20px;
  height: 110px;
  line-height: 110px;
  font-weight: 800;
  font-size: 38px;
  color: #c3cbd5;
  @media screen and (max-width: 700px) {
    font-size: 150%;
    height: 80px;
    line-height: 80px;
  }
  &:hover {
    background: #f5f5f5;
    color: #379dff;
  }
`;

//물건이 필요한 곳 박스
const LocationItems = styled.div`
  padding: 20px 10px;
  margin-bottom: 100px;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: rgba(209, 209, 209, 0.4) 0px 0px 15px;
  text-align: center;
`;

//위치 박스
const LocationItem = styled.span`
  display: inline-block;
  margin: 3px 3px;
  padding: 10px 15px;
  background: #ffffff;
  border: 1px solid #379dff;
  border-radius: 30px;
  font-weight: 800;
  font-size: 17px;
  color: #379dff;
  &:hover {
    background: #379dff;
    color: #ffffff;
  }
  @media screen and (max-width: 700px) {
    font-weight: 700;
    font-size: 13px;
  }
`;

const Home = () => {
  return (
    <div>
      <Header headerType={"home"}></Header>
      {/* 학생회 대여 */}
      <SubTitle>
        학생회에서 빌려드려요 <ImageIcon src={"/image/pin.svg"} alt="" />
      </SubTitle>
      <CampusMoveBox>
        {/* 글캠 링크 추가 */}
        <Link to={"/council/g"}>
          <CampusBox isLeft={true}>
            <CampusText>
              <span>글로벌</span> 캠퍼스
            </CampusText>
          </CampusBox>
        </Link>
        {/* 메캠 링크 추가 */}
        <Link to={"/council/m"}>
          <CampusBox isLeft={false}>
            <CampusText>
              <span>메디컬</span> 캠퍼스
            </CampusText>
          </CampusBox>
        </Link>
      </CampusMoveBox>
      {/* 일반 대여 목록 */}
      <SubTitle>
        대여를 원하고 있어요 <ImageIcon src={"/image/hand.svg"} alt="" />
      </SubTitle>
      <ContentAreaBox>
        <RecentPostBox>
          <RecentPosts></RecentPosts>
        </RecentPostBox>
      </ContentAreaBox>
      {/* 장소 선택 목록 */}
      <SubTitle>
        어딘가요? 내 물건이 필요한 곳!
        <ImageIcon src={"/image/sad.svg"} alt="" />
      </SubTitle>
      <ContentAreaBox>
        <LocationItems>
          <Link to={"/post/바나대"}>
            <LocationItem>바나대</LocationItem>
          </Link>
          <Link to={"/post/AI공학관"}>
            <LocationItem>AI공학관</LocationItem>
          </Link>
          <Link to={"/post/중앙도서관"}>
            <LocationItem>중앙도서관</LocationItem>
          </Link>
          <Link to={"/post/가천관"}>
            <LocationItem>가천관</LocationItem>
          </Link>
          <Link to={"/post/공대2"}>
            <LocationItem>공대2</LocationItem>
          </Link>
          <Link to={"/post/공대1"}>
            <LocationItem>공대1</LocationItem>
          </Link>
          <Link to={"/post/글로벌센터"}>
            <LocationItem>글로벌센터</LocationItem>
          </Link>
          <Link to={"/post/반도체대학"}>
            <LocationItem>반도체대학</LocationItem>
          </Link>
          <Link to={"/post/비전타워"}>
            <LocationItem>비전타워</LocationItem>
          </Link>
          <Link to={"/post/교육대학"}>
            <LocationItem>교육대학</LocationItem>
          </Link>
        </LocationItems>
      </ContentAreaBox>
      <MenuBar></MenuBar>
    </div>
  );
};

export default Home;
