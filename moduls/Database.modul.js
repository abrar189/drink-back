'use strict'

const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true });


const drinkSchema = new mongoose.Schema({


    strDrink: String,
    strDrinkThumb: String,
    idDrink: String
});
// const userSchema = new mongoose.Schema({


//     email: String,
//     drinkData:[drinkSchema]
// });

const user = mongoose.model('user', drinkSchema);

function seedUser(){
    let userData=new user({
        
            "strDrink": "Afterglow",
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg",
            "idDrink": "12560"
            },
        )
    userData.save();
}
// seedUser();

class objData{
    constructor(data){
        this.strDrink=data.strDrink;
        this.strDrinkThumb=data.strDrinkThumb;
        this.idDrink=data.idDrink;

    }
}

module.exports={user,objData,}
