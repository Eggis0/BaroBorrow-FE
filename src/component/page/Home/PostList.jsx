/*
용도: 최신 post 전체 목록을 내보내는 컴포넌트
담당자: 김윤수
사용법: Home.jsx에서 컴포넌트로 불러와 사용
기타: .
*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Wrapped = styled.div`
  padding: 7px 2%;
  font-weight: 700;
  font-size: 17px;
  color: #505050;
  line-height: 25px;
  height: 25px;
  width: 94%;
  margin: 0px auto;
  &:hover {
    border-radius: 10px;
    background: #f7f7f7;
  }
  @media screen and (max-width: 700px) {
    padding: 5px 2%;
    font-size: 15px;
  }
`;

// 최신글 location
const Title = styled.span`
  padding-left: 15px;
  font-weight: 400;
  font-size: 17px;
  display: inline-block;
  color: #505050;
  @media screen and (max-width: 700px) {
    font-size: 15px;
  }
`;

// 최신 글 상위 3개에 뜨는 이모지
const ImageIcon = styled.img`
  width: 18px;
  float: right;
  vertical-align: middle;
  @media screen and (max-width: 700px) {
    width: 15px;
  }
`;

const PostList = () => {
  const navigate = useNavigate(); // 로그인 전 홈 진입 막기 위해
  const [posts, setPosts] = useState([]); // 최신 글 사용 위해
  const [cookies] = useCookies(); // 쿠키 사용하기 위해

  useEffect(() => {
    // 최신 글 업로드
    const fetchPosts = async () => {
      try {
        const response1 = await axios.get(
          "http://" + process.env.REACT_APP_BACK_URL + "/post/news"
        );
        console.log(response1.data);
        setPosts(response1.data);
      } catch (error) {
        console.log("포스트 오류 발생: ", error);
      }
    };
    fetchPosts();
  }, [cookies.token, navigate]); // 두 요청에 필요한 의존성을 배열로 전달

  return (
    <div>
      {/* post 데이터 렌더링 */}
      {posts.map((post, index) => (
        <div key={post.postId}>
          <Link to={"/"}>
            <Wrapped>
              {post.location}
              <Title> {post.title}</Title>
              {/* 처음 3개의 포스트에만 img 추가 */}
              {index < 3 && <ImageIcon src="image/new.svg" alt="" />}
            </Wrapped>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PostList;
