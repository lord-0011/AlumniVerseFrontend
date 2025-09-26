const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
    // Basic Information
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    domain: { 
        type: String, 
        required: true, 
        trim: true,
        // Example enum for consistency
        // enum: ['EdTech', 'FinTech', 'HealthTech', 'Social', 'Other'] 
    },
    
    // Status and Funding
    stage: {
        type: String,
        enum: ['Idea', 'Prototype', 'Early Growth', 'Scaling'], // Matches your form
        default: 'Idea'
    },
    fundingNeeds: { 
        type: String, 
        trim: true 
    },
    
    // Links and Founder
    website: { 
        type: String, 
        trim: true 
    },
    pitch: { 
        type: String, 
        trim: true 
    },
    
    // Relationship: Links to the user who created it (the founder)
    founder: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // Placeholder for interaction features (if you add them later)
    // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    
}, { timestamps: true });

// 💡 Performance Index: Index the founder ID and name for efficient lookups/filtering
StartupSchema.index({ founder: 1, name: 1 });

const Startup = mongoose.model('Startup', StartupSchema);

// CRITICAL: Export the model as the default module export
module.exports = Startup;