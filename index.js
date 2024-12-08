import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
const app = express();
const port = 3000;
const heading = [];
const content = [];
var totalPosts = 0;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render("homepage.ejs");
});

app.post("/compose", (req, res) => {
    res.render("compose.ejs");
});

app.post("/blogs", (req,res) => { 
    // app.use(saveBlogs);
    heading.push(req.body.title);
    content.push(req.body.content);
    console.log(heading);
    console.log(content);
    totalPosts++;
    const data = {
        postNumber: totalPosts,
        blogHeadings: heading,
        blogContent: content,
    }
    res.render("blogs.ejs", data);
});

app.get("/blogpage/:id", (req, res) => {
    const blogId = req.params.id;
    const currentHeading = heading[blogId];
    const currentContent = content[blogId];
    if(currentContent && currentHeading) {
        res.render("blogpage.ejs", {title: currentHeading, discription: currentContent, blogId: blogId});
    } else {
        res.status(404).send("Blog not found");
    }
});

app.delete("/blogs/:id", (req, res) => {
    const blogId = req.params.id;

    heading.splice(blogId, 1);
    content.splice(blogId, 1);
    totalPosts--;

    res.redirect("/");
});

app.put("/blogs/:id", (req, res) => {
    const updateBlogNo = req.params.id;
    heading[updateBlogNo] = req.body.updatedTitle;
    content[updateBlogNo] = req.body.updatedContent;
    res.redirect("/");
});

app.get("/blogs/:id/update", (req, res) => {
    const updateBlogNo = req.params.id;
    res.render("update.ejs", {updateBlogNo: updateBlogNo, heading: heading, content: content});
});

app.listen(port, () => {
    console.log(`Server running on ${port} port`);
});
