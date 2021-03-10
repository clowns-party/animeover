import React, { FC } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import { useAuth } from "../../bus/user/hooks/useAuth";
import { AuthFormData } from "../../bus/user/types";
import { signInAsync } from "../../bus/user/actions";

const layout = {};
const tailLayout = {};

export const AuthForm: FC = () => {
  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth();

  const errorMessageJSX = error && <p>{error.message}</p>;
  const loaderJSX = isFetching && <p>loading data from Api...</p>;
  const AuthData = data && <pre>{data.user.email}</pre>;

  const onFinish = (values: AuthFormData) => {
    dispatch(signInAsync(values));
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
        >
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
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

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
