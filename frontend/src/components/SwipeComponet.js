import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SliderArrow from "../assets/slider-arrow.svg";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import rect from '../assets/rect.png'
import PlayButton from "./common/PlayButton";
import { useState, useEffect } from "react";

export default function SwipeComponet({ arr }) {
  const [artistNames, setArtistNames] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtistName = async () => {
      const emails = arr.map(content => content.owner).filter((v, i, a) => a.indexOf(v) === i);
      console.log("emails", emails);
      try {
        const queryParams = new URLSearchParams({ emails: emails.join(',') });
        const response = await fetch(`/api/getArtistName?${queryParams}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log("data", data);
        setArtistNames(data);
      } catch (error) {
        console.error('Error fetching artist names:', error);
      }
    };

    fetchArtistName();
  }, [arr]);

  return (
    <Discography>
      <Swiper
        className="swiper-slider"
        spaceBetween={30}
        slidesPerView={4}
        modules={[Navigation]}
        navigation
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          575: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {arr.map((content) => {
          console.log("content", content);
          let thumbnail =
            content?.selectedImageThumbnail?.length > 0
              ? content.selectedImageThumbnail
              : rect;
                const handleClick = () => {
                  if (content.contentType === 'AlbumMetaData') {
                      navigate(`/main/album?id=${content._id}`);
                  }else if(content.contentType === 'userAccounts') {
                    navigate(`/main/artist?id=${content.user._id}`);
                  }else{
                    navigate(`/main/track?id=${content._id}`);
                  }
              };
          return (
              <SwiperSlide key={content._id}>
                <div className="item" id="content-card" onClick={() => handleClick()} style={{ cursor: 'pointer' }}>
                  <img className="swiper-thumb-img" src={thumbnail} alt="Item Thumb"></img>
                  <div style={{marginLeft: 0, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div>
                      <h1 className="slider-trackname">{content.contentType !== 'AlbumMetaData' ? content.title: content.albumName}</h1>
                      <h1 className="slider-artist">
                      
                        Artist -
                        <span
                          onClick={(e) =>{
                            e.stopPropagation()
                            navigate(`/main/artist?id=${content.user._id}`)
                          }}
                          style={{textDecoration: 'underline', cursor: 'pointer'}}
                        >
                          {artistNames[content.owner] || 'Loading...'}
                        </span>
                      </h1>
                    </div>
                      <div style={{display: 'inline', marginRight: '20px'}}>
                        {content.contentType === 'audio' || content.contentType === 'video' || content.contentType === 'recommendation'? <PlayButton track={{id: content._id, songUrl: content.fileUrl,
                                  songTitle: content.title,
                                  isVideo: content.contentType == "video",
                                  artistName: content.videoOwner,
                                  img: content.selectedImageThumbnail}}/> : ''}

                      </div>
                  </div>
                </div>
              </SwiperSlide>
          );
        })}
      </Swiper>
    </Discography>
  );
}

const Discography = styled.div`
  background-color: rgba(0,0,0,0);
  padding: 5px;
  margin:20px;
  .swiper-slider {
    background-color: rgba(0,0,0,0);
    // margin: 20px 0;
    overflow: visible;
    @media (max-width: 991px) {
    }
    .item {
        
      background-color: rgba(0, 0, 0, 0);
      h1 {
        font-weight: 400;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .slider-trackname {
        font-size: 16px;
      }
      .slider-artist {
        font-size: 14px;
      }
      img {
        width: 100%;
        text-align: center;
      }
      .swiper-thumb-img{
        object-fit:cover;
        height: 250px;
      }
    }
    .swiper-container {
      background-color: rgba(0, 0, 0, 0);
      position: relative;
    }

    .swiper-button-prev,
    .swiper-button-next {
      position: absolute;
      top: -32px;
      width: 35px;
      height: 35px;
      background-color: #fff;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      // @media (max-width: 575px) {
      //   top: -85px;
      // }
      &::after {
        content: "";
        background-image: url(${SliderArrow});
        background-size: contain;
        height: 35px;
        width: 35px;
        background-repeat: no-repeat;
      }
    }

    // .swiper-button-next {
    //   right: 0px;
    // }

    .swiper-button-prev {
      right: 60px;
      left: auto;
      &::after {
        transform: rotate(180deg);
      }
    }
  }
`;
