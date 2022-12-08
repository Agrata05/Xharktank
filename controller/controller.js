exports.addPitch = async (req,res,next)=> {
    
    try{

        const {entrepreneur,pitchTitle,pitchIdea,askAmount,equity} = req.body;
        if(!(entrepreneur && pitchIdea && pitchTitle && askAmount && equity && equity <=100 && askAmount>0)){
            return res.status(400).json("...");
        }
        const data = await Pitch.create({entrepreneur,pitchTitle,pitchIdea,askAmount,equity});
        console.log(data);
        res.status(201).json({"id":data._id});

    }

    catch(err){

        console.log(err);
        res.status(400).json("...")

    }
};


exports.counterOffer = async (req,res,next)=> {

    try{
        const {investor,amount,equity,comment } = req.body;
        const {pitchId} = req.params 

        if(!(investor && amount && equity && comment && pitchId && equity <=100 && amount>0)){
            return res.status(400).json("...");
        }

        const pitch = await Pitch.findById(pitchId);
        
        
        if(!pitch) res.status(404).json({messgae:"..."});
       
        const counterData = await Offer.create({investor,amount,equity,comment,pitchId});

        if(!counterData) return res.status(404).json({messgae:"..."});
        const pitchData = await Pitch.findOneAndUpdate({_id:pitchId},{$push:{offers:counterData._id}});
        pitch.offers.push(counterData._id);
        const data = await pitch.save();

        res.status(201).json({id:data._id});

    }
    catch(err){
        console.log(err);
        res.status(400).json("...")
    }
};


exports.allPitches = async (req,res,next)=> {
    try{       
        const pitches = await Pitch.find().populate('offers','-createdAt -updatedAt').sort({'createdAt':-1}).select('-createdAt -updatedAt'); // -1 For decending

        if(!pitches) res.status(404).json({messgae:"..."});

        res.status(200).json(pitches);
    }
    catch(err){
        console.log(err);
        res.status(400).json("...")
    }
};

exports.findPitch = async (req,res,next)=> {
    try{       
        const {pitchId} = req.params;
        const pitch = await Pitch.findById(pitchId).populate('offers').select('-createdAt -updatedAt -__v'); 

        if(!pitch) res.status(404).json({messgae:"..."});

        res.status(200).json(pitch);
    }
    catch(err){
        console.log(err);
        res.status(400).json("...")
    }
};