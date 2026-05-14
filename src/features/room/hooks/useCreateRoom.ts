import { useState, useMemo } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { type RoomData } from "../types/room";
import { transformToCreateRoomDto } from "../utils/roomTransform";
import { roomApi } from "../api/room.api";

export type RoomErrors = {
  nickname?: string;
  title?: string;
  category?: string;
  date?: string;
  deadline?: string;
};

export const useCreateRoom = () => {
  const [step, setStep] = useState(1);
  const [roomId, setRoomId] = useState("");
  const [showEmptyErrors, setShowEmptyErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<RoomData>(() => {
    const now = new Date();
    const formatDate = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const startDate = formatDate(
      new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
    );
    const endDate = formatDate(
      new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000),
    );
    const deadlineDate = formatDate(
      new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
    );

    const user = useAuthStore.getState().user;

    return {
      nickname: user?.nickname || "모임장",
      title: "",
      description: "",
      category: "",

      startDate,
      endDate,
      startTime: "18:00",
      endTime: "22:00",
      preferredDayType: "weekday",
      customDays: [],
      deadlineDate,
      deadlineTime: "09:00",
      collectOrigin: false,
    };
  });

  // 에러를 렌더링 중에 계산 (cascading render 방지)
  const errors = useMemo(() => {
    const newErrors: RoomErrors = {};

    // 1단계 검증 (닉네임)
    if (step === 1) {
      if (formData.nickname.length > 0 && formData.nickname.length < 2) {
        newErrors.nickname = "닉네임은 최소 2자 이상이어야 해요";
      } else if (showEmptyErrors && !formData.nickname.trim()) {
        newErrors.nickname = "닉네임을 입력해 주세요";
      }
    }

    // 2단계 검증 (모임 이름 + 카테고리)
    if (step === 2) {
      if (formData.title.length > 0 && formData.title.length < 2) {
        newErrors.title = "모임 이름은 최소 2자 이상이어야 해요";
      } else if (showEmptyErrors && !formData.title.trim()) {
        newErrors.title = "모임 이름을 입력해 주세요";
      }

      if (showEmptyErrors && !formData.category) {
        newErrors.category = "카테고리를 선택해 주세요";
      }
    }

    // 3단계 검증 (마감일 < 시작일)
    if (step === 3) {
      const startDateTime = `${formData.startDate}T${formData.startTime}`;
      const deadlineDateTime = `${formData.deadlineDate}T${formData.deadlineTime}`;

      if (
        formData.startDate &&
        formData.deadlineDate &&
        deadlineDateTime >= startDateTime
      ) {
        newErrors.deadline = "투표 마감은 모임 시작 전이어야 해요";
      }
    }

    return newErrors;
  }, [
    formData.nickname,
    formData.title,
    formData.category,
    formData.startDate,
    formData.deadlineDate,
    formData.startTime,
    formData.deadlineTime,
    step,
    showEmptyErrors,
  ]);

  const validateStep = () => {
    setShowEmptyErrors(true);

    if (step === 1) {
      if (!formData.nickname.trim() || formData.nickname.length < 2)
        return false;
    } else if (step === 2) {
      if (!formData.title.trim() || formData.title.length < 2) return false;
      if (!formData.category) return false;
    } else if (step === 3) {
      if (!formData.startDate || !formData.endDate) return false;
      if (!formData.deadlineDate || !formData.deadlineTime) return false;

      const startDateTime = `${formData.startDate}T${formData.startTime}`;
      const deadlineDateTime = `${formData.deadlineDate}T${formData.deadlineTime}`;

      if (deadlineDateTime >= startDateTime) return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setShowEmptyErrors(false);

    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setShowEmptyErrors(false);
    if (step > 1) setStep(step - 1);
  };

  const updateFormData = (val: Partial<RoomData>) => {
    setFormData((prev) => ({ ...prev, ...val }));
  };

  const submitRoom = async () => {
    if (!validateStep()) return null;

    setIsSubmitting(true);
    try {
      const payload = transformToCreateRoomDto(formData);
      const result = await roomApi.create(payload);
      setRoomId(result.slug); // 백엔드에서 받은 실제 slug로 업데이트
      return result;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    step,
    roomId,
    formData,
    errors,
    isSubmitting,
    handleNext,
    handleBack,
    updateFormData,
    submitRoom,
  };
};
