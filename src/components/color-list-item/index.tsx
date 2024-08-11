import { SETTINGS } from '@constants';
import { AvatarOption } from '@types';

interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}

export default function ColorListItem(props: IProps) {
    const { setAvatarOption, avatarOption } = props;
    const onSwitchBgColor = (bgColor: string) => {
        if (bgColor !== avatarOption.background.color) {
            setAvatarOption({
                ...avatarOption,
                background: { ...avatarOption.background, color: bgColor },
            })
        }
    }
    return (
        <ul className='color-list'>
            {
                SETTINGS.backgroundColor.map((bgColor: string) => {
                    return (
                        <li
                            key={bgColor}
                            className='color-list__item'
                            onClick={() => onSwitchBgColor(bgColor)}
                        >
                            <div
                                style={{ background: bgColor }}
                                className={`bg-color ${
                                    bgColor === avatarOption.background.color
                                        ? 'active'
                                        : bgColor === 'transparent'
                                            ? 'transparent'
                                            : ''
                                }`}

                            />
                        </li>
                    )
                })
            }
        </ul>
    );
}
