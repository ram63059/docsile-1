// seed.ts: Seed sample data with likes functionality
import { Context } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

async function main() {
  // Create users
  // const user1 = await prisma.user.create({
  //   data: { 
  //     name: 'Alice', 
  //     email: 'alice@example.com', 
  //     password: 'securepass',
  //     category: 'student'
  //   },
  // });
  // const user2 = await prisma.user.create({
  //   data: { 
  //     name: 'Bob', 
  //     email: 'bob@example.com', 
  //     password: 'securepass',
  //     category: 'doctor'
  //   },
  // });
  // const user3 = await prisma.user.create({
  //   data: { 
  //     name: 'pop', 
  //     email: 'pop@example.com', 
  //     password: 'securepass',
  //     category: 'doctor'
  //   },
  // });

  // await prisma.follow.createMany({
  //   data: [
  //     { followerId: 1, followingId: 2 },
  //     { followerId: 1, followingId: 3 },
  //   ],
  // });

 
  


  // Create posts
  // const post1 = await prisma.post.create({
  //   data: { 
  //     content: 'Post from Alice', 
  //     userId: user1.id,
  //     city: 'New York',
  //     college: 'Example College',
  //     specialization: 'Medicine'
  //   },
  // });

  // const post2 = await prisma.post.create({
  //   data: { 
  //     content: 'Post from Bob', 
  //     userId: user2.id,
  //     city: 'Boston',
  //     specialization: 'Surgery'
  //   },
  // });
  // const post3 = await prisma.post.create({
  //   data: { 
  //     content: 'Post from User 3', 
  //     userId: user3.id,
  //     city: 'Chicago',
  //     specialization: 'Pediatrics'
  //   },
  // });

  // Add likes
  // await prisma.like.create({
  //   data: { userId: user2.id, postId: post1.id },
  // });

  // await prisma.like.create({
  //   data: { userId: user1.id, postId: post2.id },
  // });

  // Create test users (IDs 101 and 102)
  const user1 = await prisma.user.create({
    data: {
      id: 101, // Explicitly setting the ID
      email: 'user1@example.com',
      password: 'password123',
      category: 'DOCTOR' // Assuming this is one of the valid categories
    },
  });
  const user2 = await prisma.user.create({
    data: {
      id: 102, // Explicitly setting the ID
      email: 'user2@example.com',
      password: 'password123',
      category: 'DOCTOR' // Assuming this is one of the valid categories
    },
  });

  console.log(`Created Users:`, { user1, user2 });

  // Step 2: Create a conversation between the two users
  const conversation = await prisma.conversation.create({
    data: {
      user1Id: user1.id,
      user2Id: user2.id,
    },
  });

  console.log(`Created Conversation:`, conversation);

  // Step 3: Create messages for the conversation
  const messages = [
    {
      conversationId: conversation.id,
      senderId: user1.id,
      content: 'Hi, how are you?',
      sentAt: new Date('2025-01-01T10:00:00Z'),
    },
    {
      conversationId: conversation.id,
      senderId: user2.id,
      content: 'I am good, how about you?',
      sentAt: new Date('2025-01-01T10:01:00Z'),
    },
    {
      conversationId: conversation.id,
      senderId: user1.id,
      content: 'Doing great, thanks!',
      sentAt: new Date('2025-01-01T10:02:00Z'),
    },
  ];

  for (const message of messages) {
    await prisma.message.create({ data: message });
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
