import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import HomeHeader from "../../Header/HomeHeader";
import { getExtraInfoById } from "../../../services/userService";
import "react-markdown-editor-lite/lib/index.css";
import * as action from "../../../store/actions";

import "./DoctorExtraInfo.scss";
import { NumericFormat } from "react-number-format";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DoctorExtraInfo: {},
      isShowInfo: false,
      extraInfo: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInfoById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  handleShowHideInfo = (status) => {
    this.setState({
      isShowInfo: status,
    });
  };
  render() {
    let { isShowInfo, extraInfo } = this.state;
    console.log("Check extrainfo", extraInfo);

    let { language } = this.props;
    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <span>
              <FormattedMessage id="patient.extra-info-doctor.text-address" />
            </span>
          </div>
          <div className="name-clinic">
            <p>
              {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
            </p>
          </div>
          <div className="detail-address">
            <p>
              {" "}
              <p>
                {extraInfo && extraInfo.addressClinic
                  ? extraInfo.addressClinic
                  : ""}
              </p>
            </p>
          </div>
        </div>
        <div className="content-down">
          {isShowInfo === false && (
            <div className="short-info">
              <FormattedMessage id="patient.extra-info-doctor.price" />
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === languages.VI && (
                  <NumericFormat
                    className="currency"
                    value={extraInfo.priceTypeData.valueVi}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"VND"}
                  />
                )}
              {extraInfo &&
                extraInfo.priceTypeData &&
                language === languages.EN && (
                  <NumericFormat
                    className="currency"
                    value={extraInfo.priceTypeData.valueEn}
                    displayType={"text"}
                    thousandSeparator={true}
                    suffix={"$"}
                  />
                )}

              <span onClick={() => this.handleShowHideInfo(true)}>
                <FormattedMessage id="patient.extra-info-doctor.detail" />
              </span>
            </div>
          )}
          {isShowInfo === true && (
            <>
              <div className="title-price">
                <FormattedMessage id="patient.extra-info-doctor.price" />
              </div>
              <div className="detail-info">
                <div className="price">
                  <span className="left">
                    {" "}
                    <FormattedMessage id="patient.extra-info-doctor.price" />
                  </span>
                  <span className="right">
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === languages.VI && (
                        <NumericFormat
                          className="currency"
                          value={extraInfo.priceTypeData.valueVi}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"VND"}
                        />
                      )}
                    {extraInfo &&
                      extraInfo.priceTypeData &&
                      language === languages.EN && (
                        <NumericFormat
                          className="currency"
                          value={extraInfo.priceTypeData.valueEn}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"$"}
                        />
                      )}
                  </span>
                </div>
                <div className="note">
                  {extraInfo && extraInfo.note ? extraInfo.note : ""}
                </div>
                <div className="payment">
                  <FormattedMessage id="patient.extra-info-doctor.payment" />
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === languages.VI
                    ? extraInfo.paymentTypeData.valueVi
                    : ""}
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === languages.EN
                    ? extraInfo.paymentTypeData.valueEn
                    : ""}
                </div>
                <div className="hide-price">
                  <span onClick={() => this.handleShowHideInfo(false)}>
                    <FormattedMessage id="patient.extra-info-doctor.hide-price" />
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
