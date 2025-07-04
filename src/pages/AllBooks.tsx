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
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
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
import {
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/bookApi";
import Loader from "@/components/layout/Loader";
import { Link } from "react-router";
import { BorrowBooksModal } from "@/components/modules/borrowBooks/BorrowBooksModal";
import { toast } from "sonner";
import { UpdateBooksModal } from "@/components/modules/books/UpdateBooksModal";

export function AllBooks() {
  // Consuming the API to get books data from Rtk Query
  const { data: booksResponse, isLoading } = useGetBooksQuery({
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // DELETE book mutation
  const [deleteBook] = useDeleteBookMutation();

  // Function to handle book deletion
  const handleDeleteBook = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (confirmDelete) {
      try {
        await deleteBook({ _id: id });
        toast("Book deleted successfully");
      } catch (error) {
        toast.error("Failed to delete book. Please try again.");
      }
    }
  };


  // Table columns definitions
  const columns: ColumnDef<IBook>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize ">{row.getValue("title")}</div>
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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("isbn")}</div>
      ),
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
          {row.getValue("available") ? "Yes" : "not available"}
        </div>
      ),
    },
    {
      accessorKey: "delete",
      header: "Delete",
      cell: ({ row }) => (
        <div className="capitalize">
          <button
            type="button"
            onClick={() => handleDeleteBook(row.original._id)}
            className="p-0 bg-transparent border-none"
          >
            <Trash className="h-4 w-4 text-red-600" />
          </button>
        </div>
      ),
    },
    {
      accessorKey: "edit",
      header: "Edit",
      cell: ({ row }) => (
        <div className="capitalize cursor-pointer">
          <UpdateBooksModal
            bookId={row.original._id}
            booksData={row.original}
          />
        </div>
      ),
    },
    {
      accessorKey: "borrow",
      header: "Borrow Book",
      cell: ({ row }) => (
        <div className="capitalize">
          <BorrowBooksModal
            bookId={row.original._id}
            availableCopies={row.original.copies}
          />
        </div>
      ),
    },
  ];

  // Hooks
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // ensuring booksResponse is an array
  const booksData: IBook[] = Array.isArray(booksResponse?.data)
    ? booksResponse.data
    : [];

  // React Table instance
  const table = useReactTable({
    data: booksData,
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

  if (isLoading) {
    return <Loader />;
  }

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
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-4">
          <Input
            placeholder="Search by Genre..."
            value={(table.getColumn("genre")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("genre")?.setFilterValue(event.target.value)
            }
            className="max-w-sm shadow-sm focus:ring-2 focus:ring-blue-500"
          />

          <DropdownMenu>
            <div className="flex space-x-4">
              <Link to="/add-book">
                <Button
                  variant="outline"
                  className="ml-auto flex items-center gap-2 bg-amber-600 hover:bg-amber-500 hover:text-white text-white"
                >
                  Add New Book
                </Button>
              </Link>
            </div>
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
