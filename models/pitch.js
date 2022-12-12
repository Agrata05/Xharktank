var mongoose = require("mongoose");

const pitch = new mongoose.Schema({
    entrepreneur:{
        type : String,
        require : true,
    },
    pitchTitle:{        
        type : String,
        require : true
    },
    pitchIdea: {
        type : String,
        require : true,
    },
    askAmount:{
        type : Number,
        require : true,
    },
    equity:{
        type : Number,
        require : true,
    },
    offers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "offer",
    }]
},{ timestamps: true });

pitch.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
pitch.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });


module.exports = mongoose.model("pitch",pitch);
