"use client";

import { Button, Card, Col, Row, Typography, Space, Tag, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useGetIdentity } from "@refinedev/core";
import React, { useEffect } from "react";
import { HomepageHeader } from "@components/homepage-header";

const { Title, Paragraph, Text } = Typography;

interface Treatment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  pressure: string;
  pricing: {
    duration: string;
    price: string;
  }[];
  notes?: string;
  category: "healing" | "relaxation" | "specialty";
}

const treatments: Treatment[] = [
  {
    id: "thai-deep",
    title: "Traditional Thai Deep Massage",
    subtitle: "Treatment Massage for Healing",
    description: "Pressure point & yoga stretching massage without oil, using finger tips, arms, elbows, hands, knuckles and body weight, also feet to stretch you. Tiger Balm available on request.",
    icon: "/thaideep.png",
    pressure: "Medium to firm pressure",
    pricing: [
      { duration: "45 mins", price: "$79" },
      { duration: "60 mins", price: "$95" },
      { duration: "90 mins", price: "$139" },
      { duration: "120 mins", price: "$185" },
    ],
    category: "healing",
  },
  {
    id: "aromatherapy",
    title: "Aromatherapy Oil Massage",
    subtitle: "Signature Essential Oil Blend",
    description: "Relaxing massage with mixed signature essential oil and organic oils to reduce your tension & stress, and improving circulation.",
    icon: "/aromatheraphy.png",
    pressure: "Light pressure",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
      { duration: "90 mins", price: "$135" },
      { duration: "120 mins", price: "$175" },
    ],
    category: "relaxation",
  },
  {
    id: "swedish",
    title: "Swedish Massage",
    subtitle: "Classic Relaxation Technique",
    description: "The technique involves rubbing muscles together in the same direction as the flow of blood to the heart, it works to improve circulation.",
    icon: "/swedish.png",
    pressure: "Light pressure",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
      { duration: "90 mins", price: "$135" },
      { duration: "120 mins", price: "$175" },
    ],
    category: "relaxation",
  },
  {
    id: "hot-coconut",
    title: "Hot Coconut Oil Massage",
    subtitle: "Pure Virgin Organic Coconut Oil",
    description: "Remedial massage medium to firm pressure & warmth pure virgin organic coconut oil, it is both relaxing & therapeutic at the same time. Benefit for skin quality improved, feel soft and rejuvenated.",
    icon: "/coconutoil.png",
    pressure: "Medium to firm pressure",
    pricing: [
      { duration: "60 mins", price: "$109" },
      { duration: "90 mins", price: "$159" },
      { duration: "120 mins", price: "$209" },
    ],
    category: "specialty",
  },
  {
    id: "hot-stone",
    title: "Hot Stone Massage",
    subtitle: "Therapeutic Warmth Therapy",
    description: "Using those smooth and hot stone on certain points on the body and holds those warm stone on some points for a few seconds during the massage.",
    icon: "/hotstone.png",
    pressure: "Medium pressure",
    pricing: [
      { duration: "60 mins", price: "$109" },
      { duration: "90 mins", price: "$159" },
      { duration: "120 mins", price: "$209" },
    ],
    category: "specialty",
  },
  {
    id: "remedial",
    title: "Remedial Massage",
    subtitle: "Therapeutic Treatment",
    description: "Variety of techniques in the treatment from pressure point therapy, deep tissue massage and sport massage, pressure can be firm/relax and medium as suit your need. Mini hot stone available on request.",
    icon: "/remedial.png",
    pressure: "Firm/relax and medium as suit your need",
    pricing: [
      { duration: "45 mins", price: "$79" },
      { duration: "60 mins", price: "$95" },
      { duration: "90 mins", price: "$139" },
      { duration: "120 mins", price: "$185" },
    ],
    notes: "Selected Health Funds only",
    category: "healing",
  },
  {
    id: "foot-reflexology",
    title: "Foot Reflexology & Foot Relax Massage",
    subtitle: "Pressure Point Therapy",
    description: "Pressure to specific points on the feet, using thumb and foot massage wooden stick and massage without stick for foot relaxation.",
    icon: "/foot.png",
    pressure: "Medium pressure",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
    ],
    category: "specialty",
  },
  {
    id: "head-massage",
    title: "The Relaxing Head Massage",
    subtitle: "Head and Neck Massage",
    description: "Head and neck massage using coconut oil for ultimate relaxation and stress relief.",
    icon: "/headneck.png",
    pressure: "Light to medium pressure",
    pricing: [
      { duration: "30 mins", price: "$55*" },
      { duration: "45 mins", price: "$75" },
    ],
    notes: "*Cash Only",
    category: "relaxation",
  },
];

