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

import "./DetailClinic.scss";
import {
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import HomeHeader from "../../Header/HomeHeader";
import ProfileDoctor from "../ProfileDoctor";
import DoctorSchedule from "../doctor/DoctorSchedule";
import DoctorExtraInfo from "../doctor/DoctorExtraInfo";
import Breadcrumb from "../../../components/BreadCrumb";
import _ from "lodash";
import { languages } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: [],
      // listProvinces: [],
      // isShowFullDescription: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicById({
        id: id,
      });
      console.log("check res doctor id", res);

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item, index) => arrDoctorId.push(item.doctorId));
          }
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          dataDetailClinic: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  // handleOnChangeSelect = async (event) => {
  //   if (
  //     this.props.match &&
  //     this.props.match.params &&
  //     this.props.match.params.id
  //   ) {
  //     let id = this.props.match.params.id;

  //     let res = await getDetailClinicById({
  //       id: id,
  //     });
  //     let resProvince = await getAllCodeService("PROVINCE");

  //     if (
  //       res &&
  //       res.errCode === 0 &&
  //       resProvince &&
  //       resProvince.errCode === 0
  //     ) {
  //       let data = res.data;
  //       let arrDoctorId = [];
  //       if (data && !_.isEmpty(data)) {
  //         let arr = data.doctorSpecialty;
  //         if (arr && arr.length > 0) {
  //           arr.map((item, index) => {
  //             arrDoctorId.push(item.doctorId);
  //           });
  //         }
  //       }

  //       this.setState({
  //         arrDoctorId: arrDoctorId,
  //         dataDetailClinic: res.data,
  //       });
  //     }
  //   }
  // };
  handleShowDescription = () => {
    this.setState({
      isShowFullDescription: !this.state.isShowFullDescription,
    });
  };
  getBreadcrumbItems = () => {
    const { language } = this.props;
    const { dataDetailClinic } = this.state;

    const items = [
      {
        label: language === languages.VI ? "Trang chủ" : "Home",
        path: "/home",
      },
    ];

    if (dataDetailClinic && dataDetailClinic.name) {
      items.push({
        label: dataDetailClinic.name,
        path: null,
      });
    }

    return items;
  };

  render() {
    let {
      arrDoctorId,
      dataDetailClinic,

      isShowFullDescription,
    } = this.state;
    console.log("check doctorId", arrDoctorId);

    let { language } = this.props;
    const breadcrumbItems = this.getBreadcrumbItems();
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <Breadcrumb items={breadcrumbItems} language={language} />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div>{dataDetailClinic.name}</div>
                <div
                  className={isShowFullDescription === false ? "short" : "full"}
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
