/*
용도: 헤더
담당자: 양태석
사용법: 헤더가 필요한 곳에서 사용
기타: headerType으로 여러 형태의 헤더 지원
*/
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// 헤더 박스
const HeaderBox = styled.div`
  z-index: 2;
  background: ${({ nobg }) => (nobg ? '#FBFBFB' : '#FBFBFB')};
  position: fixed;
  left: 0;
  right: 0;
  height: 50px;
  border-bottom: ${({ nobg }) => (nobg ? 'none' : '1px solid #eeeeee')};
  @media screen and (min-width: 701px) {
    /* margin: 0px auto; */
    /* max-width: 701px; */
  }
`;

const HeaderContent = styled.div`
  @media screen and (min-width: 701px) {
    margin: 0px auto;
    max-width: 701px;
  }
`;

// 헤더에 가려지지 않게 하는 더미
const EmptyBox = styled.div`
  height: 50px;
`;

// 헤더 텍스트
const HeaderText = styled.span`
  display: inline-block;
  padding-left: 20px;
  height: 50px;
  line-height: 50px;
  color: #555555;
  font-weight: 800;
  font-size: 20px;
`;

// 홈 헤더의 타이틀
const HomeTitle = styled.div`
  width: 30%;
  padding-left:20px;
  height: 50px;
  text-align: left;
  line-height: 50px;
  font-weight: 800;
  font-size: 25px;
  color:#D1D1D1;
  float: left ; 
`;

// 공지사항 박스
const AnnoBox = styled.div`
  height: 50px;
  width: calc(70% - 30px);
  float: left;
`;

const Anno = styled.div`
  width: 30px;
  height: 30px;
  margin-top: 10px;
  float: right;
  margin-left: 10px;
  border-radius: 5px;
  /* background: #EEF6FF; */
  &:hover{
    background: #f3f3f3;
  }
  & img{
    width: 30px;
  }
`;

const Help = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  float: right;
  margin-top: 10px;
  margin-left: 10px;
  text-align: center;
  line-height: 30px;
  font-weight: 800;
  font-size: 20px;
  position: relative;
  & img{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13px;
  }
  &:hover{
    background: #f3f3f3;
  }
`;

const HelpIntro = styled.div`
  float: right;
  margin-top: 12px;
  position: relative;
  width: 150px;
  & img{
    position: absolute;
    left: 0;
    top: 0;
    height: 24px;
  }
  & span{
    position: absolute;
    left: 7px;
    line-height: 24px;
    font-size: 13px;
    font-weight: 800;
    color: #ffffff;
    top: 0;
    /* width: 200px; */
    display: inline-block;
  }
`;

// 헤더 가운데 텍스트
const HeaderCenterText = styled.span`
  text-align: center;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #555555;
  font-weight: 700;
  font-size: 23px;
`;

// 뒤로가기 버튼
const HeaderBackBtn = styled.button`
  z-index: 1;
  position: absolute;
  /* left: 0; */
  margin-top: 5px;
  height: 40px;
  width: 40px;
  line-height: 50px;
  color: #707070;
  font-weight: 700;
  font-size: 20px;
  border-radius:10px;
  background: none;
  border: none;
  float: left;
  & img{
    position: absolute;
    top:0;
    left: 0;
    height: 40px;
    /* margin: 5px 5px; */
  }
  &:hover{
    
    background: #f5f5f5;
  }
`;

// 채팅 버튼
const ChatBtn = styled.div`
  position: relative;
  float: right;
  margin-top: 12px;
  margin-right: 20px;
  background: none;
  border: none;
  & a{
    display: inline-block;
  }
  & img{
    width: 27px;
  }
`;

const Header = ({headerType, headerText}) => {
    const navigate = useNavigate(); // 페이지 이동을 위해

    // 이전 페이지로 이동
    const handleGoBack = () => {
      navigate(-1); 
    };

    switch (headerType) {
      case "home": // 홈
        return (
          <div>
            <HeaderBox nobg={"true"}>
              <HeaderContent>
                <HomeTitle>대학빌림</HomeTitle>
                <AnnoBox>
                  <Anno>
                    <img src={"/image/megaphone.svg"}></img>
                  </Anno>
                  <Help>
                    <img src={"/image/help.svg"}></img>
                  </Help>
                  <HelpIntro>
                    <img src={"/image/help_intro.svg"}></img>
                    <span>도움말을 확인해보세요!</span>
                  </HelpIntro>
                </AnnoBox>
              </HeaderContent>
            </HeaderBox>
            <EmptyBox></EmptyBox>
          </div>
        );
      case "user": // 유저
        return (
          <div>
            <HeaderBox nobg={"true"}>
              <HeaderContent>
                <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <img src="/image/chat.svg" alt="" />
              </Link>
            </ChatBtn>
              </HeaderContent>
            
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "detail": // 글 내부
        return (
          <div>
            <HeaderBox>
            <HeaderText>{headerText}</HeaderText>
            <ChatBtn>
              <Link to={"/chat"}>
                <img src="/image/chat.svg" alt="" />
              </Link>
            </ChatBtn>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "write": // 작성하기
        return (
          <div>
            <HeaderBox>
            <HeaderContent>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/close.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>{headerText}</HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "chat": // 채팅방
        return (
          <div>
            <HeaderBox>
              <HeaderContent>
                <HeaderText>
                  {headerText}
                </HeaderText>
              </HeaderContent>
                
            </HeaderBox>
            <EmptyBox></EmptyBox>
          </div>
        );
      case "inChat": // 채팅 내부
        return (
          <div>
            <HeaderBox>
            <HeaderContent>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>
              {headerText}
            </HeaderCenterText>
           </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "admin": // 어드민 페이지 내부
        return (
          <div>
            <HeaderBox>
            <HeaderContent>
            <HeaderBackBtn onClick={handleGoBack}><img src="/image/back.svg" alt="" /></HeaderBackBtn>
            <HeaderCenterText>
              {headerText}
            </HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      case "manage": // 어드민 페이지 내부
        return (
          <div>
            <HeaderBox nobg={false}>
            <HeaderContent>
            <HeaderCenterText>
              {headerText}
            </HeaderCenterText>
            </HeaderContent>
          </HeaderBox>
          <EmptyBox></EmptyBox>
          </div>
        );
      default:
        return (
          <div>
            <HeaderBox></HeaderBox>
            <EmptyBox></EmptyBox>
          </div>
        );
    }
    
  };

export default Header;