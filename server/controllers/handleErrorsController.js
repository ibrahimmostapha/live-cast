function handleErrors(error){
    let err={}
    console.log(error)
    if(error.errors){
        Object.values(error.errors).forEach(({properties})=>{
            err[properties.path]=properties.message
        })
    }
    
    return err
}

module.exports=handleErrors