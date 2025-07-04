import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { IBook, IBorrowBooksModalProps, IBorrowBook } from "@/types";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";



export function BorrowBooksModal({
  bookId,
  availableCopies,
}: IBorrowBooksModalProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [borrowBook] = useBorrowBookMutation();


  type BorrowFormValues = IBook & { quantity: number; dueDate: Date };

   const {
     register,
     handleSubmit,
     formState: { errors },
     reset,
   } = useForm<BorrowFormValues>();



  const onSubmit: SubmitHandler<BorrowFormValues> = async (data) => {
    console.log({data}, {errors})
    if (data.quantity > availableCopies) {
      toast("Quantity exceeds available copies!");
      return; 
    }
    try {
      const borrowData: IBorrowBook = {
        book: bookId,
        quantity: data.quantity,
        dueDate: data.dueDate,
      };

      if (data.quantity <= 0) {
        toast("The book is not available for borrowing!");
        return;
      }

      await borrowBook(borrowData).unwrap();
      
      toast.success("Book borrowed successfully!");
      reset();
      setOpen(false);
      navigate("/borrow-summary");
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-indigo-600 text-white hover:bg-indigo-500">
          Borrow
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              type="number"
              id="quantity"
              min={1}
              max={availableCopies}
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Minimum quantity is 1" },
                max: {
                  value: availableCopies,
                  message: `You can borrow maximum ${availableCopies}`,
                },
              })}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              {...register("dueDate", {
                required: "Due date is required",
              })}
            />
            {errors.dueDate && (
              <p className="text-sm text-red-500">{errors.dueDate.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-500"
            >
              Confirm Borrow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
