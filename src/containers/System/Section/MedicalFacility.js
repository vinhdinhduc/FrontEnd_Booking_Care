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

class MedicalFacility extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="section-share medical-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <span className="btn-section">Xem Thêm</span>
          </div>
          <div className="section-body">
            <Slider
              {...this.props.settings}
              // nextArrow={<NextArrow slidesToShow={settings.slidesToShow}
            >
              <div className="section-customize">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 1</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 2</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 3 </div>
              </div>
              <div className="section-customize">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 4</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 5</div>
              </div>
              <div className="section-customize">
                <div className="bg-image medical-facility" />
                <div className="section-text">Hệ thống y tế thu cúc 6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
