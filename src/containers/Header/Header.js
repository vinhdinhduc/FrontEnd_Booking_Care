import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";

import { languages } from "../../utils";
import "./Header.scss";
import { FormattedMessage } from "react-intl";

class Header extends Component {
  handleChangeLanguage = (languages) => {
    this.props.changeLanguage(languages);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    console.log("check userinfo", userInfo);

    return (
      <div className="header-container ">
        {/* thanh navigator */}
        <div className="header-tabs-container ml-5">
          <Navigator menus={adminMenu} />
        </div>
        <div className="language">
          <div className="welcome">
            <FormattedMessage id="homeheader.welcome" />,{" "}
            {userInfo ? userInfo.lastName : ""}
          </div>
          <div
            className={
              language === languages.VI ? "language-vi active" : "language-vi"
            }
            onClick={() => this.handleChangeLanguage(languages.VI)}
          >
            VN
          </div>
          <div
            className={
              language === languages.EN ? "language-en active" : "language-en"
            }
            onClick={() => this.handleChangeLanguage(languages.EN)}
          >
            EN
          </div>
          <div className="btn btn-logout mr4" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>

        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
