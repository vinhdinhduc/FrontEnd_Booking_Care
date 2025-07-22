import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faHandPointUp,
  faPen,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import * as action from "../../../store/actions";
// import localization from "moment/local/vi";
import "./DoctorSchedule.scss";
import "moment/locale/vi";
import { dateFormat, languages } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import BookingModal from "../BookingModal.js";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.setArrays(language);

    if (this.props.doctorIdFromParent) {
      let allDays = this.setArrays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
        allDays: allDays,
      });
    } else {
      this.setState({ allDays });
    }
  }
  setArrays = (language) => {
    let allDays = [];
    // const toDay = moment().startOf("days");
    for (let i = 0; i < 7; i++) {
      let object = {};
      let dayMoment = moment().add(i, "days");
      const isToday = dayMoment.startOf("day").isSame(moment(), "day");
      if (language === languages.VI) {
        dayMoment.locale("vi");
        if (isToday) {
          object.label = `Hôm nay - ${dayMoment.format("DD/MM")}`;
        } else {
          const dayName = dayMoment.format("dddd");
          const capitalizedDayName = dayName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
          object.label = `${capitalizedDayName} - ${dayMoment.format("DD/MM")}`;
        }
      } else {
        dayMoment.locale("en");
        if (isToday) {
          object.label = `Today - ${dayMoment.format("DD/MM")}`;
        } else {
          object.label = dayMoment.format("dddd - DD/MM");
        }
      }

      object.value = dayMoment.startOf("day").valueOf();
      allDays.push(object);
    }

    return allDays;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.setArrays(this.props.language);
      this.setState({ allDays: allDays });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.setArrays(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      }

      console.log("check res schedule", res);
    }
  };
  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
    console.log("Check time modal", time);
  };
  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let {
      allDays,
      allAvalableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    console.log("check alldat", allDays);

    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="choose-time">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="calendar">
            <FontAwesomeIcon className="calendar_icon" icon={faCalendarAlt} />
            <span className="calendar_title">
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="all-available-time">
            {allAvalableTime && allAvalableTime.length > 0 ? (
              <>
                {" "}
                <div className="time-content-btns">
                  {allAvalableTime.map((item, index) => {
                    let timeDisplay =
                      language === languages.VI
                        ? item.timeTypeDate.valueVi
                        : item.timeTypeDate.valueEn;
                    return (
                      <button
                        className={
                          language === languages.VI
                            ? " btn-schedule btn-vi"
                            : " btn-schedule btn-en"
                        }
                        onClick={() => this.handleClickScheduleTime(item)}
                        key={index}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <p>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <FontAwesomeIcon icon={faHandPointUp} />
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </p>
                </div>
              </>
            ) : (
              <div>
                <span>
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </span>
              </div>
            )}
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
