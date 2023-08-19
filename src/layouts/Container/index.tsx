import './style.less'
import Header from '../Header';
import Footer from '../Footer';
import ReactColorAvatar from '../../components/ReactColorAvatar';
// import ReactColorAvatar from '../../components/ReactColorAvatar';

export default function Container() {
    return (
        <section className='container'>
            <div className='content-warpper'>
                <div className='content-view'>
                    <Header/>

                    <div className='playground'>
                        <div className="avatar-wrapper">
                            <ReactColorAvatar
                            />
                            {/*<ReactColorAvatar*/}
                            {/*    option={}*/}
                            {/*/>*/}
                        {/*    <VueColorAvatar*/}
                        {/*        ref="colorAvatarRef"*/}
                        {/*    :option="avatarOption"*/}
                        {/*    :size="280"*/}
                        {/*    :style="{*/}
                        {/*    transform: `rotateY(${flipped ? -180 : 0}deg)`,*/}
                        {/*}"*/}
                        {/*    />*/}
                        </div>
                    </div>
                    {/*    TODO playground*/}
                    <Footer/>
                </div>
            </div>

        </section>
    )
}
