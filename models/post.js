const mongoose =  require("mongoose");

const postSchema = mongoose.Schema({
    userid:{
        type:String,
        require:true,
        
    },
    videourl:{
        type:String,
        require:true,
        
    },
    thumbnailurl:{
        type:String,
        require:true,
        
    },
    description:{
        type:String,
        require:true,
        
    },
    like:{
        type:Array,
        default:[],
        
    },
    dislike:{
        type:Array,
        default:[],
        
    },
    Comments:{
        type:Array,
        default:[],
        
    },
    report:{
        type:Array,
        default:[],
        
    },
});