import React, { Component, createRef } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import * as action from "../../store/actions/adminAction";

import "./TableUserRedux.scss";

const mdParser = new MarkdownIt();

function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableUserRedux extends Component {
  constructor(props) {
    super(props);
    this.addUserModalRef = createRef();
    this.state = {
      listUsers: [],
    };
  }

  componentDidMount() {
    this.props.getUsers();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUserRedux !== this.props.listUserRedux) {
      this.setState({
        listUsers: this.props.listUserRedux,
      });
    }
  }
  handleEditUser = (user) => {
    this.props.handleDeleteUserFromParent(user);
  };

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  };

  render() {
    let arrUsers = this.state.listUsers;
    console.log(
      "check props from table user redux: ",
      this.props.listUserRedux
    );
    console.log("check state from table user redux: ", this.state.listUsers);

    return (
      <>
        <div className="users-container">
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
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr>
                        <td>{item.email}</td>
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
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUserRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(action.fetchAllUsersStart()),
    deleteUserRedux: (userId) => dispatch(action.deleteUsers(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUserRedux);
