import express from "express";

const app = express();
app.use(express.json());

const PORT = 5005;


const TEACHERS = [
    {
        "id":1,
        "name":"Advait",
        "city":"America"
    },
    {
        "id":2,
        "name":"Kia",
        "city":"paris"
    }
]
app.get("/teachers",(req,res)=>{
    res.json({
        sucess:true,
        data:TEACHERS,
        message:"post resquest",
    })
})

app.post("/teachers",(req,res)=>{
   const {name,city,id} = req.body;

   for(const teacher of TEACHERS){
    if(id == teacher.id){
        return res.json({
            success:false,
            message:`${id} id already exist`
        })
    }
   }

   if(!name){
    return res.json({
        success:false,
        message:"Name required"
    })
   }
    if(!city){
    return res.json({
        success:false,
        message:"City required"
    })
   }
    if(!id){
    return res.json({
        success:false,
        message:"Id required"
    })
   }



   const teachersObj = {
    id,
    name,
    city,
    }

   TEACHERS.push(teachersObj);

    res.json({
        sucess:true,
        data:teachersObj,
        message:"post resquest",

    })
})

app.delete("/teachers/:id",(req,res)=>{
  const {id} = req.params;

  let TeacherIndex = -1;

  TEACHERS.forEach((teach,i)=>{
    if (teach.id == id){
        TeacherIndex = i ;
    }
  });

  if(TeacherIndex == -1){
    return res.json({
        success:false,
        message:`teacher id ${id} not exist`
    });
  }else{
    TEACHERS.splice(TeacherIndex,1);
    return res.json({
        success:true,
        message:`teacher with id ${id} deleted successsfully`
    });
  }



})

app.put("/teachers/:id",(req,res)=>{
    const {id} = req.params;
    const {name,city} = req.body;

    if(!name){
        return res.json({
            success:true,
            message:"Name required"
        })
    }
      if(!city){
        return res.json({
            success:true,
            message:"City required"
        })
    }

    let TeacherIndex = -1;
    TEACHERS.forEach((teach,i)=>{
        if(teach.id == id){
            TeacherIndex = i
        }
    })

    if(TeacherIndex == -1){
        return res.json({
            success: false,
            message : "teacher not found"
        })
    }
    TEACHERS[TeacherIndex] = {
        id:parseInt(id),
        name:name,
        city:city
    }
     return res.json({
        success:true,
        data:TEACHERS[TeacherIndex],
        message:"updated successfully"
    });

})

app.patch("/teachers/city/:id",(req,res) => {
    const {id} = req.params;
    const {city} = req.body;

    if(!city){
        return res.json({
           success:false,
           message:"City required" 
        })
    }

    let TeacherIndex = -1;

    TEACHERS.forEach((teach,i)=>{
        if(teach.id == id){
            TeacherIndex = i;
        }
    })
    if(TeacherIndex == -1){
        return res,json({
            success:false,
            message:"no such id of teacher found"
        });
    }

    const existingTeacher = TEACHERS[TeacherIndex];
    const updatedTeacher = {
        ...existingTeacher,
        city
    }
    TEACHERS[TeacherIndex] = updatedTeacher;

    res.json({
        success:true,
        data:updatedTeacher,
        message:"city updated successfully"
    })
})

app.get("/teachers/search",(req,res) => {
   return res.json({
          success:true,
          data:TEACHERS,
          message:"done"
});
})
app.listen(PORT,()=>{
    console.log("server running")
})