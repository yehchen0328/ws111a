import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

let notes = [
    {id:0, title: "new1", body:"aaa"},
    {id:1, title: "new2", body:"bbb"},
]

function listNotes(cont) {
    let lineshtml = []
    for (let note of notes){
        lineshtml.push(`
        <li>${note.title}
        <p><a href="/note/${note.id}">Read Note</a></p>
        <p><a href="http://127.0.0.1:8000/add">add</a></p>
        </li>
        `)
    } 
    cont.response.body = lineshtml.join('\n')
    cont.response.type = 'text/html'
}

function getNote(cont) {
    let id = parseInt(cont.params.id)
    let {title, body} = notes[id]
    cont.response.type = 'text/html'
    cont.response.body = `
        <h1>${title}</h1>
        <p>${body}</p>
        `
}

function add(cont){
    let lineshtml = []
    lineshtml.push (`
    <h1>New Post</h1>
    <p>Create a new post.</p>
    <form action="/create" method="post">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <p><input type="submit" value="Create"></p>
    </form>
    `)
    cont.response.body=lineshtml.join('\n')
    cont.response.type='text/html'
}

async function create(cont) {
    const body = cont.request.body()
        if (body.type === "form") {
            const pairs = await body.value
            const post = {}
            for (const [key, value] of pairs) {
                notes[key] = value
            }
    console.log('post=', post)
    const id = notes.push(post) - 1;
    notes.created_at = new Date();
    post.id = id;
    cont.response.redirect('/');
  }
}



router.get("/", listNotes)
      .get("/note/id",getNote)
      .get("/add",add)
      .get("/create",create)

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });