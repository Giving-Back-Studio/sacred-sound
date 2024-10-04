import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import uploadEditIcon from '../../assets/uploadEditIcon.png';
import uploadHamburgerIcon from '../../assets/uploadHamburgerIcon.png';
import uploadTrashIcon from '../../assets/uploadTrashIcon.png';
import WhiteEditIcon from '../../assets/WhiteEditIcon.png';
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

const ModifyAlbum = () => {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [albumData, setAlbumData] = useState({
    albumName: '',
    description: '',
    title: '',
    visibility: '',
    albumImageUrl: '',
    albumOrder: [],
  });
  const [formError, setFormError] = useState('');
  const [uploadedAlbumCover, setUploadedAlbumCover] = useState(null);
  const [previewAlbumCover, setPreviewAlbumCover] = useState(null);

  useEffect(() => {
    const fetchAlbumData = async () => {
      if (!albumId) return;

      try {
        const albumResponse = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getAlbumById`, {
          params: { albumId: albumId },
        });

        const album = albumResponse.data;
        const trackDetailsPromises = album.albumOrder.map(videoId => getTitleForVideoId(videoId));
        const trackDetails = await Promise.all(trackDetailsPromises);

        setAlbumData(prevState => ({
          ...prevState,
          albumName: album.albumName || '',
          description: album.description || '',
          title: album.title || '',
          visibility: album.visibility || 'public',
          albumImageUrl: album.albumImageUrl || '',
          albumOrder: trackDetails, // Update this to ensure it's an array of objects
        }));

        if (album.albumImageUrl) {
          setPreviewAlbumCover(album.albumImageUrl);
        }
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  const onDragEnd = async (result) => {
    if (!result.destination) return; // Dropped outside the list

    const newAlbumOrder = Array.from(albumData.albumOrder);
    const [reorderedItem] = newAlbumOrder.splice(result.source.index, 1);
    newAlbumOrder.splice(result.destination.index, 0, reorderedItem);

    // Update local state with new order
    setAlbumData(prevState => ({
      ...prevState,
      albumOrder: newAlbumOrder,
    }));

    // Update backend with new order, assuming albumOrder needs to be an array of video IDs
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateAlbumMetaData`, {
        albumId: albumId, // Directly use albumId from useParams
        albumOrder: newAlbumOrder.map(item => item.id), // Ensure this matches the expected format
      });
      console.log('Album order updated successfully');
    } catch (error) {
      console.error('Error updating album order:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAlbumData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle album cover upload to Firebase and get URL
  const uploadAlbumCover = async () => {
    if (!uploadedAlbumCover) return null; // Return null to explicitly indicate no upload happened
    const fileRef = ref(storage, `album-covers/${userEmail}/${uuidv4()}`);
    try {
      await uploadBytes(fileRef, uploadedAlbumCover);
      const coverUrl = await getDownloadURL(fileRef);
      console.log("Uploaded Album Cover URL:", coverUrl); // Debug log
      return coverUrl;
    } catch (error) {
      console.error("Error uploading album cover:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if a new album cover has been uploaded; if so, upload it and get the URL
    const coverUrl = uploadedAlbumCover ? await uploadAlbumCover() : albumData.albumImageUrl;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateAlbumMetaData`, {
        albumId: albumId,
        title: albumData.albumName,
        description: albumData.description,
        visibility: albumData.visibility,
        albumImageUrl: coverUrl, // Use the new cover URL if a new cover has been uploaded, else use existing cover URL from state
      });

      if (response.status === 200) {
        console.log('Album metadata updated successfully', response.data);
        navigate('/studio'); // Redirect to studio page or another relevant page
      } else {
        setFormError('Failed to update album metadata. Please try again.');
      }
    } catch (error) {
      console.error('Error updating album metadata:', error);
      setFormError('An error occurred while updating the album.');
    }
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedAlbumCover(file);
      setPreviewAlbumCover(URL.createObjectURL(file));
    }
  };

  const getTitleForVideoId = async (videoId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getVideoMetadataFromVideoId/${videoId}`);
      // Check if the response contains the expected video data
      if (response.data && response.data.title) {
        return { id: videoId, title: response.data.title };
      } else {
        // Log a warning to the console instead of throwing an error
        console.warn(`No title returned for videoId ${videoId}. Using default title.`);
        return { id: videoId, title: 'Untitled Video' }; // Provide a default title
      }
    } catch (error) {
      console.error(`Error fetching title for videoId ${videoId}:`, error);
      return { id: videoId, title: 'Error Fetching Title' }; // Indicate an error in fetching the title
    }
  };

  const handleEdit = (trackId) => {
    navigate(`/prepareForQA/${trackId}`);
  };

  const handleDelete = (trackId) => {
    // Logic to handle delete
  };

  // Render form for album metadata editing
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ height: '12vh', display: 'flex', justifyContent: 'space-between' }}>
          <CloseButton>Close</CloseButton>
          <SaveButton type="submit">Save</SaveButton>
        </div>
        <h1 style={{ marginLeft: '3vw', marginBottom: '6vh' }}>Album details</h1>
        <div style={{ display: 'flex', flexDirection: 'row', marginLeft: '3vw' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label htmlFor="albumName">Title</label>
            <input
              style={{ width: '80%', padding: '22px' }}
              type="text"
              name="albumName"
              value={albumData.albumName}
              onChange={handleInputChange}
              placeholder="Write a catchy title for the content"
            />
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <AlbumCoverInput
                onClick={() => document.getElementById('albumCover').click()}
                image={previewAlbumCover}
              >
                {!previewAlbumCover && <span>Upload Cover Image</span>}
                {previewAlbumCover && (
                  <>
                    <img src={previewAlbumCover} alt="Album Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <EditCoverButton />
                  </>
                )}
              </AlbumCoverInput>
              <input
                style={{ display: 'none' }}
                id="albumCover"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
              />
            </div>
            <label style={{ marginTop: '3vh' }} htmlFor="description">Description</label>
            <textarea
              style={{ width: '80%', padding: '22px' }}
              name="description"
              value={albumData.description}
              onChange={handleInputChange}
              placeholder="What describes this album"
            />
            <label style={{ marginTop: '3vh' }} htmlFor="visibility">Visibility</label>
            <select
              style={{ width: '36%', padding: '22px' }}
              name="visibility"
              value={albumData.visibility}
              onChange={handleInputChange}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginRight: '3vw' }}>
            <label htmlFor='DragDropContext'>Tracks from this album</label>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="albumTracks">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {albumData.albumOrder.map((track, index) => (
                      <Draggable key={track.id.toString()} draggableId={track.id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <TrackComponent
                              track={track}
                              onEdit={() => handleEdit(track.id)}
                              onDelete={() => handleDelete(track.id)}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </form>
      {formError && <p>{formError}</p>}
    </div>
  );
};

export default ModifyAlbum;

const SaveButton = styled.button`
  margin: 3%;
`;
const CloseButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 18px;
  color: rgb(67, 66, 137);
  text-decoration: underline;
  margin: 3vw;
  padding: 0px;
`;

const AlbumCoverInput = styled.div`
  width: 65%;
  height: 170px;
  background-color: ${props => props.image ? 'transparent' : '#f0f0f0'};
  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  display: flex;
  justify-content: space-between; /* Align children to the left and right */
  align-items: center; /* Align children vertically */
  position: relative; /* Position relative to the parent */
  margin-bottom: 3vh;
  margin-left: 3vw;
  margin-top: 3vh;
  padding: 0 10px; /* Add horizontal padding */
  justify-content: center;
`;

const TrackComponent = ({ track, onEdit, onDelete, dragHandleProps }) => {
  console.log(track)
  return (
    <TrackContainer>
      <Icon src={uploadHamburgerIcon} alt="Drag handle" {...dragHandleProps} />
      <FileName>{track.title}</FileName>
      <Icon
        src={uploadEditIcon}
        alt="Edit"
        onClick={() => onEdit(track.id)}
      />
      {/* <Icon
        src={uploadTrashIcon}
        alt="Delete"
        onClick={() => onDelete(track.id)}
      /> */}
    </TrackContainer>
  );
};

const TrackContainer = styled.div`
  background-color: #F5F5F5;
  padding: 22px;
  margin-bottom: 10px; // Add space between the items
  border: 1px solid #D9D9D9;
  display: flex;
  align-items: center; // Align items vertically in the center
  justify-content: space-between; // Space out the children evenly
`;

const Icon = styled.img`
  cursor: pointer;
  // Adjust size if necessary
  width: 24px; // Example size
  height: 24px; // Example size
`;

const FileName = styled.span`
  color: #434289;
  font-size: 20px;
  flex-grow: 1;
  margin-left: 3vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EditCoverButton = styled.div`
  position: absolute;
  top: 12px; // Adjust as needed
  right: 12px; // Adjust as needed
  width: 24px; // Adjust as needed
  height: 24px; // Adjust as needed
  background-image: url(${WhiteEditIcon});
  background-size: cover;
  cursor: pointer;
  background-color: transparent;
`;