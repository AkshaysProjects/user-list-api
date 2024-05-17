import { Queue, Worker } from "bullmq";
import { configDotenv } from "dotenv";
import { sendMail } from "./mailer.js";

// Load environment variables
configDotenv();

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
};

// Create a new message queue
const messageQueue = new Queue("messageQueue", {
  connection,
});

export const addMessage = async ({ name, email, city, unsubscribeLink }) => {
  console.log({ name, email, city, unsubscribeLink });
  await messageQueue.add("sendMail", { name, email, city, unsubscribeLink });
};

const worker = new Worker(
  "messageQueue",
  async (job) => {
    const { name, email, city, unsubscribeLink } = job.data;
    console.log(job.data);

    try {
      await sendMail(name, email, city, unsubscribeLink);
    } catch (error) {
      console.error(`Failed to send email: ${error}`);
      throw error;
    }
  },
  { connection }
);
