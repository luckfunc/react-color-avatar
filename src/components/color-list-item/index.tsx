import { SETTINGS } from '@constants';
import type { AvatarOption } from '@types';

interface IProps {
  avatarOption: AvatarOption;
  setAvatarOption: (newOption: AvatarOption) => void;
}
export default function ColorListItem(props: IProps) {
  const { setAvatarOption, avatarOption } = props;

  const onSwitchBgColor = (bgColor: string) => {
    if (bgColor !== avatarOption.background.color) {
      setAvatarOption({
        ...avatarOption,
        background: { ...avatarOption.background, color: bgColor },
      });
    }
  };

  const getBgColorClass = (bgColor: string) => {
    if (bgColor === avatarOption.background.color) return 'active';
    if (bgColor === 'transparent') return 'transparent';
    return '';
  };

  return (
    <ul className="color-list">
      {SETTINGS.backgroundColor.map((bgColor: string) => (
        <li key={bgColor} className="color-list__item" onClick={() => onSwitchBgColor(bgColor)}>
          <div style={{ background: bgColor }} className={`bg-color ${getBgColorClass(bgColor)}`} />
        </li>
      ))}
    </ul>
  );
}
