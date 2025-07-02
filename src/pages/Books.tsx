"use client";

import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import type { SortingState } from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IBook } from "@/types";


const data: IBook[] = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "FICTION",
    isbn: "978074327",
    description: "A novel set in the 1920s about the American dream.",
    copies: 5,
    available: true,
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    genre: "NON_FICTION",
    isbn: "978006231",
    description: "An exploration of the history and impact of Homo sapiens.",
    copies: 3,
    available: true,
  },
  {
    title: "The Selfish Gene",
    author: "Richard Dawkins",
    genre: "SCIENCE",
    isbn: "978019929",
    description: "A book on evolution and the gene-centered view of natural selection.",
    copies: 0,
    available: false,
  },
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    genre: "HISTORY",
    isbn: "978055329",
    description: "The diary of a Jewish girl hiding from the Nazis during World War II.",
    copies: 4,
    available: true,
  },
];



export const columns: ColumnDef<IBook>[] = [

  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("author")}</div>
    ),
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("genre")}</div>
    ),
  },
  {
    accessorKey: "isbn",
    header: "ISBN",
    cell: ({ row }) => <div className="capitalize">{row.getValue("isbn")}</div>,
  },
  {
    accessorKey: "copies",
    header: "Copies",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("copies")}</div>
    ),
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("available") ? "Yes" : "No"}
      </div>
    ),
  },
  {
    // accessorKey: "delete",
    header: "Delete",
    cell: ({ row }) => (
      <div className="capitalize">
        <Trash
          onClick={() => handleDelete(row.original.isbn)}
          className="h-4 w-4 text-red-600"
        />
      </div>
    ),
  },

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-right font-medium">{formatted}</div>;
  //   },
  // },
  {
    accessorKey: "sdf",
    header: () => <div className="text-right">Actions</div>,
    enableHiding: false,
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(book.isbn)}
            >
              Copy book ISBN
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function AllBooks() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = (id: string) => {
    console.log(handleDelete)
    console.log("Deleting book with id:", id);
  };

  return (
    <div className="w-full mx-auto">
      {/* Banner Section */}
      <div className="relative w-full h-[250px] md:h-[220px] overflow-hidden shadow-lg mb-6">
        <img
          src="https://cdn.pixabay.com/photo/2021/01/21/15/54/books-5937716_1280.jpg"
          alt="Books Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
            Explore Our Book Collection
          </h1>
          <p className="text-sm md:text-lg text-gray-200 mt-2 max-w-xl drop-shadow">
            Browse, search, and manage all available books in our library
            system.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Table Filters */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-200 mb-4">
          <Input
            placeholder="Search by Genre..."
            value={(table.getColumn("genre")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("genre")?.setFilterValue(event.target.value)
            }
            className="max-w-sm shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <DropdownMenu>
            <Button
              variant="outline"
              className="ml-auto flex items-center gap-2 bg-amber-600 hover:bg-amber-500 hover:text-white text-white"
            >
              Add New Book <ChevronDown className="h-4 w-4 font" />
            </Button>
            {/* <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto flex items-center gap-2"
              >
                Columns <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent align="end" className="w-48">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent> */}
          </DropdownMenu>
        </div>

        {/* Table Display */}
        <div className="rounded-xl border shadow-md overflow-x-auto ">
          <Table>
            <TableHeader className="bg-gray-100">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="text-sm font-semibold text-gray-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-2 px-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 space-x-0 md:space-x-2 py-6">
          <div className="text-muted-foreground text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2 flex">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-full"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}



