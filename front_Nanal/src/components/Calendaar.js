import React, { useState } from "react";
import Calendar from "react-calendar";
import "../src_assets/css/Calendar.css";
import { Link, useNavigate } from "react-router-dom";
import DiaryList from "../components/diary/DiaryList";

// 날짜를 'YYYY-MM-DD' 형태로 바꾸는 함수들
const leftPad = (value) => {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
};

const toStringByFormatting = (value, delimeter = "-") => {
  const year = value.getFullYear();
  const month = leftPad(value.getMonth() + 1);
  const date = leftPad(value.getDate());

  return [year, month, date].join(delimeter);
};

function Calendaar() {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  return (
    <div>
      캘린더 페이지 입니다. ||
      <Link to="/SignIn"> 로그인 </Link>
      {/* 일기쓰기 테스트용 */}
      <div className="border-none">
        <Calendar
          onChange={onChange}
          value={value}
          calendarType="ISO 8601"
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        />
      </div>
      <br />
      <hr className="border-black" />
      <br />
      {/* 일기쓰러가기 버튼 */}
      <div className="flex justify-center">
        <button onClick={() => navigate("/Diary/Create")}>
          {" "}
          일기 쓰러 가기~! 🖊{" "}
        </button>
      </div>
      {/* 일기 리스트 */}
      <DiaryList curDate={toStringByFormatting(value)} />
    </div>
  );
}

export default Calendaar;
