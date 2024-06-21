import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://shtopinleonid:bIYrdSZbDqc6EEQE@cluster0.ugobfs5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

    });
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
