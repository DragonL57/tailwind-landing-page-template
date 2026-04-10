"use client";

import { useState } from "react";
import ProcessingScreen from "@/components/giaotiep-1-1/assessment/processing-screen";

export default function PreviewProcessingPage() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleProcess = async () => {
    const messages = [
      "Đang chuẩn bị...",
      "Đang chấm câu 1/6...",
      "Đang chấm câu 2/6...",
      "Đang chấm câu 3/6...",
      "Đang chấm câu 4/6...",
      "Đang chấm câu 5/6...",
      "Đang chấm câu 6/6...",
      "Đang đánh giá nội dung...",
      "Đang tính điểm tổng...",
      "Hoàn tất",
    ];

    for (let i = 0; i < messages.length; i++) {
      setProgress(Math.round((i / (messages.length - 1)) * 100));
      setMessage(messages[i]);
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  };

  return (
    <ProcessingScreen 
      recordingCount={6} 
      onProcess={handleProcess}
      progress={progress}
      progressMessage={message}
    />
  );
}
