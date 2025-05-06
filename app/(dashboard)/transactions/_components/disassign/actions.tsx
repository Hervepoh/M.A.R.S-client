"use client"
import React, { useState } from 'react'
import { Edit, MoreHorizontal, RemoveFormatting, Send, Trash } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

import { useOpenRequest } from '@/features/transactions/hooks/use-open-request';
import { useEditRequest } from '@/features/transactions/api/use-edit-request';
import { useDeleteRequest } from '@/features/transactions/api/use-delete-request';
import { useUserStore } from '@/features/users/hooks/use-user-store';

import { useConfirm } from '@/hooks/use-confirm';
import { status } from '@/config/status.config';
import { hasPermission } from '@/lib/utils';
import { unicityById } from '@/lib/qa';
import { BiAddToQueue } from 'react-icons/bi';
import { useCreateAssignmentRequest } from '@/features/requests/api/use-create-action-request';
import { useEditUnassignRequest } from '@/features/transactions/api/use-edit-unassign-request';
import { FcRemoveImage } from 'react-icons/fc';
import { MdRemoveDone } from 'react-icons/md';


type Props = {
    id: string;
    reference: string;
}

export const Actions = ({ id , reference }: Props) => {
    const { user } = useUserStore();

    // Hook to manage the open/close state of the request modal
    const { onOpen, onClose } = useOpenRequest();

    // State to capture message comming from the server 
    const [message, setMessage] = useState("");

    // Hook to handle confirmation dialogs with a specific title and message
    const [ConfirmationDialog, confirm] = useConfirm({
        title: "Are you sure?",
        message
    });

    const editMutation = useEditUnassignRequest(id);
    const isPending = editMutation.isPending //|| deleteMutation.isPending

    const handleAssign = async () => {
        // Set a confirmation message 
        setMessage("You are about to un assignment this transaction");

        const ok = await confirm();
        if (ok) {
            editMutation.mutate(undefined, {
                onSuccess: () => {
                    onClose();
                },
            });
        }

    }

   // if (user && hasPermission(user, "TRANSACTION-UPDATE")) {
        return (
            <>
                <ConfirmationDialog />
                <Button
                    variant="destructive"
                    disabled={isPending}
                    onClick={handleAssign}
                >
                    <MdRemoveDone className="mr-2 size-4" />
                    <span>Assign to my team</span>
                </Button>
            </>
        )
    // }

    return
}
