import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminIssueCard from "./AdminIssueCard";
import AdminEditModal from "./AdminEditModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function AdminDashboard() {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingIssue, setEditingIssue] = useState(null);

  // ✅ Fake issues
  const [issues, setIssues] = useState([
    {
      _id: "1",
      title: "Overflowing garbage near bus stop",
      description: "Garbage has not been collected for 3 days.",
      status: "UNSOLVED",
    },
    {
      _id: "2",
      title: "Plastic waste dumped in open ground",
      description: "Large plastic waste pile causing smell.",
      status: "IN_PROGRESS",
    },
    {
      _id: "3",
      title: "Dead animal on roadside",
      description: "Needs immediate removal.",
      status: "RESOLVED",
    },
  ]);

  // 🔁 UI-only status update
  const handleStatusChange = (id, status) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? { ...issue, status } : issue
      )
    );
  };

  // ✏️ UI-only edit save
  const handleEditSave = (id, data) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue._id === id ? { ...issue, ...data } : issue
      )
    );
    setEditingIssue(null);
  };

  // ❌ Step 1: only OPEN confirmation modal
  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  // ❌ Step 2: actual delete AFTER confirmation
  const handleDeleteConfirm = () => {
    setIssues((prev) =>
      prev.filter((issue) => issue._id !== deleteTarget)
    );
    setDeleteTarget(null);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-800">
      <AdminSidebar />

      <main className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Issue Moderation
        </h1>

        {issues.map((issue) => (
          <AdminIssueCard
            key={issue._id}
            issue={issue}
            onStatusChange={handleStatusChange}
            onEdit={setEditingIssue}
            onDelete={handleDelete}
          />
        ))}
      </main>

      {editingIssue && (
        <AdminEditModal
          issue={editingIssue}
          onClose={() => setEditingIssue(null)}
          onSave={handleEditSave}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
