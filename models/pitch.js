var mongoose = require('mongoose')
const { stringify } = require('querystring')

const pitch = new mongoose.Schema ({
    entreprenuer : {
        type : String,
        require : true,
    },
    pitchTitle : {
        type : String,
        require : true,
    },
    pitchIdea : {
        type : String,
        require : true,
    },
    askAmount : {
        type : Number,
        require : true,
    },
    askAmount : {
        type : Number,
        require : true,
    },
    offer : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "offer",
    }]
},{ timestamps: true })

pitch.virtual('id').get(function(){
    return this._id.toHexString();
});

pitch.set('toJSON', {
    virtuals: true,
    versionKey:false,
    transform: function (doc, ret) {   delete ret._id  }
  });

module.exports = mongoose.model("pitch",pitch);
