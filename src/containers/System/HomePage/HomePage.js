import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomeHeader from "../../Header/HomeHeader";
import Specialty from "../Section/Specialty";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import MedicalFacility from "../Section/MedicalFacility";
import OutStandingDoctor from "../Section/OutStandingDoctor";
import HandBook from "../Section/HandBook";
import About from "../Section/About";
import HomeFooter from "../HomeFooter";
function NextArrow(props) {
  const { className, style, onClick, currentSlide, slideCount, slidesToShow } =
    props;
  if (currentSlide >= slideCount - slidesToShow) {
    return null;
  }
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 8px #ccc",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronRight} color="#333" size="lg" />
    </div>
  );
}
function PrevArrow(props) {
  const { className, style, onClick, currentSlide } = props;
  if (currentSlide === 0) return null;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 8px #ccc",
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faChevronLeft} color="#333" size="lg" />
    </div>
  );
}
class HomePage extends Component {
  state = {};

  componentDidMount() {}

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: true,
      nextArrow: <NextArrow slidesToShow={4} />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />;
        <About />
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
