"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

type SuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  primaryText: string;
  secondaryText: string;

  primaryHref?: string;

  onSecondary: () => void;
};

export default function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
  primaryText,
  secondaryText,
  primaryHref,
  onSecondary,
}: SuccessDialogProps) {
  const router = useRouter();

  function handlePrimary() {
    onOpenChange(false);

    if (primaryHref) {
      router.push(primaryHref);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>

        <AlertDialogHeader>

          <div className="mb-4 text-5xl">
            🎉
          </div>

          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <Button
            variant="outline"
            onClick={onSecondary}
          >
            {secondaryText}
          </Button>

          <AlertDialogAction
            onClick={handlePrimary}
          >
            {primaryText}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}