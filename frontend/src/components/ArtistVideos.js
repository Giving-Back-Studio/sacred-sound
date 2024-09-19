// import React, { useEffect, useState } from 'react';
// import Axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMusic, faFilm, faCheck, faTimes, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';

// //Component being replace by ContentTab on Jan15
// function ArtistVideos(props) {
//     const artistId = props.artistId;
//     const [contentDocuments, setContentDocuments] = useState([]);
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         const fetchContentByArtist = async () => {
//             try {
//                 const encodedArtistId = encodeURIComponent(artistId);
//                 const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getContentByArtist?artistId=${encodedArtistId}`);
//                 if (response.status === 200) {
//                     const fetchedContentDocuments = response.data;
//                     setContentDocuments(fetchedContentDocuments);
//                 } else {
//                     console.error(`Request failed with status: ${response.status}`);
//                 }
//             } catch (error) {
//                 console.error(`An error occurred: ${error}`);
//             }
//         };

//         // Call the function to fetch content by artist when the component mounts
//         fetchContentByArtist();
//     }, [artistId]); // Make sure to include artistId in the dependencies array

// const handleModify = (videoId) => {
//     // Handle modify action for the specified videoId
//     // You can navigate to the PrepareForQA page with the videoId
//     navigate(`/prepareForQA/${videoId}`);
// };


// const handleDelete = async (videoId, artistId) => {
//     try {
//         // Include the user ID in the request data or headers
//         const response = await Axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/deleteContent?videoId=${videoId}`, {
//             headers: {
//                 'user-id': artistId, // Send the user ID as a custom header
//             },
//         });

//         if (response.status === 200) {
//             // Delete was successful, you can update the UI accordingly
//             console.log(`Deleted video with ID: ${videoId}`);
            
//             // Now, you can update the contentDocuments state to reflect the changes
//             // For example, you can filter out the deleted video from the state
//             setContentDocuments((prevContentDocuments) =>
//                 prevContentDocuments.filter((contentDocument) => contentDocument.videoId !== videoId)
//             );
//         } else {
//             console.error(`Request failed with status: ${response.status}`);
//         }
//     } catch (error) {
//         console.error(`An error occurred: ${error}`);
//     }
// };



//     return (
//         <>
//             <div style={{ marginTop: '5%' }}>
//                 {/* Check if contentDocuments is defined before mapping */}
//                 {contentDocuments && (
//                     <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '30px', borderBottom: '1px solid black' }}>
//                         <span style={{ width: '60px' }}></span>
//                         <span style={{ width: '250px' }}>Title</span>
//                         <span style={{ width: '100px' }}>Prepared</span>
//                         <span style={{ width: '100px' }}>Reviewed</span>
//                         <span style={{ width: '100px' }}>Approved</span>
//                         <span style={{ width: '100px' }}>Modify</span>
//                         <span style={{ width: '100px' }}>Delete</span>
//                     </div>
//                 )}
//                 {/* Render contentDocument details */}
//                 {contentDocuments &&
//                     contentDocuments.map((contentDocument) => (
//                         <div
//                             key={contentDocument.videoId}
//                             style={{
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 borderBottom: '1px solid #ccc', // Subtle gray line
//                                 padding: '5px 0', // 5px padding top and bottom
//                                 margin: '5px 0', // 5px margin top and bottom
//                             }}
//                         >
//                             {/* Render content type */}
//                             <span style={{ width: '60px' }}>
//                                 {contentDocument.isOnlyAudio ? (
//                                     <FontAwesomeIcon icon={faMusic} />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faFilm} />
//                                 )}
//                             </span>
//                             {/* Render title */}
//                             <span style={{ width: '250px' }}>{contentDocument.title}</span>
//                             {/* Render properties */}
//                             <span style={{ width: '100px' }}>
//                                 {contentDocument.b_isPreparedForReview ? (
//                                     <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
//                                 )}
//                             </span>
//                             <span style={{ width: '100px' }}>
//                                 {contentDocument.b_hasBeenReviewed ? (
//                                     <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
//                                 )}
//                             </span>
//                             <span style={{ width: '100px' }}>
//                                 {contentDocument.b_isApproved ? (
//                                     <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
//                                 ) : (
//                                     <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
//                                 )}
//                             </span>
//                             {/* Render action buttons */}
//                             <span style={{ width: '100px' }}>
//                                 <button onClick={() => handleModify(contentDocument.videoId)}>
//                                     <FontAwesomeIcon icon={faEdit} style={{ color: 'blue' }} />
//                                 </button>
//                             </span>
//                             <span style={{ width: '100px' }}>
//                                 <button onClick={() => handleDelete(contentDocument.videoId, artistId)}>
//                                     <FontAwesomeIcon icon={faTrash} style={{ color: 'red' }} />
//                                 </button>
//                             </span>
//                         </div>
//                     ))}
//             </div>
//         </>
//     );
// }

// export default ArtistVideos;
