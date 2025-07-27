import React, { Component, createRef } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "react-markdown-editor-lite/lib/index.css";
import * as action from "../../store/actions/adminAction";
import Select from "react-select";
import { languages } from "../../utils/constant";
import { CRUD_ACTIONS } from "../../utils";
import {
  getDetailDoctorById,
  bulkCreateSchedule,
} from "../../services/userService";
import DatePicker from "../../components/Input/DatePicker";
import moment from "moment";
import { dateFormat } from "../../utils/constant";
import _ from "lodash";
import { toast } from "react-toastify";
import "./ManageSchedule.scss";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
      isSelected: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorsRedux !== this.props.listDoctorsRedux) {
      let dataSelect = this.buildDataInput(this.props.listDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.alltimeRedux !== this.props.alltimeRedux) {
      let data = this.props.alltimeRedux;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInput = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        object.label = language === languages.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  handleChangeSelect = async (selectedOption) => {
    this.setState({
      selectedDoctor: selectedOption,
    });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  // handleClickTime = (time) => {
  //   let { rangeTime } = this.state;
  //   console.log("check rangtime", rangeTime);

  //   if (rangeTime && rangeTime.length > 0) {
  //     rangeTime.map((item) => {
  //       if (item.id === time.id) item.isSelected = !item.isSelected;

  //       return item;
  //     });
  //     this.setState({
  //       rangeTime: rangeTime,
  //     });
  //   }
  // };
  handleClickTime = (time) => {
    this.setState((prevState) => {
      const rangeTimeCopy = prevState.rangeTime.map((item) => {
        if (item.id === time.id) {
          return { ...item, isSelected: !item.isSelected };
        }
        return item;
      });
      return { rangeTime: rangeTimeCopy };
    });
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }

    let formatedDate = moment(currentDate).startOf("day").valueOf();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }
    }
    let finalData = {
      arrSchedule: result,
      formatedDate: formatedDate,
      doctorId: selectedDoctor.value,
    };
    let res = await bulkCreateSchedule(finalData);
    if (res && res.errCode === 0) {
      toast.success("Thêm thông tin thành công");
    }
  };

  render() {
    const { alltimeRedux, language } = this.props;
    const { rangeTime } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <>
        <div className="manage-schedule-container">
          <div className="title-header">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row ">
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={`btn btn-schedule ${
                          item.isSelected === true ? "active" : ""
                        }`}
                        key={index}
                        onClick={() => this.handleClickTime(item)}
                      >
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button
                  className="btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorsRedux: state.admin.allDoctors,
    alltimeRedux: state.admin.allTimeSchedule,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
    fetchAllScheduleTime: () => dispatch(action.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
