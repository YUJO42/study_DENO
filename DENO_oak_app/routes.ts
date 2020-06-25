import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Router } from "https://deno.land/x/oak/mod.ts";
import { Book } from "./types";

const router = new Router();

let books: Book[] = [
  {
    id: "1",
    title: "Book One",
    author: "ONE",
  },
  {
    id: "2",
    title: "Book Two",
    author: "Two",
  },
  {
    id: "3",
    title: "Book THRES",
    author: "THREE",
  },
];

router.get("/", (context) => {
  context.response.body = "Hello DENO";
})
  .get("/books", (context) => {
    context.response.body = books;
  })
  .post("/book", async (context) => {
    const body = await context.request.body();

    if (!context.request.hasBody) {
      context.response.status = 400;
      context.response.body = "Not have a Data";
    } else {
      const book: Book = body.value;
      book.id = v4.generate();
      books.push(book);
      context.response.status = 201;
      context.response.body = book;
    }
  })
  .get("/book/:id", async (Context) => {
    const book: Book | undefined = books.find((b) =>
      b.id === Context.params.id
    );

    if (book) {
      Context.response.body = book;
      Context.response.status = 200;
    } else {
      Context.response.body = "not find";
      Context.response.status = 400;
    }
  });

export default router;
