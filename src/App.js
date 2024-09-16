import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import "./App.css";
import Login from "../src/auth/pages/Login";
import Register from "../src/auth/pages/Register";
import AdminLayout from "./admin/components/AdminLayout";
import Overview from "./admin/pages/Overview";
import Teachers from "./admin/pages/Teachers";
import Students from "./admin/pages/Students";
import Fee from "./admin/pages/Fees";
import Events from "./admin/pages/Events";
import TeachLayout from "./teachers/components/TeachLayout";
import Lesson from "./teachers/pages/Lesson";
import NewLesson from "./teachers/pages/NewLesson";
import Student from "./teachers/pages/Student";
import StudentDetails from "./teachers/pages/StudentDetails";
import Timetable from "./teachers/pages/Timetable";
import UploadResult from "./teachers/pages/UploadResult";
import LibLayout from "./librarian/components/LibLayout";
import BookCatalogue from "./librarian/pages/BookCatalogue";
import BookIssuing from "./librarian/pages/BookIssuing";
import ParentLayout from "./parents/components/ParentLayout";
import Result from "./parents/pages/Result";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="spinner-container">
          <ThreeCircles
            height="80"
            width="80"
            color="#ED8B8B"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Overview />} />
                <Route path="overview" element={<Overview />} />
                <Route path="students" element={<Students />} />
                <Route path="teachers" element={<Teachers />} />
                <Route path="fee" element={<Fee />} />
                <Route path="events" element={<Events />} />
              </Route>
              <Route path="/teacher" element={<TeachLayout />}>
                <Route index element={<Lesson />} />
                <Route path="lesson" element={<Lesson />} />
                <Route path="newLesson/:id" element={<NewLesson />} />
                <Route path="student" element={<Student />} />
                <Route path="studentDetails" element={<StudentDetails />} />
                <Route path="timetable" element={<Timetable />} />
                <Route path="uploadResult" element={<UploadResult />} />
              </Route>
              <Route path="/parents" element={<ParentLayout />}>
                <Route index element={<Result />} />
                <Route path="result" element={<Result />} />
              </Route>
              <Route path="/library" element={<LibLayout />}>
                <Route index element={<BookCatalogue />} />
                <Route path="bookCatalogue" element={<BookCatalogue />} />
                <Route path="bookIssuing" element={<BookIssuing />} />
              </Route>
              {/* <Route path="/accountant" element={<ParentLayout />}>
                <Route index element={<Result />} />
                <Route path="result" element={<Result />} />
              </Route> */}
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
