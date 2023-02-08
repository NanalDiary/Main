import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import axios_api from '../../config/Axios';
import { onLogin } from '../../config/Login';
import GroupDiaryItem from './GroupDiaryItem';
import settingIcon from '../../src_assets/img/setting_icon.png';

function GroupDetail() {
  const { state } = useLocation();

  const [groupDetail, setGroupDetail] = useState('');
  const [groupTag, setGroupTag] = useState([]);

  const [diaryList, setDiaryList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get(`/group/${state.groupIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupDetail(null);
          setGroupTag(null);
          if (data.data.responseMessage === '그룹 조회 성공') {
            setGroupDetail(data.data.groupDetail);
            setGroupTag(data.data.tags);
            const groupidx = data.data.groupDetail.groupIdx;

            axios_api
              .get(`diary/list/${groupidx}`)
              .then(({ data }) => {
                if (data.statusCode === 200) {
                  // 초기화 필요!
                  setDiaryList(null);
                  if (data.data.responseMessage === '일기 리스트 조회 성공') {
                    setDiaryList(data.data.diary);
                  }
                } else {
                  console.log('일기 리스트 불러오기 오류: ');
                  console.log(data.statusCode);
                  console.log(data.data.responseMessage);
                }
              })
              .catch(({ err }) => {
                console.log('일기 리스트 불러오기 오류: ', err);
              });
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 상세 보기 오류: ' + error);
      });
  }, []);

  return (
    <div className='text-center'>
      <Link
        to={`/Group/Setting`}
        state={{ groupIdx: groupDetail.groupIdx }}
        className='inline-block float-right'
      >
        <img src={settingIcon} className='w-[20px] h-[20px] mx-1.5' />
      </Link>
      <div>
        <p className='mb-1 text-2xl font-bold text-center'>
          {groupDetail.groupName}
        </p>
        {groupTag.map((tagging, idx) => {
          return (
            <span
              key={idx}
              className='inline-block p-1 mx-1 my-1 text-xs break-all rounded-lg bg-stone-200 hover:bg-blue-200'
            >
              #{tagging.tag}&nbsp;
            </span>
          );
        })}
      </div>
      {/* <hr className='mx-5 my-5 text-center border-solid w-72 border-1 border-slate-600' /> */}

      {diaryList.map((diary) => (
        <GroupDiaryItem
          key={diary.diaryIdx}
          item={diary}
          groupIdx={state.groupIdx}
        />
      ))}
    </div>
  );
}

export default GroupDetail;
