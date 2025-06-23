import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    try {
      console.log("Before API call"); // Kiểm tra có chạy tới đây không
      let response = await getAllUsers("ALL"); // Gọi API để lấy tất cả người dùng
      console.log("API response:", response); // Kiểm tra response

      if (response && response.errCode === 0) {
        this.setState({ arrUsers: response.users });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  render() {
    let arrUsers = this.state.arrUsers; // Lấy danh sách người dùng từ state
    return (
      <div className="users-container">
        <div className="text-center title">Manage users with Đức Vình</div>
        <div className="table-wrapper">
          <table id="customers">
            <thead>
              <tr className="text-center">
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {arrUsers &&
                arrUsers.map((item) => (
                  <tr key={item.id}>
                    <td data-label="Email">{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="action-buttons">
                      <button className="btn edit-btn">Edit</button>
                      <button className="btn delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
