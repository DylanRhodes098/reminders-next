// - - -  React imports - - - //
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Descriptions, Modal, Input, message } from "antd";
import type { DescriptionsProps } from 'antd';
import { userData, updateUser } from '../services/user';
import { EditOutlined } from '@ant-design/icons';
import "../styles/listStyle.css";

type EditField = "full_name" | "email" | "password";

export default function User() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState<EditField | null>(null);
  const [draft, setDraft] = useState("");
  const [saving, setSaving] = useState(false);

  const openEdit = useCallback(
    (field: EditField) => {
      setEditField(field);
      if (field === "full_name") setDraft(user?.full_name ?? "");
      else if (field === "email") setDraft(user?.email ?? "");
      else setDraft("");
    },
    [user]
  );

  const closeModal = () => {
    setEditField(null);
    setDraft("");
  };

  const handleOk = async () => {
    const userId = sessionStorage.getItem("id");
    if (!userId || !editField) return;

    const trimmed = draft.trim();
    if (!trimmed && editField !== "password") {
      message.warning("Please enter a value.");
      return;
    }
    if (editField === "password" && trimmed.length < 8) {
      message.warning("Password must be at least 8 characters.");
      return;
    }

    const payload =
      editField === "full_name"
        ? { full_name: trimmed }
        : editField === "email"
          ? { email: trimmed }
          : { password: trimmed };

    setSaving(true);
    try {
      const res = await updateUser(userId, payload);
      const updated = res?.user ?? null;
      if (updated) {
        setUser(updated);
      } else {
        setUser((prev: any) =>
          prev ? { ...prev, ...payload } : prev
        );
      }
      message.success("Profile updated");
      closeModal();
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Update failed";
      message.error(typeof msg === "string" ? msg : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const userId = sessionStorage.getItem("id");
        const data = await userData(userId);
        if (!cancelled) setUser(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const modalTitle =
    editField === "full_name"
      ? "Full name"
      : editField === "email"
        ? "Email"
        : editField === "password"
          ? "Password"
          : "";

  const descriptionProps: DescriptionsProps = useMemo(
    () => ({
      
      items: [
        {
          key: "full_name",
          label: "Full name",
          children: (
            <span className="flex items-start gap-2">
              <span className="min-w-0 flex-1">{user?.full_name || "—"}</span>
              <p className="text-gray-500 shrink-0 leading-[1em] pt-0.5"> | </p>
              <EditOutlined
                onClick={() => openEdit("full_name")}
                className="edit-icon shrink-0 pt-0.5"
                aria-label="Edit full name"
              />
            </span>
          ),
        },
        {
          key: "email",
          label: "Email",
          children: (
            <span className="flex items-start gap-2">
              <span className="min-w-0 flex-1">{user?.email || "—"}</span>
              <p className="text-gray-500 shrink-0 leading-[1em] pt-0.5"> | </p>
              <EditOutlined
                onClick={() => openEdit("email")}
                className="edit-icon shrink-0 pt-0.5"
                aria-label="Edit email"
              />
            </span>
          ),
        },
        {
          key: "password",
          label: "Password",
          children: (
            <span className="flex items-start gap-2">
              <span className="min-w-0 flex-1">********</span>
              <p className="text-gray-500 shrink-0 leading-[1em] pt-0.5"> | </p>
              <EditOutlined
                onClick={() => openEdit("password")}
                className="edit-icon shrink-0 pt-0.5"
                aria-label="Edit password"
              />
            </span>
          ),
        },
      ],
    }),
    [user, openEdit]
  );

  return (
    <div className="flex flex-col gap-10 pt-4 w-full max-w-2xl">
      <h1 className="text-2xl font-bold">Profile</h1>

      {loading ? <p>Loading…</p> : <Descriptions {...descriptionProps} />}

      <Modal
        title={modalTitle}
        closable={{ "aria-label": "Close" }}
        open={editField !== null}
        onOk={handleOk}
        onCancel={closeModal}
        confirmLoading={saving}
        destroyOnClose
      >
        {editField === "full_name" && (
          <Input
            placeholder="Full name"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="name"
          />
        )}
        {editField === "email" && (
          <Input
            type="email"
            placeholder="Email"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="email"
          />
        )}
        {editField === "password" && (
          <Input.Password
            placeholder="New password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="new-password"
          />
        )}
      </Modal>
    </div>
  );
}
