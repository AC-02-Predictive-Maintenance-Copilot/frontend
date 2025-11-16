import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

const CreateColumns = (handleDeleteClick, handleViewDetails) => [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket ID <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "machineId",
    header: "Machine ID",
    cell: ({ row }) => <div>{row.getValue("machineId")}</div>,
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Priority <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority = row.getValue("priority");
      const priorityColors = {
        high: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-950",
        medium:
          "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-950",
        low: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950",
      };
      return (
        <div
          className={`capitalize px-2 py-1 rounded-md text-xs font-medium inline-block ${priorityColors[priority]}`}
        >
          {priority}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityA = priorityOrder[rowA.getValue("priority")];
      const priorityB = priorityOrder[rowB.getValue("priority")];
      return priorityA - priorityB;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColors = {
        open: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-950",
        "in-progress":
          "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-950",
        resolved:
          "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-950",
      };
      return (
        <div
          className={`capitalize px-2 py-1 rounded-md text-xs font-medium inline-block ${statusColors[status]}`}
        >
          {status.replace("-", " ")}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const statusOrder = { open: 3, "in-progress": 2, resolved: 1 };
      const statusA = statusOrder[rowA.getValue("status")];
      const statusB = statusOrder[rowB.getValue("status")];
      return statusA - statusB;
    },
  },
  {
    accessorKey: "problem",
    header: "Problem",
    cell: ({ row }) => (
      <div className="max-w-[300px] truncate">{row.getValue("problem")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ticket = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(ticket.id);
                toast.success("Ticket ID copied to clipboard!", { duration: 3000 });
              }}
            >
              Copy ticket ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleViewDetails(ticket)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit ticket</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDeleteClick(ticket.id)}
            >
              Delete ticket
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  ];

  export default CreateColumns;