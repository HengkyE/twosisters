"use client";

import { Modal, Form, Input, DatePicker, TimePicker, Select, Button } from "antd";
import { CalendarOutlined, PhoneOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

const { TextArea } = Input;
const { Option } = Select;

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  treatmentName?: string;
}

interface TreatmentPricing {
  duration: string;
  price: string;
}

interface TreatmentData {
  title: string;
  pricing: TreatmentPricing[];
}

const treatmentDataMap: Record<string, TreatmentData> = {
  "Traditional Thai Deep Massage": {
    title: "Traditional Thai Deep Massage",
    pricing: [
      { duration: "45 mins", price: "$79" },
      { duration: "60 mins", price: "$95" },
      { duration: "90 mins", price: "$139" },
      { duration: "120 mins", price: "$185" },
    ],
  },
  "Aromatherapy Oil Massage": {
    title: "Aromatherapy Oil Massage",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
      { duration: "90 mins", price: "$135" },
      { duration: "120 mins", price: "$175" },
    ],
  },
  "Swedish Massage": {
    title: "Swedish Massage",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
      { duration: "90 mins", price: "$135" },
      { duration: "120 mins", price: "$175" },
    ],
  },
  "Hot Coconut Oil Massage": {
    title: "Hot Coconut Oil Massage",
    pricing: [
      { duration: "60 mins", price: "$109" },
      { duration: "90 mins", price: "$159" },
      { duration: "120 mins", price: "$209" },
    ],
  },
  "Hot Stone Massage": {
    title: "Hot Stone Massage",
    pricing: [
      { duration: "60 mins", price: "$109" },
      { duration: "90 mins", price: "$159" },
      { duration: "120 mins", price: "$209" },
    ],
  },
  "Remedial Massage": {
    title: "Remedial Massage",
    pricing: [
      { duration: "45 mins", price: "$79" },
      { duration: "60 mins", price: "$95" },
      { duration: "90 mins", price: "$139" },
      { duration: "120 mins", price: "$185" },
    ],
  },
  "Foot Reflexology & Foot Relax Massage": {
    title: "Foot Reflexology & Foot Relax Massage",
    pricing: [
      { duration: "45 mins", price: "$75" },
      { duration: "60 mins", price: "$90" },
    ],
  },
  "The Relaxing Head Massage": {
    title: "The Relaxing Head Massage",
    pricing: [
      { duration: "30 mins", price: "$55*" },
      { duration: "45 mins", price: "$75" },
    ],
  },
};

const treatments = Object.keys(treatmentDataMap);

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  treatmentName,
}) => {
  const [form] = Form.useForm();
  const [selectedTreatment, setSelectedTreatment] = useState<string | undefined>(
    treatmentName
  );

  useEffect(() => {
    if (treatmentName) {
      setSelectedTreatment(treatmentName);
      form.setFieldsValue({ treatment: treatmentName });
    }
  }, [treatmentName, form]);

  const handleTreatmentChange = (value: string) => {
    setSelectedTreatment(value);
    // Reset duration when treatment changes
    form.setFieldsValue({ duration: undefined });
  };

  const handleClose = () => {
    form.resetFields();
    setSelectedTreatment(treatmentName || undefined);
    onClose();
  };

  const phoneNumber = "0294987092";
  const phoneNumberDisplay = "02 9498 7092";
  
  const handleCall = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Try multiple formats for better compatibility
    const formats = [
      `tel:${phoneNumber}`,
      `tel:+61${phoneNumber.replace(/^0/, '')}`,
      `tel:+61294987092`,
    ];
    
    // Create a temporary anchor element to trigger the phone call
    const link = document.createElement("a");
    link.href = formats[0];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Fallback: try window.location
    try {
      window.location.href = formats[0];
    } catch (err) {
      console.log("Phone call initiated");
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CalendarOutlined style={{ color: "#4A9B8E" }} />
          <span>Book Your Appointment</span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={600}
      style={{ top: 20 }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          treatment: treatmentName || undefined,
        }}
      >
        <Form.Item
          name="name"
          label="Full Name"
        >
          <Input placeholder="Enter your full name" size="large" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
        >
          <Input placeholder="your.email@example.com" size="large" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
        >
          <Input placeholder="+61 XXX XXX XXX" size="large" />
        </Form.Item>

        <Form.Item
          name="treatment"
          label="Treatment"
        >
          <Select 
            placeholder="Select a treatment" 
            size="large"
            onChange={handleTreatmentChange}
          >
            {treatments.map((treatment) => (
              <Option key={treatment} value={treatment}>
                {treatment}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedTreatment && treatmentDataMap[selectedTreatment] && (
          <Form.Item
            name="duration"
            label="Treatment Duration"
          >
            <Select placeholder="Select duration" size="large">
              {treatmentDataMap[selectedTreatment].pricing.map((option) => (
                <Option key={option.duration} value={option.duration}>
                  {option.duration} - {option.price}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="date"
          label="Date"
        >
          <DatePicker
            style={{ width: "100%" }}
            size="large"
            disabledDate={(current) => current && current < dayjs().startOf("day")}
            format="DD/MM/YYYY"
          />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
        >
          <TimePicker
            style={{ width: "100%" }}
            size="large"
            format="HH:mm"
            minuteStep={15}
            showNow={false}
          />
        </Form.Item>

        <Form.Item name="notes" label="Additional Notes (Optional)">
          <TextArea
            rows={4}
            placeholder="Any special requests or notes..."
            maxLength={500}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <a
            href={`tel:${phoneNumber}`}
            onClick={handleCall}
            style={{
              display: "block",
              width: "100%",
              textDecoration: "none",
              background: "#C9A961",
              border: "1px solid #C9A961",
              borderRadius: "6px",
              height: "50px",
              fontSize: "16px",
              fontWeight: 500,
              color: "#fff",
              textAlign: "center",
              lineHeight: "50px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#B89951";
              e.currentTarget.style.borderColor = "#B89951";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A961";
              e.currentTarget.style.borderColor = "#C9A961";
            }}
          >
            <PhoneOutlined style={{ marginRight: "8px" }} />
            Call to Book Now: {phoneNumberDisplay}
          </a>
        </Form.Item>
      </Form>
    </Modal>
  );
};

