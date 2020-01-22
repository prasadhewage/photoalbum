const mongoose = require('mongoose');
const {Schema} = mongoose;

// const productSchema = new Schema({
//     name: String,
//     description: String,
// })
const photoGallerySchema = new Schema({
    id : Number,
    picture: String,
    savedInphotoGallary: { type: Number, default: true } 
})

mongoose.model('photoGallery', photoGallerySchema);

// const hobbySchema = new Schema({

//     hobbies:[{ 
//         hobby : {type:String}
//     }]
// },{collection:'hobby'});