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
import { createNewClinic } from "../../services/userService";
import "./ManageClinic.scss";
import { languages, CommonUtils } from "../../utils";
import { Modal } from "reactstrap";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

// import { CommonUtils } from "../../utils/CommonUtils";
import { NumericFormat } from "react-number-format";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imgBase64: "",
      address: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      previewImage: "",
    };
  }
  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
    this.fileInputRef = createRef();
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;

    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objUrl = URL.createObjectURL(file);
      this.setState({
        imgBase64: base64,
        previewImage: objUrl,
      });
    }
  };

  clearFileInput = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }
    this.setState({
      imgBase64: "",
      previewImage: "",
    });
  };
  validateInput = () => {
    let requiredFields = [
      { key: "name", message: "Vui lòng nhập tên phòng khám !" },
      { key: "imgBase64", message: "Vui lòng chọn ảnh phòng khám!" },
      { key: "address", message: "Vui lòng nhập địa chỉ phòng khám!" },
      { key: "descriptionHTML", message: "Vui lòng nhập mô tả phòng khám!" },
    ];

    for (let field of requiredFields) {
      let value = this.state[field.key];

      if (!value) {
        alert(field.message);
        return false;
      }
    }
    return true;
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleSaveNewClinic = async () => {
    let data = {
      name: this.state.name,
      imgBase64: this.state.imgBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      address: this.state.address,
    };
    if (this.validateInput()) {
      let res = await createNewClinic(data);

      if (res && res.errCode === 0) {
        toast.success("Add new clinic succeeds!");
        this.setState({
          name: "",
          imgBase64: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          previewImage: "",
          address: "",
        });

        this.clearFileInput();
      } else {
        toast.error("Add new clinic fails!");
      }
    }
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="title1">
          <h3>Quản lý phòng khám</h3>
        </div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label htmlFor="name">Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              id="name"
              value={this.state.name}
              placeholder="Nhập tên phòng khám..."
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label htmlFor="file">Ảnh phòng khám</label>
            <input
              id="file"
              ref={this.fileInputRef}
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
            {this.state.previewImage && (
              <div className="image-preview">
                <img
                  src={this.state.previewImage}
                  alt="Preview"
                  className="preview-img"
                />
                <button
                  type="button"
                  className="btn-remove-image"
                  onClick={this.clearFileInput}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            )}
          </div>
          <div className="col-12 form-group">
            <label htmlFor="address">Địa chỉ phòng khám</label>
            <input
              id="address"
              className="form-control"
              type="text"
              value={this.state.address}
              placeholder="Nhập địa chỉ phòng khám..."
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>

          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
              placeholder="Nhập mô tả chi tiết về chuyên khoa..."
            />
          </div>
          <div className="col-12">
            <button
              className="btn-save-new-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              Save
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
