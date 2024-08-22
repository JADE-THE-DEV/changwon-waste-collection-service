"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Component() {
  const [wasteType, setWasteType] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [showCostEstimate, setShowCostEstimate] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [callTime, setCallTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [formData, setFormData] = useState({
    wasteType: "",
    totalWeight: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    visitTime: "",
    callTime: "",
  });

  const handleWasteInfoSubmit = (e) => {
    e.preventDefault();
    if (wasteType != "" && totalWeight > 0) {
      setShowCostEstimate(true);
    } else {
      setShowCostEstimate(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = await fetch("/api/submitData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          "Waste Type": formData.wasteType,
          "Total Weight": formData.totalWeight,
          Name: formData.name,
          "Phone Number": formData.phone,
          Email: formData.email,
          Address: formData.address,
          "Requested Visit Time": formData.visitTime,
          "Available Call Time": formData.callTime,
        },
      }),
    });

    if (response.ok) {
      setSubmitMessage(
        "예약이 성공적으로 접수되었습니다. 확인 문자를 보내드렸습니다."
      );
      // console.log('Data saved to Airtable');
      // 성공 메시지 처리
    } else {
      setSubmitMessage(
        "예약에 실패했습니다. 네트워크 연결을 확인하시고 다시 시도해주세요."
      );
      // alert(response.status);
      // console.error("Error saving data to Airtable");
      // 에러 메시지 처리
    }
    // setSubmitMessage("예약이 성공적으로 접수되었습니다.");
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        창원시 폐기물 수거 서비스
      </h1>

      <form onSubmit={handleWasteInfoSubmit} className="space-y-4">
        <div>
          <Label htmlFor="wasteType">폐기물 종류</Label>
          <Select
            id="wasteType"
            value={wasteType}
            name="wasteType"
            onChange={(e) => {
              setWasteType(e.target.value);
              handleChange(e);
            }}
          >
            <option value="">선택해주세요</option>
            <option value="appliance_waste">가전제품 폐기물</option>
            <option value="furniture_waste">가구 폐기물</option>
            <option value="general_household_waste">기타 생활 폐기물</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="totalWeight">총 폐기물 무게(단위 kg)</Label>
          <Input
            id="totalWeight"
            type="number"
            value={totalWeight}
            name="totalWeight"
            onChange={(e) => {
              setTotalWeight(e.target.value);
              handleChange(e);
            }}
            placeholder="무게를 입력하세요"
          />
        </div>
        <Button type="submit">비용 계산</Button>
      </form>

      {showCostEstimate && (
        <Alert>
          <AlertDescription>
            최소 3만 원에서 최대 20만 원의 비용이 청구될 수 있습니다.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">이름</Label>
          <Input
            id="name"
            value={name}
            name="name"
            onChange={(e) => {
              setName(e.target.value);
              handleChange(e);
            }}
            maxLength={20}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">전화번호</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
              handleChange(e);
            }}
            maxLength={20}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            value={email}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
              handleChange(e);
            }}
            maxLength={30}
            required
          />
        </div>
        <div>
          <Label htmlFor="address">주소</Label>
          <Textarea
            id="address"
            value={address}
            name="address"
            onChange={(e) => {
              setAddress(e.target.value);
              handleChange(e);
            }}
            maxLength={50}
            required
          />
        </div>
        <div>
          <Label htmlFor="visitTime">방문 요청 시간</Label>
          <Input
            id="visitTime"
            type="datetime-local"
            value={visitTime}
            name="visitTime"
            onChange={(e) => {
              setVisitTime(e.target.value);
              handleChange(e);
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="callTime">통화 가능 시간</Label>
          <Input
            id="callTime"
            type="time"
            value={callTime}
            name="callTime"
            onChange={(e) => {
              setCallTime(e.target.value);
              handleChange(e);
            }}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="privacyPolicy"
            required
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              개인정보 처리방침
            </a>
            에 동의합니다.
          </label>
        </div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "예약 신청"}
        </Button>
      </form>

      {submitMessage && (
        <Alert>
          <AlertDescription>{submitMessage}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
