"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./Button";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function Modal({
  open,
  onOpenChange,
  children,
  title,
  description,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-card border border-border2 rounded-xl p-6 z-50 shadow-xl">
          {title && (
            <Dialog.Title className="text-lg font-bold mb-2">{title}</Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="text-sm text-muted mb-4">
              {description}
            </Dialog.Description>
          )}
          {children}
          <Dialog.Close asChild>
            <Button
              variant="ghost"
              className="absolute top-4 right-4 h-8 w-8 p-0"
            >
              ✕
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
