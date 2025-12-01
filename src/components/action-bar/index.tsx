import { useDispatch } from 'react-redux';
import { ActionType } from '@enums';
import IconBack from '@assets/icons/icon-back.svg';
import IconFlip from '@assets/icons/icon-flip.svg';
import IconNext from '@assets/icons/icon-next.svg';
import './style.less';

interface IProps {
  flipped: boolean;
  setFlipped: (flipped: boolean) => void;
}

export default function ActionBar(props: IProps) {
  const { setFlipped, flipped } = props;
  // const history = useSelector((state: AppState) => state.history);
  // const canUndo = history.past.length > 0;
  // const canRedo = history.future.length > 0;
  const dispatch = useDispatch();

  const handleActionClick = (actionType: 'undo' | 'redo' | 'flip' | 'code') => {
    switch (actionType) {
      case ActionType.Undo:
        dispatch({ type: actionType });
        break;
      case ActionType.Redo:
        dispatch({ type: actionType });
        break;
      case ActionType.Flip:
        setFlipped(!flipped);
        break;
      case ActionType.Code:
        dispatch({ type: actionType });
        break;
      default:
      // 默认处理
    }
  };

  const actions = [
    {
      type: ActionType.Undo,
      icon: IconBack,
      tip: 'Undo',
      disabled: true,
    },
    {
      type: ActionType.Redo,
      icon: IconNext,
      tip: 'Redo',
      disabled: true,
    },
    {
      type: ActionType.Flip,
      icon: IconFlip,
      tip: 'Flip',
    },
  ];
  return (
    <div className="action-menu">
      {actions.map((ac) => (
        <div
          key={ac.type}
          className={`menu-item ${ac.disabled ? 'disabled' : ''}`}
          title={ac.tip}
          onClick={() => handleActionClick(ac.type)}
        >
          <img src={ac.icon} alt={ac.tip} />
        </div>
      ))}
    </div>
  );
}
