import React, { Component, createRef } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as action from "../../store/actions/adminAction";
import Select from "react-select";
import { languages } from "../../utils/constant";
import { CRUD_ACTIONS } from "../../utils/constant";
import { getDetailDoctorById } from "../../services/userService";
import "./ManageDoctors.scss";

const mdParser = new MarkdownIt();

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class ManageDoctors extends Component {
  constructor(props) {
    super(props);
    this.addUserModalRef = createRef();
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctors: [],
      hasOldData: false,
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorsRedux !== this.props.listDoctorsRedux) {
      let dataSelect = this.buildDataInput(this.props.listDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(this.props.listDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleOnChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    console.log("Check selected option", selectedOption);
    let res = await getDetailDoctorById(selectedOption.value);
    if (res && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("Check response", res);
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });

    console.log("check state: ", this.state);
  };
  render() {
    console.log("check props from manage doctor: ", this.props);
    let { listDoctorsRedux } = this.props;
    let { hasOldData } = this.state;

    console.log("check list doctors: ", listDoctorsRedux);
    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <h2>Quản lý bác sĩ</h2>
          </div>
          <div className="more-info">
            <div className="content-left form-group">
              <label>Chọn bác sĩ</label>
              <Select
                className="select-doctor"
                placeholder="Chọn bác sĩ"
                onChange={this.handleOnChangeSelect}
                value={this.state.selectedOption}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right">
              <label htmlFor="">Thông tin giới thiệu:</label>
              <textarea
                name=""
                id=""
                className="form-control"
                rows="4"
                onChange={(event) => this.handleOnChangeDesc(event)}
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>
          <button
            className={
              hasOldData === true ? "btn-save-info" : "btn-create-info"
            }
            onClick={() => this.handleSaveContentMarkdown()}
          >
            {hasOldData === true ? (
              <span>Lưu thông tin</span>
            ) : (
              <span>Tạo thông tin</span>
            )}
          </button>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listDoctorsRedux: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
    saveDetailDoctor: (inputData) =>
      dispatch(action.saveDetailDoctor(inputData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
