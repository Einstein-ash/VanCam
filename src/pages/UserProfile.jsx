// import React, { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     // Retrieve user data from localStorage
//     const data = localStorage.getItem('userData');
//     console.log("user data----- : ", data);
//     if (data) {
//       setUserData(JSON.parse(data));
//     }
//   }, []);

//   if (!userData) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   return (
//     <div className="user-profile">
//       <div className="profile-header">
//         <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
//         <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
//       </div>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {userData.emails[0].value}</p>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;

// ------------ aboce is working gresate to show user datialts only ---------

// ---------- belwo sis test to , take imput to cerate an alubm using api ===========


// components/UserProfile.js

// import React, { useEffect, useState } from 'react';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [albumTitle, setAlbumTitle] = useState('');
//   const [albums, setAlbums] = useState([]);

//   useEffect(() => {

//     // Retrieve user data from localStorage
//     const data = localStorage.getItem('userData');
//     if (data) {
//       setUserData(JSON.parse(data));
//     }

//     // Fetch existing albums
//     const fetchAlbums = async () => {
//       const response = await fetch('http://localhost:5000/albums', {
//         method: 'GET',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//         },
//       });

//       const data = await response.json();
//       if (data.albums) {
//         setAlbums(data.albums);
//       }
//     };

//     fetchAlbums();
//   }, []);

//   const handleCreateAlbum = async () => {
//     const response = await fetch('http://localhost:5000/create-album', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
//       },
//       body: JSON.stringify({ title: albumTitle }),
//     });

//     const data = await response.json();
//     if (data.success) {
//       alert('Album created!');
//       setAlbumTitle(''); // Clear input field
//       setAlbums([...albums, data.album]); // Add new album to state
//     } else {
//       alert('Error creating album.');
//     }
//   };

//   if (!userData) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   return (
//     <div className="user-profile">
//       <div className="profile-header">
//         <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
//         <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
//       </div>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {userData.emails[0].value}</p>
//       </div>
//       <div className="album-creation">
//         <input
//           type="text"
//           value={albumTitle}
//           onChange={(e) => setAlbumTitle(e.target.value)}
//           placeholder="Enter album title"
//         />
//         <button onClick={handleCreateAlbum}>Create Album</button>
//       </div>
//       <div className="albums-list">
//         <h2>Existing Albums</h2>
//         <ul>
//           {albums.map((album) => (
//             <li key={album.id}>{album.title}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;



// ----------aobe is only UI, to crate album -----
// --------- bleows is test to create albuum api ------













// UserProfile.js



