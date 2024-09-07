

// // UserProfile.js

// // 0-------- workign is abs fine --- the finest code ---------

// import React, { useEffect, useState } from 'react';
// import { useLocation ,useNavigate, Link } from 'react-router-dom';


// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [albumTitle, setAlbumTitle] = useState('');
//   const [joinShareToken, setjoinShareToken] = useState('');

//   const [albums, setAlbums] = useState([]);
//   const [sharedalbums, setSharedAlbums] = useState([]);

//   const [authToken, setAuthToken] = useState('');
//   const [selectedAlbumId, setSelectedAlbumId] = useState(null);
//   const [mediaItems, setMediaItems] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve user data and token from URL
//     // const queryParams = new URLSearchParams(location.search);
//     // const data = queryParams.get('user');
//     // const token = queryParams.get('token');
//     let token = "";

//       const data = localStorage.getItem('userData');
//         if (data) {
//           setUserData(JSON.parse(data));

//           token = JSON.parse(data).accessToken;
//           setAuthToken(token);
//         }


//     // console.log("token-------- : ", token);
    
    
    
    
    
//     // Fetch existing albums
//     const fetchAlbums = async () => {
//       const userData = localStorage.getItem('userData');
//       const accessToken = JSON.parse(userData).accessToken;

//     console.log("accss trokn - ", accessToken);
//       try {
//         const response = await fetch('${Base_URL}/albums', {
//         // const response = await fetch('${Base_URL}/shared-albums', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}` // Send the token in the request headers
//           }
//         });
//         const data = await response.json();

//         setAlbums(data.albums || []);
//         // console.log(data.albums);
//         // console.log(data.albums[0]);
        
        
//         // setAlbums(data.sharedAlbums || []);
//         // console.log("shared ablums ------ " ,data.sharedAlbums[8]);

//         // console.log(data.albums[0].title);
//       } catch (error) {
//         console.error('Error fetching albums yoooooooooooooo---------------:', error);
//       }
//     };
    
//     // Fetch Shared ------ albums
//     const fetchSharedAlbums = async () => {
//       const userData = localStorage.getItem('userData');
//       const accessToken = JSON.parse(userData).accessToken;

//     console.log("accss trokn - ", accessToken);
//       try {
//         // const response = await fetch('${Base_URL}/albums', {
//         const response = await fetch('${Base_URL}/shared-albums', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}` // Send the token in the request headers
//           }
//         });
//         const data = await response.json();

//         // setAlbums(data.albums || []);
//         // console.log(data.albums);
//         // console.log(data.albums[0]);
        
        
//         setSharedAlbums(data.sharedAlbums || []);
//         console.log("shared ablums ------ " ,data.sharedAlbums[8]);

//         // console.log(data.albums[0].title);
//       } catch (error) {
//         console.error('Error fetching albums yoooooooooooooo---------------:', error);
//       }
//     };
    

    
//     fetchAlbums();
//     fetchSharedAlbums();
//   }, [location.search]);
  
//   // console.log("auth token-------- : ", authToken);




// // -------- handle camera -----------
// // const handleOpenCamera = (albumId) => {
// //   setSelectedAlbumId(albumId);
// //   navigate('/camera');
// // };
// // -------- handle camera -----------

//   const handleCreateAlbum = async () => {
//     if (!authToken) return;
  
//     try {
//       const response = await fetch('${Base_URL}/create-album', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ title: albumTitle }),
//       });
  
//       const data = await response.json();
      
//       console.log("created album: ", data);
      
//       if (data.success) {
//         alert('Album created!');
//         setAlbumTitle(''); // Clear input field
//         setAlbums([...albums, data.album]); // Add new album to state
//       } else {
//         alert('Error creating album.');
//       }
//     } catch (error) {
//       console.error('Error creating album:', error);
//     }
//   };

// // --------- handle join other album --------

// const handleJoinAblum = async () =>{

//   if (!authToken) return;
  
//   try {
//     const response = await fetch('${Base_URL}/join-album', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}`,
//       },
//       body: JSON.stringify({ shareToken: joinShareToken }),
//     });

