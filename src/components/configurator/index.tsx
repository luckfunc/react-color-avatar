import PerfectScrollbar from '../perfect-scrollbar';
import './style.less';
import { AvatarOption } from '../../types';
interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
export default function Configurator(props: IProps) {
    const { avatarOption, setAvatarOption } = props;
    return (
        <PerfectScrollbar avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
    )
}
