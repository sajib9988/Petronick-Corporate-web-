"use client";

import { useState, useEffect, useCallback } from "react";
import { Mail, Loader2, Trash2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { getAllContacts, deleteContact } from "@/service/contact";

type Contact = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContacts = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await getAllContacts({
        search,
        limit: 100,
      });

      setContacts(result?.data ?? []);
    } catch {
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts();
    }, 300);

    return () => clearTimeout(timer);
  }, [fetchContacts]);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);

    try {
      await deleteContact(deleteId);

      setDeleteId(null);
      fetchContacts();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-5 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">
          Contact Messages
        </h2>

        <p className="text-sm font-medium text-gray-400 mt-0.5">
          View messages sent through the contact form
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <Input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-8 text-white placeholder:text-gray-500"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-900 rounded-xl border border-gray-100 animate-pulse"
            />
          ))}
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-gray-900 rounded-xl border border-gray-100 px-6 py-16 text-center">
          <Mail
            size={28}
            className="text-gray-500 mx-auto mb-3"
          />

          <p className="text-sm text-gray-400">
            No messages yet.
          </p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-700">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="px-5 py-4 hover:bg-gray-800 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Name / Email / Phone */}
                  <div className="flex items-center gap-3 mb-1">
                    <p className="text-sm font-semibold text-white">
                      {contact.name}
                    </p>

                    <p className="text-xs text-gray-400">
                      {contact.email}
                    </p>

                    {contact.phone && (
                      <p className="text-xs text-gray-400">
                        {contact.phone}
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  {contact.subject && (
                    <p className="text-xs font-medium text-amber-400 bg-amber-50 py-1 px-2 rounded-full w-fit mb-1.5">
                      {contact.subject}
                    </p>
                  )}

                  {/* Message */}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {contact.message}
                  </p>

                  {/* Date */}
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(contact.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  onClick={() => setDeleteId(contact.id)}
                  title="Delete message"
                  aria-label="Delete message"
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-100 transition-all"
                >
                  <Trash2 size={13} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Dialog */}
      <Dialog
        open={!!deleteId}
        onOpenChange={(open: boolean) =>
          !isDeleting && !open && setDeleteId(null)
        }
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              Delete Message
            </DialogTitle>

            <DialogDescription>
              This message will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              disabled={isDeleting}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting && (
                <Loader2
                  size={13}
                  className="mr-1.5 animate-spin"
                />
              )}

              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}