import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPen,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import LoadingOverlay from "react-loading-overlay";
import { CommonUtils } from "../utils";
import "./ModalRemedy.scss";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalRemedy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
    if (this.props.language !== prevProps.language) {
    }
  }

  toggle = () => {
    this.props.toggle();
  };
  handleOnChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handleOnchangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { email } = this.state;

    return (
      <div className="modal-remedy-container">
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.toggle}
          size="lg"
          style={{ zIndex: 1 }}
        >
          <ModalHeader>
            <span> Gửi thông tin khám bệnh</span>{" "}
            <button className="custom-close" onClick={this.toggle}>
              &times;
            </button>
          </ModalHeader>
          <ModalBody>
            <div className="row form-group">
              <div className="col-6">
                <label htmlFor="">Email người bệnh</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={(event) => this.handleOnChange(event)}
                  value={email}
                />
              </div>
              <div className="col-6">
                <label htmlFor="">Chọn hoá đơn</label>
                <input
                  type="file"
                  className="form-control file"
                  onChange={(event) => this.handleOnchangeImage(event)}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Đóng
            </Button>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Xác nhận
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemedy);
