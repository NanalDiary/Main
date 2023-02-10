import { useEffect } from 'react';
import { onLogin } from '../../config/Login';
import { removeCookie } from '../../config/Cookie';
import Swal from 'sweetalert2';
import ThemeSetting from '../../components/mypage/setting/ThemeSetting';
import TuningProfile from '../../components/mypage/profile/TuningProfile';
import TuningUserInfo from '../../components/mypage/profile/TuningUserInfo';
import { useNavigate } from "react-router";

const Tuning = () => {
  useEffect(() => {
    onLogin();
  }, []);
  const navigate = useNavigate()
  const tuningStyle =
    'box-border flex justify-between h-12 font-bold rounded-lg indent-4 bg-lime-200/75';

  const onLogout = () => {
    const denyToken = removeCookie('accessToken');

    // token 값이 없어졌다면?
    if (denyToken === undefined) {
      Swal.fire({
        icon: 'success',
        text: '로그아웃 했어요!',
        width: '80%',
      }).then(function () {
        // window.location.replace('/');
        navigate(`/`, {
          replace: true,
        });
      });
    } else {
      console.log('로그아웃 실패====');
    }
  };

  return (
    <div className='grid grid-cols-1 gap-4 w-60 place-content-evenly'>
      {/* PDF 미구현 */}
      <div className={tuningStyle}>
        <div className='self-center'>PDF로 내보내기</div>
      </div>
      {/* 테마설정 미구현 */}
      <ThemeSetting />
      {/* <hr className='my-4 w-80 border-slate-500/75' /> */}
      <div className={tuningStyle} onClick={onLogout}>
        <p className='self-center'>로그아웃</p>
      </div>
    </div>
  );
};

export default Tuning;
