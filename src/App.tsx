import { Container, Sidebar } from '@layouts';
import { useAvatarOption } from '@hooks';
import './App.less';

export default function App() {
  const [avatarOption, setAvatarOption] = useAvatarOption();

  return (
    <main className="main">
      <Container avatarOption={avatarOption} setAvatarOption={setAvatarOption} />
      <Sidebar avatarOption={avatarOption} setAvatarOption={setAvatarOption} />
    </main>
  );
}
