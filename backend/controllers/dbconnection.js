import mongoose from "mongoose";

const dbConnection = async () => {
    mongoose
    .connect("mongodb+srv://Backend:12345@learn.ajh4xvk.mongodb.net/", {
      dbName: "jobfinder",
    })
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(`Error found while connecting DB : ${err} `);
    });
};
export default dbConnection;

// MONGO_URI = mongodb+srv://Backend:12345@learn.ajh4xvk.mongodb.net/

// import mongoose from "mongoose";

// const dbConnection= async()=>{
//     mongoose
//     .connect(process.env.MONDO_URI, {
//       dbName: "jobfinder",
//     })
//     .then(() => {
//       console.log("db connected");
//     })
//     .catch((err) => {
//       console.log(`Error found while connecting DB : ${err} `);
//     });
// }
// export default dbConnection;