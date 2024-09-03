// import React from 'react';
// import sampleImage from './thunder.jpg'; // Update with your actual image path

// const UploadImageComponent = () => {


//   const accessToken = JSON.parse(localStorage.getItem('userData')).accessToken; // Replace with your actual access token
//   // const albumId = 'AFVB0YYy-9qJ2182bnns-qffUgEWe5LOena2iFxZ2F-j8EOiP3gtqC7wICNJ07-Fp-YCyEivgthg'; // Replace with your actual album ID
//   const albumId = 'AFVB0YYS1W4wMSc5ZarlJLJe5CU5NBczgjcyQ5QWQ8Qk5Q7_uQ7gJGrHE2UXH-XdRXYZeW14KLV7'; // Replace with your actual album ID

//   console.log("access toooooooken -----", accessToken);

//   const handleImageUpload = async () => {
//     try {
//       // Convert image to a Blob
//       const response = await fetch(sampleImage);
//       const imageBlob = await response.blob();

//       // Step 1: Upload the image
//       const uploadTokenResponse = await uploadImageToGooglePhotos(imageBlob);
//       const uploadToken = uploadTokenResponse.uploadToken;

//       // Step 2: Create a media item in Google Photos and add it to the album
//       await createMediaItemInAlbum(uploadToken, albumId);
//       console.log('Image uploaded and added to album successfully!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

//   const uploadImageToGooglePhotos = async (blob) => {
//     const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/octet-stream',
//         'Authorization': `Bearer ${accessToken}`,
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
//     console.log("Creating media item in album", albumId);
//     console.log("Upload token:", uploadToken);
    
//     const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}`
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
//     console.log("Batch create response:", result);

//     if (!response.ok) {
//       throw new Error(`Failed to create media item: ${result.error.message}`);
//     }
//     console.log('Media item created:', result);
// };


//   return (
//     <div>
//       <img src={sampleImage} alt="Sample" style={{ width: '200px', height: 'auto' }} />
//       <button onClick={handleImageUpload}>Upload Image to Album</button>
//     </div>
//   );
// };

// export default UploadImageComponent;










// ----------- Above is workrign great to send only single photo to our crated alubm ---- only 1 time photo ------

// ----- bleos is test to send phto agian , if clicked agian, ------- 

// import React from 'react';
// import sampleImage1 from './thunder2.jpg'; // Update with your actual image path
// import sampleImage2 from './download.png'; // Update with your actual image path
// import sampleImage3 from './test2.webp'; // Update with your actual image path

// const UploadImageComponent = () => {
//   const accessToken = JSON.parse(localStorage.getItem('userData')).accessToken;
//   // const albumId = 'AFVB0YYS1W4wMSc5ZarlJLJe5CU5NBczgjcyQ5QWQ8Qk5Q7_uQ7gJGrHE2UXH-XdRXYZeW14KLV7'; // test 3
//   const albumId = 'AFVB0YZXCee8AWDgFXTcobkiTPaA7NgwANLDkHHIeGVJRacEbK1b5IrZDhr5qrNIdcyWb_muurQY'; //test 6

//   const handleImageUpload = async () => {
//     try {
//       // Convert image to a Blob each time
//       const response = await fetch(sampleImage1);
//       let imageBlob = await response.blob();

//       imageBlob = await modifyImageData(imageBlob);

//       // Step 1: Upload the image and generate a new upload token each time
//       const uploadTokenResponse = await uploadImageToGooglePhotos(imageBlob);
//       const uploadToken = uploadTokenResponse.uploadToken;

//       // Step 2: Create a media item in Google Photos and add it to the album
//       await createMediaItemInAlbum(uploadToken, albumId);
//       console.log('Image uploaded and added to album successfully!');
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//   };

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
//         'Authorization': `Bearer ${accessToken}`,
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
//         'Authorization': `Bearer ${accessToken}`
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
//       <img src={sampleImage3} alt="Sample" style={{ width: '200px', height: 'auto' }} />
//       <button onClick={handleImageUpload}>Upload Image to Album</button>
//     </div>
//   );
// };

// export default UploadImageComponent;



// ---------- above is working great as for sending same image as a unique iamge, adn its workng stroign same iamge as unique ----------

// ------------ below is test to( not working ), if make multiple call is small time, so implement queue process ----( making continlusy calls , button remains clicked ) ---


// import React, { useState } from 'react';
// import sampleImage from './thunder2.jpg'; // Update with your actual image path

// const UploadImageComponent = () => {
//   const [uploadQueue, setUploadQueue] = useState([]);
//   const [isUploading, setIsUploading] = useState(false);
//   // const [buttonDisabled, setButtonDisabled] = useState(false);

//   const accessToken = JSON.parse(localStorage.getItem('userData')).accessToken;
//   const albumId = 'AFVB0YYS1W4wMSc5ZarlJLJe5CU5NBczgjcyQ5QWQ8Qk5Q7_uQ7gJGrHE2UXH-XdRXYZeW14KLV7';

