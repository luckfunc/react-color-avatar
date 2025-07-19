import { Configurator } from '@components';
import { AvatarOption } from '@types';
import { useSideBar } from '@hooks';
import IconRight from '@assets/icons/icon-right.svg';
import './style.less';

interface IProps {
  avatarOption: AvatarOption;
  setAvatarOption: (newOption: AvatarOption) => void;
}
export default function Sidebar(props: IProps) {
  const { avatarOption, setAvatarOption } = props;

  const { isCollapsed, openSider, closeSider } = useSideBar();
  return (
    <aside className={`sider ${isCollapsed ? 'collapsed' : ''}`}>

      <Configurator avatarOption={avatarOption} setAvatarOption={setAvatarOption} />

      <div className="trigger" onClick={isCollapsed ? () => openSider() : () => closeSider()}>
        <img src={IconRight} className="icon-right" alt="arrow" />
      </div>
    </aside>
  );
}
