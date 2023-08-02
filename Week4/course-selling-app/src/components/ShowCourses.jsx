import { useState, useEffect } from "react";

import { CoursesEndPoints } from "@courseApp/constants/endPoints";
import { ApiClient } from "@courseApp/utils/apiClient";

function ShowCourses() {
  const [courses, setCourses] = useState([]);
  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  const getCourses = async () => {
    const response = await ApiClient.get(CoursesEndPoints.coursesAdmin());
    if (response.data) {
      setCourses(response.data.courses);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div>
      <h1>Create Course Page</h1>
      {courses.map((c) => (
        <Course title={c.title} />
      ))}
    </div>
  );
}

function Course(props) {
  return (
    <div>
      <h1>{props.title}</h1>
    </div>
  );
}

export default ShowCourses;
