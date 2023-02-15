import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios_api from '../../config/Axios';
import jwt_decode from 'jwt-decode';
import { getCookie } from '../../config/Cookie';
import { onLogin } from '../../config/Login';
import CommentList from './CommentList';
import bookmark from '../../src_assets/img/bookmark.png';
import bookmark_filled from '../../src_assets/img/bookmark_fill.png';
import diaryImgRed from '../../src_assets/img/diary-img/diary-img-red.svg';

function DiaryDetail() {
  // const location = useLocation();
  const { state } = useLocation();

  const token = getCookie('accessToken');
  const userIdx = jwt_decode(token).userIdx;

  const navigate = useNavigate();
  const diaryIdx = state.diaryIdx;
  const isToggle = state.isToggle;
  const groupIdx = state.groupIdx;
  const [diarydate, setDiarydate] = useState(['0000', '00', '00']);

  const [diaryDetail, setDiaryDetail] = useState({});
  const [originGroupList, setOriginGroupList] = useState();

  // 북마크 여부 데이터
  const [isBook, setIsBook] = useState(false);

  // 북마크 저장 함수
  const bookmarkSave = () => {
    axios_api
      .get(`diary/bookmark/${diaryIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 북마크 저장 성공') {
            setIsBook(!isBook);
          }
        } else {
          console.log('일기 북마크 저장 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 북마크 저장 오류: ' + error);
      });
  };

  // 북마크 삭제 함수
  const bookmarkDelete = () => {
    axios_api
      .delete(`diary/bookmark/${diaryIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 북마크 삭제 성공') {
            setIsBook(!isBook);
          }
        } else {
          console.log('일기 북마크 삭제 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 북마크 삭제 오류: ' + error);
      });
  };

  // 일기 삭제 함수
  const diaryDelete = () => {
    axios_api
      .delete(`diary/${diaryIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 삭제 성공') {
            setDiaryDetail(data.data.diary);
            navigate('/', { replace: true });
          }
        } else {
          console.log('일기 삭제 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 삭제 오류: ' + error);
      });
  };

  // 일기 상세 페이지 불러오기
  useEffect(() => {
    onLogin();
    axios_api
      .get(`diary/${diaryIdx}`)
      .then(({ data }) => {
        if (data.statusCode === 200) {
          if (data.data.responseMessage === '일기 조회 성공') {
            setDiaryDetail(data.data.diary);
            setDiarydate(data.data.diary.diaryDate.split('-'));
            setOriginGroupList(data.data.groupList);

            if (data.data.isBookmark === true) {
              setIsBook(!isBook);
            }
          }
        } else {
          console.log('일기 조회 오류: ');
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('일기 조회 오류: ' + error);
      });
  }, []);

  return (
    <div className='relative w-[1440px] mx-auto'>
      <img
        src={diaryImgRed}
        alt='bg-img'
        className='absolute w-[1280px] z-10 left-12'
      />
      <p className='absolute z-20 text-2xl font-bold inset-y-20 left-[190px]'>
        {diarydate[0]}년 {diarydate[1]}월 {diarydate[2]}일의 일기
      </p>
      {/* 그림 */}
      <div className='flex justify-start'>
        <img
          src={diaryDetail.picture}
          alt='DALL:E2'
          className='absolute z-20 my-2 rounded-lg opacity-25 inset-y-32 left-[200px]'
        />
        <img
          src={diaryDetail.picture}
          alt='DALL:E2'
          className='absolute z-20 inset-y-40 left-[230px] w-[200px] h-[200px] mt-2 border-2 border-black rounded-lg'
        />
      </div>
      {/* 수정/삭제 버튼 */}
      {userIdx === diaryDetail.userIdx ? (
        <div className='absolute z-20 my-10 inset-y-96 left-[250px]'>
          <div className='flex justify-start mt-4'>
            <Link
              to={'/Diary/Edit'}
              state={{
                diaryDetail: diaryDetail,
                originGroupList: originGroupList,
              }}
            >
              <button className='font-bold hover:bg-cyan-500 bg-cyan-400 text-white px-2.5 py-1 rounded-3xl m-auto block text-2xl'>
                수정
              </button>
            </Link>
            <button
              className='font-bold bg-rose-400 hover:bg-rose-500 text-white px-2.5 py-1 rounded-3xl mx-4 inline-block text-2xl'
              onClick={() => {
                Swal.fire({
                  title: `일기를 정말 삭제하시겠습니까?`,
                  text: '삭제한 일기는 휴지통에서 확인 가능합니다.',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: '삭제',
                  cancelButtonText: '취소',
                }).then((result) => {
                  if (result.isConfirmed) {
                    diaryDelete();
                  }
                });
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ) : null}

      {/* 감정/북마크/일기 내용 */}
      <div className='flex justify-end absolute z-20 w-[720px] inset-y-24 mt-2 right-40'>
        {/* 감정 넣는 곳 */}
        <img
          src={diaryDetail.emo}
          alt='Emotion'
          className='w-12 h-12 mr-4'
        ></img>
        {isBook ? (
          <div>
            <img
              src={bookmark_filled}
              alt='bookmark_filled'
              onClick={bookmarkDelete}
            />
          </div>
        ) : (
          <div>
            <img src={bookmark} alt='bookmark' onClick={bookmarkSave} />
          </div>
        )}
      </div>
      <div className='absolute z-20 text-2xl text-left underline inset-y-44 underline-offset-8 w-[720px] right-40'>
        {diaryDetail.content}
      </div>
      <div className='my-5'>
        <CommentList
          diaryIdx={diaryIdx}
          isToggle={isToggle}
          groupIdx={groupIdx}
        />
      </div>
    </div>
  );
}

DiaryDetail.defaultProps = {
  diaryDetail: [],
};

export default DiaryDetail;
