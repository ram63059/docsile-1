import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { cors } from "hono/cors";
import { withAccelerate } from "@prisma/extension-accelerate";
import { getCookie, setCookie } from "hono/cookie";
import auth from "./Auth/auth";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();
//cors middleware
app.use("/*", cors());
app.route("/auth" , auth);





import likeRoutes from './routes/likeRoutes';
import feedRoutes from './routes/feedRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import userRoutes from './routes/userRoutes';
import followRoutes from './routes/followRoutes';
import unfollowRoutes from './routes/unfollowRoutes';
import conversations from "./routes/conversation";
import messages from "./routes/message";
import groupRoutes from "./routes/groupRoutes";
// import { errorHandler } from './utils/errorHandler';

// Apply routes
app.route('/feed', feedRoutes);
app.route('/posts', postRoutes);
app.route('/comments', commentRoutes);
app.route('/users', userRoutes);
app.route('/likes', likeRoutes);
app.route('/follow', followRoutes);
app.route('/unfollow', unfollowRoutes);



app.route("/conversations", conversations);
app.route("/messages", messages);
app.route("/groups", groupRoutes);


// Error handling
app.onError((error, context) => {
  console.error(error);
  return context.json(
    {
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error"
    },
    500
  );
});

//signup//doctor

app.post("/signup/doctor", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.user.update({
      where: {
        id: body.id,
      },
      //@ts-ignore
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        organisation_name: body.organisation_name,
        specialisation_field_of_study: body.specialisation_field_of_study,
        gender: body.gender,
        category: "doctor",
      },
    });

  
    if (response) {
      return c.json("Success");
    }
  } catch (e: any) {
    console.error(e);
  }
});

//signup/student

app.post("/signup/student", async (c) => {
  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        name: body.name,
        country: body.country,
        city: body.city,
        organisation_name: body.organisation_name,
        specialisation_field_of_study: body.specialisation_field_of_study,
        department: body.department,
        gender: body.gender,
        category: "student",
      },
    });

    if (response) {
      return c.json("Success");
    }
  } catch (e: any) {
    console.error(e);
  }
});

//signup//organisation

app.post("/signup/organisation", async (c) => {
  const body = await c.req.json();

  const email = body.email;
  const id = body.id;

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    if (email && id) {
      const response = await prisma.organisations.create({
        data: {
          email: email,
          category: "organisation",
          password: email,
          organisation_type: body.organisation_type,
          country: body.country,
          city: body.city,
          organisation_name: body.organisation_name,
        },
      });
    }

    const response = await prisma.organisations.update({
      where: {
        id: body.id,
      },
      data: {
        organisation_type: body.organisation_type,
        country: body.country,
        city: body.city,
        organisation_name: body.organisation_name,
      },
    });

    if (response) {
      return c.json("Success");
    }
  } catch (e: any) {
    console.error(e);
  }
});

app.get("/check-verification", async (c) => {
  console.log("lopalki ochindhi");
  const userid = c.req.query("id");

  console.log(userid);
  const verifiedcookie = getCookie(c, "doctortoken");
  console.log("third");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    console.log("try lo ki kud ochindhi");
    if (verifiedcookie) {
      // Verify the JWT token
      const decoded: any = verify(verifiedcookie, c.env.JWT_SECRET);

      if (decoded.id === userid) {
        // Token is valid and matches the user ID
        return c.json({ redirect: `/ask-question/${userid}` });
      } else {
        return c.json({ message: "Token user mismatch" }, 403);
      }
    } else {
      // If token is not present, check the database
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userid || "") },
      });

      if (!user) {
        return c.json({ message: "User not found" }, 404);
      }

      if (user.verified) {
        // User is verified, generate a new JWT token
        const newToken = await sign({ id: user.id }, c.env.JWT_SECRET);

        // Set the new token in the cookies
        setCookie(c, "authToken", newToken, {
          httpOnly: true,
          maxAge: 3600, // 1 hour
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        return c.json({ redirect: `/ask-question/${userid}`, verified: true });
      } else {
        // User is not verified
        return c.json({ verified: false }, 200);
      }
    }
  } catch (err) {
    console.error("Error:", err);
    return c.json({ message: "Internal server error" }, 500);
  }
});

