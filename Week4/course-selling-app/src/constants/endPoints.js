import { API_CONST } from "@courseApp/constants/projectKeys";

const { API_VERSION, ADMIN_API_ROUTE, USER_API_ROUTE, COURSES_API_ROUTE } =
  API_CONST;

export const UserEndPoints = {
  // ADMIN
  adminSignup: () => `${API_VERSION}${ADMIN_API_ROUTE}/signup`,
  adminLogin: () => `${API_VERSION}${ADMIN_API_ROUTE}/login`,
  // USER
  userSignup: () => `${API_VERSION}${USER_API_ROUTE}/signup`,
  userLogin: () => `${API_VERSION}${USER_API_ROUTE}/login`,
};

export const CoursesEndPoints = {
  courses: () => `${API_VERSION}${USER_API_ROUTE}${COURSES_API_ROUTE}`,
  coursesWithId: (courseId) =>
    `${API_VERSION}${USER_API_ROUTE}${COURSES_API_ROUTE}/${courseId}`,
  purchasedCourses: () => `${API_VERSION}${USER_API_ROUTE}/purchasedCourses`,
};
