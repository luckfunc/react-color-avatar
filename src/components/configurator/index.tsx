import PerfectScrollbar from '../perfect-scrollbar';
import { AvatarOption } from '@/types';
import './style.less';

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
