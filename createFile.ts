const encoder = new TextEncoder();

const helloText = encoder.encode("hello deno");

await Deno.writeFile("hello.txt", helloText);