//   const handleImageUpload = async () => {

//     // setButtonDisabled(true);
//     // Add the image to the upload queue
//     setUploadQueue((prevQueue) => [...prevQueue, sampleImage]);

//     if (!isUploading) {
//       processQueue();
//     }
//   };

//   const processQueue = async () => {
//     if (uploadQueue.length === 0) {
//       setIsUploading(false);
//       // setButtonDisabled(false); 
//       return;
//     }

//     setIsUploading(true);
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

//       // Process the next image in the queue
//       processQueue();
//     }
//   };


//     const modifyImageData = async (blob) => {
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
//         'Authorization': `Bearer ${accessToken}`,
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
//         'Authorization': `Bearer ${accessToken}`
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
//       <img src={sampleImage} alt="Sample" style={{ width: '200px', height: 'auto' }} />
//       <button onClick={handleImageUpload} disabled={isUploading} >Upload Image to Album</button>
//     </div>
//   );
// };

// export default UploadImageComponent;






// --------( working great) - belwos istest to enable button after evry click and solve above code --( WORKING GREAT )-------

// import React, { useState, useCallback, useEffect } from 'react';
// import sampleImage from './thunder2.jpg'; // Update with your actual image path

// const UploadImageComponent = () => {
//   const [uploadQueue, setUploadQueue] = useState([]);
//   const [isProcessing, setIsProcessing] = useState(false);

//   const accessToken = JSON.parse(localStorage.getItem('userData')).accessToken;
//   const albumId = 'AFVB0YYS1W4wMSc5ZarlJLJe5CU5NBczgjcyQ5QWQ8Qk5Q7_uQ7gJGrHE2UXH-XdRXYZeW14KLV7';

//   const handleImageUpload = () => {
//     // Add the image to the upload queue
//     setUploadQueue((prevQueue) => [...prevQueue, sampleImage]);
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
//   }, [uploadQueue, accessToken, albumId]);

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
//         'Authorization': `Bearer ${accessToken}`,
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
//         'Authorization': `Bearer ${accessToken}`
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
//       <img src={sampleImage} alt="Sample" style={{ width: '200px', height: 'auto' }} />
//       <button onClick={handleImageUpload}>Upload Image to Album</button>
//     </div>
//   );
// };

// export default UploadImageComponent;







// ----- aobe is great working ---- belso is test to fix callback warningi=-===



import React, { useState, useCallback, useRef } from 'react';
import sampleImage from './thunder2.jpg'; // Update with your actual image path

const UploadImageComponent = () => {
  const [uploadQueue, setUploadQueue] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadingRef = useRef(false); // Track if any upload is in progress

  const accessToken = JSON.parse(localStorage.getItem('userData')).accessToken;
  const albumId = 'AFVB0YYS1W4wMSc5ZarlJLJe5CU5NBczgjcyQ5QWQ8Qk5Q7_uQ7gJGrHE2UXH-XdRXYZeW14KLV7';

  const uploadImageToGooglePhotos = useCallback(async (blob) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/uploads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${accessToken}`,
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
  }, [accessToken]);

  const createMediaItemInAlbum = useCallback(async (uploadToken, albumId) => {
    const response = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
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
  }, [accessToken]);

  const modifyImageData = useCallback(async (blob) => {
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Append a small unique identifier to the image data
    const uniqueIdentifier = new TextEncoder().encode(`unique-${Date.now()}`);
    const modifiedArray = new Uint8Array([...uint8Array, ...uniqueIdentifier]);

    return new Blob([modifiedArray], { type: blob.type });
  }, []);

  const processQueue = useCallback(async () => {
    if (uploadQueue.length === 0) {
      setIsUploading(false);
      uploadingRef.current = false;
      return;
    }

    if (uploadingRef.current) {
      return; // Prevent concurrent uploads
    }

    uploadingRef.current = true;
    setIsUploading(true);
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
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      // Remove the processed image from the queue
      setUploadQueue((prevQueue) => prevQueue.slice(1));

      // Process the next image in the queue
      processQueue();
    }
  }, [uploadQueue, modifyImageData, uploadImageToGooglePhotos, createMediaItemInAlbum, albumId]);

  const handleImageUpload = useCallback(() => {
    // Add the image to the upload queue
    setUploadQueue((prevQueue) => {
      // Prevent adding the same image multiple times
      if (prevQueue.includes(sampleImage)) {
        return prevQueue;
      }
      return [...prevQueue, sampleImage];
    });

    // Start processing the queue
    if (!uploadingRef.current) {
      processQueue();
    }
  }, [sampleImage, processQueue]);

  return (
    <div>
      <img src={sampleImage} alt="Sample" style={{ width: '200px', height: 'auto' }} />
      <button onClick={handleImageUpload}>Upload Image to Album</button>
    </div>
  );
};

export default UploadImageComponent;
