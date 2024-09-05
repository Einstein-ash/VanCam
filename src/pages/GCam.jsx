// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";

// const CameraComponent = () => {
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Configure video constraints for the webcam
//   const videoConstraints = {
//     facingMode: "user", // Front-facing camera
//   };

//   // Capture image from the webcam
//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     setCapturedImage(imageSrc);
//     localStorage.setItem("capturedImage", imageSrc); // Store image in local storage

//       setCapturedImage(null); // Clear captured image state
  
//   };

//   // Download the captured image
//   const downloadImage = () => {
//     if (!capturedImage) return; // Ensure capturedImage is not null

//     const link = document.createElement("a");
//     link.href = capturedImage;
//     link.download = "captured_image.png";
//     link.click();
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       {capturedImage ? (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <br />
//           <button onClick={downloadImage}>Download Image</button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             videoConstraints={videoConstraints}
//           />
//           <br />
//           <button onClick={captureImage}>Capture Photo</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CameraComponent;





// -------- above is simple camera - caputre- store in local -------
// ----- below is test to show image of alubm under cmaera----------

// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import { useParams } from 'react-router-dom';


// const CameraComponent = () => {

//   const { albumId } = useParams(); // Get album ID from URL params
//   console.log("alubin id : ",albumId);
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [albumImages, setAlbumImages] = useState([]);
  
//   const videoConstraints = {
//     facingMode: 'user', // Front-facing camera
//   };

//   let authToken = "";

//   const data = localStorage.getItem('userData');
//     if (data) {
//     //   setUserData(JSON.parse(data));

//     authToken = JSON.parse(data).accessToken;
//     //   setAuthToken(token);
//     }


//   console.log("auth toekn ------ ",authToken);

//   // Fetch images for the album
//   useEffect(() => {
//     const handleFetchMediaItems = async()  => {
//         console.log(albumId);
//         if (!authToken) return;
      
//         try {
//           const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${authToken}`
//             }
//           });
//           const data = await response.json();
//           console.log("data media out-------",data.mediaItems);
//         //   setSelectedAlbumId(albumId);
//         setAlbumImages(data.mediaItems || []);
//         } catch (error) {
//           console.error('Error fetching media items:', error);
//         }
//       };

//       handleFetchMediaItems();
//   }, [albumId]);

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     setCapturedImage(imageSrc);
//     localStorage.setItem('capturedImage', imageSrc); // Store image in local storage

//     setCapturedImage(null); // Clear captured image state
//     uploadImageToAlbum(imageSrc, albumId);
//   };



//   // Send the captured image to the backend
//   const uploadImageToAlbum = async (imageSrc, albumId) => {
//     try {
//       const response = await fetch('http://localhost:5000/upload-image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
//         },
//         body: JSON.stringify({
//           image: imageSrc,
//           albumId: albumId,
//         }),
//       });
  
//       if (!response.ok) {
//         throw new Error(`Failed to upload image: ${response.statusText}`);
//       }
  
//       const data = await response.json();
//       console.log('Uploaded image to album:', data);
//     } catch (error) {
//       console.error('Error uploading image to album:', error);
//     }
//   };
  


//   const downloadImage = () => {
//     if (!capturedImage) return; 

//     const link = document.createElement('a');
//     link.href = capturedImage;
//     link.download = 'captured_image.png';
//     link.click();
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       {capturedImage ? (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <br />
//           <button onClick={downloadImage}>Download Image</button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             videoConstraints={videoConstraints}
//           />
//           <br />
//           <button onClick={captureImage}>Capture Photo</button>
//         </div>
//       )}
//       <h3>Images in Album</h3>
//       <div className="album-images">
//         {albumImages.length > 0 ? (
//           albumImages.map((image) => (
//             <img key={image.id} src={image.baseUrl} alt={image.filename} />
//           ))
//         ) : (
//           <p>No images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraComponent;









// -------(working for display imageonly )---- below ist est - send caputred image to ablum -------

// import React, { useRef, useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import { useParams } from 'react-router-dom';

// const CameraComponent = () => {
//   const { albumId } = useParams(); // Get album ID from URL params
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [albumImages, setAlbumImages] = useState([]);

//   const videoConstraints = {
//     facingMode: 'user', // Front-facing camera
//   };

//   let authToken = "";

//   const data = localStorage.getItem('userData');
//   if (data) {
//     authToken = JSON.parse(data).accessToken;
//   }

//   // Fetch images for the album
//   useEffect(() => {
//     const handleFetchMediaItems = async () => {
//       if (!authToken) return;

//       try {
//         const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//           }
//         });
//         const data = await response.json();
//         setAlbumImages(data.mediaItems || []);
//       } catch (error) {
//         console.error('Error fetching media items:', error);
//       }
//     };

//     handleFetchMediaItems();
//   }, [albumId, authToken]);

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     setCapturedImage(imageSrc);
//     localStorage.setItem('capturedImage', imageSrc); // Store image in local storage

    
//     const response = await fetch('http://localhost:5000/upload-image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${authToken}` // Include token if needed
//         },
//         body: JSON.stringify({
//           image: imageSrc,
//           albumId: albumId // Pass the album ID to the backend
//         })
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Image uploaded successfully:', data);
//       } else {
//         console.error('Error uploading image:', await response.text());
//       }
      
//   };

//   const getMimeType = (imageSrc) => {
//     // In this example, we assume the image is PNG
//     // Adjust as needed if you're using different formats
//     return 'image/png';
//   };

  


//   const downloadImage = () => {
//     if (!capturedImage) return;

//     const link = document.createElement('a');
//     link.href = capturedImage;
//     link.download = 'captured_image.png';
//     link.click();
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       {capturedImage ? (
//         <div>
//           <img src={capturedImage} alt="Captured" />
//           <br />
//           <button onClick={downloadImage}>Download Image</button>
//         </div>
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             videoConstraints={videoConstraints}
//           />
//           <br />
//           <button onClick={captureImage}>Capture Photo</button>
//         </div>
//       )}
//       <h3>Images in Album</h3>
//       <div className="album-images">
//         {albumImages.length > 0 ? (
//           albumImages.map((image) => (
//             <img key={image.id} src={image.baseUrl} alt={image.filename} />
//           ))
//         ) : (
//           <p>No images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraComponent;






// -------(working as we want to work) great work - belwo is test to capute - strore - send to album  --------

// import React, { useRef, useState, useEffect, useCallback } from 'react';
// import Webcam from 'react-webcam';
// import { useParams } from 'react-router-dom';

// const CameraComponent = () => {
//   const { albumId } = useParams(); // Get album ID from URL params
//   const webcamRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);
//   const [albumImages, setAlbumImages] = useState([]);
//   const [uploadQueue, setUploadQueue] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const videoConstraints = {
//     facingMode: 'user', // Front-facing camera
//   };

//   let authToken = "";
//   const data = localStorage.getItem('userData');
//   if (data) {
//     authToken = JSON.parse(data).accessToken;
//   }

//   // Fetch images for the album
//   useEffect(() => {
//     const handleFetchMediaItems = async () => {
//       if (!authToken) return;

//       try {
//         const response = await fetch(`http://localhost:5000/media-items/${albumId}`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//           }
//         });
//         const data = await response.json();
//         setAlbumImages(data.mediaItems || []);
//       } catch (error) {
//         console.error('Error fetching media items:', error);
//       }
//     };

//     handleFetchMediaItems();
//   }, [albumId, authToken]);

//   const captureImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     if (!imageSrc) return; // Ensure imageSrc is not null or undefined

//     // Add captured image to the upload queue
//     setCapturedImage(imageSrc);
//     setUploadQueue((prevQueue) => [...prevQueue, imageSrc]);
//   };

//   const processQueue = useCallback(async () => {
//     if (uploadQueue.length === 0) {
//       setIsProcessing(false);
//       return;
//     }

//     setIsProcessing(true);
//     const imageToUpload = uploadQueue[0];

//     try {
//       // Convert image to a Blob
//       const response = await fetch(imageToUpload);
//       let imageBlob = await response.blob();

//       imageBlob = await modifyImageData(imageBlob);

//       // Step 1: Upload the image
//       const uploadTokenResponse = await uploadImageToGooglePhotos(imageBlob);
//       const uploadToken = uploadTokenResponse.uploadToken;

//       // Step 2: Create a media item in Google Photos and add it to the album
//       await createMediaItemInAlbum(uploadToken, albumId);
//       console.log('Image uploaded and added to album successfully!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       // Remove the processed image from the queue
//       setUploadQueue((prevQueue) => prevQueue.slice(1));
//       setIsProcessing(false);
//     }
//   }, [uploadQueue, albumId, authToken]);

//   useEffect(() => {
//     if (!isProcessing && uploadQueue.length > 0) {
//       processQueue();
//     }
//   }, [uploadQueue, isProcessing, processQueue]);

//   const modifyImageData = async (blob) => {
//     const arrayBuffer = await blob.arrayBuffer();
//     const uint8Array = new Uint8Array(arrayBuffer);

//     // Append a small unique identifier to the image data
//     const uniqueIdentifier = new TextEncoder().encode(`unique-${Date.now()}`);
//     const modifiedArray = new Uint8Array([...uint8Array, ...uniqueIdentifier]);

//     return new Blob([modifiedArray], { type: blob.type });
//   };

//   const uploadImageToGooglePhotos = async (blob) => {
//     const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Authorization': `Bearer ${authToken}`,
//         'X-Goog-Upload-Content-Type': blob.type,
//         'X-Goog-Upload-Protocol': 'raw'
//       },
//       body: blob
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to upload image: ${response.statusText}`);
//     }
//     const uploadToken = await response.text();
//     return { uploadToken };
//   };

//   const createMediaItemInAlbum = async (uploadToken, albumId) => {
//     const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${authToken}`
//       },
//       body: JSON.stringify({
//         albumId: albumId,
//         newMediaItems: [
//           {
//             description: 'Uploaded via my app',
//             simpleMediaItem: {
//               uploadToken: uploadToken
//             }
//           }
//         ]
//       })
//     });

//     const result = await response.json();
//     if (!response.ok) {
//       throw new Error(`Failed to create media item: ${result.error.message}`);
//     }
//     console.log('Media item created:', result);
//   };

//   return (
//     <div>
//       <h2>Take a Photo</h2>
//       <div>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/png"
//           videoConstraints={videoConstraints}
//         />
//         <br />
//         <button onClick={captureImage}>Capture Photo</button>
//       </div>
//       <h3>Images in Album</h3>
//       <div className="album-images">
//         {albumImages.length > 0 ? (
//           albumImages.map((image) => (
//             <img key={image.id} src={image.baseUrl} alt={image.filename} />
//           ))
//         ) : (
//           <p>No images found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CameraComponent;



// -------- --- belwos is test to handle fetching time out error, and import React, { useRef, useState, useEffect, useCallback } from 'react';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const CameraComponent = () => {
  const { albumId } = useParams(); // Get album ID from URL params
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [albumImages, setAlbumImages] = useState([]);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [invitedUser, setinvitedUser] = useState('');
  const [invitedUser, setinvitedUser] = useState('');
  const [invitationResult, setInvitationResult] = useState('');
  const [shareableLink, setshareableLink] = useState('');
  const [shareToken, setshareToken] = useState('');
  const invitationRef = useRef(null);
  const shareTokenRef = useRef(null);


  const videoConstraints = {
    facingMode: 'user', // Front-facing camera
  };

  let authToken = "";
  const data = localStorage.getItem('userData');
  if (data) {
    authToken = JSON.parse(data).accessToken;
  }

  // Fetch images for the album
  const fetchAlbumImages = async () => {
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
      setAlbumImages(data.mediaItems || []);
    } catch (error) {
      console.error('Error fetching media items:', error);
    }
  };

  useEffect(() => {
    fetchAlbumImages();
    // inspectToken(authToken);
  }, [albumId, authToken]);

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return; // Ensure imageSrc is not null or undefined

    // Add captured image to the upload queue
    setCapturedImage(imageSrc);
    setUploadQueue((prevQueue) => [...prevQueue, imageSrc]);
  };

  const processQueue = useCallback(async () => {
    if (uploadQueue.length === 0) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);
    const imageToUpload = uploadQueue[0];

    try {
      // Convert image to a Blob
      const response = await fetch(imageToUpload);
      let imageBlob = await response.blob();

      imageBlob = await modifyImageData(imageBlob);

      // Step 1: Upload the image
      const uploadTokenResponse = await uploadImageToGooglePhotos(imageBlob);
      const uploadToken = uploadTokenResponse.uploadToken;

      // Step 2: Create a media item in Google Photos and add it to the album
      await createMediaItemInAlbum(uploadToken, albumId);
      console.log('Image uploaded and added to album successfully!');

      // Fetch the updated album images after upload
      await fetchAlbumImages();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Remove the processed image from the queue
      setUploadQueue((prevQueue) => prevQueue.slice(1));
      setIsProcessing(false);
    }
  }, [uploadQueue, albumId, authToken]);

  useEffect(() => {
    if (!isProcessing && uploadQueue.length > 0) {
      processQueue();
    }
  }, [uploadQueue, isProcessing, processQueue]);

  const modifyImageData = async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Append a small unique identifier to the image data
    const uniqueIdentifier = new TextEncoder().encode(`unique-${Date.now()}`);
    const modifiedArray = new Uint8Array([...uint8Array, ...uniqueIdentifier]);

    return new Blob([modifiedArray], { type: blob.type });
  };

  const uploadImageToGooglePhotos = async (blob) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${authToken}`,
        'X-Goog-Upload-Content-Type': blob.type,
        'X-Goog-Upload-Protocol': 'raw'
      },
      body: blob
    });
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
    const uploadToken = await response.text();
    return { uploadToken };
  };

  const createMediaItemInAlbum = async (uploadToken, albumId) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        albumId: albumId,
        newMediaItems: [
          {
            description: 'Uploaded via my app',
            simpleMediaItem: {
              uploadToken: uploadToken
            }
          }
        ]
      })
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to create media item: ${result.error.message}`);
    }
    console.log('Media item created:', result);
  };



  // ------ INVITE USER TO ALBM _______



  // const inviteUserToAlbum = async (albumId, email) => {
  //   const response = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}:share`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`,
  //     },
  //     body: JSON.stringify({
  //       sharedAlbumOptions: {
  //         isCollaborative: true,
  //         isCommentable: true,
  //       },
  //       invitations: [{
  //         recipientEmail: email,  // Email of the user to invite
  //       }],
  //     }),
  //   });
  
  //   const data = await response.json();
  //   if (!response.ok) {
  //     throw new Error(`Failed to invite user: ${data.error.message}`);
  //   }
  
  //   console.log('User invited successfully:', data);
  // };
  


  // const inspectToken = async (token) => {
  //   const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
  //   const tokenInfo = await response.json();
  //   console.log(tokenInfo); // This should include the list of scopes your token has
  // };

  // ------- aboce has scope errro : --belos to solve-----


  // const inviteUserToAlbum = async (albumId, userEmail) => {
  //   if (!authToken) return;
  
  //   try {
  //     const response = await fetch(`https://photoslibrary.googleapis.com/v1/albums/${albumId}:share`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${authToken}`
  //       },
  //       body: JSON.stringify({
  //         sharedAlbumOptions: {
  //           sharedAlbum: {
  //             invitees: [
  //               {
  //                 email: userEmail
  //               }
  //             ]
  //           }
  //         }
  //       })
  //     });
  
  //     if (!response.ok) {
  //       const errorResponse = await response.json();
  //       throw new Error(`Failed to invite user: ${errorResponse.error.message}`);
  //     }
  
  //     console.log('User invited successfully');
  //   } catch (error) {
  //     console.error('Error inviting user:', error);
  //   }
  // };
  
  


  // ------- abocve scrop errro -0 belwo solve and call backendto work ------

  const generateLinkforalbum = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/share-album',
        {
          albumId,
          invitedUser
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const shareInfo = response.data.shareInfo;
      console.log("0000000000000------",shareInfo);

      let link = shareInfo.shareableUrl;
      // console.log("sharebale link-------",link);

      setshareToken(shareInfo.shareToken);
      if(shareToken) {shareTokenRef.current = shareInfo.shareToken;}

      // invitationRef.current.innerText;

      setshareableLink(link);

      setInvitationResult(response.data.message);
    } catch (error) {
      console.error('Error inviting user:', error);
      setInvitationResult('Failed to invite user');
    }
  };
  
  
// ---- aboe is to add user to album -------


const copyToClipboard = (text) => {
  // const text = invitationRef.current.innerText;
  navigator.clipboard.writeText(text).then(() => {
    console.log('Text copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
};


  return (
    <div>

    <div className="sharebale link creatation">

      <button onClick={() => generateLinkforalbum()}>Generate Shareable Link User</button>

      <p ref={invitationRef}>{shareableLink}</p> 
      {/* <p ref={shareTokenRef}>{shareToken}</p>  */}
      
      {/* <button onClick={copyToClipboard}>Copy Link</button> */}
      {shareableLink && <button onClick={() => copyToClipboard(shareableLink)}>Copy Link</button>}
      {shareToken && <button onClick={() => copyToClipboard(shareToken)}>Copy Share Token</button>}

      <p>{invitationResult}</p>

    </div>


      <h2>Take a Photo</h2>
      <div>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        />
        <br />
        <button onClick={captureImage}>Capture Photo</button>
      </div>
      <h3>Images in Album</h3>
      <div className="album-images">
        {albumImages.length > 0 ? (
          albumImages.map((image) => (
            <img key={image.id} src={image.baseUrl} alt={image.filename} onError={(e) => e.target.style.display = 'none'} />
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;
