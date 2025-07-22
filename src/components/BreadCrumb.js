import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import "./Breadcrumb.scss";

class Breadcrumb extends Component {
  render() {
    const { items, language } = this.props;

    return (
      <nav className="breadcrumb-container">
        <div className="breadcrumb-wrapper">
          {items &&
            items.length > 0 &&
            items.map((item, index) => {
              return (
                <span key={index} className="breadcrumb-item">
                  {item === 0 && <FontAwesomeIcon icon={faHome} />}

                  {item.path ? (
                    <Link to={item.path} className="breadcrumb-link">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="breadcrumb-current">{item.label}</span>
                  )}
                  {index < item.length - 1 && (
                    <span className="breadcrumb-separator"> / </span>
                  )}
                </span>
              );
            })}
        </div>
      </nav>
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
export default Breadcrumb;
