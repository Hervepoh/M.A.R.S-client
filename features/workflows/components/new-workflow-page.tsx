"use client"

import { z } from "zod";

import { useRouter } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader
} from '@/components/ui/card';
import { Heading } from "@/components/ui/heading";

import { useCreateWorkflow } from "../api/use-create-workflow";
import { UserForm } from "@/features/users/components/user-form";

import { WorkflowForm } from "./workflow-form";
import { formSchema } from "./workflow-schema";


type FormValues = z.input<typeof formSchema>;

export function NewWorkflowPage() {
    const router = useRouter();

    const mutation = useCreateWorkflow();

    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: (data) => {
                router.push(`/admin/workflow/${data.id}/steps/new`);
            },
        });
    }

    return (
        <Card className="mx-auto w-full">
            <CardHeader>
                <Heading
                    title='Workflow'
                    description="Creation d'un nouveau Workflow"
                />
            </CardHeader>
            <CardContent>
                <WorkflowForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    id={undefined}
                    defaultValues={{
                        name: '',
                        description: '',
                        isActive: true,
                    }}
                    onAction={undefined}
                    onDelete={undefined}
                />
            </CardContent>
        </Card>

    )
}
