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

class Specialty extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên Khoa Phổ Biến</span>
            <span className="btn-section">Xem Thêm</span>
          </div>
          <div className="section-body">
            <Slider
              {...this.props.settings}
              // nextArrow={<NextArrow slidesToShow={settings.slidesToShow}
            >
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text">Cơ xương khớp 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text">Cơ xương khớp 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text">Cơ xương khớp 3 </div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text">Cơ xương khớp 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text"> Cơ xương khớp 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <div className="section-text">Cơ xương khớp 6</div>
              </div>
            </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
