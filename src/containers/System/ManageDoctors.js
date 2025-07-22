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
      ///Markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: null,
      description: "",
      listDoctors: [],
      hasOldData: false,

      //doctor info table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyId: "",
      clinicId: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInput = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;

          let labelEn = `${item.lastName} ${item.firstName}`;

          object.label = language === languages.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn} USD`;

          obj.label = language === languages.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn} `;

          obj.label = language === languages.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listDoctorsRedux !== this.props.listDoctorsRedux) {
      let dataSelect = this.buildDataInput(
        this.props.listDoctorsRedux,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInput(
        this.props.listDoctorsRedux,
        "USERS"
      );
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredInfoDoctor;
      let dataSelectPrice = this.buildDataInput(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInput(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInput(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInput(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInput(resClinic, "CLINIC");

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
    if (prevProps.allRequiredInfoDoctor !== this.props.allRequiredInfoDoctor) {
      const { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredInfoDoctor;
      let dataSelectPrice = this.buildDataInput(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInput(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInput(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInput(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInput(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
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
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;
    let res = await getDetailDoctorById(selectedOption.value);

    if (res && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        specialtyId = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }
      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
    }
  };
  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };
  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
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

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      specialtyId: this.state.selectedSpecialty.value,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
    });

    console.log("check state: ", this.state);
  };
  render() {
    let { listDoctorsRedux, allRequiredInfoDoctor } = this.props;
    console.log("Check allRequired", allRequiredInfoDoctor);

    let { hasOldData } = this.state;

    return (
      <>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <h2>
              <FormattedMessage id="admin-manage-doctor.title" />
            </h2>
          </div>
          <div className="more-info">
            <div className="content-left form-group">
              <label>
                {" "}
                <FormattedMessage id="admin-manage-doctor.select-doctor" />
              </label>
              <Select
                className="select-doctor"
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.select-doctor" />
                }
                onChange={this.handleOnChangeSelect}
                value={this.state.selectedOption}
                options={this.state.listDoctors}
              />
            </div>
            <div className="content-right">
              <label htmlFor="">
                {" "}
                <FormattedMessage id="admin-manage-doctor.intro" />
              </label>
              <textarea
                name=""
                id=""
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-info-extra row">
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPrice}
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.price" />
                }
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listPayment}
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.payment" />
                }
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectedProvince}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.province" />
                }
                name="selectedProvince"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.nameClinic" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "nameClinic")
                }
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.addressClinic" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.note" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeText(event, "note")}
                value={this.state.note}
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.specialty" />
              </label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listSpecialty}
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.specialty" />
                }
                name="selectedSpecialty"
              />
            </div>
            <div className="col-4 form-group">
              <label htmlFor="">
                <FormattedMessage id="admin-manage-doctor.clinic" />
              </label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelectDoctorInfo}
                options={this.state.listClinic}
                placeholder={
                  <FormattedMessage id="admin-manage-doctor.clinic" />
                }
                name="selectedClinic"
              />
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
              <span>
                <FormattedMessage id="admin-manage-doctor.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin-manage-doctor.add" />
              </span>
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
    allRequiredInfoDoctor: state.admin.allRequiredInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(action.fetchAllDoctors()),
    getAllRequiredDoctorInfo: () => dispatch(action.fetchRequiredDoctorInfo()),
    saveDetailDoctor: (inputData) =>
      dispatch(action.saveDetailDoctor(inputData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctors);
