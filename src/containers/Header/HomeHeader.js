import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as actions from "../../store/actions";
import { FormattedMessage, injectIntl } from "react-intl";
import "./HomeHeader.scss";
import {
  faBars,
  faBriefcase,
  faFlask,
  faHospital,
  faMobile,
  faProcedures,
  faQuestion,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { languages } from "../../utils";
import { changeLanguage } from "../../store/actions";

class HomeHeader extends Component {
  handleChangLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };
  render() {
    let language = this.props.language;
    console.log("check languae", language);

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <FontAwesomeIcon icon={faBars} className="menu-bar" />
              <div className="header-logo">ĐỨC VÌNH</div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />{" "}
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeheader.check-health" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <FontAwesomeIcon icon={faQuestion} />{" "}
                <FormattedMessage id="homeheader.support" />
              </div>

              <div
                className={
                  language === languages.VI
                    ? "language-vi active"
                    : "language-vi "
                }
              >
                <span onClick={() => this.handleChangLanguage(languages.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === languages.EN
                    ? "language-en active"
                    : "language-en "
                }
              >
                <span onClick={() => this.handleChangLanguage(languages.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-banner-header">
          <div className="content-up">
            <div className="banner-title">
              <h1>
                <FormattedMessage id="banner.title1" />{" "}
              </h1>
            </div>
            <div className="banner-title">
              <h1>
                {" "}
                <FormattedMessage id="banner.title2" />
              </h1>
            </div>
            <div className="banner-search">
              <div className="icon-search">
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div>
                <FormattedMessage id="banner.searchPlaceholder">
                  {(placeholder) => (
                    <input type="text" placeholder={placeholder} />
                  )}
                </FormattedMessage>
              </div>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faHospital} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faMobile} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faProcedures} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faFlask} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <FontAwesomeIcon icon={faBriefcase} />
                </div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
