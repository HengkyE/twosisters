"use client";

import { Button, Layout, Space, Typography, Avatar } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetIdentity, useLogout } from "@refinedev/core";
import React from "react";

const { Header } = Layout;
const { Text } = Typography;

export const HomepageHeader: React.FC = () => {
  const router = useRouter();
  const { data: user } = useGetIdentity();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout({}, { onSuccess: () => router.push("/") });
  };

  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "#fff",
        borderBottom: "1px solid #f0f0f0",
        padding: "0 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "72px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          <img 
            src="/logo.png" 
            alt="Two Sisters Logo" 
            style={{ 
              height: "50px", 
              width: "auto",
              objectFit: "contain"
            }} 
          />
          <div
            style={{
              fontSize: "24px",
              fontWeight: 300,
              color: "#2C5F5A",
              letterSpacing: "1px",
            }}
          >
            Two Sisters
          </div>
        </Link>
        <Link href="/treatments" style={{ textDecoration: "none" }}>
          <Button
            type="text"
            style={{
              color: "#2C5F5A",
              fontSize: "16px",
              fontWeight: 400,
            }}
          >
            Treatment
          </Button>
        </Link>
      </div>
      {user && (
        <Space size="large">
          <Space>
            <Avatar icon={<UserOutlined />} />
            <Text strong>{user.name || user.email}</Text>
          </Space>
          <Button
            type="primary"
            onClick={() => router.push("/blog-posts")}
            style={{
              background: "#C9A961",
              borderColor: "#C9A961",
            }}
          >
            Dashboard
          </Button>
          <Button
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Space>
      )}
    </Header>
  );
};

