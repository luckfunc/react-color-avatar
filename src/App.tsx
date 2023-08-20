import Container from './layouts/container';
import Sidebar from './layouts/sidebar';
import { useAvatarOption } from './hooks';
import './App.less';

export default function App() {
    const [avatarOption, setAvatarOption] = useAvatarOption();

    return (
      <main className='main'>
          <Container avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
          <Sidebar avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
      </main>
  )
}

