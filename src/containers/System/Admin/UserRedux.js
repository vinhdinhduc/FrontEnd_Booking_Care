import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as action from "../../../store/actions";
import "../HomePage/HomePage.scss";
import { getAllCodeService } from "../../../services/userService";
import { languages } from "../../../utils";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      avatar: null,
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();

    // let res = await getAllCodeService("GENDER");
    // if (res && res.errCode === 0) {
    //   this.setState({
    //     arrCode: res.data,
    //   });
    // }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
  }
  handleOnchangeImage = (event) => {
    let file = event.target.files[0];
    if (!file) return;
    let objectUrl = URL.createObjectURL(file);

    this.setState({
      previewImgURL: objectUrl,
      avatar: file,
    });
  };
  handleClickOpen = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    const { language } = this.props;
    console.log("Check array code", this.state.genderArr);
    let arrResult = this.state.genderArr;
    let arrPosition = this.state.positionArr;
    let arrRole = this.state.roleArr;

    return (
      <div className="user-redux-container">
        <div className="title">User Redux Duc Vinh</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="col-12 my-3">
              <h4>
                <FormattedMessage id="user-redux.add" />
              </h4>
            </div>
            <form>
              <div className="row my-3">
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="user-redux.email" />
                  </label>
                  <input type="Email" className="form-control" />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="user-redux.password" />
                  </label>
                  <input type="Password" className="form-control" />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="user-redux.firstName" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    <FormattedMessage id="user-redux.lastName" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row">
                <div className="col-3 ">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.phone" />
                  </label>
                  <input type="number" className="form-control" />
                </div>
                <div className="col-9">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.address" />
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-3 ">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.gender" />
                  </label>
                  <select name="" id="" className="form-control">
                    {" "}
                    {arrResult &&
                      arrResult.length > 0 &&
                      arrResult.map((item, index) => (
                        <option key={index}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.role" />
                  </label>
                  <select name="" id="" className="form-control">
                    {arrPosition &&
                      arrPosition.length > 0 &&
                      arrPosition.map((item, index) => (
                        <option key={index}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>{" "}
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.position" />
                  </label>
                  <select name="" id="" className="form-control">
                    {" "}
                    {arrRole &&
                      arrRole.length > 0 &&
                      arrRole.map((item, index) => (
                        <option key={index}>
                          {language === languages.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      ))}
                  </select>{" "}
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="user-redux.image" />
                  </label>
                  <div className="input-image-container">
                    <label htmlFor="inputType" className="load-image">
                      Tải ảnh
                    </label>
                    <input
                      id="inputType"
                      type="file"
                      className="form-control"
                      hidden
                      onChange={this.handleOnchangeImage}
                    />
                    <div
                      className="imagePreview"
                      style={{
                        backgroundImage: `url("${this.state.previewImgURL}")`,
                      }}
                      onClick={() => this.handleClickOpen()}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-3 w">
                  <button className="btn btn-primary btn-lg ">
                    {" "}
                    <FormattedMessage id="user-redux.save" />
                  </button>
                </div>
                {this.state.isOpen && (
                  <Lightbox
                    mainSrc={this.state.previewImgURL}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
    getRoleStart: () => dispatch(action.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
