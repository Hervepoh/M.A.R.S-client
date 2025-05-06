"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { cn, formatCurrency } from "@/lib/utils";
import { status, statuses, statusStyles } from "@/config/status.config";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Actions } from "./actions";

import { columnsFilter } from "@/components/data-table-with-advance-filter"

export const columnsFilters:columnsFilter[] = [
  { accessorKey: 'reference', title: 'reference' },
  { accessorKey: 'name', title: 'Name' },
  { accessorKey: 'amount', title: 'Amount' },
  { accessorKey: 'bank', title: 'Bank' },
  { accessorKey: 'branch',  title: 'Branch' },
  { accessorKey: 'paymentMode', title: 'Payment Mode' },
  { accessorKey: 'paymentDate',  title: 'Payment Date' },
];

interface ResponseType {
  id: string;
  reference: string;
  name: string;
  amount: string;
  bank: string;
  paymentDate: Date;
  paymentMode: string;
  status: string;
  categoryId: string;
  unit: string;
  isUserAuthorizedForAction: boolean;
  isReceiptReady:boolean;
}

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reference' />
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )

      if (!status) {
        return null
      }
      const rowStatus: string = row.getValue("status");
      return (
        <div className='flex w-[100px] items-center'>
          <Badge
            variant="outline"
            className="px-3.5 py-2.5 text-center">
            {status.icon && (
              <status.icon className={cn("mr-2 h-4 w-4 text-muted-foreground", status.iconColor)} />
            )}
            <span>{status.label.toLocaleUpperCase()}</span>
          </Badge>

        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Customer' />
    ),
  },

  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = formatCurrency(amount);

      return <Badge variant={amount < 0 ? "destructive" : "primary"} className="text-md font-medium px-3.5 py-2.5">{formatted}</Badge>
    },
  },

  {
    accessorKey: "bank",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Bank' />
    ),
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='branch' />
    ),
  },

  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => {
      const date = row.getValue("paymentDate") as Date;

      return <span>{format(date, "dd/MM/yyyy")}</span>;
    },
  },

  {
    accessorKey: "paymentMode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Mode' />
    ),
  },

  {
    id: "actions",
    header: ({ column }) => ("Actions"),
    cell: ({ row }) => {
      return (
       <Actions id={row.original.id} reference={row.original.reference}/>
      );
    },
    enableSorting: false,
  },
];
