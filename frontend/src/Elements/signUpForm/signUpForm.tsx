// Core
import React, { FC, useEffect, useState } from "react";
// Antd
import { Row, Col, Form, Input, Button } from "antd";
// Hooks
import { useDispatch } from "react-redux";
import { useAuth } from "../../bus/auth/hooks/useAuth";
// Actions
import {
  signUpAsync,
} from "../../bus/auth/actions";
// Types
import { AuthFormData } from "../../bus/auth/types";

const layout = {};
const tailLayout = {};

export const SignUpForm: FC = () => {
  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth();
  const [, forceUpdate] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const disableButton = () => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
      isFetching
    );
  };

  const onFinish = (values: AuthFormData) => {
    dispatch(signUpAsync(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is reqired",
    types: {
      email: "${label} is not a valid email",
    },
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Form
          {...layout}
          form={form}
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
            rules={[
              {
                required: true,
                min: 8,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm"
            name="repassword"
            rules={[
              { required: true, message: "Please input your password again!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                disabled={disableButton()}
              >
                SignUp
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
