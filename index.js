// Content-Security-Policy: default-src 'self'; style-src 'self' https://cdn.jsdelivr.net; script-src 'self' 'nonce-your-nonce-value';
// 
import express from "express";
const port=3000;
const app= express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

  
var id=[];
function blogPost(time,username,title,blog,index){
    this.time=time;
    this.username=username;
    this.title=title;
    this.blog=blog;
    var currIndex=Math.floor(Math.random() * 1000) + 1;
    if(this.username==="Shikhar"){
        this.index=100;
    }
    else{
    if(id.indexOf(currIndex)===-1){
        this.index=currIndex;
    }
    else{
        var currIndex=Math.floor(Math.random() * 1000) + 1;
        if(id.indexOf(currIndex)===-1){
            this.index=currIndex;
        }
        else{
            var currIndex=Math.floor(Math.random() * 1000) + 1;
            this.index=currIndex;
        }
    }
    }
}
var blogs=[];
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/write",(req,res)=>{
    res.render("write.ejs");
});
app.get("/read",(req,res)=>{
    blogs.sort((a, b) => new Date(b.time) - new Date(a.time));
    res.render("reader.ejs",{blogs:blogs});
});
app.post("/submit",(req,res)=>{
    var blog=(req.body["text"]);
    var username=req.body["username"];
    var topic=req.body["topic"];
    var postDate=new Date();
    var bp=new blogPost(postDate,username,topic,blog);
    var newRoute=bp.index;
    app.get(`/read/${newRoute}`,(req,res)=>{
        const curr = blogs.find(obj => obj.index === newRoute);
            if (curr) {
            res.render("blog.ejs", { curr:curr });
        } else {
            res.status(404).send('Blog not found');
    }
    });
    blogs.push(bp);
    blogs.sort((a, b) => new Date(b.time) - new Date(a.time));
    res.render("reader.ejs",{blogs});
});

app.listen(port,()=>{
    console.log(`Running on port ${port}`);
});
const currentDate = new Date();
var bp1=new blogPost(currentDate,"Anon","The Silent Flight: Secrets of Owls",'Owls, known for their silent flight, are natures nocturnal hunters. With keen vision and exceptional hearing, they are masters of stealth, effortlessly capturing prey under the cover of darkness. These enigmatic birds of prey have fascinated humans with their wisdom and mysterious allure for centuries.',100);
var bp2=new blogPost(currentDate,"Anon",'Are We Alone?','From mysterious signals in deep space to the study of potentially habitable exoplanets, the pursuit of extraterrestrial intelligence continues to push the boundaries of our understanding.');
var bp3=new blogPost(currentDate,"Anon",'The Thrilling World of Basketball: Where Legends Are Made',"Whether you're shooting hoops in the driveway or cheering for your favorite team, basketball's enduring appeal transcends borders, making it a global phenomenon.");
app.get('/edit', (req, res) => {
    // Extract the 'index' query parameter
    const index = req.query.index;

    // Assuming you have a 'blogs' array with your blog data
    const blogToEdit = blogs.find(blog => blog.index === Number(index));

    if (blogToEdit) {
        // Render the edit page with the selected blog post
        res.render('edit.ejs', { blog: blogToEdit });
    } else {
        // Handle the case where the blog post is not found
        res.status(404).send('Blog post not found');
    }
});
app.post('/update-blog/:index', (req, res) => {
    const newBlogContent = req.body.newBlogContent;
    const id=req.params.index;
    const currBlog = blogs.find(blog => blog.index === Number(id));

    // Update the blog object
    currBlog.blog = newBlogContent;
    currBlog.time = new Date();

    // Send a response to confirm the update
    res.render('blog.ejs',{curr:currBlog});
});
app.post("/delete/:index",(req,res)=>{
    const delIndex = req.params.index;
    console.log(`deleted index is ${delIndex}`);

    for (let j = blogs.length - 1; j >= 0; j--) {
        if (blogs[j].index === Number(delIndex)) {
            blogs.splice(j, 1);
            break;
        }
    }
    console.log(blogs); 
    res.render("reader.ejs",{blogs,blogs});
    });
blogs.push(bp1);
blogs.push(bp2);
blogs.push(bp3)
app.get(`/read/${bp1.index}`,(req,res)=>{
    const curr = blogs.find(obj => obj.index === bp1.index);
    if (curr) {
        res.render("blog.ejs", { curr });
    } else {
        res.status(404).send('Blog not found'); // Handle the case where the blog is not found
    }
});
app.get(`/read/${bp2.index}`,(req,res)=>{
    const curr = blogs.find(obj => obj.index === bp2.index);
    if (curr) {
        res.render("blog.ejs", { curr });
    } else {
        res.status(404).send('Blog not found'); // Handle the case where the blog is not found
    }
});
app.get(`/read/${bp3.index}`,(req,res)=>{
    const curr = blogs.find(obj => obj.index === bp3.index);
    if (curr) {
        res.render("blog.ejs", { curr });
    } else {
        res.status(404).send('Blog not found'); // Handle the case where the blog is not found
    }
});