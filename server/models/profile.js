import mongoose from "mongoose"; 

// Define the Profile schema
const profileSchema = new mongoose.Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
   type: String,
   trim: true,
}
});

// Export the Profile model
export default mongoose.models.Profile || mongoose.model("Profile", profileSchema);
// export default mongoose.model("Profile", profileSchema);