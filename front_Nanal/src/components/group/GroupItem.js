import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onLogin } from '../../config/Login';
import axios_api from '../../config/Axios';
import GroupDiaryItem from './GroupDiaryItem';

function GroupItem({ item }) {
  // 일기 데이터 받기
  const [diaryList, setDiaryList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get(`diary/list/${item.groupDetail.groupIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          // 초기화 필요!
          setDiaryList(null);
          if (data.data.responseMessage === '일기 리스트 조회 성공') {
            setDiaryList(data.data.diary);
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ err }) => {
        console.log('일기 리스트 불러오기 오류: ', err);
      });
  }, []);

  return (
    <div>
      <Link
        to={`/Group/${item.groupDetail.groupIdx}`}
        state={{ groupIdx: item.groupDetail.groupIdx }}
      >
        <div className='bg-[#F7F7F7] border-2 border-solid border-slate-400 rounded-lg m-1 mb-3 p-2'>
          <p className='font-bold mb-0.5'>{item.groupDetail.groupName}</p>
          {item.tags.map((tagging, idx) => {
            if (tagging.tag) return <span key={idx}>#{tagging.tag}&nbsp;</span>;
            // return tagging.tag ? <span key={idx}>#{tagging.tag}</span> : <></>;
          })}
        </div>
      </Link>
    </div>
  );
}

export default GroupItem;
