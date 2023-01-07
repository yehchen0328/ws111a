import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

function page(body) {
  return `<html>
  <head>
  <style>
  </style>
  </head>
  <body>
  ${body}
  </body>
  </html>`
}

app.use((ctx) => {
  console.log('ctx.request.url=', ctx.request.url)
  let pathname = ctx.request.url.pathname
  if (pathname.startsWith("/login")) {
    ctx.response.body = page(`
       <form action="" method="post">
         <div class = "form-item">
           <input type="text" name="user" value="" placeholder="User Name" required autofocus/>
         </div>
         <div class = "form-item">
           <input type="password" name="password" value="" placeholder="Password" required/>
         </div>
         <div class = "form-item-other ">
           <div class="checkbox">
            <input type="checkbox" id="rememberMecheckbox">
            <label for="rememberMecheckbox">Remember me</label>
           </div>
           <a href="#">I forget my password!</a>
         </div>
         <button type="submit">Sign In</button>
       </form>

    `)
  } else {
    ctx.response.body = page(`
      <h1>我的網站</h1>
      <p><a href="http://127.0.0.1:8000/login">login</a></p>
    `)
  }
  // searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });