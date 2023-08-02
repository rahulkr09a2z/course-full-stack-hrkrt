const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
const Schema = mongoose.Schema;
const PORT = process.env.PORT || 8080;
const SECRET = process.env.SECRET || "sEcrEt";
const cors = require("cors");

app.use(cors());
dotenv.config();
app.use(express.json());

// --------------------CONSTANTS-------------------//
const API_VERSION = "/api/v1";
const Roles = {
  Admin: "admin",
  User: "user",
};

// --------------------UTILITIES-------------------//
const rolesTokenGenerator = (role, username) => {
  return jwt.sign({ username, role }, SECRET, {
    expiresIn: "1h",
  });
};
const adminTokenCreator = (username) => {
  return rolesTokenGenerator(Roles.Admin, username);
};
const userTokenCreator = (username) => {
  return rolesTokenGenerator(Roles.User, username);
};

// --------------------ERROR_HANDLERS-------------------//
const notFoundErrHandler = (req, res) => {
  res.sendStatus(404);
};
const unknownErrHandler = (error, req, res) => {
  res.sendStatus(500);
};
// --------------------SCHEMAS-------------------//
const adminSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  purchasedCourse: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: false,
  },
});

// --------------------MODELS-------------------//
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const User = mongoose.model("User", userSchema);

// --------------------CONTROLLERS-------------------//
const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    const { role, username } = user;
    let foundUser;
    if (role === Roles.Admin) {
      foundUser = await Admin.findOne({ username });
    }
    if (role === Roles.User) {
      foundUser = await User.findOne({ username });
    }
    if (!foundUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    req.role = role;
    req.username = username;

    next();
  });
};

const postAdminSignup = (req, res, next) => {
  const { username, password } = req.body;
  Admin.findOne({ username })
    .then((admin) => {
      if (admin) {
        res.status(403).json({ message: "Admin already exists" });
      } else {
        const newObj = { username, password };
        const newAdmin = new Admin(newObj);
        newAdmin.save().then(() => {
          const token = adminTokenCreator(username);
          res
            .status(201)
            .json({ message: "Admin created successfully", token });
        });
      }
    })
    .catch((err) => next(err));
};
const postAdminLogin = (req, res, next) => {
  const { username, password } = req.headers;
  Admin.findOne({ username })
    .then((admin) => {
      if (admin) {
        if (admin.password === password) {
          const token = adminTokenCreator(username);
          res.status(200).json({ message: "Logged in successfully", token });
        } else {
          res
            .status(403)
            .json({ message: "Incorrect Password, Please Try Again" });
        }
      } else {
        res.status(404).json({ message: "No Admin Found" });
      }
    })
    .catch((err) => next(err));
};

const postCourseCreate = (req, res, next) => {
  const {
    body: { title, description, price, imageLink, published },
  } = req;
  const newCourseObj = { title, description, price, imageLink, published };
  const newCourse = new Course(newCourseObj);
  newCourse
    .save()
    .then((_result) => {
      res.status(201).json({
        message: "Course created successfully",
        courseId: newCourse._id,
      });
    })
    .catch((err) => next(err));
};

const putCourseUpdate = (req, res, next) => {
  const {
    body: { title, description, price, imageLink, published },
    params: { courseId },
  } = req;
  Course.findById(courseId)
    .then((course) => {
      if (course) {
        course.title = title;
        course.description = description;
        course.price = price;
        course.imageLink = imageLink;
        course.published = published;
        return course.save().then((_result) => {
          res.status(200).json({ message: "Course updated successfully" });
        });
      } else {
        res.status(404).json({ message: "Course Not Found" });
      }
    })
    .catch((err) => next(err));
};

const getAllCourses = (req, res, next) => {
  Course.find({}, "-__v")
    .then((courses) => {
      res.status(200).json({ courses });
    })
    .catch((err) => next(err));
};

const postUserSignup = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) return res.status(403).json({ message: "User already exists" });
      const newObj = { username, password };
      const newUser = new User(newObj);
      newUser.save().then(() => {
        const token = userTokenCreator(username);
        res.status(201).json({ message: "User created successfully", token });
      });
    })
    .catch((err) => next(err));
};
const postUserLogin = (req, res, next) => {
  const { username, password } = req.headers;
  User.findOne({ username })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "No User Found" });
      if (user.password !== password)
        return res
          .status(403)
          .json({ message: "Incorrect Password, Please Try Again" });
      return res.status(200).json({
        message: "Logged in successfully",
        token: userTokenCreator(username),
      });
    })
    .catch((err) => next(err));
};

const postPurchaseCourse = async (req, res, next) => {
  const {
    params: { courseId },
  } = req;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  User.findOne({ username: req.username }).then((user) => {
    if (user.purchasedCourse.includes(courseId))
      return res.status(400).json({ message: "Course already purchased" });
    user.purchasedCourse.push(courseId);
    user.save().then(() => {
      res.status(200).json({ message: "Course purchased successfully" });
    });
  });
};

const getAllPurchasedCourse = async (req, res, next) => {
  const user = await User.findOne({ username: req.username }).populate(
    "purchasedCourse",
    "-__v"
  );
  res.json({ purchasedCourses: user.purchasedCourse || [] });
};

// --------------------ROUTES-------------------//

/**
 * Admin Routes
 */
app.post(`${API_VERSION}/admin/signup`, postAdminSignup);

app.post(`${API_VERSION}/admin/login`, postAdminLogin);

app.post(`${API_VERSION}/admin/courses`, isAuth, postCourseCreate);

app.put(`${API_VERSION}/admin/courses/:courseId`, isAuth, putCourseUpdate);

app.get(`${API_VERSION}/admin/courses`, isAuth, getAllCourses);

/**
 * User Routes
 */
app.post(`${API_VERSION}/users/signup`, postUserSignup);

app.post(`${API_VERSION}/users/login`, postUserLogin);

app.get(`${API_VERSION}/users/courses`, isAuth, getAllCourses);

app.post(`${API_VERSION}/users/courses/:courseId`, isAuth, postPurchaseCourse);

app.get(`${API_VERSION}/users/purchasedCourses`, isAuth, getAllPurchasedCourse);

/**
 * Error Routes
 */
app.use(notFoundErrHandler);
app.use(unknownErrHandler);

// --------------------DB_Connect-------------------//
mongoose
  .connect(process.env.MONGODB_URI)
  .then((_res) => {
    console.log("DB Connected!");
    app.listen(PORT, () => {
      console.log("PORT Activated!", PORT);
    });
  })
  .catch((err) => console.log("DB Connect Error", err));
