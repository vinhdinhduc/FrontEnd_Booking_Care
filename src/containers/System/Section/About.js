import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "../HomePage/HomePage.scss";

class About extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">Truyền thông nói về Đức Vình</div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/uCzUQSBCWDw?list=RDuCzUQSBCWDw"
              title="Ky Niem Khong Vui"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
              repudiandae ad et, neque ipsum, labore enim pariatur, cumque earum
              modi commodi asperiores. Error unde a mollitia ipsam ea corrupti
              qui.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
