import IconRight from '../../assets/icons/icon-right.svg';
import { useSider } from '../../hooks';
import './style.less';
import Configurator from '../../components/configurator';
import { AvatarOption } from '../../types';
interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
export default function Sidebar(props: IProps) {
  const { avatarOption, setAvatarOption } = props;

  const { isCollapsed, openSider, closeSider } = useSider();
  return (
      <aside className={`sider ${isCollapsed ? 'collapsed' : ''}`}>

        <Configurator avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>

        <div className='trigger' onClick={isCollapsed ? () => openSider() :  () => closeSider()}>
          <img src={IconRight} className='icon-right' alt='arrow'/>
        </div>
      </aside>
  )
}
