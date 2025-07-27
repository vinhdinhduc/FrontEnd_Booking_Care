import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "slick-carousel/slick/slick.css";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick-theme.css";
import * as action from "../../../store/actions";
import "../HomePage/HomePage.scss";
import { languages, CRUD_ACTIONS, CommonUtils } from "../../../utils";

import TableUserRedux from "../TableUserRedux";
import "./UserRedux.scss";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actions: "",
      userEditId: "",
      isOpen: false,
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      avatar: null,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    this.props.getUsers();
    // this.props.editUserRedux({});

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
        gender:
          this.props.genderRedux && this.props.genderRedux.length > 0
            ? this.props.genderRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
        position:
          this.props.positionRedux && this.props.positionRedux.length > 0
            ? this.props.positionRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
        role:
          this.props.roleRedux && this.props.roleRedux.length > 0
            ? this.props.roleRedux[0].keyMap
            : "",
      });
    }
    if (prevProps.usersRedux !== this.props.usersRedux) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender:
          this.state.genderArr.length > 0 ? this.state.genderArr[0].keyMap : "",
        position:
          this.state.positionArr.length > 0
            ? this.state.positionArr[0].keyMap
            : "",
        role: this.state.roleArr.length > 0 ? this.state.roleArr[0].keyMap : "",
        actions: CRUD_ACTIONS.CREATE,
        previewImgURL: "",
        avatar: "",
      });
    }
  }
  handleOnchangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);

      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };
  handleClickOpen = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };
  checkValidInput = () => {
    const arrInput = ["email", "password", "firstName", "lastName", "address"];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };

  handleDeleteUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }
    this.setState({
      userEditId: user.id,
      actions: CRUD_ACTIONS.EDIT,
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImgURL: imageBase64,
    });
  };
  handleSaveUser = () => {
    let isValid = this.checkValidInput();
    if (isValid === false) return;
    let { actions } = this.state;
    if (actions === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (actions === CRUD_ACTIONS.EDIT) {
      this.props.editUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phoneNumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  render() {
    const { language, usersRedux } = this.props;

    let arrResult = this.state.genderArr;
    let arrPosition = this.state.positionArr;
    let arrRole = this.state.roleArr;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
    } = this.state;
    return (
      <>
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
                    <input
                      type="Email"
                      className="form-control"
                      value={email}
                      disabled={this.state.actions === CRUD_ACTIONS.EDIT}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="">
                      <FormattedMessage id="user-redux.password" />
                    </label>
                    <input
                      type="Password"
                      className="form-control"
                      value={password}
                      disabled={this.state.actions === CRUD_ACTIONS.EDIT}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "password")
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="">
                      <FormattedMessage id="user-redux.firstName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={firstName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "firstName")
                      }
                    />
                  </div>
                  <div className="col-3">
                    <label htmlFor="">
                      <FormattedMessage id="user-redux.lastName" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={lastName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "lastName")
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-3 ">
                    <label htmlFor="">
                      {" "}
                      <FormattedMessage id="user-redux.phone" />
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-9">
                    <label htmlFor="">
                      {" "}
                      <FormattedMessage id="user-redux.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-3 ">
                    <label htmlFor="">
                      {" "}
                      <FormattedMessage id="user-redux.gender" />
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={gender}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "gender")
                      }
                    >
                      {" "}
                      {arrResult &&
                        arrResult.length > 0 &&
                        arrResult.map((item, index) => (
                          <option key={index} value={item.keyMap}>
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
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={role}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "role")
                      }
                    >
                      {arrRole &&
                        arrRole.length > 0 &&
                        arrRole.map((item, index) => (
                          <option key={index} value={item.keyMap}>
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
                    <select
                      name=""
                      id=""
                      className="form-control"
                      value={position}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "position")
                      }
                    >
                      {" "}
                      {arrPosition &&
                        arrPosition.length > 0 &&
                        arrPosition.map((item, index) => (
                          <option key={index} value={item.keyMap}>
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
                    <button
                      type="button"
                      className={
                        this.state.actions === CRUD_ACTIONS.EDIT
                          ? "btn btn-warning"
                          : "btn btn-primary btn-lg "
                      }
                      onClick={(event) => this.handleSaveUser(event)}
                    >
                      {" "}
                      {this.state.actions === CRUD_ACTIONS.EDIT ? (
                        <FormattedMessage id="user-redux.edit" />
                      ) : (
                        <FormattedMessage id="user-redux.add" />
                      )}
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
        <TableUserRedux
          handleDeleteUserFromParent={this.handleDeleteUserFromParent}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    usersRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(action.fetchGenderStart()),
    getPositionStart: () => dispatch(action.fetchPositionStart()),
    getRoleStart: () => dispatch(action.fetchRoleStart()),
    getUsers: () => dispatch(action.fetchAllUsersStart()),
    createNewUser: (data) => dispatch(action.createNewUser(data)),
    editUserRedux: (data) => dispatch(action.editUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
