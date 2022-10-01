import React from "react";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import { Card, CardMedia, Grid } from "@mui/material";
import SwiperCore, {
  Keyboard,
  Scrollbar,
  Pagination,
  Navigation,
} from "swiper";

import "swiper/swiper.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/pagination/pagination.scss";
import "swiper/modules/scrollbar/scrollbar.min.css";

SwiperCore.use([Keyboard, Scrollbar, Pagination, Navigation]);

const ImageSwiper = (props) => {
  const pictures = props.pictures;
  return (
    <Grid item container xs={12} justifyContent="center">
      <Grid item xs={8} sm={6}>
        <Card>
          <Swiper
            grabCursor
            keyboard={{ enabled: true }}
            pagination={{ clickable: true }}
            navigation
            loop
            style={{
              paddingBottom: "3rem",
              "& .swiperPaginationBullet": {
                background: "blue",
              },
              "& .swiperButtonNext:after": {
                fontSize: "2rem !important",
              },
              "& .swiperButtonPrev:after": {
                fontSize: "2rem !important",
              },
            }}
          >
            {pictures.map((picture, index) => (
              <SwiperSlide key={index}>
                <CardMedia
                  image={picture}
                  style={{ height: 0, paddingTop: "60%" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ImageSwiper;