//     const data = await response.json();
    
//     console.log("joinng -- album: ", data);
    
//     if (data.success) {
//       alert(data.message);
//       setjoinShareToken(''); // Clear input field
//       console.log("joinend album data-----",data.album)
  
//     } else {
//       alert('Error Joining album.');
//     }
//   } catch (error) {
//     console.error('Error Joining album:', error);
//   }

// }

// // --------------------

// // const handleFetchMediaItems = async (albumId) => {
// //   console.log(albumId);
// //   if (!authToken) return;

// //   try {
// //     const response = await fetch(`${Base_URL}/media-items/${albumId}`, {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${authToken}`
// //       }
// //     });
// //     const data = await response.json();
// //     console.log("data media out-------",data.mediaItems);
// //     setSelectedAlbumId(albumId);
// //     setMediaItems(data.mediaItems || []);
// //   } catch (error) {
// //     console.error('Error fetching media items:', error);
// //   }
// // };

// // --------- abcve is workign great - but someitme timeout error - so belwo is to solve ---
// const handleFetchMediaItems = async (albumId) => {
//   console.log(albumId);
//   if (!authToken) return;

//   try {
//     // Create an AbortController instance
//     const controller = new AbortController(); 
//     // Set a timeout for aborting the request after 15 seconds
//     const timeoutId = setTimeout(() => controller.abort(), 15000); 

//     const response = await fetch(`${Base_URL}/media-items/${albumId}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}`
//       },
//       signal: controller.signal // Attach the signal for aborting the request
//     });

//     // Clear the timeout if the request is successful
//     clearTimeout(timeoutId); 

//     // Check if the response is not ok and throw an error
//     if (!response.ok) throw new Error('Network response was not ok');

//     const data = await response.json();
//     console.log("Fetched media items:", data.mediaItems);
    
//     // Update state with the album ID and media items
//     setSelectedAlbumId(albumId);
//     setMediaItems(data.mediaItems || []);
    
//   } catch (error) {
//     // Check if the error is due to the request being aborted (timeout)
//     if (error.name === 'AbortError') {
//       console.error('Request timed out');
//     } else {
//       console.error('Error fetching media items:', error);
//     }
//   }
// };

  

//   if (!userData) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//    return (
//     <div className="user-profile">
//       <div className="profile-header">
//         <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
//         <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
//       </div>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {userData.emails[0].value}</p>
//       </div>
//       {/* -------create ablum  */}
//       <div className="album-creation">
//         <input
//           type="text"
//           value={albumTitle}
//           onChange={(e) => setAlbumTitle(e.target.value)}
//           placeholder="Enter album title"
//         />
//         <button onClick={handleCreateAlbum}>Create Album</button>
//       </div>
//       {/* -------JOIN  ablum  */}
//       <div className="JOIN Ablum ">
//         <input
//           type="text"
//           value={joinShareToken}
//           onChange={(e) => setjoinShareToken(e.target.value)}
//           placeholder="Enter Ablum's share token"
//         />
//         <button onClick={handleJoinAblum}>Join Album</button>
//       </div>

//       {/* --- to dispaly own created ablums list  */}
//       <div className="albums-list">
//         <h2>Existing Albums</h2>
//         <ul>
//           {albums.map((album) => (
//             <li key={album.id}>
//               {album.title}
//               <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
//             <Link to={`/camera/${album.id}/${album.title}`}>
//                 <button>Open Camera</button>
//               </Link>
//               {selectedAlbumId === album.id && mediaItems.length > 0 && (
//                 <div className="media-items">
//                   {mediaItems.map((item) => (
//                     <img key={item.id} src={item.baseUrl} alt={item.filename} />
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>



//       {/* --- to dispaly Shared ablums list  */}
//       <div className="shared-ablum-list">
//         <h2>Shared Albums</h2>
//         <ul>
//           {sharedalbums.map((album) => (
//             <li key={album.id}>
//               {album.title}
//               <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
//             <Link to={`/camera/${album.id}`}>
//                 <button>Open Camera</button>
//               </Link>
//               {selectedAlbumId === album.id && mediaItems.length > 0 && (
//                 <div className="media-items">
//                   {mediaItems.map((item) => (
//                     <img key={item.id} src={item.baseUrl} alt={item.filename} />
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;















