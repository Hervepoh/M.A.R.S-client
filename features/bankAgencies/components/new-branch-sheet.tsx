import { z } from "zod";

import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { CategoryForm } from "@/features/categories/components/category-form";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";



/* Form validation */
const formSchema = z.object({
    name: z.string(),
});
type FormValues = z.input<typeof formSchema>;
/* Form validation */


export function NewBankBranchSheet() {
    const { isOpen, onClose } = useNewCategory();
    const mutation = useCreateCategory();

    const onSubmit = (values: FormValues) => {
       mutation.mutate(values , {
        onSuccess: () => {
            onClose();
        },
       });
    }
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4" side="right_special">
                <SheetHeader>
                    <SheetTitle>New Bank Branch</SheetTitle>
                    <SheetDescription>
                        Create a new bank branch to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                    id={undefined}
                    defaultValues={{
                        name: '',
                    }}
                    onDelete={undefined}
                />
            </SheetContent>
        </Sheet>
    )
}
