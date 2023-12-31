import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/UserPages/Home";
import User from "./pages/UserPages/User";
import PostList from "./pages/UserPages/PostList";
import PostDetail from "./pages/UserPages/PostDetail";
import CouncilList from "./pages/UserPages/CouncilList";
import CouncilDetail from "./pages/UserPages/CouncilDetail";
import SignIn from "./pages/UserPages/SignIn";
import SignUp from "./pages/UserPages/SignUp";
import ChatRoomList from "./pages/UserPages/ChatRoomList";
import Chat from "./pages/UserPages/Chat";
import AdminManagement from "./pages/AdminPages/AdminManagement";
import PostEdit from "./pages/UserPages/PostEdit";
import AdminCouncilManagement from "./pages/AdminPages/AdminCouncilManagement";
import AdminCouncilCreation from "./pages/AdminPages/AdminCouncilCreation";
import AdminCouncilItemManagement from "./pages/AdminPages/AdminCouncilItemManagement";
import Certification from "./pages/UserPages/Certification";
import AdminCertificationManagement from "./pages/AdminPages/AdminCertificationManagement"
import CouncilManagement from "./pages/CouncilManagerPages/CouncilManagement"
import CouncilSignIn from "./pages/CouncilManagerPages/CouncilSignIn";
import CreationCouncilItem from "./pages/CouncilManagerPages/CreationCouncilItem";
import EditCouncilInfo from "./pages/CouncilManagerPages/EditCouncilInfo";
import NoticeList from "./pages/UserPages/NoticeList";
import NoticeDetail from "./pages/UserPages/NoticeDetail";

const MainLayout = styled.div`
`;

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          {/* 유저 */}
          <Route path="/" Component={Home} />
          <Route path="/certification" Component={Certification} /> 
          <Route path="/user/:userid" Component={User} />
          <Route path="/write" Component={PostEdit} />{/* post/edit */}
          <Route path="/post/:location" Component={PostList} />{/* post/location/:location */}
          <Route path="/post/:location/:id" component={PostDetail} /> {/* post/:id */}
          <Route path="/council/:campus" Component={CouncilList} />{/* council/campus/:campus */}
          <Route path="/council/:campus/:id" Component={CouncilDetail} /> {/* council/:id */}
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/chat" Component={ChatRoomList} />
          <Route path="/chat/:metype/:id/:other" Component={Chat} />
          <Route path="/notice" Component={NoticeList} />
          <Route path="/notice/:id" Component={NoticeDetail} />

          {/* 어드민 */}
          <Route path="/admin" Component={AdminManagement} />
          <Route path="/admin/cimanage" Component={AdminCouncilManagement} />{/* admin/manage/council */}
          <Route path="/admin/cimanage/create" Component={AdminCouncilCreation} />{/* admin/manage/council/create */}
          <Route path="/admin/cimanage/add/:id" Component={AdminCouncilItemManagement} /> {/* admin/manage/council/items */}
          <Route path="/admin/certimanage" Component={AdminCertificationManagement} /> {/* admin/manage/certification */}
          
          {/* 학생회 */}
          <Route path="/council/signin" Component={CouncilSignIn} />
          <Route path="/council/manage" Component={CouncilManagement} />
          <Route path="/council/manage/info" Component={EditCouncilInfo} />{/* /council/manage/edit */}
          <Route path="/council/manage/item" Component={CreationCouncilItem} />{/* /council/manage/add */}
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

