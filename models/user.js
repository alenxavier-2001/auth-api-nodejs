const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true,
        trim:true
    },
    name:{
        type:String,
        require:true,
        min:3,
        max:20,
        trim:true
    },
    email:{
        type:String,
        require:true,
       max :50,
        unique:true,
        trim:true,
       validate: {
            validator: (value) => {
              const re =
                /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
              return value.match(re);
            },
            message: "Please enter a valid email address",
          },
        },
    
    password:{
        type:String,
        require:true,
        min:5,
        
    },
    phonenumber:{
        type:String,
        default:""
        
    },
    profileimage:{
      type:String,
      default:""
      
  },
    followers:{
      type:Array,
      default:[]
      
  },
  following:{
    type:Array,
    default:[]
    
},
likedposts:{
  type:Array,
  default:[]
  
},
savedposts:{
  type:Array,
  default:[]
  
},
posts:{
  type:Array,
  default:[]
  
},
notification:{
  type:Array,
  default:[]
  
},
});



const User = mongoose.model('User',userSchema);
module.exports = User;