import React, { useEffect, useState } from 'react';
import { useLocation ,useNavigate, Link } from 'react-router-dom';


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [albumTitle, setAlbumTitle] = useState('');
  const [joinShareToken, setjoinShareToken] = useState('');
  const [albums, setAlbums] = useState([]);
  const [authToken, setAuthToken] = useState('');
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user data and token from URL
    // const queryParams = new URLSearchParams(location.search);
    // const data = queryParams.get('user');
    // const token = queryParams.get('token');
    let token = "";

      const data = localStorage.getItem('userData');
        if (data) {
          setUserData(JSON.parse(data));

          token = JSON.parse(data).accessToken;
          setAuthToken(token);
        }


    // console.log("token-------- : ", token);
    
    
    
    
    
    // Fetch existing albums
    const fetchAlbums = async () => {
      const userData = localStorage.getItem('userData');
      const accessToken = JSON.parse(userData).accessToken;

    console.log("accss trokn - ", accessToken);
      try {
        // const response = await fetch('http://localhost:5000/albums', {
        const response = await fetch('http://localhost:5000/shared-albums', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}` // Send the token in the request headers
          }
        });
        const data = await response.json();

        // setAlbums(data.albums || []);
        // console.log(data.albums);
        // console.log(data.albums[0]);
        
        
        setAlbums(data.sharedAlbums || []);
        console.log("shared ablums ------ " ,data.sharedAlbums[8]);

        // console.log(data.albums[0].title);
      } catch (error) {
        console.error('Error fetching albums yoooooooooooooo---------------:', error);
      }
    };
    

    
    fetchAlbums();
  }, [location.search]);
  
  // console.log("auth token-------- : ", authToken);




// -------- handle camera -----------
// const handleOpenCamera = (albumId) => {
//   setSelectedAlbumId(albumId);
//   navigate('/camera');
// };
// -------- handle camera -----------

  const handleCreateAlbum = async () => {
    if (!authToken) return;
  
    try {
      const response = await fetch('http://localhost:5000/create-album', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ title: albumTitle }),
      });
  
      const data = await response.json();
      
      console.log("created album: ", data);
      
      if (data.success) {
        alert('Album created!');
        setAlbumTitle(''); // Clear input field
        setAlbums([...albums, data.album]); // Add new album to state
      } else {
        alert('Error creating album.');
      }
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

// --------- handle join other album --------

const handleJoinAblum = async () =>{

  if (!authToken) return;
  
  try {
    const response = await fetch('http://localhost:5000/join-album', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ shareToken: joinShareToken }),
    });

    const data = await response.json();
    
    console.log("joinng -- album: ", data);
    
    if (data.success) {
      alert('Succesfully joined Album!');
      setjoinShareToken(''); // Clear input field
      console.log("joinend album data-----",data.album)
  
    } else {
      alert('Error Joining album.');
    }
  } catch (error) {
    console.error('Error Joining album:', error);
  }

}

const handleFetchMediaItems = async (albumId) => {
  console.log(albumId);
  if (!authToken) return;

  try {
    const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    const data = await response.json();
    console.log("data media out-------",data.mediaItems);
    setSelectedAlbumId(albumId);
    setMediaItems(data.mediaItems || []);
  } catch (error) {
    console.error('Error fetching media items:', error);
  }
};


  

  if (!userData) {
    return <div>Loading...</div>; // Handle loading state
  }

   return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
        <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
      </div>
      <div className="profile-details">
        <p><strong>Email:</strong> {userData.emails[0].value}</p>
      </div>
      {/* -------create ablum  */}
      <div className="album-creation">
        <input
          type="text"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          placeholder="Enter album title"
        />
        <button onClick={handleCreateAlbum}>Create Album</button>
      </div>
      {/* -------JOIN  ablum  */}
      <div className="JOIN Ablum ">
        <input
          type="text"
          value={joinShareToken}
          onChange={(e) => setjoinShareToken(e.target.value)}
          placeholder="Enter Ablum's share token"
        />
        <button onClick={handleJoinAblum}>Join Album</button>
      </div>
      <div className="albums-list">
        <h2>Existing Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.title}
              <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
            <Link to={`/camera/${album.id}`}>
                <button>Open Camera</button>
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






















// ------- above is workign great - show all existing albums ---------

// ------- bwlos is ttest to show three sections ,- existing , shared wiht me , shared by me alubms 

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate, Link } from 'react-router-dom';

// const UserProfile = () => {
//   const [userData, setUserData] = useState(null);
//   const [albumTitle, setAlbumTitle] = useState('');
//   const [albums, setAlbums] = useState({ all: [], sharedByMe: [], sharedWithMe: [] });
//   const [authToken, setAuthToken] = useState('');
//   const [selectedAlbumId, setSelectedAlbumId] = useState(null);
//   const [mediaItems, setMediaItems] = useState([]);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve user data and token from URL
//     let token = "";
//     const data = localStorage.getItem('userData');
//     if (data) {
//       setUserData(JSON.parse(data));
//       token = JSON.parse(data).accessToken;
//       setAuthToken(token);
//     }

//     // Fetch existing albums
//     const fetchAlbums = async () => {
//       const userData = localStorage.getItem('userData');
//       const accessToken = JSON.parse(userData).accessToken;

//       try {
//         const response = await fetch('http://localhost:5000/albums', {
//           method: 'GET',
//           headers: {
//             Authorization: `Bearer ${accessToken}` // Send the token in the request headers
//           }
//         });
//         const data = await response.json();
//         const { allAlbums, sharedByMe, sharedWithMe } = data; // Assume the backend provides these categories

//         setAlbums({ all: allAlbums, sharedByMe, sharedWithMe });
//       } catch (error) {
//         console.error('Error fetching albums:', error);
//       }
//     };

//     fetchAlbums();
//   }, [location.search]);

//   // const handleOpenCamera = (albumId) => {
//   //   setSelectedAlbumId(albumId);
//   //   navigate('/camera');
//   // };

//   const handleCreateAlbum = async () => {
//     if (!authToken) return;

//     try {
//       const response = await fetch('http://localhost:5000/create-album', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`,
//         },
//         body: JSON.stringify({ title: albumTitle }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         alert('Album created!');
//         setAlbumTitle(''); // Clear input field
//         setAlbums(prevAlbums => ({
//           ...prevAlbums,
//           all: [...prevAlbums.all, data.album] // Add new album to state
//         }));
//       } else {
//         alert('Error creating album.');
//       }
//     } catch (error) {
//       console.error('Error creating album:', error);
//     }
//   };

//   const handleFetchMediaItems = async (albumId) => {
//     if (!authToken) return;

//     try {
//       const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}`
//         }
//       });
//       const data = await response.json();
//       setSelectedAlbumId(albumId);
//       setMediaItems(data.mediaItems || []);
//     } catch (error) {
//       console.error('Error fetching media items:', error);
//     }
//   };

//   if (!userData) {
//     return <div>Loading...</div>; // Handle loading state
//   }

//   return (
//     <div className="user-profile">
//       <div className="profile-header">
//         <img src={userData.photos[0].value} alt="Profile" className="profile-pic" />
//         <h1 className="user-name">{userData.name.givenName} {userData.name.familyName}</h1>
//       </div>
//       <div className="profile-details">
//         <p><strong>Email:</strong> {userData.emails[0].value}</p>
//       </div>
//       <div className="album-creation">
//         <input
//           type="text"
//           value={albumTitle}
//           onChange={(e) => setAlbumTitle(e.target.value)}
//           placeholder="Enter album title"
//         />
//         <button onClick={handleCreateAlbum}>Create Album</button>
//       </div>
//       <div className="albums-list">
//         <h2>All Albums</h2>
//         <ul>
//           {albums.all.map((album) => (
//             <li key={album.id}>
//               {album.title}
//               <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
//               <Link to={`/camera/${album.id}`}>
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
//         <h2>Shared By Me</h2>
//         <ul>
//           {albums.sharedByMe.map((album) => (
//             <li key={album.id}>
//               {album.title}
//               <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
//               <Link to={`/camera/${album.id}`}>
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
//         <h2>Shared With Me</h2>
//         <ul>
//           {albums.sharedWithMe.map((album) => (
//             <li key={album.id}>
//               {album.title}
//               <button onClick={() => handleFetchMediaItems(album.id)}>View Images</button>
//               <Link to={`/camera/${album.id}`}>
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











