import { useDispatch, useSelector } from 'react-redux';
import { SET_AVATAR_OPTION } from '@store/mutation-type';
import type { AppState, AvatarOption } from '@types';

export default function useAvatarOption() {
  const avatarOption = useSelector((state: AppState) => state.history.present);
  const dispatch = useDispatch();

  const setAvatarOption = (newOption: AvatarOption) => {
    dispatch({ type: SET_AVATAR_OPTION, payload: newOption });
  };

  return [avatarOption, setAvatarOption] as const;
}
