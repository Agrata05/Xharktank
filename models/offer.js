var mongoose = require('mongoose')

const offer = new mongoose.Schema({
    investor:{
        type : String,
        require : true,
    },
    amount:{
        type : String,
        require : true,
    },
    equity:{
        type : String,
        require : true,
    },
    comment:{
        type : String,
        require : true,
    },
    pitchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pitch",
    }
},{ timestamps: true })

offer.virtual('id').get(function(){
    return this._id.toHexString();
});

offer.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

module.exports = mongoose.model("offer",offer);