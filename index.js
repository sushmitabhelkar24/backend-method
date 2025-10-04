import express from "express";
import { deleteTeacher, getHealth, getSearch, getTeacher, patchTeacherById, postTeacher, putTeacherById} from "./controllers/teachers.js";

const app = express();
app.use(express.json());

const PORT = 5005;

app.get("/health",getHealth);

app.get("/teachers",getTeacher);

app.post("/teachers",postTeacher)

app.delete("/teachers/:id",deleteTeacher)

app.put("/teachers/:id",putTeacherById)

app.patch("/teachers/city/:id",patchTeacherById)

app.get("/teachers/search",getSearch)
app.listen(PORT,()=>{
    console.log("server running")
})