import { CoursesEndPoints } from "@courseApp/constants/endPoints";
import { ApiClient } from "@courseApp/utils/apiClient";
import React from "react";

const COURSE_STATE_KEYS = {
  Title: "title",
  Description: "description",
  Price: "price",
  image: "imageLink",
  published: "published",
};

function CreateCourse() {
  const [courseDetails, setCourseDetails] = React.useState({
    [COURSE_STATE_KEYS.Title]: "",
    [COURSE_STATE_KEYS.Description]: "",
    [COURSE_STATE_KEYS.Price]: "",
    [COURSE_STATE_KEYS.image]: "",
    [COURSE_STATE_KEYS.published]: false,
  });

  const handleChange = (key, event) => {
    event.preventDefault();
    const { value } = event.target;
    setCourseDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCourseCreate = async () => {
    try {
      const data = JSON.stringify(courseDetails);
      const response = await ApiClient.post(
        CoursesEndPoints.coursesAdmin(),
        data
      );
      alert(response.data.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1>Create Course Page</h1>
      <p>Title - </p>
      <input
        type={"text"}
        onChange={(event) => handleChange(COURSE_STATE_KEYS.Title, event)}
      />
      <p>description - </p>
      <input
        type={"text"}
        onChange={(event) => handleChange(COURSE_STATE_KEYS.Description, event)}
      />
      <p>Price - </p>
      <input
        type={"number"}
        onChange={(event) => handleChange(COURSE_STATE_KEYS.Price, event)}
      />
      <p>Image Url - </p>
      <input
        type={"text"}
        onChange={(event) => handleChange(COURSE_STATE_KEYS.image, event)}
      />
      <br />
      <button onClick={handleCourseCreate}>Create Course</button>
    </div>
  );
}
export default CreateCourse;
