import { AvatarOption } from '@types';
import './style.less';

interface BackgroundProps {
  color: AvatarOption['background']['color'];
}
export default function Background(props: BackgroundProps) {
  const { color } = props;
  return (
    <div className="avatar-background" style={{ background: color }} />
  );
}
