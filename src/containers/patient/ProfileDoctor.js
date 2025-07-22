import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPen,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { getProfileDoctorById } from "../../services/userService";
import "./ProfileDoctor.scss";
import { languages } from "../../utils";

import { Modal } from "reactstrap";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorId) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      this.getInfoDoctor(this.props.doctorId);
    }
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);

      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBookingModal = (dataTime) => {
    let { language } = this.props;
    let time =
      language === languages.VI
        ? dataTime.timeTypeDate.valueVi
        : dataTime.timeTypeDate.valueEn;

    let date = "";
    if (dataTime.date) {
      let dayMoment = moment(dataTime.date).locale(
        language === languages.VI ? "vi" : "en"
      );
      let dayName = dayMoment.format("dddd");
      let capitalizedDayName = dayName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      date = `${capitalizedDayName} - ${dayMoment.format("DD/MM/YYYY")}`;
    }

    return (
      <>
        <div>
          {time} - {date}
        </div>
      </>
    );
  };

  render() {
    let {
      doctorId,
      isShowDescription,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
    } = this.props;

    let { dataProfile } = this.state;

    let { language } = this.props;

    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === languages.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescription === true ? (
                <>
                  {dataProfile &&
                    dataProfile.Markdown &&
                    dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                </>
              ) : (
                <>{this.renderTimeBookingModal(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <FormattedMessage id="patient.extra-info-doctor.price" />
            {": "}
            {dataProfile.Doctor_Info &&
              dataProfile.Doctor_Info.priceTypeData &&
              language === languages.VI && (
                <NumericFormat
                  className="currency"
                  value={dataProfile.Doctor_Info.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"VND"}
                />
              )}
            {dataProfile.Doctor_Info &&
              dataProfile.Doctor_Info.priceTypeData &&
              language === languages.EN && (
                <NumericFormat
                  className="currency"
                  value={dataProfile.Doctor_Info.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={"$"}
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
