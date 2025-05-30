"use client"

import React from 'react';
import { format } from "date-fns";
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

import { Select } from "@/components/select"
import { DatePicker } from '@/components/date-picker';
import { AmountInput } from '@/components/amount-input';
import { Checkbox } from '@/components/ui/checkbox';

type Props = {
    id?: string;
    defaultValues: {
        userId: string | null;                  // Peut être null si non défini
        reference: string;
        name: string;
        bank: string | null;                    // Peut être null si non défini
        branch: string | null;                  // Peut être null si non défini
        amount: string;
        paymentDate: Date | null;               // Peut être null si non défini
        paymentMode: string | null;             // Peut être null si non défini
        status: string | null;                  // Peut être null si non défini
        description: string;
        createdBy: string;
        createdAt: Date | null;                 // Peut être null si non défini
        validatedBy: string | null;             // Peut être null si non défini
        validatedAt: Date | null;               // Peut être null si non défini
        refusal: boolean;
        reasonForRefusal: string;        // Peut être null si non défini
        modifiedBy: string | null;              // Peut être null si non défini
        updatedAt: Date | null;                 // Peut être null si non 
    };
    disabled?: boolean;
    bankOptions: { label: string; value: string }[];
    branchOptions: { label: string; value: string }[];
    payModeOptions: { label: string; value: string }[];
    userOptions: { label: string; value: string }[];
    statusOptions: { label: string; value: string }[];
}


export const ViewRequestForm = (
    {
        id,
        defaultValues,
        disabled,
        bankOptions,
        branchOptions,
        payModeOptions,
        userOptions,
        statusOptions,
    }: Props) => {

    const form = useForm({
        defaultValues: defaultValues,
    });
    return (
        <Form {...form}>
            <form className="w-2/3 space-y-4 pt-4"
            >
                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="reference"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Reference</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>status</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder='Select a status'
                                        options={statusOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Customer</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>



                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Amount</FormLabel>
                                <FormControl>
                                    <AmountInput placeholder="0.00" {...field} onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="paymentDate"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Payment date</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={defaultValues?.paymentDate ? new Date(defaultValues.paymentDate) : new Date()}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="bank"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Bank</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder=''
                                        options={bankOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="branch"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Branch</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder='Select a branch'
                                        options={branchOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="paymentMode"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Payment Mode</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder='Select a payment mode'
                                        options={payModeOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    name="description"
                    render={() => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    value={defaultValues.description}
                                    disabled={disabled}
                                    placeholder="Description"

                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="createdBy"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Created By</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder='Select a user'
                                        options={userOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="createdAt"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>createdAt</FormLabel>
                                <FormControl>
                                    <Input value={defaultValues.createdAt ? format(defaultValues.createdAt, "dd/MM/yyyy HH:mm:ss") : ""} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-5">
                    <FormField
                        control={form.control}
                        name="validatedBy"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>validate By</FormLabel>
                                <FormControl>
                                    <Select
                                        placeholder='Select a user'
                                        options={userOptions}
                                        onCreate={() => ""}
                                        value={field.value}
                                        onChange={() => ""}
                                        disabled={disabled}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="validatedAt"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>validatedAt</FormLabel>
                                <FormControl>
                                    <Input value={defaultValues.validatedAt ? format(defaultValues.validatedAt, "dd/MM/yyyy HH:mm:ss") : ""} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                </div>

                <div className="flex gap-5">
                    {/* <FormField
                        control={form.control}
                        name="verifiedBy"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Final Validated By</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}

                    {/* <FormField
                        control={form.control}
                        name="verifiedAt"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Final validatedAt</FormLabel>
                                <FormControl>
                                    <Input value={defaultValues.verifiedAt ? format(defaultValues.verifiedAt, "dd/MM/yyyy HH:mm:ss") : ""} disabled={disabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}


                </div>


                {defaultValues.refusal &&

                    <FormField
                        name="reasonForRefusal"
                        render={() => (
                            <FormItem>
                                <FormLabel>
                                    <div className='flex gap-2 items-center'>
                                        <span>Reason of Refusal </span>
                                        <span><Checkbox
                                            checked={true}
                                            disabled /></span>
                                    </div>

                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={defaultValues.reasonForRefusal}
                                        disabled={disabled}

                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                }

                {!defaultValues.refusal &&
                    <div className="flex gap-5">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem className='flex-1'>
                                    <FormLabel>Assign To</FormLabel>
                                    <FormControl>
                                        <Select
                                            placeholder='Select a user'
                                            options={userOptions}
                                            onCreate={() => ""}
                                            value={field.value}
                                            onChange={() => ""}
                                            disabled={disabled}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                }
            </form>
        </Form>
    )
}
