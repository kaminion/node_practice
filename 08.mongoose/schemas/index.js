const mongoose = require("mongoose");

module.exports = () => {
    const connect = () =>{
        mongoose.connect('mongodb://localhost:15000/node', 

            {}, 
            (err)=>{
            
            if(err) console.log(err);
            else console.log("몽고디비연결");

        });
    }

    connect();

    mongoose.connection.on('error', (err)=>{
        console.log(err);
    });

    mongoose.connection.on('disconnected', ()=>{
        console.log("몽고디비 다시연결");
        connect();
    });

    // 불러오면 자동으로 유저객체들어옴
    require("./user");
    //require("./comment");
}