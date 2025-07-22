import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPen,
  faPlus,
  faSpinner,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "../../components/Input/DatePicker";
import Select from "react-select";
import * as actions from "../../store/actions";
import "./BookingModal.scss";

import { postPatientBookAppointment } from "../../services/userService";
import ProfileDoctor from "./ProfileDoctor";
import { Modal } from "reactstrap";
import _ from "lodash";
import { FormattedMessage } from "react-intl";
import { languages } from "../../utils";
import { toast } from "react-toastify";
import moment from "moment";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      doctorId: "",
      genders: "",
      timeType: "",
      isSubmitting: false,
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let { language } = this.props;

    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === languages.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };

  handleOnChangeInput = (event, id) => {
    let inputValue = event.target.value;
    let copyState = { ...this.state };

    copyState[id] = inputValue;

    this.setState({ ...copyState });
  };

  handleOnChangeDataPicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleOnChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }
  buildTimeBooking = (dataTime) => {
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
    return `${time}, ${date}`;
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === languages.VI
          ? `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`
          : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;

      return name;
    }
    return "";
  };
  handleConfirmBooking = async () => {
    this.setState({
      isSubmitting: true,
    });
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      birthday: this.state.birthday,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      genders: this.state.genders,
      timeType: this.state.timeType,
      date: date,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment successfully!");

      this.props.closeBookingModal();
    } else {
      toast.error("Booking a new appointment error");
    }
    this.setState({
      isSubmitting: false,
    });
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;

    let { isSubmitting } = this.state;

    let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : "";

    console.log("check datatime booking modal", dataTime);
    return (
      <Modal
        isOpen={isOpenModal}
        className="booking-modal-container"
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <span className="left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>
            <span className="right" onClick={closeBookingModal}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-info">
              <ProfileDoctor
                doctorId={doctorId}
                dataTime={dataTime}
                isShowDescription={false}
                isShowLinkDetail={false}
                isShowPrice={true}
              />
            </div>
            <div className="price"></div>
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.fullName}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "fullName")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.phoneNumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.address}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "address")
                  }
                />
              </div>
              <div className="col-12 form-group">
                <label htmlFor="">
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={this.state.reason}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "reason")
                  }
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  value={this.state.birthday}
                  onChange={this.handleOnChangeDataPicker}
                  className="form-control"
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleOnChangeSelect}
                  options={this.state.genders}
                />
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button
              className="btn booking-confirm"
              onClick={() => this.handleConfirmBooking()}
            >
              {isSubmitting === true ? (
                <>
                  <FontAwesomeIcon className="spinner" icon={faSpinner} /> Đang
                  gửi{" "}
                </>
              ) : (
                <FormattedMessage id="patient.booking-modal.btnConfirm" />
              )}
            </button>
            <button className="btn booking-cancel" onClick={closeBookingModal}>
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
