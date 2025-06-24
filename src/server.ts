// server.ts
import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.RUNNING_PORT || 5000

const main = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASS}@cluster0.zwjr9aa.mongodb.net/Assignment_3?retryWrites=true&w=majority&appName=Cluster0`
    )

    console.log('Successfully Connected to MongoDB Using Mongoose 🎉')

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

main()
