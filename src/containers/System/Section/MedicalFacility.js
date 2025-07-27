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

import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import "../HomePage/HomePage.scss";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();

    if (res && res.errCode === 0) {
      this.setState({
        listClinic: res.data ? res.data : [],
      });
    }
  }
  handleNavigationDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let { listClinic } = this.state;

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
              {listClinic &&
                listClinic.length > 0 &&
                listClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleNavigationDetailClinic(item)}
                    >
                      <div
                        className="bg-image medical-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      />
                      <div className="section-text">{item.name}</div>
                    </div>
                  );
                })}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
