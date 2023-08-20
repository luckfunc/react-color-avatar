import Header from '../header';
import Footer from '../footer';
import ReactColorAvatar from '../../components/react-color-avatar';
import ActionBar from '../../components/action-bar';
import { useState } from 'react';
import { AvatarOption } from '../../types';
import { getRandomAvatarOption, getSpecialAvatarOption } from '../../utils';
import { TRIGGER_PROBABILITY } from '../../constants';
import './style.less'

interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
export default function Container(props: IProps) {
    const { avatarOption, setAvatarOption } = props;
    const [flipped, setFlipped] = useState(false);
    const onRandomAvatar = () => {
        console.log('随机生成');
        if (Math.random() <= TRIGGER_PROBABILITY) {
            let colorfulOption = getSpecialAvatarOption()
            while (
                JSON.stringify(colorfulOption) === JSON.stringify(avatarOption)
                ) {
                colorfulOption = getSpecialAvatarOption()
            }
            colorfulOption.wrapperShape = avatarOption.wrapperShape
            setAvatarOption(colorfulOption)
            // showConfetti()
        } else {
            const randomOption = getRandomAvatarOption(avatarOption)
            setAvatarOption(randomOption)
        }
    }
    return (
        <section className='container'>
            <div className='content-warpper'>
                <div className='content-view'>
                    <Header/>

                    <div className='playground'>
                        <div className='avatar-wrapper'>
                            <ReactColorAvatar
                                option={avatarOption}
                                size={280}
                                style={{transform: `rotateY(${flipped ? -180 : 0}deg)`}}
                            />
                        </div>

                        <ActionBar flipped={flipped} setFlipped={setFlipped}/>

                        <div className='action-group'>
                            <button
                                type='button'
                                className='action-btn action-randomize'
                                onClick={onRandomAvatar}
                            >
                                随机生成
                            </button>

                            <button
                                type='button'
                                className='action-btn action-download'
                                disabled={true}
                            >
                                下载头像
                            </button>

                            <button
                                type='button'
                                className='action-btn action-multiple'
                            >
                                批量生成
                            </button>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </section>
    )
}
