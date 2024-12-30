// seed.ts: Seed sample data with likes functionality

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: { 
      name: 'Alice', 
      email: 'alice@example.com', 
      password: 'securepass',
      category: 'student'
    },
  });
  const user2 = await prisma.user.create({
    data: { 
      name: 'Bob', 
      email: 'bob@example.com', 
      password: 'securepass',
      category: 'doctor'
    },
  });
  const user3 = await prisma.user.create({
    data: { 
      name: 'pop', 
      email: 'pop@example.com', 
      password: 'securepass',
      category: 'doctor'
    },
  });

  await prisma.follow.createMany({
    data: [
      { followerId: 1, followingId: 2 },
      { followerId: 1, followingId: 3 },
    ],
  });
  // Create posts
  const post1 = await prisma.post.create({
    data: { content: 'Post from Alice', userId: user1.id },
  });

  const post2 = await prisma.post.create({
    data: { content: 'Post from Bob', userId: user2.id },
  });
  const post3 = await prisma.post.create({
    data: { content: 'Post from User 3', userId: user3.id },
  });

  // Add likes
  await prisma.like.create({
    data: { userId: user2.id, postId: post1.id },
  });

  await prisma.like.create({
    data: { userId: user1.id, postId: post2.id },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
