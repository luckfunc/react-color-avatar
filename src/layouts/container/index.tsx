import { useRef, useState } from 'react';
import { ActionBar, ReactColorAvatar } from '@/components';
import { Header, Footer } from '@/layouts';
import { AvatarOption } from '@/types';
import { getRandomAvatarOption, getSpecialAvatarOption } from '@/utils';
import { DOWNLOAD_DELAY, NOT_COMPATIBLE_AGENTS, TRIGGER_PROBABILITY } from '@/constants';
import { name } from '../../../package.json';
import './style.less'

interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
export default function Container(props: IProps) {
    const { avatarOption, setAvatarOption } = props;
    const [flipped, setFlipped] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const colorAvatarRef = useRef<HTMLDivElement>(null);
    const onRandomAvatar = () => {
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
    const onDownload = async () => {
        try {
            setDownloading(true);
            const avatarEle =colorAvatarRef.current;
            const userAgent = window.navigator.userAgent.toLowerCase()
            const notCompatible = NOT_COMPATIBLE_AGENTS.some(
                (agent) => userAgent.indexOf(agent) !== -1
            )
            if (avatarEle) {
                const html2canvas = (await import('html2canvas')).default
                // @ts-ignore
                const canvas = await html2canvas(avatarEle, {
                    backgroundColor: null,
                })
                const dataURL = canvas.toDataURL()
                if (notCompatible) {
                    // setImageDataURL(dataURL); // TODO
                    // setDownloadModalVisible(true);// TODO
                } else {
                    const trigger = document.createElement('a')
                    trigger.href = dataURL;
                    trigger.download = `${name}.png`;
                    trigger.click();
                }
            }
        } finally {
            setTimeout(() => {
                setDownloading(false)
            }, DOWNLOAD_DELAY)
        }

    };

    return (
        <section className='container'>
            <div className='content-warpper'>
                <div className='content-view'>
                    <Header/>

                    <div className='playground'>
                        <div className='avatar-wrapper'>
                            <ReactColorAvatar
                                colorAvatarRef={colorAvatarRef}
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
                                onClick={onDownload}
                            >
                                {
                                    downloading
                                    ? '下载头像中'
                                    : '下载头像'
                                }
                            </button>

                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </section>
    )
}
