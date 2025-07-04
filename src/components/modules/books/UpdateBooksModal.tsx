import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import type { IBook } from "@/types";
import { useUpdateBookMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

export function UpdateBooksModal({
  bookId,
  booksData,
}: {
  bookId: string;
  booksData: Partial<IBook>;
}) {
  // const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [updateBook] = useUpdateBookMutation();

  const getFormDefaultValues = (data: Partial<IBook>) => ({
    title: data?.title || "",
    author: data?.author || "",
    isbn: data?.isbn || "",
    copies: data?.copies || 0,
    description: data?.description || "",
    genre: data?.genre || "",
  });

  const form = useForm({ defaultValues: getFormDefaultValues(booksData) });

  useEffect(() => {
    if (open) form.reset(getFormDefaultValues(booksData));
  }, [open, booksData]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const updateData: Partial<IBook> = {
        _id: bookId,
        ...data,
        copies: Number(data.copies),
        available: true,
      };
      
      // Calling updateBook mutation with the updated data
      await updateBook({ _id: bookId, booksData: updateData }).unwrap();

      toast.success("Book updated successfully!");
      form.reset();
      setOpen(false);
    } catch (err: any) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MoreHorizontal className="h-4 w-4 text-gray-600" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add Your Book
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="author"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="isbn"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="copies"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="genre"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FICTION">FICTION</SelectItem>
                      <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                      <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                      <SelectItem value="HISTORY">HISTORY</SelectItem>
                      <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                      <SelectItem value="FANTASY">FANTASY</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button className="mt-5" type="submit">
                Save Book
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
