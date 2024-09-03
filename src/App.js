// import logo from './logo.svg';
// import './App.css';
// import CameraComponent from './pages/camera';

// function App() {
//   return (
//     <div className="App">
//       <CameraComponent/>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from "react";
// import GroupSidebar from "./pages/GroupSidebar";
// import CameraComponent from "./pages/camera";

// const App = () => {
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleGroupSelect = (groupName) => {
//     setSelectedGroup(groupName);
//   };

//   return (
//     <div>
//       <GroupSidebar onGroupSelect={handleGroupSelect} />
//       <CameraComponent selectedGroup={selectedGroup} />
//     </div>
//   );
// };

// export default App;




// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import GroupSidebar from "./pages/GroupSidebar";
// import CameraComponent from "./pages/camera";
// import LoginButton from "./pages/Login";

// const App = () => {
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const handleGroupSelect = (groupName) => {
//     setSelectedGroup(groupName);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<GroupSidebar onGroupSelect={handleGroupSelect} />} />
//         <Route path="/camera/:folderName" element={<CameraComponent />} />



//         {/* <Route path="/" element={<LoginButton />} /> */}


//       </Routes>
//     </Router>
//   );
// };

// export default App;







// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginButton from './pages/Login';
import UserProfile from './pages/UserProfile';
import AuthCallback from './pages/AuthcallBack';
import CameraComponent from './pages/GCam';
import UploadTest from './pages/UploadTest';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginButton />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        {/* <Route path="/camera" element={<CameraComponent />} /> */}
        <Route path="/camera/:albumId" element={<CameraComponent />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/upload_test" element={<UploadTest />} />
      </Routes>
    </Router>
  );
};

export default App;
