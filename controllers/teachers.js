const getHealth = (req,res) => {
    res.json({
        success:true,
        message:"Server is running"
    })
}

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

const getTeacher = (req,res)=>{
    res.status(200).json({
        sucess:true,
        data:TEACHERS,
        message:"post resquest",
    })
}

const postTeacher = (req,res)=>{
   const {name,city,id} = req.body;

   for(const teacher of TEACHERS){
    if(id == teacher.id){
        return res.status(400).json({
            success:false,
            message:`${id} id already exist`
        })
    }
   }

   if(!name){
    return res.status(400).json({
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
}

const deleteTeacher = (req,res)=>{
  const {id} = req.params;

  let TeacherIndex = -1;

  TEACHERS.forEach((teach,i)=>{
    if (teach.id == id){
        TeacherIndex = i ;
    }
  });

  if(TeacherIndex == -1){
    return res.status(404).json({
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
}

const putTeacherById = (req,res)=>{
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

}

const patchTeacherById = (req,res) => {
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
}

const getSearch = (req,res) => {
   return res.json({
          success:true,
          data:TEACHERS,
          message:"done"
});
}

export {getHealth, getTeacher, postTeacher, deleteTeacher, putTeacherById, patchTeacherById, getSearch};