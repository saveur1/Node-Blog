exports.UserDocs={
    "/user/signup": {
        post:{
            tags:["User"],
            requestBody:{
                content:{
                    "multipart/form-data": {
                        schema: {
                            type:"object",
                            properties:{
                                first_name:{
                                    type:"String",
                                    description:"Your First Name",
                                    example:"Bikorimana",
                                    required:true
                                },
                                last_name:{
                                    type:"String",
                                    description:"Your Last Name",
                                    example:"Saveur"
                                },
                                email:{
                                    type:"String",
                                    description:"Your Email address",
                                    title:"Email address",
                                    example:"bikorimanaxavier@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    description:"Strong Password",
                                    example:"afldfsnjlvala",
                                    title:"Your Password"
                                },
                                userImage:{
                                    type:"file",
                                    description:"User Image Or Profile"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Response body for Signup page",
                    content:{
                        "application/json" : {
                                type:"object",
                                example:{
                                    _id: "63d90a40ef529fd533f8edf4",
                                    first_name: "bikorimana",
                                    last_name: "saveur",
                                    email: "bikorimana@gmail.com",
                                    password: "$2b$10$aMtqmQvrf5ogVJU9vIk4oOZFcO1Jt6Zgup7bJZ6jR/k8dlb4KGZjO",
                                    active: true,
                                    userImage: "http://localhost:6700/public/userImage_1675376085296_bivakumana.jpg"
                                }
                         }
                    }
                }
            }
        }
    },
    "/user/login" : {
        post:{
            tags:["User"],
            description:"Login Form for Users",
            requestBody:{
                description:"Login Request Example",
                content:{
                    "application/json":{
                        schema:{
                            type:"object",
                            properties:{
                                email:{
                                    type:"String",
                                    description:"Type Your Login Email address",
                                    title:"your Email address",
                                    example:"bikorimana@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    description:"Type Your given Password",
                                    example:"saveur"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                200:{
                    description:"Successfully Login Example",
                    content:{
                        "application/json" :{
                            type:"object",
                            example:[{
                                message: "Authantication has passed",
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Q5MGE0MGVmNTI5ZmQ1MzNmOGVkZjQiLCJlbWFpbCI6ImJpa29yaW1hbmFAZ21haWwuY29tIiwiaWF0IjoxNjc1NjAxMDM0LCJleHAiOjE2NzU2MDQ2MzR9.2-thmiL1C36gXHUU1jOUSxEZNowlX-ihu15VhL0ywpE"
                            }
                        ]
                        }
                    }
                },
                401:{
                    description:"Login Failed Example",
                    content:{
                       "application/json":{
                        type:"object",
                        example:{
                            message: "Authentication failed"
                        }
                       }
                    }                
                }
            }
        }
    },
    "/user" : {
        get:{
            tags:["User"],
            description:"List of all users",
            parameters: [
                {
                    in:"query",
                    name:"page",
                    type:Number,
                    required:false,
                    description:"Enter Page Number"
                },
                {
                    in:"query",
                    name:"data_per_page",
                    type:Number,
                    required:false,
                    description:"Enter Data To be on One page"
                }
            ],
            security:[
                {
                    token:[]
                }
            ],
            responses: {
                200: {
                description:"OK",
                content: {
                    "applicatin/json": {
                        schema: {
                            type:"object",
                            example: {
                                status:"success",
                                count:0,
                                user:[

                                ]
                            }                                    
                        }
                    }

                }
                }
            }
        }
    },
    "/user/{user_id}":{
        get:{
            tags:["User"],
            description:"Get Single User Using Id",
            parameters:[{
              in:"path",
              name:"user_id",
              type:"String",
              title:"Type in User Id",
              description:"Fetch user by using id",
              required:true,
              example:"63da9eb9db47ce0c7f205d6f"
            }],
            security:[
                {
                    token:[]
                }
            ],
            responses:{
                200:{
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                                _id: "63d90a40ef529fd533f8edf4",
                                first_name: "bikorimana",
                                last_name: "saveur",
                                email: "bikorimana@gmail.com",
                                password: "$2b$10$aMtqmQvrf5ogVJU9vIk4oOZFcO1Jt6Zgup7bJZ6jR/k8dlb4KGZjO",
                                active: true,
                                userImage: "http://localhost:6700/public/userImage_1675376085296_bivakumana.jpg"
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/{update_id}" : {
        put:{
            tags:["User"],
            parameters:[{
                in:"path",
                type:"String",
                required:true,
                name:"update_id",
                description:"Enter Id for updatation"
            }],
            security:[
                {
                    token:[]
                }
            ],
            requestBody:{
                content:{
                    "multipart/form-data" : {
                        schema:{
                            type:"object",
                            properties:{
                                first_name:{
                                    type:"String",
                                    description:"upadate your first name",
                                    required:true,
                                    example:"bikorimana"
                                },
                                last_name:{
                                    type:"String",
                                    required:true,
                                    description:"update last name",
                                    example:"Saveur"
                                },
                                email:{
                                   type:"String",
                                   required:true,
                                   description:"Update your Email",
                                   example:"bikorimana@gmail.com"
                                },
                                password:{
                                    type:"String",
                                    required:true,
                                    description:"change your password",
                                    example:"hello@123"
                                },
                                active: {
                                    type:Boolean,
                                    required:true,
                                    description:"What is user status",
                                    example:"true"
                                },
                                userImage:{
                                    type:"file",
                                    required:true,
                                    description:"Update User image"
                                }
                            }
                        }
                    }
                }
            },
            responses:{
                201:{
                    description:"Update User response example",
                    content:{
                        "application/json" : {
                            type:"object",
                            example:{
                                message:"User Info Is updated successfully",
                                request:{
                                    type:"GET",
                                    url:process.env.BLOG_URL+"/user/63d90a40ef529fd533f8edf4"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "/user/{delete_id}":{
        delete:{
            tags:["User"],
            description:"Delete single user",
            parameters:[{
                in:"path",
                name:"delete_id",
                type:"String",
                description:"Delete single user",
                required:true,
                example:"63da9eb9db47ceic7f205d6o"
            }],
            security:[
                {
                    token:[]
                }
            ],
            responses:{
                200:{
                    description:"Delete user example response",
                    content:{
                        "application/json":{
                            type:"object",
                            example:{
                               message: "User deleted successfully"
                            }
                        }
                    }
                }
            }
        }
    }
}