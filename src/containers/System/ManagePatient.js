import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { createNewClinic } from "../../services/userService";
import "./ManagePatient.scss";
import { languages, CommonUtils } from "../../utils";
import { Modal } from "reactstrap";
import DatePicker from "../../components/Input/DatePicker";
import {
  getPatientAppointment,
  postSendRemedy,
} from "../../services/userService";
// import { CommonUtils } from "../../utils/CommonUtils";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";

import ModalRemedy from "../../components/ModalRemedy";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModal: false,
      dataModal: {},
      isLoading: false,
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }

    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        dataModal: this.props.dataModal,
      });
    }
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let doctorId = user.id;
    let date = new Date(this.state.currentDate).getTime();
    let res = await getPatientAppointment(doctorId, date);
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date,
      },
      () => {
        let { user } = this.props;
        let doctorId = user.id;
        let date = new Date(this.state.currentDate).getTime();
        this.getDataPatient(doctorId, date);
      }
    );
  };
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,

      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.lastName,
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
  };
  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isLoading: false,
        isOpenModal: false,
      });
      toast.success("Send remedy succeed");

      await this.getDataPatient();
    } else {
      toast.error("Send remedy fail!");
      this.setState({
        isLoading: false,
        isOpenModal: false,
      });
    }
  };

  render() {
    let { dataPatient, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isLoading}
          spinner
          text="Đang gửi dữ liệu..."
          styles={{
            overlay: (base) => ({
              ...base,
              zIndex: 1060,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            }),
          }}
        >
          <div className="manage-patient-container">
            <div className="title1">
              <h3>Quản lý bệnh nhân khám bệnh</h3>
            </div>
            <div className="manage-patient-body">
              <div className="col-4 form-group">
                <label htmlFor="">Chọn ngày khám </label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Họ đệm</th>
                      <th>Tên</th>
                      <th>Giới tính</th>
                      <th>Địa chỉ</th>
                      <th>Lý do khám</th>
                      <th>Thời gian</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let gender =
                          language === languages.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;

                        let time =
                          language === languages.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.lastName}</td>
                            <td>{gender}</td>
                            <td>{item.patientData.address}</td>
                            <td>{}</td>
                            <td className="time-slot">{time}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => this.handleConfirm(item)}
                              >
                                Xác nhận
                              </button>
                              <button className="btn btn-primary">
                                Gửi hoá đơn
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="no-data" colSpan={8}>
                          {" "}
                          Không có dữ liệu!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <ModalRemedy
            isOpen={this.state.isOpenModal}
            toggle={this.toggleModal}
            dataModal={dataModal}
            sendRemedy={this.sendRemedy}
            isLoading={this.state.isLoading}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
