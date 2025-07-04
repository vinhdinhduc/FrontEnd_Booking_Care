import React, { Component } from "react";
import { connect } from "react-redux";
import { addNewUser, createNewUser } from "../../store/actions/userActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./UserManage.scss"; // Import your CSS file for styling
class AddUserModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      isSubmitting: false,
    };
  }

  async componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  checkValidInput = () => {
    const arrInput = ["email", "password", "firstName", "lastName", "address"];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      console.log("checkValidInput", arrInput[i], this.state[arrInput[i]]);
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter ${arrInput[i]}`);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    // let { email, password, firstName, lastName, address } = this.state;
    // const data = this.state;
    let isValid = this.checkValidInput();
    if (isValid) {
      this.props.createNewUser(this.state, "abc");
      this.clearInput();
    }
  };
  handleInputChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  clearInput = () => {
    this.setState({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      isSubmitting: false,
    });
  };
  render() {
    // const { modal, toggle } = this.props;
    // const { email, password, firstName, lastName, address } = this.state;

    return (
      <div className="add-user-modal-container">
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggle()}>Add New User</ModalHeader>
          <ModalBody>
            <div className="modal-body-user ">
              <div className="input-container">
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={(event) => this.handleInputChange(event, "email")}
                />
              </div>

              <div className="input-container">
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  value={this.state.password}
                  onChange={(event) =>
                    this.handleInputChange(event, "password")
                  }
                />
              </div>

              <div className="input-container">
                <Label for="firstName">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  value={this.state.firstName}
                  onChange={(event) =>
                    this.handleInputChange(event, "firstName")
                  }
                />
              </div>

              <div className="input-container">
                <Label for="lastName">Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name"
                  value={this.state.lastName}
                  onChange={(event) =>
                    this.handleInputChange(event, "lastName")
                  }
                />
              </div>

              <div className="input-container">
                <Label for="address">Address</Label>
                <Input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter address"
                  value={this.state.address}
                  onChange={(event) => this.handleInputChange(event, "address")}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.handleAddNewUser()}
              disabled={this.state.isSubmitting}
            >
              {this.state.isSubmitting ? "Submitting..." : "Add User"}
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);
