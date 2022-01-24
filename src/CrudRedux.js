import React, { useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Radio,
  Table,
  Checkbox,
} from "antd";
import { UserOutlined, MailOutlined, MobileOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { CreateData, DeleteData, EditData } from "./Redux/Action/Action";

const CrudRedux = (props) => {
  const { list, dispatch } = props;
  const [errors, setError] = React.useState({});
  const [editedIndex, setIndex] = React.useState(null);
  const [tableData, setTableData] = React.useState([]);
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    city: "Surat",
    editid: "",
    hobbies: [],
  };
  const [allData, setAllData] = React.useState(initialState);
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (e.target.name === "firstName") {
      value = value.replace(/[^A-Z\^a-z\s-]/g, "");
    }
    if (e.target.name === "middleName") {
      value = value.replace(/[^A-Z\^a-z\s-]/g, "");
    }
    if (e.target.name === "lastName") {
      value = value.replace(/[^A-Z\^a-z\s-]/g, "");
    }
    if (e.target.name === "mobile") {
      value = value.replace(/[^0-9\s-]/g, "");
    }
    setAllData({ ...allData, [name]: value });
  };

  const options = [
    { label: "Cricket", value: false },
    { label: "Reading", value: false },
    { label: "Movies", value: false },
  ];
  const onChange = (e) => {
    let option = allData.hobbies;
    if (e.target.checked === true) {
      option.push(e.target.id);
    } else {
      option.filter((item) => {
        return item.label !== e.target.id;
      });
      let index = option.indexOf(e.target.id);
      option.splice(index, 1);
    }
    setAllData({ ...allData, hobbies: [...option] });
  };

  const validation = (name, value) => {
    const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const mobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    switch (name) {
      case "firstName":
        if (!value) {
          return "Please Enter First Name";
        } else {
          return "";
        }
      case "middleName":
        if (!value) {
          return "Please Enter Middle Name";
        } else {
          return "";
        }
      case "lastName":
        if (!value) {
          return "please Enter Last Name";
        } else {
          return "";
        }
      case "email":
        if (!emailRegx.test(value)) {
          return "please Enter valid email";
        } else {
          return "";
        }
      case "mobile":
        if (!mobile.test(value)) {
          return "please enter valid Mobile";
        } else {
          return "";
        }
      case "gender":
        if (!value) {
          return "please Select Gender";
        } else {
          return "";
        }
      case "hobbies":
        if (allData?.hobbies?.length <= 0) {
          return "Please Enter Valid Hobbies";
        } else {
          return "";
        }
    }
  };
  React.useEffect(() => {
    setTableData(list?.Data);
  }, [list]);

  const handleSubmit = () => {
    const userData = {
      firstName: allData.firstName,
      middleName: allData.middleName,
      lastName: allData.lastName,
      email: allData.email,
      mobile: allData.mobile,
      hobbies: allData.hobbies,
      gender: allData.gender,
      city: allData.city,
    };
    let allErrors = {};
    Object.keys(userData).forEach((key) => {
      const error = validation(key, userData[key]);
      if (error && error.length) {
        allErrors[key] = error;
      }
    });

    if (Object.keys(allErrors).length) {
      return setError(allErrors);
    } else {
      if (editedIndex === null) {
        dispatch(CreateData(allData));
        setIndex(null);
        setAllData(initialState);
      } else {
        dispatch(EditData({ data: allData, id: editedIndex }));
        setIndex(null);
        setAllData(initialState);
      }
    }
    setError({});
  };
  const handleEdit = (index) => {
    setAllData(list.Data[index]);
    setIndex(index);
  };
  const handleDelete = (index) => {
    tableData.splice(index, 1);
    setTableData(tableData);
    dispatch(DeleteData(tableData));
  };
  const columns = [
    {
      title: "Firstname",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Middlename",
      dataIndex: "middleName",
      key: "middleName",
    },
    {
      title: "Lastname",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Hobbies",
      dataIndex: "hobbies",
      key: "hobbies",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (text, record, index) => (
        <div>
          <button
            onClick={() => handleEdit(index)}
            style={{ marginRight: "10px", padding: "0px 10px" }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(index)}
            style={{ padding: "0px 10px" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="form">
        <Row>
          <Col span={8} />
          <Col span={8}>
            <Card className="cardtop">
              <h1
                className="h2login"
                style={{
                  fontWeight: "700",
                  fontSize: "24px",
                  textAlign: "center",
                }}
              >
                Register
              </h1>
              <p
                style={{
                  fontWeight: "700",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                <b>Create your account</b>
              </p>
              <Form>
                <Form.Item>
                  <Input
                    name="firstName"
                    placeholder="Enter Your FirstName"
                    addonBefore={<UserOutlined />}
                    value={allData?.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                  <span className="validation">{errors.firstName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="middleName"
                    placeholder="Enter Your MiddleName"
                    addonBefore={<UserOutlined />}
                    value={allData?.middleName}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.middleName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="lastName"
                    placeholder="Enter Your Lastname"
                    addonBefore={<UserOutlined />}
                    value={allData.lastName}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.lastName}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    name="email"
                    placeholder="Enter Your Email"
                    addonBefore={<MailOutlined />}
                    value={allData.email}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.email}</span>
                </Form.Item>
                <Form.Item>
                  <Input
                    id="mobile"
                    name="mobile"
                    addonBefore={<MobileOutlined />}
                    placeholder="Enter Your Mobile"
                    value={allData.mobile}
                    onChange={handleChange}
                  />
                  <span className="validation">{errors.mobile}</span>
                </Form.Item>
                <Form.Item label="Hobbies">
                  <Row>
                    {options.map((data, id) => (
                      <Col span={8} key={id}>
                        <Checkbox
                          name={`${data.label}`}
                          className={data.label}
                          key={id}
                          id={data.label}
                          onChange={(e) => {
                            onChange(e);
                          }}
                          checked={
                            allData?.hobbies?.length > 0 &&
                            allData.hobbies.includes(data.label)
                          }
                        >
                          {data.label}
                        </Checkbox>
                      </Col>
                    ))}
                  </Row>
                  <span className="validation">{errors.hobbies}</span>
                </Form.Item>
                <h3>Gender</h3>
                <Radio.Group
                  onChange={(event) =>
                    handleChange({
                      target: { name: "gender", value: event.target.value },
                    })
                  }
                  value={allData.gender}
                >
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="other">Other</Radio>
                </Radio.Group>{" "}
                <br />
                <span className="validation">{errors.gender}</span>
                <h3 style={{ marginTop: "10px" }}>City</h3>
                <select
                  name="city"
                  id="city"
                  value={allData.city}
                  onChange={(event) =>
                    handleChange({
                      target: { name: "city", value: event.target.value },
                    })
                  }
                >
                  <option>Surat</option>
                  <option>Vadodara</option>
                  <option>Ahmedabad</option>
                  <option>Bharuch</option>
                </select>
                <span className="validation">{errors.city}</span>
                <Form.Item>
                  <Button
                    style={{ marginTop: "15px" }}
                    className="btn-md buttonsubmitlogin"
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    onClick={handleSubmit}
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={8} />
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Table columns={columns} dataSource={[...tableData] || []} />
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    list: state.list,
  };
};
export default connect(mapStateToProps)(CrudRedux);
