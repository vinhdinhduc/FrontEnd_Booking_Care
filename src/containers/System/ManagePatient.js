import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { createNewClinic } from "../../services/userService";
import "./ManagePatient.scss";
import { languages, CommonUtils } from "../../utils";
import { Modal } from "reactstrap";
import DatePicker from "../../components/Input/DatePicker";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

// import { CommonUtils } from "../../utils/CommonUtils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date,
    });
  };

  render() {
    return (
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
                  <th>Giờ khám</th>
                  <th>Thông tin bệnh nhân</th>
                  <th>Liên hệ</th>
                  <th>Lý do khám</th>
                  <th>Trạng thái</th>
                  <th>Ghi chú</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>dđ</td>
                  <td>
                    <div className="time-slot">dđ</div>
                  </td>
                  <td>
                    <div className="patient-info">
                      <div className="patient-name">ddd</div>
                      <div className="patient-details">
                        <span>dđ</span>
                        <span>cdd tuổi</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="phone">
                        <FontAwesomeIcon icon={faPhone} /> ddd
                      </div>
                      <div className="email">
                        <FontAwesomeIcon icon={faEnvelope} /> ddđ
                      </div>
                    </div>
                  </td>
                  <td>sssd</td>
                  <td>
                    <span>sxdd</span>
                  </td>
                  <td>
                    <div className="notes"></div>
                  </td>
                  <td>sđ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
