import Loader from "@/components/layout/Loader";
import { Button } from "@/components/ui/button";
import { useCreateBookMutation } from "@/redux/api/bookApi";
import type { IBookData } from "@/types";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddBook() {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBookData>();

  const [createBook, { data, isLoading }] = useCreateBookMutation();
  console.log({ data });

  const onSubmit: SubmitHandler<IBookData> = async (data) => {
    const bookData: IBookData = {
      ...data,
      available: true,
    };

    await createBook(bookData)
      .unwrap()
      .then(() => {
        toast("Book added successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error creating book:", error);
        toast.error("Failed to add book!");
      });

    if (isLoading) {
      return <Loader />;
    }

    console.log({ bookData });

    setTimeout(() => {
      navigate("/all-books");
    }, 500);
    reset(); // Reset form after submit
  };
  return (
    <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 max-w-7xl mx-auto">
      <div className="container">
        <div className="flex flex-wrap lg:justify-between -mx-4">
          <div className="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div className="px-12 mb-12 lg:mb-0">
              <span className="block mb-4 text-base text-primary font-semibold">
                Add Book
              </span>
              <h2
                className="
                  text-dark
                  mb-6
                  uppercase
                  font-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
              >
                Add a new book here
              </h2>
              <p className="text-base text-body-color leading-relaxed mb-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eius tempor incididunt ut labore et dolore magna aliqua. Ut enim
                adiqua minim veniam quis nostrud exercitation ullamco
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-5/12 px-4">
            <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Title */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Title"
                    {...register("title", { required: "Title is required" })}
                    className="w-full rounded py-3 px-[14px] border text-base outline-none focus:border-primary"
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                </div>

                {/* Author */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Author"
                    {...register("author", { required: "Author is required" })}
                    className="w-full rounded py-3 px-[14px] border text-base outline-none focus:border-primary"
                  />
                  {errors.author && (
                    <p className="text-red-500">{errors.author.message}</p>
                  )}
                </div>

                {/* Genre */}
                <div className="mb-4">
                  <Controller
                    control={control}
                    name="genre"
                    rules={{ required: "Genre is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full text-md text-base">
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Genres</SelectLabel>
                            <SelectItem value="FICTION">FICTION</SelectItem>
                            <SelectItem value="NON_FICTION">
                              NON_FICTION
                            </SelectItem>
                            <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                            <SelectItem value="HISTORY">HISTORY</SelectItem>
                            <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                            <SelectItem value="FANTASY">FANTASY</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.genre && (
                    <p className="text-red-500 text-sm">
                      {errors.genre.message}
                    </p>
                  )}
                </div>

                {/* ISBN */}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="ISBN"
                    {...register("isbn", { required: "ISBN is required" })}
                    className="w-full rounded py-3 px-[14px] border text-base outline-none focus:border-primary"
                  />
                  {errors.isbn && (
                    <p className="text-red-500">{errors.isbn.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4">
                  <textarea
                    rows={4}
                    placeholder="Description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    className="w-full rounded py-3 px-[14px] border text-base outline-none resize-none focus:border-primary"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}
                </div>

                {/* Copies */}
                <div className="mb-6">
                  <input
                    type="number"
                    placeholder="Number of Copies"
                    {...register("copies", {
                      required: "Copies is required",
                      valueAsNumber: true,
                      min: { value: 1, message: "At least 1 copy required" },
                    })}
                    className="w-full rounded py-3 px-[14px] border text-base outline-none focus:border-primary"
                  />
                  {errors.copies && (
                    <p className="text-red-500">{errors.copies.message}</p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-4">
                  <Button type="submit" variant="outline">
                    Save Book
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => reset()}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
              <div>
                <span className="absolute -top-10 -right-9 z-[-1]">
                  <svg
                    width="100"
                    height="100"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clipRule="evenodd"
                      d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                      fill="#3056D3"
                    />
                  </svg>
                </span>
                <span className="absolute -right-10 top-[90px] z-[-1]">
                  <svg
                    width="34"
                    height="134"
                    viewBox="0 0 34 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="31.9993"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 31.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 31.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 31.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 31.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 31.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 31.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 31.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 31.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 31.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 31.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 17.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 17.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 17.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 17.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 17.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 17.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 17.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 17.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 17.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 17.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 2.66536 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 2.66536 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 2.66536 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 2.66536 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 2.66536 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 2.66536 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 2.66536 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 2.66536 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 2.66536 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 2.66536 1.66665)"
                      fill="#13C296"
                    />
                  </svg>
                </span>
                <span className="absolute -left-7 -bottom-7 z-[-1]">
                  <svg
                    width="107"
                    height="134"
                    viewBox="0 0 107 134"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="104.999"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 104.999 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 104.999 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 104.999 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 104.999 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 104.999 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 104.999 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 104.999 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 104.999 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 104.999 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="104.999"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 104.999 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 90.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 90.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 90.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 90.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 90.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 90.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 90.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 90.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 90.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="90.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 90.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 75.6654 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 31.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 75.6654 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 31.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 75.6654 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 31.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 75.6654 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 31.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 75.6654 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 31.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 75.6654 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 31.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 75.6654 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 31.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 75.6654 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 31.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 75.6654 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 31.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="75.6654"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 75.6654 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="31.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 31.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 60.9993 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 17.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 60.9993 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 17.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 60.9993 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 17.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 60.9993 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 17.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 60.9993 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 17.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 60.9993 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 17.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 60.9993 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 17.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 60.9993 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 17.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 60.9993 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 17.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="60.9993"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 60.9993 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="17.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 17.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 46.3333 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="132"
                      r="1.66667"
                      transform="rotate(180 2.66536 132)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 46.3333 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="117.333"
                      r="1.66667"
                      transform="rotate(180 2.66536 117.333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 46.3333 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="102.667"
                      r="1.66667"
                      transform="rotate(180 2.66536 102.667)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 46.3333 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="88"
                      r="1.66667"
                      transform="rotate(180 2.66536 88)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 46.3333 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="73.3333"
                      r="1.66667"
                      transform="rotate(180 2.66536 73.3333)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 46.3333 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="45"
                      r="1.66667"
                      transform="rotate(180 2.66536 45)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 46.3333 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="16"
                      r="1.66667"
                      transform="rotate(180 2.66536 16)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 46.3333 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="59"
                      r="1.66667"
                      transform="rotate(180 2.66536 59)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 46.3333 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="30.6666"
                      r="1.66667"
                      transform="rotate(180 2.66536 30.6666)"
                      fill="#13C296"
                    />
                    <circle
                      cx="46.3333"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 46.3333 1.66665)"
                      fill="#13C296"
                    />
                    <circle
                      cx="2.66536"
                      cy="1.66665"
                      r="1.66667"
                      transform="rotate(180 2.66536 1.66665)"
                      fill="#13C296"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
