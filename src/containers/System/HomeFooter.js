import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./HomePage/HomePage.scss";

class HomeFooter extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="home-footer">
        <span>&copy; Đức Vình. All rights reverse</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
