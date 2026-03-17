"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  verifyIdentity,
  getUploadUrl,
  uploadFileToPresignedUrl,
  confirmUpload,
  withTokenRefresh,
  type UploadUrlPayload,
} from "@/lib/api";

type TabId = "ssn" | "id-card";

export default function SsnVerificationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // SSN tab state
  const [ssn, setSsn] = useState("");
  const [submittingSsn, setSubmittingSsn] = useState(false);

  // ID Card tab state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submittingDoc, setSubmittingDoc] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>("ssn");

  const handleSsnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 4) setSsn(value);
  };

  const handleSsnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (ssn.length !== 4) {
      toast.error("Please enter 4 digits");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/contact");
      return;
    }
    setSubmittingSsn(true);
    try {
      const result = await withTokenRefresh(verifyIdentity, token, [ssn], {
        on404: () => router.push("/intake/contact"),
      });
      if (!result) return;
      if (result.status !== 200) {
        const message = result.data?.error?.message || result.data?.message || "Failed to verify identity. Please check your SSN and try again.";
        toast.error(message);
        return;
      }
      if (result.data?.verified === true) {
        toast.success(result.data?.message || "Identity verified successfully!");
        localStorage.clear();
        router.push("/");
        return;
      }
      toast.error("Identity verification failed. Please check your SSN and try again.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmittingSsn(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file ?? null);
  };

  const acceptFile = (file: File): boolean => {
    return file.type.startsWith("image/") || file.type === "application/pdf";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!submittingDoc) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (submittingDoc) return;
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    if (!acceptFile(file)) {
      toast.error("Please use an image or PDF file.");
      return;
    }
    setSelectedFile(file);
  };

  const buildUploadUrlPayload = (file: File): UploadUrlPayload => ({
    uploadType: "document",
    fileName: file.name,
    fileType: file.type || "application/octet-stream",
    documentType: "identity",
  });

  const handleIdCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select an ID document to upload.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No auth token found.");
      router.push("/intake/contact");
      return;
    }
    setSubmittingDoc(true);
    try {
      // Generate presigned URL for file upload
      const payload = buildUploadUrlPayload(selectedFile);
      const result = await withTokenRefresh(
        getUploadUrl,
        token,
        [payload],
        { on404: () => router.push("/intake/contact") }
      );

      if (!result) return;
      if (result.status !== 200) {
        const message = result.data?.error?.message || result.data?.message || "Failed to get upload URL. Please try again.";
        toast.error(message);
        return;
      }
      if (!result.data?.uploadUrl || !result.data?.fileKey || !result.data?.fields) {
        toast.error("Invalid response from server. Please try again.");
        return;
      }
      const { uploadUrl: url, fields, fileKey: key } = result.data;

      const uploadResult = await uploadFileToPresignedUrl(url, fields, selectedFile);
      if (uploadResult.status >= 300) {
        toast.error("Failed to upload file. Please try again.");
        return;
      }

      const confirmResult = await withTokenRefresh(
        confirmUpload,
        token,
        [key],
        { on404: () => router.push("/intake/contact") }
      );
      if (!confirmResult) return;
      if (confirmResult.status !== 200) {
        const message = confirmResult.data?.error?.message || confirmResult.data?.message || "Failed to confirm upload. Please try again.";
        toast.error(message);
        return;
      }

      toast.success(confirmResult.data?.message || "ID document uploaded and verified successfully!");
      localStorage.clear();
      router.push("/");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmittingDoc(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12 px-6 sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Verify Your Identity</h2>
      <p className="mb-8 text-center text-brand-400">
        Choose how you’d like to verify your identity.
      </p>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-10">
        <button
          type="button"
          onClick={() => setActiveTab("ssn")}
          className={`flex-1 py-4 text-sm sm:text-base font-medium transition cursor-pointer ${
            activeTab === "ssn"
              ? "text-brand-500 border-b-2 border-brand-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          SSN
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("id-card")}
          className={`flex-1 py-4 text-sm sm:text-base font-medium transition cursor-pointer ${
            activeTab === "id-card"
              ? "text-brand-500 border-b-2 border-brand-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          ID Card
        </button>
      </div>

      {/* SSN tab content */}
      {activeTab === "ssn" && (
        <>
          <p className="mb-8 text-center text-brand-400 text-sm sm:text-base">
            Please enter the last 4 digits of your Social Security Number.
          </p>
          <form onSubmit={handleSsnSubmit} className="space-y-8">
            <div>
              <label htmlFor="ssn" className="block text-sm font-medium mb-3">
                Last 4 digits of SSN
              </label>
              <input
                id="ssn"
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={ssn}
                onChange={handleSsnChange}
                disabled={submittingSsn}
                placeholder="****"
                className="w-full h-14 px-4 text-center text-xl border rounded-lg focus:border-brand-300 focus:ring-2 focus:ring-brand-200 outline-none transition bg-white disabled:bg-gray-100 disabled:text-gray-400"
                style={{ letterSpacing: "4px" }}
              />
            </div>
            <button
              type="submit"
              disabled={submittingSsn || ssn.length !== 4}
              className="w-full h-14 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {submittingSsn ? "Verifying..." : "Verify Identity"}
            </button>
          </form>
        </>
      )}

      {/* ID Card tab content */}
      {activeTab === "id-card" && (
        <>
          <p className="mb-8 text-center text-brand-400 text-sm sm:text-base">
            Upload a photo of your government-issued ID (driver’s license or passport).
          </p>
          <form onSubmit={handleIdCardSubmit} className="space-y-8">
            <div>
              <label htmlFor="id-document" className="block text-sm font-medium mb-3">
                ID document
              </label>
              <label
                htmlFor="id-document"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg cursor-pointer transition bg-gray-50 hover:bg-brand-50 hover:border-brand-300 border-gray-200 ${
                  selectedFile ? "border-brand-300 bg-brand-50/50" : ""
                } ${isDragging ? "border-brand-400 bg-brand-100" : ""} ${
                  submittingDoc ? "pointer-events-none opacity-70" : ""
                }`}
              >
                <input
                  ref={fileInputRef}
                  id="id-document"
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  onChange={handleFileChange}
                  disabled={submittingDoc}
                  className="hidden"
                />
                <span className="text-brand-600 font-medium cursor-pointer">Choose file</span>
                <span className="text-xs text-gray-500 mt-1">or drag and drop</span>
                <span className="text-xs text-gray-400 mt-0.5">Image or PDF</span>
              </label>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={submittingDoc || !selectedFile}
              className="w-full h-14 bg-brand-500 text-white font-semibold rounded-lg hover:bg-brand-600 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {submittingDoc ? "Uploading..." : "Upload & Verify"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