app.get("/profile/:id", async (c) => {
  const params = c.req.param();
  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userid,
      },
    });

    const questions = await prisma.questions.findMany({
      where: {
        userId: userid,
      },
    });

    const posts = await prisma.post.findMany({
      where: {
        userId: userid,
      },
    });

    const friends = await prisma.friends.findMany({
      where: {
        userId: userid,
      },
    });

    const certificates = await prisma.certifications.findMany({
      where: {
        userId: userid,
      },
    });

    const awards = await prisma.achievementsAwards.findMany({
      where: {
        userId: userid,
      },
    });

    const experiences = await prisma.professionalExperience.findMany({
      where: {
        userId: userid,
      },
    });

    const educations = await prisma.education.findMany({
      where: {
        userId: userid,
      },
    });

    const memberships = await prisma.memberships.findMany({
      where: {
        userId: userid,
      },
    });

    if (!user) {
      return c.json(
        {
          message: "User not found",
        },
        404
      );
    }

    console.log("databse ki ochindhi bhai");

    return c.json({
      user: user,
      questions: questions,
      posts: posts,
      friends: friends,
      certificates: certificates,
      awards: awards,
      experiences: experiences,
      educations: educations,
      memberships: memberships,
    });
  } catch (e) {
    console.log(e);
  }
});

// ask question

app.post("/ask-question/:id", async (c) => {
  const body = await c.req.json();

  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const question = await prisma.questions.create({
      data: {
        userId: userid,
        question: body.title,
        question_description: body.description,

        questionReferences: {
          create: body.referenceTags.map((ref: string) => ({ reference: ref })),
        },
        state : "telangana",
        urgency : "high"
      },
    });

    return c.json(question);
  } catch (e) {
    return c.json({ e });
  }
});

app.post("/publish-post/:id", async (c) => {
  const body = await c.req.json();
  const params = c.req.param();
  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.create({
      data: {
        userId: userid,
        content: body.description,
        mediaUrl: body.mediaUrl,
        city : "hyderabad"
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({ error: e instanceof Error ? e.message : "Error creating post" }, 500);
  }
});

app.post("/add-certificate/:id", async (c) => {
  const body = await c.req.json();

  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.certifications.create({
      data: {
        userId: userid,
        certificateName: body.certificateName,
        issuingOrganisation: body.issuingOrganisation,
        issueDate: body.issueDate,
        certificateURL: body.certificateURL,
        descreption: body.descreption,
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({ e });
  }
});

app.post("/add-professional-experience/:id", async (c) => {
  const body = await c.req.json();

  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.professionalExperience.create({
      data: {
        userId: userid,
        title: body.title,
        organisation: body.organisation,
        startDate: body.startDate,
        endDate: body.endDate,
        location: body.location,
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({ e });
  }
});

app.post("/add-education/:id", async (c) => {
  const body = await c.req.json();

  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.education.create({
      data: {
        userId: userid,
        schoolName: body.schoolName,
        degree: body.degree,
        department: body.department,
        startDate: body.startDate,
        endDate: body.endDate,
        grade: body.grade,
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({ e });
  }
});

app.post("/add-memberships/:id", async (c) => {
  const body = await c.req.json();

  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.memberships.create({
      data: {
        userId: userid,
        societyname: body.societyname,
        position: body.position,
        relatedDepartment: body.relatedDepartment,
        membershipId: body.membershipId,
      },
    });

    return c.json(post);
  } catch (e) {
    return c.json({ e });
  }
});

app.get("/connections/:id", async (c) => {
  const params = c.req.param();

  const userid = parseInt(params.id);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Retrieve user's info to match relevant users
    const user = await prisma.user.findUnique({
      where: { id: userid },
      select: {
        specialisation_field_of_study: true,
        department: true,
        city: true,
        organisation_name: true,
      },
    });

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    // Find related users with prioritized ordering
    const relatedUsers = await prisma.user.findMany({
      where: {
        AND: [
          // Exclude the current user
          { id: { not: userid } },
          {
            OR: [
              {
                specialisation_field_of_study:
                  user.specialisation_field_of_study,
              },
              { department: user.department },
              { city: user.city },
              { organisation_name: user.organisation_name },
            ],
          },
        ],
      },
      orderBy: [
        // Higher priority to mutual connections, followed by recent interactions, then affinity
        // { mutualConnectionsCount: 'desc' },  // Add mutualConnectionsCount if available in the schema
        // { recentInteractions: 'desc' },  // Add recentInteractions if tracked in the schema
        { specialisation_field_of_study: "desc" },
        { department: "desc" },
        { city: "desc" },
        { organisation_name: "desc" },
      ],
      take: 50, // Take at least 50 results if available
    });

    return c.json(relatedUsers);
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error fetching related users" }, 500);
  }
});

app.post("/verify-doctor", async (c) => {
  try {
    const body = await c.req.json();
    const { registrationNo } = body;
    const strRegNo = registrationNo.toString();

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const doctors = await prisma.doctors.findMany({
      where: {
        registrationNo: registrationNo,
      },
    });

    if (doctors) {
      return c.json({ doctors: doctors });
    } else {
      const response = await fetch(
        "https://www.nmc.org.in/MCIRest/open/getDataFromService?service=searchDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
          },
          body: JSON.stringify({ registrationNo }),
        }
      );
      const data = await response.text();

      


    }
  } catch (error) {
    console.error("Error:", error);
    return c.json({ message: "Error verifying doctor registration" }, 500);
  }
});

export default app;
