import React, { useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Album from "../../assets/picture.png";
import Thanks from "../../assets/thanks.svg";
import axios from "axios";
import { useAuth } from '../../context/AuthContext'; // Import your custom useAuth hook

export default function ThanksGivingPopup({ artist, track, album }) {
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [sender, setSender] = React.useState({});
  const closeIcon = <span className="close-icon">Close</span>;

  const { userEmail } = useAuth(); // Use the custom hook to get the user's email

  // Initialize variables
  let valueToShow, descriptionValue, profileUrl;

  // Define the object with common properties
  const data = artist || track || album;

  // Access properties dynamically
  if (data) {
    valueToShow = data.accountName || data.title || data.albumName;
    descriptionValue = data.bio || data.description;
    profileUrl = data.profileImageUrl || data.selectedImageThumbnail;
  } else {
    valueToShow = null;
    descriptionValue = null;
    profileUrl = null;
  }

  const userDetails = async () => {
    const userDetails = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/api/getUserProfileById/${userEmail}`
    );
    setSender(userDetails.data);
  };

  const sendCoinClick = async () => {
    let route;
    let body;

    // Define common properties
    const commonProps = {
      userId: userEmail,
      amountSend: parseInt(amount)
    };

    // Determine route and body based on the object type
    if (artist) {
      route = "sendThanksCoinsViaArtistPage";
      body = { ...commonProps, artistId: artist?.email };
    } else if (album) {
      route = "sendThanksCoinsViaAlbumPage";
      body = { ...commonProps, albumId: album?._id };
    } else if (track) {
      route = "sendThanksCoinsViaContent";
      body = { ...commonProps, videoId: track?.videoId };
    }

    // Make the API call if amount is less than or equal to sender's thanksCoins
    const url = `${process.env.REACT_APP_API_BASE_URL}/api/${route}/`;
    if (amount <= sender.thanksCoins) {
      await axios.patch(url, { ...body });
    }

    setOpen(false);
    setAmount(0);
  };

  const handleClose = () => {
    setOpen(false);
    setAmount(0);
  };

  useEffect(() => {
    if (open) {
      userDetails();
    }
  }, [open]);

  return (
    <>
      <div className="give-thanks" onClick={() => setOpen(true)}>
        <img src={Thanks} alt="Album" />
        Give Thanks
      </div>
      <Modal
        classNames={{
          modal: "give-thanks-modal",
          modalAnimationIn: 'customEnterModalAnimation',
          modalAnimationOut: 'customLeaveModalAnimation',
        }}
        center
        open={open}
        onClose={() => handleClose()}
        closeIcon={closeIcon}
      >
        <h2>SEND THANKS</h2>

        <div className="track-info">
          <img className="album-img" src={profileUrl} alt="icon" />
          <div>
            <h1>{valueToShow}</h1>
            <span>{descriptionValue}</span>
          </div>
        </div>

        <div className="balance-info">
          <div>
            <span>Thanks coin balance</span>
            <h4>{sender.thanksCoins}</h4>
          </div>
          <div className="after-gift">
            <span>Balance after gift</span>
            <h4 defaultValue={amount > 0 ? amount : 0}>{Math.max(sender.thanksCoins - amount, 0)}</h4>
          </div>
        </div>

        <form className="form-outer" action="">
          <input type="number" placeholder="$10" onChange={(e) => setAmount(Math.max(e.target.value, 0))} min={0} />
          {amount > sender.thanksCoins && <span>Insufficient coin balance</span>}
          <button className="btn btn-send" onClick={() => sendCoinClick()} type="button">Send</button>
        </form>
      </Modal>
    </>
  );
}