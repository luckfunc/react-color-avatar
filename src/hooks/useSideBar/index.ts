import { useDispatch, useSelector } from 'react-redux';
import { SET_SIDER_STATUS } from '@/store/mutation-type';
import { AppState } from '@/types';

export default function useSideBar() {
    const isCollapsed = useSelector((state: AppState) => state.isCollapsed);
    const dispatch = useDispatch();

    const openSider = () => {
        dispatch({ type: SET_SIDER_STATUS, payload: false });
    };

    const closeSider = () => {
        dispatch({ type: SET_SIDER_STATUS, payload: true });
    };

    return { isCollapsed, openSider, closeSider };
}
