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
import { CreateData, DeleteData } from "./Redux/Action/Action";

const CrudRedux = (props) => {
  const { list, dispatch } = props;
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
    const { name, value } = e.target;
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

//   const getUserData = () => {
//     const localStorageData = JSON.parse(localStorage.getItem("UserData"));
//     setTableData(localStorageData);
//   };
useEffect(() => {console.log("table DAta", tableData)}, [tableData]);
  React.useEffect(() => {
    setTableData(list?.Data);
  }, [props?.list]);

  const handleSubmit = () => {
    let userData = [];
    if (tableData) {
      userData = tableData;
    } else {
      userData = [];
    }
    if (allData.editid === "") {
      dispatch(CreateData(allData));
    } else {
    //   const UserDataObj = {
    //     firstName: allData.firstName,
    //     middleName: allData.middleName,
    //     lastName: allData.lastName,
    //     email: allData.email,
    //     mobile: allData.mobile,
    //     gender: allData.gender,
    //     city: allData.city,
    //     hobbies: allData.hobbies,
    //   };
    //   userData[allData.editid] = UserDataObj;
    //   localStorage.setItem("UserData", JSON.stringify(userData));
      setTableData(userData);
    }
    setAllData(initialState);
    // getUserData();
  };
//   const handleDelete = (id) => {
//     dispatch(DeleteData(id));
//   };
    const handleDelete = (index) => {
      tableData.splice(index, 1);
      setTableData(tableData);
      dispatch(DeleteData(tableData))
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
          {/* <button onClick={() => handleEdit(index)}>Edit</button> */}
          <button onClick={() => handleDelete(index)}>Delete</button>
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
              <h1 className="h2login">Register</h1>
              <p>
                <b>Create your account</b>
              </p>
              <Form>
                <Form.Item>
                  <Input
                    name="firstName"
                    placeholder="Enter Your FirstName"
                    addonBefore={<UserOutlined />}
                    value={allData.firstName}
                    onChange={(e) => handleChange(e)}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="middleName"
                    placeholder="Enter Your MiddleName"
                    addonBefore={<UserOutlined />}
                    value={allData.middleName}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="lastName"
                    placeholder="Enter Your Lastname"
                    addonBefore={<UserOutlined />}
                    value={allData.lastName}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    name="email"
                    placeholder="Enter Your Email"
                    addonBefore={<MailOutlined />}
                    value={allData.email}
                    onChange={handleChange}
                  />
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
                </Radio.Group>
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
                <Form.Item>
                  <Button
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