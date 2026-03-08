"use client";

import { Button, Card, Col, Row, Typography, Space, Divider } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetIdentity } from "@refinedev/core";
import React from "react";

const { Title, Paragraph, Text } = Typography;

export const Homepage: React.FC = () => {
  const router = useRouter();
  const { data: user } = useGetIdentity();
  const phoneNumber = "0294987092";
  
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const services = [
    {
      title: "Traditional Thai Deep Massage",
      description: "Pressure point & yoga stretching massage for healing and deep relaxation.",
      icon: "/thaideep.png",
      link: "/treatments#thai-deep",
    },
    {
      title: "Aromatherapy Oil Massage",
      description:
        "Signature essential oil blend mixed with organic oils to reduce tension & stress.",
      icon: "/aromatheraphy.png",
      link: "/treatments#aromatherapy",
    },
    {
      title: "Hot Stone Massage",
      description:
        "Smooth hot stones placed on key points to melt away tension and promote deep relaxation.",
      icon: "/hotstone.png",
      link: "/treatments#hot-stone",
    },
    {
      title: "Swedish Massage",
      description: "Classic technique that improves circulation and promotes overall wellness.",
      icon: "/swedish.png",
      link: "/treatments#swedish",
    },
    {
      title: "Hot Coconut Oil Massage",
      description:
        "Pure virgin organic coconut oil massage for skin rejuvenation and deep relaxation.",
      icon: "/coconutoil.png",
      link: "/treatments#hot-coconut",
    },
    {
      title: "Remedial Massage",
      description:
        "Therapeutic treatment combining pressure point therapy and deep tissue techniques.",
      icon: "/remedial.png",
      link: "/treatments#remedial",
    },
    {
      title: "Foot Reflexology",
      description: "Pressure to specific points on the feet for relaxation and wellness.",
      icon: "/foot.png",
      link: "/treatments#foot-reflexology",
    },
    {
      title: "Head & Neck Massage",
      description: "Relaxing head and neck massage using coconut oil for ultimate stress relief.",
      icon: "/headneck.png",
      link: "/treatments#head-massage",
    },
  ];

  const styles = {
    hero: {
      background: "linear-gradient(135deg, #F5F3F0 0%, #E8E5E0 50%, #F0EDE8 100%)",
      padding: "120px 24px",
      textAlign: "center" as const,
      minHeight: "600px",
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
    },
    section: {
      padding: "80px 24px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    serviceCard: {
      height: "100%",
      borderRadius: "12px",
      border: "none",
      boxShadow: "0 4px 12px rgba(74, 155, 142, 0.1)",
      transition: "all 0.3s ease",
      background: "#fff",
    },
    ctaSection: {
      background: "linear-gradient(135deg, #4A9B8E 0%, #3A7A70 100%)",
      padding: "80px 24px",
      textAlign: "center" as const,
      color: "#fff",
    },
  };

  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <img
          src="/logo.png"
          alt="Two Sisters Logo"
          style={{
            height: "140px",
            width: "auto",
            marginBottom: "40px",
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
          }}
        />
        <Title
          level={1}
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            color: "#2C5F5A",
            marginBottom: "24px",
            fontWeight: 300,
            letterSpacing: "2px",
          }}
        >
          Welcome to Two Sisters
        </Title>
        <Paragraph
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            color: "#6B6B6B",
            maxWidth: "700px",
            marginBottom: "40px",
            lineHeight: 1.8,
          }}
        >
          Experience tranquility and rejuvenation in our serene massage sanctuary. Let us melt away
          your stress and restore your inner balance.
        </Paragraph>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={handleCall}
            style={{
              background: "#C9A961",
              borderColor: "#C9A961",
              height: "50px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(201, 169, 97, 0.3)",
            }}
          >
            Book Appointment
          </Button>
        </Space>
      </div>

      {/* Services Section */}
      <div style={styles.section}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#2C5F5A",
            marginBottom: "60px",
            fontWeight: 300,
            fontSize: "clamp(2rem, 4vw, 2.5rem)",
          }}
        >
          Our Services
        </Title>
        <Row gutter={[24, 24]}>
          {services.map((service, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Link href={service.link} style={{ textDecoration: "none" }}>
                <Card
                  hoverable
                  style={styles.serviceCard}
                  bodyStyle={{ padding: "32px 24px", textAlign: "center" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(74, 155, 142, 0.2)";
                    e.currentTarget.style.cursor = "pointer";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(74, 155, 142, 0.1)";
                  }}
                >
                  <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                    <img
                      src={service.icon}
                      alt={service.title}
                      style={{
                        height: "64px",
                        width: "auto",
                        objectFit: "contain",
                        filter: "opacity(0.9)",
                      }}
                    />
                  </div>
                  <Title level={4} style={{ color: "#2C5F5A", marginBottom: "12px" }}>
                    {service.title}
                  </Title>
                  <Paragraph style={{ color: "#6B6B6B", margin: 0 }}>
                    {service.description}
                  </Paragraph>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/treatments">
            <Button
              type="primary"
              size="large"
              style={{
                background: "#4A9B8E",
                borderColor: "#4A9B8E",
                height: "50px",
                padding: "0 40px",
                fontSize: "16px",
                borderRadius: "6px",
              }}
            >
              View All Treatments & Prices
            </Button>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div style={{ ...styles.section, background: "#fff" }}>
        <Row gutter={[48, 48]} align="middle">
          <Col xs={24} lg={12}>
            <Title
              level={2}
              style={{
                color: "#2C5F5A",
                marginBottom: "24px",
                fontWeight: 300,
                fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
              }}
            >
              About Two Sisters
            </Title>
            <Paragraph
              style={{ fontSize: "16px", color: "#6B6B6B", lineHeight: 1.8, marginBottom: "16px" }}
            >
              At Two Sisters, we believe in the healing power of touch and the importance of
              self-care. Our experienced therapists are dedicated to providing you with a
              personalized massage experience that addresses your unique needs.
            </Paragraph>
            <Paragraph style={{ fontSize: "16px", color: "#6B6B6B", lineHeight: 1.8 }}>
              Step into our peaceful sanctuary and leave feeling refreshed, renewed, and ready to
              take on the world.
            </Paragraph>
            <Space size="large" style={{ marginTop: "32px" }}>
              <Space>
                <StarOutlined style={{ color: "#C9A961", fontSize: "20px" }} />
                <Text strong style={{ fontSize: "16px" }}>
                  4.9/5 Rating
                </Text>
              </Space>
              <Space>
                <Text style={{ fontSize: "16px", color: "#6B6B6B" }}>500+ Happy Clients</Text>
              </Space>
            </Space>
          </Col>
          <Col xs={24} lg={12}>
            <div
              style={{
                height: "400px",
                background: "linear-gradient(135deg, #E8F4F2 0%, #D4E8E4 50%, #F0F7F5 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(74, 155, 142, 0.1)",
              }}
            >
              <Text style={{ color: "#4A9B8E", fontSize: "18px" }}>
                [Massage Room Image Placeholder]
              </Text>
            </div>
          </Col>
        </Row>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <Title
          level={2}
          style={{
            color: "#fff",
            marginBottom: "24px",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
          }}
        >
          Ready to Relax?
        </Title>
        <Paragraph
          style={{
            fontSize: "18px",
            color: "#f5f1e8",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px",
          }}
        >
          Book your appointment today and take the first step towards a more relaxed you.
        </Paragraph>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<PhoneOutlined />}
            onClick={handleCall}
            style={{
              background: "#C9A961",
              borderColor: "#C9A961",
              color: "#fff",
              height: "50px",
              padding: "0 32px",
              fontSize: "16px",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(201, 169, 97, 0.3)",
            }}
          >
            Book Now
          </Button>
          <a
            href="https://www.google.com/maps/search/?api=1&query=6a/211+Ben+Boyd+Rd,+Neutral+Bay+NSW+2089"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button
              size="large"
              icon={<EnvironmentOutlined />}
              style={{
                background: "transparent",
                borderColor: "#fff",
                color: "#fff",
                height: "50px",
                padding: "0 32px",
                fontSize: "16px",
                borderRadius: "6px",
              }}
            >
              Get Directions
            </Button>
          </a>
        </Space>
        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
            color: "#f5f1e8",
          }}
        >
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <div>
              <PhoneOutlined style={{ marginRight: "8px", fontSize: "16px" }} />
              <Text style={{ fontSize: "16px", color: "#f5f1e8" }}>
                <a
                  href={`tel:${phoneNumber}`}
                  style={{
                    color: "#f5f1e8",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.textDecoration = "none";
                  }}
                >
                  {phoneNumber}
                </a>
              </Text>
            </div>
            <div>
              <EnvironmentOutlined style={{ marginRight: "8px", fontSize: "16px" }} />
              <Text style={{ fontSize: "16px", color: "#f5f1e8" }}>
                6a/211 Ben Boyd Rd, Neutral Bay NSW 2089
              </Text>
            </div>
          </Space>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#4A4A4A",
          color: "#fff",
          padding: "60px 24px 40px",
          textAlign: "center",
        }}
      >
        {/* HICAPS and MAA Information */}
        <div
          style={{
            marginBottom: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "60px",
            maxWidth: "1000px",
            margin: "0 auto 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              minWidth: "280px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/hicaps.png"
                alt="HICAPS"
                style={{
                  height: "150px",
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              flex: "1",
              minWidth: "280px",
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/maa.png"
                alt="Massage Association of Australia"
                style={{
                  height: "90px",
                  width: "auto",
                  objectFit: "contain",
                  maxWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <Divider style={{ borderColor: "rgba(255, 255, 255, 0.2)", margin: "30px 0" }} />
        <Paragraph style={{ color: "#ccc", margin: 0, fontSize: "14px" }}>
          © 2024 Two Sisters Massage. All rights reserved.
        </Paragraph>
      </div>

    </div>
  );
};
