/*
용도: 학생증 인증 페이지
담당자: 양태석
사용법: 
기타: 
*/
import Header from "../layout/Header";
import { useState } from "react";
import styled from "styled-components";

const Announcement = styled.div`
    margin: 30px auto;
    width: 80%;
    padding: 20px;
    /* height: 300px; */
    border-radius: 20px;
    background: #f5f5f5;
    font-size: 15px;
    line-height: 25px;
    color: #777777;
    text-align: left;
    & p{
        margin: 10px 0;
    }
    & p span{
        /* word-break: keep-all;*/
        
        color: #379DFF;
    }
`;

const CertifiBox = styled.div`
    /* position: absolute;
    top:30%; */
    width: 100%;
    @media screen and (min-width: 701px) {
        /* margin: 0px auto; */
        width: 700px;
    }
`;

const InputBox = styled.input`
    display: block;
    margin: 10px auto;
    height: 40px;
    background: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 10px;
    color:#333333;
    font-size: 18px; 
    outline: none;
    padding: 0px 3%;
    width: 74%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
    &:focus {
      border-color: #379DFF;
    }
`;

const SubmitBtn = styled.button`
    display: block;
    margin: 0px auto;
    height: 40px;
    background: #efefef;
    border: none;
    border-radius: 10px;
    background: #379DFF;
    font-weight: bold;
    color:#ffffff;
    font-size: 18px; 
    outline: none;
    width: 80%;
    &::placeholder {
        color: #aaaaaa; 
        font-size: 18px;
    }
`;

// 제출 버튼
const FileInputBtn = styled.label`
    display: block;
    margin: 0 auto;
    width: 80%;
    text-align: left;
    padding: 20px;
    & div{
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      color:#379DFF;
      border: 1px solid #379DFF;
      border-radius: 30px;
      padding: 10px;
    }
`;
const FileInputBox = styled.input`
    border: none;
    background: none;
    margin-left: 5px;
    &::file-selector-button{
      display: none;
    }
`;

const Certifi = () => {
    const [file, setFile] = useState(null);
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
      };
    return (
        <div>
            <Header headerType={"write"} headerText={"학생증 인증하기"}></Header>
                    {/* 이미지 형식 제한해야함 */}
            <Announcement>
            <p>
                대여글을 작성하려면 <span>학생증을 인증</span>해야 합니다.
            </p>
            <p>
                <span>모바일 학생증</span>의 캡처 사진 또는
                <span>실물 학생증</span>의 촬영 사진을 업로드해주세요. <br/><span>*이름과 학번, 얼굴사진이 보여야합니다.</span>
            </p>
            <p>
                제공한 정보는 목적 외에는 사용되지 않습니다.
            </p>
            <p>
                승인은 요청 후 24시간 이내에 이루어집니다.
            </p>
            </Announcement>
            <CertifiBox>
                    <InputBox
                type="text"
                // ref={useridRef}
                name="name"
                // value={userid}
                placeholder="이름 (ex 홍길동)"
                onChange={(e) => {
                    // setUserid(e.target.value);
                }}
                // onKeyDown={(e) => { activeEnter(e) }}
                />
                <InputBox
                type="text"
                // ref={""}
                name="id"
                // value={""}
                placeholder="학번 (ex 2024xxxxx)"
                onChange={(e) => {
                    // setUserid(e.target.value);
                }}
                // onKeyDown={(e) => { activeEnter(e) }}
                />
                <FileInputBtn for="file">
                    <div>학생증 이미지 선택</div>
                    <FileInputBox type="file" name="file" id="file" onChange={handleFileChange} />
                </FileInputBtn>
                <SubmitBtn onClick={" "}>인증 요청하기</SubmitBtn>
            </CertifiBox>
        </div>
    );
  };

export default Certifi;