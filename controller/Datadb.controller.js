'use strict'

const { default: axios } = require('axios');
const {user,objData,}=require('../moduls/Database.modul')


function dataFromDB(req,res){
   
    user.find({},(error,userData)=>{
        if(error){
            res.send(error)
        }else{
            res.send(userData)
        }
    })

}

let memory={};
async function dataFromAPI(req,res){

    const url ='https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic'

    if (memory["apidata"]!== undefined){
        res.send(memory["apidata"])
    }else{
        const apiData= await axios.get(url);
        const apiMap=apiData.data.drinks.map(item=>{
            return new objData(item);
        })
        memory["apidata"]=apiMap;
        res.send(apiMap);

    }

}

function addTOfavfun(req,res){

    let coffee = new objData(req.body);
    let id = coffee.idDrink

    user.find({ id: id }, (err, data) => {
       
        if (data.length > 0) {
            console.log('no add');
            res.send(req.body)
        } else {
            let coffeeModels = new user(coffee)

            coffeeModels.save().then(data => res.send(data)).catch(err => res.send('errrr'))

        }
    })
};

function deletefun(req,res){

// let id=req.params.id
   

    // user.findOneAndDelete({ _id: id }).then(data => res.send(data)).catch(err => res.send('errrr'))

const idx = req.params.id;
user.find({}, (error, data) => {
    if (error) {
        res.send(error);

    } else {
        data[idx].remove();
        user.find({}, (error, data) => {
            res.send(data);
           
        }
        );
    }
}
);
}
function updateFav  (req, res)  {
    const idx = req.params.idx;
    const {
        strDrink,
        strDrinkThumb,
        idDrink,
    } = req.body;
    user.find({}, (error, data) => {
        if (error) {
            res.send(error);

        } else {
            data[idx].strDrink=strDrink;
            data[idx].strDrinkThumb=strDrinkThumb;
            data[idx].idDrink=idDrink;
            data[idx].save();
            res.send(data);
        }
    }
    );

}



module.exports={dataFromDB,dataFromAPI,addTOfavfun,deletefun,updateFav}

