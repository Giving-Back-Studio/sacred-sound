import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { v4 } from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';
import ProfileCircle from '../assets/ProfileCircle.png';
import { useAuth } from '../context/AuthContext'; // Import your custom useAuth hook

export default function ProfileEditSection() {
  const { userEmail } = useAuth(); // Use the custom hook to get the user's email
  const [bio, setBio] = useState('');
  const [artistLink, setArtistLink] = useState('');
  const [profilePicture, setProfilePicture] = useState(ProfileCircle);
  const [accountName, setAccountName] = useState('');
  const [accountAvailableAlert, setAccountAvailableAlert] = useState('');
  const [initialBio, setInitialBio] = useState('');
  const [initialArtistLink, setInitialArtistLink] = useState('');
  const [accountNameTaken, setAccountNameTaken] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/getUserProfile/${userEmail}`);
        setAccountName(response.data.accountName || '');
        setInitialBio(response.data.bio || '');
        setInitialArtistLink(response.data.artistLink || '');
        setProfilePicture(response.data.profileImageUrl || ProfileCircle);
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
  }, [accountName, userEmail]);

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleArtistLinkChange = (event) => {
    setArtistLink(event.target.value);
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
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/updateUserProfile`, {
        email: userEmail,
        accountName: accountName,
        bio: bio || initialBio,
        artistLink: artistLink || initialArtistLink,
      });
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

  return (
    <ProfileEditDiv>
      <h1>Your Profile</h1>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ProfilePicture src={profilePicture} alt="Profile Picture" />
        <ImageUploadStyledLabel>
          <h2 style={{ color: "#434289" }}>Upload Profile Picture</h2>
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={(e) => {
              handleProfilePictureChange(e);
            }}
          />
        </ImageUploadStyledLabel>
      </div>

      <form onSubmit={handleProfileSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <CustomLabel>
          <h2>Change your account name.</h2>
          <ProfileInputField
            type="text"
            value={accountName}
            onChange={(event) => setAccountName(event.target.value)}
          />
          <div>{accountAvailableAlert}</div>
        </CustomLabel>
        <CustomLabel>
          <h2>Write a bio for your profile.</h2>
          <BioTextArea value={bio || initialBio} onChange={handleBioChange} />
        </CustomLabel>
        <br />
        <CustomLabel>
          <h2>Add a link to your website.</h2>
          <ProfileInputField
            type="text"
            value={artistLink || initialArtistLink}
            onChange={handleArtistLinkChange}
          />
        </CustomLabel>

        <SaveButton type="submit" disabled={accountNameTaken}>
          <h1 style={{ color: "#F5F5F5" }}>Save Changes</h1>
        </SaveButton>
      </form>
    </ProfileEditDiv>
  );
}

const ProfileEditDiv = styled.div`
  width: 66%;
  height: 870px;
  margin: 5%;
  display: flex;
  flex-direction: column;
  border-radius: 33px;
  padding: 15px;
  overflow: "hidden";
`;

const ImageUploadStyledLabel = styled.label`
  display: inline-block;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border-radius: 33px;
  margin-top: 15px;
  padding: 11px;
  margin-bottom: 11px;
  z-index: 0;
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
`;

const ProfileInputField = styled.input`
  width: 90%;
  border-radius: 33px;
  margin-right: 5%;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 11px;
  padding-bottom: 11px;
`;

const BioTextArea = styled.textarea`
  border-radius: 33px;
  width: 90%;
  height: 200px;
  padding: 2%;
  margin-right: 5%;
  border: none;
  resize: none;
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