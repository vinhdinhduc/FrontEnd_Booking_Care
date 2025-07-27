import React, { Component, createRef } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
  getAllUsers,
  createNewUserService,
  deleteUser,
  updateUser,
} from "../../services/userService";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import "./UserManage.scss";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.addUserModalRef = createRef();
    this.state = {
      arrUsers: [],
      isOpenModal: false,
      isOpenEditModal: false,
      userEdit: null,
      // State to control the modal visibility
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModal: false,
        });
        if (this.addUserModalRef.current) {
          this.addUserModalRef.current.clearInput();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  handleDeleteUser = async (userId) => {
    let res = await deleteUser(userId);
    if (res && res.errCode === 0) {
      await this.getAllUsersFromReact();
    } else {
    }
  };
  handleClearInput() {}
  handleEditUser = (user) => {
    this.setState({
      isOpenEditModal: true,
      userEdit: user,
    });
  };
  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
      userEdit: null,
    });
  };
  updateUser = async (data) => {
    let res = await updateUser(data);
    if (res && res.errCode !== 0) {
      alert("Cập nhật thất bại", res.errMessage);
    }
    this.getAllUsersFromReact();
    this.setState({
      isOpenEditModal: false,
      userEdit: null,
    });
  };
  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <div className="users-container">
        <div className="text-center title">Manage users with Đức Vình</div>
        <div className="mx-3 my-3">
          <button
            className="btn btn-primary p-4"
            onClick={() => this.handleAddNewUser()}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} />
            Add new user
          </button>
          <AddUserModal
            isOpen={this.state.isOpenModal}
            toggleFromParent={this.toggleModal}
            createNewUser={this.createNewUser}
            ref={this.addUserModalRef}
          />{" "}
          {/* Render the AddUserModal component */}
          <EditUserModal
            isOpen={this.state.isOpenEditModal}
            toggleFromParent={this.toggleEditModal}
            updateUser={this.updateUser}
            userEdit={this.state.userEdit}
          />
        </div>
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
                      <button
                        className="btn edit-btn"
                        onClick={() => this.handleEditUser(item)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faPen} />
                        Edit
                      </button>

                      <button
                        className="btn delete-btn"
                        onClick={() => this.handleDeleteUser(item.id)}
                      >
                        {" "}
                        <FontAwesomeIcon icon={faTrash} />
                        Delete
                      </button>
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