export default function TreatmentsPage() {
  const router = useRouter();
  const { data: user } = useGetIdentity();

  useEffect(() => {
    // Handle anchor links for smooth scrolling
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const healingTreatments = treatments.filter(t => t.category === "healing");
  const relaxationTreatments = treatments.filter(t => t.category === "relaxation");
  const specialtyTreatments = treatments.filter(t => t.category === "specialty");

  const renderTreatmentCard = (treatment: Treatment) => (
    <div id={treatment.id} key={treatment.id} style={{ scrollMarginTop: "100px" }}>
    <Card
      style={{
        borderRadius: "16px",
        border: "none",
        boxShadow: "0 4px 16px rgba(74, 155, 142, 0.1)",
        marginBottom: "32px",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
      bodyStyle={{ padding: 0 }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(74, 155, 142, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(74, 155, 142, 0.1)";
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #E8F4F2 0%, #F0F7F5 100%)",
          padding: "32px",
          borderBottom: "1px solid rgba(74, 155, 142, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "16px" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 2px 8px rgba(74, 155, 142, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img 
              src={treatment.icon} 
              alt={treatment.title}
              style={{
                height: "48px",
                width: "auto",
                objectFit: "contain",
                filter: "opacity(0.9)"
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Tag
              color={treatment.category === "healing" ? "#4A9B8E" : treatment.category === "specialty" ? "#C9A961" : "#87CEEB"}
              style={{
                marginBottom: "8px",
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              {treatment.subtitle}
            </Tag>
            <Title
              level={3}
              style={{
                color: "#2C5F5A",
                margin: 0,
                fontSize: "clamp(1.3rem, 2vw, 1.6rem)",
                fontWeight: 400,
              }}
            >
              {treatment.title}
            </Title>
          </div>
        </div>
        <Paragraph
          style={{
            color: "#6B6B6B",
            fontSize: "15px",
            lineHeight: 1.8,
            margin: 0,
            marginLeft: "76px",
          }}
        >
          {treatment.description}
        </Paragraph>
        <div style={{ marginTop: "16px", marginLeft: "76px" }}>
          <Text style={{ color: "#4A9B8E", fontSize: "14px", fontWeight: 500 }}>
            Pressure: <span style={{ color: "#6B6B6B", fontWeight: 400 }}>{treatment.pressure}</span>
          </Text>
        </div>
      </div>
      <div style={{ padding: "24px 32px", background: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
            {treatment.pricing.map((price, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "12px 20px",
                  background: "#FAF9F7",
                  borderRadius: "8px",
                  minWidth: "100px",
                }}
              >
                <Text
                  style={{
                    display: "block",
                    color: "#2C5F5A",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "4px",
                  }}
                >
                  {price.duration}
                </Text>
                <Text
                  style={{
                    display: "block",
                    color: "#C9A961",
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  {price.price}
                </Text>
              </div>
            ))}
          </div>
          {treatment.notes && (
            <Tag
              color="orange"
              style={{
                borderRadius: "6px",
                padding: "4px 12px",
                fontSize: "12px",
              }}
            >
              {treatment.notes}
            </Tag>
          )}
        </div>
      </div>
    </Card>
    </div>
  );

  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh" }}>
      <HomepageHeader />
      
      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #F5F3F0 0%, #E8E5E0 50%, #F0EDE8 100%)",
          padding: "80px 24px 60px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Title
            level={1}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
              color: "#2C5F5A",
              marginBottom: "16px",
              fontWeight: 300,
              letterSpacing: "1px",
            }}
          >
            Our Treatments & Prices
          </Title>
          <Paragraph
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              color: "#6B6B6B",
              maxWidth: "700px",
              margin: "0 auto 40px",
              lineHeight: 1.8,
            }}
          >
            Discover our range of therapeutic and relaxing massage treatments, each designed to restore your body, mind, and spirit.
          </Paragraph>
        </div>
      </div>

      {/* Treatments Section */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>
        {/* Healing Treatments */}
        <div style={{ marginBottom: "60px" }}>
          <Title
            level={2}
            style={{
              color: "#2C5F5A",
              marginBottom: "40px",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
              textAlign: "center",
            }}
          >
            Treatment Massage for Healing
          </Title>
          {healingTreatments.map(renderTreatmentCard)}
        </div>

        <Divider style={{ borderColor: "rgba(74, 155, 142, 0.2)", margin: "60px 0" }} />

        {/* Relaxation Treatments */}
        <div style={{ marginBottom: "60px" }}>
          <Title
            level={2}
            style={{
              color: "#2C5F5A",
              marginBottom: "40px",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
              textAlign: "center",
            }}
          >
            Relaxation & Wellness
          </Title>
          {relaxationTreatments.map(renderTreatmentCard)}
        </div>

        <Divider style={{ borderColor: "rgba(74, 155, 142, 0.2)", margin: "60px 0" }} />

        {/* Specialty Treatments */}
        <div style={{ marginBottom: "60px" }}>
          <Title
            level={2}
            style={{
              color: "#2C5F5A",
              marginBottom: "40px",
              fontWeight: 300,
              fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
              textAlign: "center",
            }}
          >
            Specialty Treatments
          </Title>
          {specialtyTreatments.map(renderTreatmentCard)}
        </div>
      </div>

      {/* CTA Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #4A9B8E 0%, #3A7A70 100%)",
          padding: "80px 24px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title
          level={2}
          style={{
            color: "#fff",
            marginBottom: "24px",
            fontWeight: 300,
            fontSize: "clamp(1.8rem, 3vw, 2.3rem)",
          }}
        >
          Ready to Begin Your Journey?
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
          Book your preferred treatment today and experience the healing power of touch.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          icon={<CalendarOutlined />}
          onClick={() => {
            if (user) {
              router.push("/blog-posts");
            } else {
              alert("Please contact us to book an appointment. Phone: (Your Phone Number)");
            }
          }}
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
          Book Your Treatment
        </Button>
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#4A4A4A",
          color: "#fff",
          padding: "40px 24px",
          textAlign: "center",
        }}
      >
        <Paragraph style={{ color: "#ccc", margin: 0 }}>
          © 2024 Two Sisters Massage. All rights reserved.
        </Paragraph>
      </div>
    </div>
  );
}

