import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertAmountFromMilliunits(amount: number) {
  // TODO: check the user currency to improve the reverse conversion
  const taux = 1 // 1000
  return amount / taux;
}

export function convertAmountToMilliunits(amount: number) {
  // TODO: check the user currency to improve conversion
  const taux = 1 // 1000
  return Math.round(amount * taux);
}

export function formatCurrency(value: number) {
  // TODO: get locale dynamically // DOC:  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat#digit_options
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF", // also supports XOF | USD | EUR | JPY  read ISO 4217 currency names
    // minimumFractionDigits: 2,
  }).format(value)

  return formatted;
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false },
) {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "percent",
  }).format(value / 100)


  if (options.addPrefix && value > 0) {
    return `+${formatted}`;
  }

  return formatted;
}

export function calculatePercentageChange(
  current: number,
  previous: number
) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 100;

};

export function fillMissingDays(activeDays: {
  date: Date,
  income: number,
  expenses: number
}[],
  startDate: Date,
  endDate: Date) {
  if (activeDays.length === 0) return [];
  const allDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));
    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0
      }
    }
  });

  return transactionsByDay;
}


// Function to check if the date is in the format DD/MM/YYYY
export const isValidDate = (dateString: string): boolean => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(20\d{2})$/; // Match DD/MM/YYYY
  return regex.test(dateString);
};


export const formatDate = (date: string | number | Date) => {
  date = new Date(date);
  const month = date.getMonth() + 1; // Add 1 because month values are zero-based
  const day = date.getDate();
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (formattedDate);
}

// Function to get the current date formatted as YYYY-MM-DD
export const getCurrentDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to get the current date and time formatted as YYYYMMDD-HHMMSS
export const getCurrentDateTime = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
};



type Period = {
  to: string | Date | undefined;
  from: string | Date | undefined;
}

export function formatDateRange(period: Period) {
  const DATEFORMAT = "LLL dd";
  const DATEFORMATYEAR = "LLL dd, y";
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    if (isSameYear(defaultFrom, defaultTo)) {
      return `${format(defaultFrom, DATEFORMAT)} - ${format(defaultTo, DATEFORMATYEAR)}`
    }

    return `${format(defaultFrom, DATEFORMATYEAR)} - ${format(defaultTo, DATEFORMATYEAR)}`
  }

  if (period.to) {
    if (isSameYear(new Date(period.from), new Date(period.to))) {
      return `${format(period.from, DATEFORMAT)} - ${format(period.to, DATEFORMATYEAR)}`
    }
    return `${format(period.from, DATEFORMATYEAR)} - ${format(period.to, DATEFORMATYEAR)}`
  }

  return format(period.from, DATEFORMATYEAR);

}

export function isSameYear(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear();
}


interface Permission {
  id: string;
  name: string;
}

interface RolePermission {
  permission: Permission;
}

interface Role {
  id: string;
  name: string;
  RolePermission: RolePermission[];
}

interface User {
  id: string;
  name: string;
  email: string;
  roles: { userId: string; roleId: string }[];
  role: Role;
}


// export function hasPermission(user: User, permissionName: string): boolean {
//   return user.role?.RolePermission.some(rolePermission => 
//       rolePermission.permission.name === permissionName
//   );
// }
export function hasPermission(user: User, ...permissionNames: string[]): boolean {
  return user.role?.RolePermission.some(rolePermission =>
    permissionNames.includes(rolePermission.permission.name)
  ) ?? false;
}


// Define a type for the entity
interface Entity {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

// Function to get bank ID by bank name  Or get Payement Mode ID by payment Mode name 
export const getEntityIdByName = (entity_name: string, entity_List: Entity[]): string => {
  const entity = entity_List.find(e => e.name === entity_name);
  return entity ? entity.id : "";
};
export const getEntityNameById = (entity_id: string, entity_List: Entity[]): string => {
  const entity = entity_List.find(e => e.id === entity_id);
  return entity ? entity.name : "";
};


// Function to get entity By ID
export const getEntityById = (entity_id: string, entity_List: Entity[]) => {
  return entity_List.find(entity => entity.id === entity_id) || null;
}





export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: 'accurate' | 'normal';
  } = {}
) {
  const { decimals = 0, sizeType = 'normal' } = opts;

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
  if (bytes === 0) return '0 Byte';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === 'accurate'
      ? (accurateSizes[i] ?? 'Bytest')
      : (sizes[i] ?? 'Bytes')
  }`;
}
