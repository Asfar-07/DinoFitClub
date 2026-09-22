import { useState, type MouseEvent, type ReactElement } from "react";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const CONFIRM_WORD = "DELETE";

export interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm?: () => void;
}

export default function DeleteAccountDialog({
  open,
  onOpenChange,
  onConfirm = () => {},
}: DeleteAccountDialogProps): ReactElement {
  const [value, setValue] = useState<string>("");

  const isConfirmed = value === CONFIRM_WORD;

  const handleOpenChange = (next: boolean): void => {
    if (!next) setValue("");
    onOpenChange(next);
  };

  const handleConfirm = (e: MouseEvent<HTMLButtonElement>): void => {
    if (!isConfirmed) {
      e.preventDefault();
      return;
    }
    onConfirm();
    setValue("");
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md rounded-2xl border border-[#ff4a53d2] bg-(--secondary-bg-color) p-6 text-(--primary-text-color) shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        <AlertDialogHeader className="gap-2">
          <AlertDialogTitle className="text-xl font-extrabold text-(--primary-text-color)">
            Delete your DinoRyx account?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-(--secondary-text-color)">
            This action is permanent. Type <span className="font-bold text-red-500">{CONFIRM_WORD}</span> below to confirm.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Type ${CONFIRM_WORD}`}
          autoComplete="off"
          className="mt-2 w-full rounded-xl border border-(--secondary-text-color) bg-[#ffffff08] px-4 py-3 text-sm text-(--primary-text-color) outline-none placeholder:text-[#6b7684] transition focus:border-[#7be6df] focus:shadow-[0_0_0_3px_#7be6df26]"
        />

        <AlertDialogFooter className="mt-4 flex-row justify-end gap-3 sm:justify-end">
          <AlertDialogCancel className="rounded-full cursor-pointer border border-[#7be6df] bg-transparent px-5 py-2 text-sm font-bold text-(--primary-text-color) hover:text-(--primary-bg-color)">
            Cancel
          </AlertDialogCancel>
          <button
            onClick={handleConfirm}
            disabled={!isConfirmed}
            className="rounded-full cursor-pointer bg-[#dc2626] px-5 py-2 text-sm font-bold text-white transition hover:bg-[#dc2626] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#dc2626]/85"
          >
            <Trash2 size={14} className="mr-1.5 inline" />
            Permanently delete
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}