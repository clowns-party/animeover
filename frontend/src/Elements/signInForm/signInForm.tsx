import React, { FC } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../bus/auth/hooks/useAuth";
import { AuthFormData } from "../../bus/auth/types";
import { signInAsync } from "../../bus/auth/actions";

const layout = {};
const tailLayout = {};

export const SignInForm: FC = () => {
  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth();

  const errorMessageJSX = error && <p>{error.message}</p>;
  const loaderJSX = isFetching && <p>loading data from Api...</p>;
  const AuthData = data && <pre>{data.user.email}</pre>;

  const onFinish = (values: AuthFormData) => {
    dispatch(signInAsync(values));
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is reqired",
    types: {
      email: "${label} is not a valid email",
    },
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      {errorMessageJSX}
      {loaderJSX}
      {AuthData}
      <Col span={12}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Row justify="space-between">
            <Col span={6}>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  SignIn
                </Button>
              </Form.Item>
            </Col>
            <Col span={6}>
              <NavLink to="/signUp">
                <Button type="primary" htmlType="button">
                  SignUp
                </Button>
              </NavLink>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