// --- above is fine but UI is simle --- below is wit UI 



import React, { useEffect, useState } from 'react';
import { useLocation ,useNavigate, Link } from 'react-router-dom';
import './UserProfile.css'; // Ensure to import the CSS file

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [joinShareToken, setjoinShareToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [sharedalbums, setSharedAlbums] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const Base_URL = 'http://localhost:5000'

  useEffect(() => {
    let token = "";
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
      token = JSON.parse(data).accessToken;
      setAuthToken(token);
    }

    const fetchAlbums = async () => {
      const userData = localStorage.getItem('userData');
      const accessToken = JSON.parse(userData).accessToken;

      try {
        const response = await fetch(`${Base_URL}/albums`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setAlbums(data.albums || []);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };
    
    const fetchSharedAlbums = async () => {
      const userData = localStorage.getItem('userData');
      const accessToken = JSON.parse(userData).accessToken;

      try {
        const response = await fetch(`${Base_URL}/shared-albums`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await response.json();
        setSharedAlbums(data.sharedAlbums || []);
      } catch (error) {
        console.error('Error fetching shared albums:', error);
      }
    };

    fetchAlbums();
    fetchSharedAlbums();
  }, [location.search]);

  const handleCreateAlbum = async () => {
    if (!authToken) return;
    try {
      const response = await fetch(`${Base_URL}/create-album`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title: albumTitle }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Album created!');
        setAlbumTitle('');
        setAlbums([...albums, data.album]);
      } else {
        alert('Error creating album.');
      }
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const handleJoinAblum = async () => {
    if (!authToken) return;
    try {
      const response = await fetch(`${Base_URL}/join-album`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ shareToken: joinShareToken }),
      });

      const data = await response.json();
      if (data.success) {
        alert(data.message);
        setjoinShareToken('');
      } else {
        alert('Error joining album.');
      }
    } catch (error) {
      console.error('Error joining album:', error);
    }
  };

  const handleFetchMediaItems = async (albumId) => {
    if (!authToken) return;
    try {
      const controller = new AbortController(); 
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(`${Base_URL}/media-items/${albumId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId); 
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setSelectedAlbumId(albumId);
      setMediaItems(data.mediaItems || []);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
      } else {
        console.error('Error fetching media items:', error);
      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
        <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
        <p className="user-email"><strong>Email:</strong> {userData.emails[0].value}</p>
      </div>
      
      <div className="album-actions">
        <div className="album-creation">
          <input
            type="text"
            value={albumTitle}
            onChange={(e) => setAlbumTitle(e.target.value)}
            placeholder="Enter album title"
          />
          <button onClick={handleCreateAlbum}>Create Album</button>
        </div>
        
        <div className="join-album">
          <input
            type="text"
            value={joinShareToken}
            onChange={(e) => setjoinShareToken(e.target.value)}
            placeholder="Enter album's share token"
          />
          <button onClick={handleJoinAblum}>Join Album</button>
        </div>
      </div>

      <div className="albums-list">
        <h2>Your Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.title}
              <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
              <Link to={`/camera/${album.id}/${album.title}`}>
                <button className ='open_cam'>Open Camera</button>
              </Link>
              {selectedAlbumId === album.id && mediaItems.length > 0 && (
                <div className="media-items">
                  {mediaItems.map((item) => (
                    <img key={item.id} src={item.baseUrl} alt={item.filename} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="shared-albums-list">
        <h2>Shared Albums</h2>
        <ul>
          {sharedalbums.map((album) => (
            <li key={album.id}>
              {album.title}
              <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
              <Link to={`/camera/${album.id}/${album.title}`}>
                <button className='open_cam'>Open Camera</button>
              </Link>
              {selectedAlbumId === album.id && mediaItems.length > 0 && (
                <div className="media-items">
                  {mediaItems.map((item) => (
                    <img key={item.id} src={item.baseUrl} alt={item.filename} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
