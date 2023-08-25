import { Logo } from '@/components';
import IconGitHub from '../../assets/icons/icon-github.svg';
import './style.less'

export default function Header() {
    return (
        <header className='header'>
            <Logo/>

            <h2 className='site-title'>Color Avatar</h2>

            <div className='header-right'>
                <a
                    href='https://github.com/Ddkkkk11/react-color-avatar'
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                >
                    <button
                        type='button'
                        className='github-button'
                        onClick={() => console.log('跳转到github')}
                    >
                        <img src={IconGitHub} alt='GitHub'/>
                        <span className='text'>GitHub</span>
                    </button>
                </a>
            </div>
        </header>
    );
};

