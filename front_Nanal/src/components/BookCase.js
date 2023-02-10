import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios_api from '../config/Axios';
import { onLogin } from '../config/Login';
import shelf from '../src_assets/img/shelf.png';
import ang from '../src_assets/img/emotion/emo_ang.png';
import calm from '../src_assets/img/emotion/emo_calm.png';
import emb from '../src_assets/img/emotion/emo_emb.png';
import joy from '../src_assets/img/emotion/emo_joy.png';
import nerv from '../src_assets/img/emotion/emo_nerv.png';
import sad from '../src_assets/img/emotion/emo_sad.png';
import addIcon from '../src_assets/img/file_add_icon.png';
import nanalImg from '../src_assets/img/나날2.png';

function BookCase() {
  const [Collocate, setCollocate] = useState(false);
  const changeCollocate = () => {
    setCollocate((Collocate) => !Collocate);
  };

  // img태그가 갖는 공통 css 속성
  const emoCss = 'w-12 h-12 absolute'; // standart top-100, left-26
  const joyCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-24 left-12';
  const calmCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-28 right-12';
  const nervCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-64 right-8';
  const angCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-80 left-24';
  const embCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-88 left-24';
  const sadCss =
    Collocate === false
      ? 'animate-pulse'
      : 'animate-bounce hover:animate-none top-88 right-24';

  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    onLogin();
    axios_api
      .get('group/list/1')
      .then(({ data }) => {
        if (data.statusCode === 200) {
          setGroupList(null);
          if (data.data.responseMessage === '그룹 리스트 조회 성공') {
            setGroupList(data.data.groupList);
            console.log(data.data.groupList);
            console.log(data.data.groupList[0]);
          }
        } else {
          console.log(data.statusCode);
          console.log(data.data.responseMessage);
        }
      })
      .catch(({ error }) => {
        console.log('그룹 리스트 불러오기 오류: ' + error);
      });
  }, []);

  return (
    <div>
      {/* bookshelf 마진처리 해야함!!! */}
      <br />
      <div>
        <div className='relative flex h-20 p-4 text-center w-60 top-5 left-10 justify-evenly'>
          <div className='box-border relative grid items-center w-16 h-16 overflow-hidden text-center border border-zinc-400'>
            <Link
              to={'/Diary/List'}
              state={{
                isToggle: 1,
              }}
            >
              <img src={nanalImg} className='object-cover'></img>
            </Link>
          </div>
          <div className='box-border relative grid items-center w-16 h-16 overflow-hidden text-center border border-zinc-400'>
            {groupList && (
              <Link
                to={`/Group/Detail`}
                state={{ groupIdx: groupList[0].groupIdx, isToggle: 2 }}
              >
                <img src={groupList[0].imgUrl} className='object-cover'></img>
              </Link>
            )}
          </div>
        </div>
        {/* 책장 */}
        <img src={shelf} className='py-3 mx-auto w-60' />
        <div className='relative flex h-20 p-4 text-center w-60 top-5 left-10 justify-evenly'>
          <div className='box-border relative grid items-center w-16 h-16 overflow-hidden text-center border border-zinc-400'>
            {/* {groupList[0].imgUrl === null ? (
              <></>
            ) : (
              <Link
                to={`/Group/Detail`}
                state={{ groupIdx: groupList[0].groupIdx, isToggle: 2 }}
              >
                <img src={groupList[0].imgUrl} className='object-cover'></img>
              </Link>
            )} */}
          </div>
          <div className='box-border relative grid items-center w-16 h-16 overflow-hidden text-center border border-zinc-400'>
            {/* {groupList[0].imgUrl === null ? (
              <></>
            ) : (
              <Link
                to={`/Group/Detail`}
                state={{ groupIdx: groupList[0].groupIdx, isToggle: 2 }}
              >
                <img src={groupList[0].imgUrl} className='object-cover'></img>
              </Link>
            )} */}
          </div>
        </div>
        {/* 책장 */}
        <img src={shelf} className='py-3 mx-auto w-60' />
        <div className='relative flex h-20 p-4 text-center w-60 top-5 left-10 justify-evenly'>
          <div className='box-border relative grid items-center w-16 h-16 overflow-hidden text-center border border-zinc-400'>
            {/* {groupList[0].imgUrl === null ? (
              <></>
            ) : (
              <Link
                to={`/Group/Detail`}
                state={{ groupIdx: groupList[0].groupIdx, isToggle: 2 }}
              >
                <img src={groupList[0].imgUrl} className='object-cover'></img>
              </Link>
            )} */}
          </div>
          {/* 그룹 리스트로 이동 */}
          <Link
            to='/Group/List'
            className='relative grid items-center w-10 h-12 text-center'
          >
            <img src={addIcon} className='m-auto mt-2' />
          </Link>
        </div>
        {/* 책장 */}
        <img src={shelf} className='py-3 mx-auto w-60' />
      </div>
      <div className='flex justify-center'>
        <img src={sad} className={`${emoCss} ${sadCss}`} />
        <img src={nerv} className={`${emoCss} ${nervCss}`} />
        <img src={emb} className={`${emoCss} ${embCss}`} />
        <img src={ang} className={`${emoCss} ${angCss}`} />
        <img src={calm} className={`${emoCss} ${calmCss}`} />
        <img src={joy} className={`${emoCss} ${joyCss}`} />
        <button
          className='text-[12px] box-border rounded-full bg-slate-100/50 h-16 w-16 absolute'
          onClick={changeCollocate}
        >
          <p>
            {Collocate === false ? '감정 정령들 보기' : '감정 정령들 되돌리기'}
          </p>
        </button>
      </div>
    </div>
  );
}

export default BookCase;
