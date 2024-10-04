import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import ProfileCircle from '../../assets/ProfileCircle.png';
import BannerUploadIcon from '../../assets/BannerUploadIcon.png';
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

const YourChannel = () => {
  const [bio, setBio] = useState('');
  const [artistLink, setArtistLink] = useState('');
  const [profilePicture, setProfilePicture] = useState(ProfileCircle);
  const [accountName, setAccountName] = useState('');
  const [accountAvailableAlert, setAccountAvailableAlert] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const [initialArtistLink, setInitialArtistLink] = useState('');
  const [accountNameTaken, setAccountNameTaken] = useState(false);
  const fileInputRef = useRef(null);
  const [bannerImage, setBannerImage] = useState('');
  const [artistTitle, setArtistTitle] = useState('');
  const [initialArtistTitle, setInitialArtistTitle] = useState('');

  const { userEmail } = useAuth(); // Use the custom hook to get the user's email

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getUserProfile/${userEmail}`);
        setAccountName(response.data.accountName || '');
        setInitialBio(response.data.bio || '');
        setInitialArtistLink(response.data.artistLink || '');
        setProfilePicture(response.data.profileImageUrl || ProfileCircle);
        setInitialArtistTitle(response.data.artistTitle || '');
      } catch (error) {
        console.error(error);
      }
    };
    if (userEmail) {
      fetchData();
    }
  }, [userEmail]);

  useEffect(() => {
    const getCheckAccountName = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getCheckAccountName`, {
          params: {
            email: userEmail,
            accountName: accountName,
          },
        });
        if (response.data.taken) {
          setAccountAvailableAlert(response.data.message);
          setAccountNameTaken(true);
        } else {
          setAccountAvailableAlert(response.data.message);
          setAccountNameTaken(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (accountName) {
      getCheckAccountName();
    }
  }, [accountName]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleArtistLinkChange = (event) => {
    setArtistLink(event.target.value);
  };

  const handleArtistTitleChange = (event) => {
    setArtistTitle(event.target.value);
  };

  const handleProfilePictureChange = (event) => {
    const files = event.target.files;
    const latestFile = files[files.length - 1]; // Always select the last file uploaded in the array.
    setProfilePicture(URL.createObjectURL(latestFile));
    uploadProfilePicture(latestFile);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/updateUserProfile`,
        {
          email: userEmail,
          accountName: accountName,
          bio: bio || initialBio,
          artistLink: artistLink || initialArtistLink,
          artistTitle: artistTitle || initialArtistTitle,
        }
      );
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const uploadProfilePicture = (uploadingPicture) => {
    if (uploadingPicture == null) {
      console.log("profilePicture was null");
      return;
    }
    const fileUploadName = v4();
    const fileRef = ref(storage, `ProfilePictures/${userEmail}/${fileUploadName}`);
    const metadata = {
      contentType: 'image/jpeg',
    };

    uploadBytes(fileRef, uploadingPicture, metadata)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            postProfileImage(url);
            setProfilePicture(url); // Update the profilePicture state with the new URL
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const uploadBannerPicture = (uploadingPicture) => {
    if (uploadingPicture == null) {
      console.log("profilePicture was null");
      return;
    }
    const fileUploadName = v4();
    const fileRef = ref(storage, `BannerPictures/${userEmail}/${fileUploadName}`);
    const metadata = {
      contentType: 'image/jpeg',
    };

    uploadBytes(fileRef, uploadingPicture, metadata)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => {
            postBannerImage(url);
            setBannerImage(url);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const postProfileImage = (url) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postProfileImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        profileImageUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const postBannerImage = (url) => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/postBannerImage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        bannerImageUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  const handleBannerImageChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // Update local state with the file for a preview or further processing
      setBannerImage(URL.createObjectURL(file));
      uploadBannerPicture(file)
      // Optional: Initiate the upload process or save the file to be uploaded later
    }
  };

  const triggerBannerFileInput = () => {
    // Check if the file input reference exists and if it has a current property
    if (fileInputRef && fileInputRef.current) {
      // Simulate a click on the hidden file input
      fileInputRef.current.click();
    }
  };

  return (
    <ProfileEditDiv>
      <h1 style={{ marginLeft: '5%' }}>Channel</h1>
      <BannerUploadInputField onClick={triggerBannerFileInput}>
        <h2>Upload your channel content banner image</h2>
        <BannerUploadStyledIcon src={BannerUploadIcon}></BannerUploadStyledIcon>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleBannerImageChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </BannerUploadInputField>

      <Container>
        <div style={{ width: '5vw', marginLeft: '5vw', marginRight: '5vw', display: 'flex', flexDirection: 'column' }}>
          {/* Disabling Image Preview for now to match design on Figma
                <ProfilePicture src={profilePicture} alt="Profile Picture" /> */}
          <ImageUploadStyledLabel>
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              onChange={(e) => {
                handleProfilePictureChange(e);
              }}
            />
            <h3 style={{ marginBottom: '0rem' }}>Upload</h3>
            <h3 style={{ marginTop: '0rem' }}>photo</h3>
            <ProfileUploadStyledIcon src={BannerUploadIcon}></ProfileUploadStyledIcon>
          </ImageUploadStyledLabel>
        </div>
        <div style={{ width: '60%' }}>
          <form onSubmit={handleProfileSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <CustomLabel>
              <h2>Your Name</h2>
              <ProfileInputField
                style={{ marginTop: '0vh' }}
                type="text"
                value={accountName}
                onChange={(event) => setAccountName(event.target.value)}
              />
            </CustomLabel>
            <div style={{ fontSize: '16px' }}>{accountAvailableAlert}</div>
            <BioTextArea placeholder="Description" value={bio || initialBio} onChange={handleBioChange} />
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <ProfileInputField
                style={{ width: '28%' }}
                type="text"
                placeholder="Link Title"
                value={artistTitle || initialArtistTitle}
                onChange={handleArtistTitleChange}
              />
              <ProfileInputField
                style={{ width: '56%' }}
                type="text"
                placeholder="Link URL"
                value={artistLink || initialArtistLink}
                onChange={handleArtistLinkChange}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '3vh' }}>
              <button
                type="submit"
                disabled={accountNameTaken}
                style={{ display: 'flex' }}>
                <div style={{ color: 'white' }}>
                  Publish
                </div>
              </button>
            </div>
          </form>
        </div>
      </Container>

    </ProfileEditDiv>
  )
}
export default YourChannel;

const ProfileEditDiv = styled.div`
  width:94%;
  display:flex;
  flex-direction:column;
  padding: 3%;
  overflow: hidden;
`;

const ImageUploadStyledLabel = styled.label`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 33px;
  margin-top: 15px;
  padding: 11px;
  margin-bottom: 11px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  & input[type="file"] {
    position: absolute;
    font-size: 100px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
    display: none;
  }
`;

const CustomLabel = styled.label`
  margin-top: 3%;
  width: 100%;
`;

const ProfileInputField = styled.input`
  margin-top: 3vh;
  width: 93.3%;
  padding: 3%;
  overflow: hidden;
  border: 2px solid #D9D9D9;
`;

const BioTextArea = styled.textarea`
  margin-top: 3vh;
  width: 93.3%;
  padding: 3%;
  height: 200px;
  margin-right: 2%;
  border: none;
  resize: none;
  overflow: hidden;
  border: 2px solid #D9D9D9;
`;

const SaveButton = styled.button`
  border: none;
  color: #F5F5F5;
  background-color: #434289;
  border-radius: 33px;
  padding: 11px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  width: fit-content;
  margin-top: 3%;
`;

const ProfilePicture = styled.img`
  display: inline-block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center center;
`;

const BannerUploadInputField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  cursor: pointer;
`;

const BannerUploadStyledIcon = styled.img`
  max-width: 100px;
  max-height: 100px;
  object-fit: contain;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
`;

const ProfileUploadStyledIcon = styled.img`
  width: 30px; /* default width */
  height: 30px; /* default height */
  max-width: 50px;
  max-height: 50px; 
  object-fit: contain;
`;