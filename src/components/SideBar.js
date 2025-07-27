import React, { Component } from "react";
import { connect } from "react-redux";

import "./SideBar.scss";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sidebarRef = React.createRef();
  }

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { language } = this.props;
    const { isOpen } = this.props;

    return (
      <div
        className={`sidebar-container ${isOpen ? "open" : ""}`}
        ref={this.sidebarRef}
      >
        <div className="sidebar-toggle" onClick={this.props.onClose}>
          {isOpen ? "×" : "☰"}
        </div>

        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2>Tango chủ</h2>
          </div>

          <div className="sidebar-section">
            <h3>Cấm nang</h3>
            <ul>
              <li>Liên hệ hợp tác</li>
              <li>Sức khỏe doanh nghiệp</li>
              <li>Chuyển đổi số Phòng khám</li>
              <li>Tuyển dụng</li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>VỀ BOOKINGCARE</h3>
            <ul>
              <li>Dành cho bệnh nhân</li>
              <li>Dành cho bác sĩ</li>
              <li>Vai trò của BookingCare</li>
              <li>Liên hệ</li>
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>HỖ TRỢ</h3>
            <ul>
              <li>Câu hỏi thường gặp</li>
              <li>Điều khoản sử dụng</li>
              <li>Quy trình hỗ trợ giải quyết</li>
            </ul>
          </div>

          <div className="sidebar-current-page">
            <h4>Tháng chủ cấm nang Da liều Thắm mỹ</h4>
            <h5>địa chỉ điều trị bốt sắc tổ bẩm sinh uy tín tại TPHCM</h5>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
