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

import "./DetailSpecialty.scss";
import {
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import HomeHeader from "../../Header/HomeHeader";
import ProfileDoctor from "../ProfileDoctor";
import DoctorSchedule from "../doctor/DoctorSchedule";
import DoctorExtraInfo from "../doctor/DoctorExtraInfo";
import Breadcrumb from "../../../components/BreadCrumb";
import _ from "lodash";
import { languages } from "../../../utils";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: [],
      listProvinces: [],
      isShowFullDescription: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      console.log("check res", res);
      console.log("check resPronvince", resProvince);

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueVi: "Toàn quốc",
            valueEn: "All",
          });
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          dataDetailSpecialty: res.data,
          listProvinces: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });
      let resProvince = await getAllCodeService("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item, index) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          arrDoctorId: arrDoctorId,
          dataDetailSpecialty: res.data,
        });
      }
    }
  };
  handleShowDescription = () => {
    this.setState({
      isShowFullDescription: !this.state.isShowFullDescription,
    });
  };
  getBreadcrumbItems = () => {
    const { language } = this.props;
    const { dataDetailSpecialty } = this.state;

    const items = [
      {
        label: language === languages.VI ? "Trang chủ" : "Home",
        path: "/home",
      },
      {
        label:
          language === languages.VI ? "Khám chuyên khoa" : "Medical Specialty",
        path: "/specialty",
      },
    ];

    // Thêm tên chuyên khoa hiện tại (không có link)
    if (dataDetailSpecialty && dataDetailSpecialty.name) {
      items.push({
        label: dataDetailSpecialty.name,
        path: null, // Trang hiện tại không có link
      });
    }

    return items;
  };

  render() {
    let {
      arrDoctorId,
      dataDetailSpecialty,
      listProvinces,
      isShowFullDescription,
    } = this.state;
    console.log("Check state", this.state);
    let { language } = this.props;
    const breadcrumbItems = this.getBreadcrumbItems();
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <Breadcrumb items={breadcrumbItems} language={language} />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                className={isShowFullDescription === false ? "short" : "full"}
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
            <div className="view-more">
              {isShowFullDescription ? (
                <span onClick={() => this.handleShowDescription()}>Ẩn bớt</span>
              ) : (
                <span onClick={() => this.handleShowDescription()}>
                  Xem thêm
                </span>
              )}
            </div>
          </div>
          <div className="search-province-doctor">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvinces &&
                listProvinces.length > 0 &&
                listProvinces.map((item, index) => {
                  return (
                    <option value={item.keyMap} key={index}>
                      {language === languages.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              console.log("Doctor ID:", item);
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescription={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="schedule-doctor">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                    <div className="extra-info-doctor">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
