import { useEffect, useRef, useState } from 'react';
import './style.less';
import SectionWrapper from '../section-wrapper';
import ColorListItem from '../color-list-item';
import WrapperShapeItem from '../wrapper-shape-item';
import { AvatarOption } from '../../types';
import { WidgetType } from '../../enums';
import { SETTINGS } from '../../constants';
import { getWidgetColor, getWidgets } from '../../utils';

interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
const sectionList = Object.values(WidgetType);
export default function PerfectScrollbar(props: IProps) {

    const { avatarOption, setAvatarOption } = props;
    const scrollWrapper = useRef(null);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        (async () => {
            const a = await Promise.all(
                sectionList.map((section) => {
                    return getWidgets(section);
                })
            );

            const updatedSections = sectionList.map((li, i) => {
                return {
                    widgetType: li,
                    widgetList: a[i],
                };
            });
            setSections(updatedSections); // TODO any type
        })();
    }, []);

    const onSetWidgetColor = (widgetType: WidgetType, fillColor: string) => {
        console.log('fillColor', fillColor);
        if (avatarOption.widgets?.[widgetType]) {
            setAvatarOption({
                ...avatarOption,
                widgets: {
                    ...avatarOption.widgets,
                    [widgetType]: {
                        ...avatarOption.widgets?.[widgetType],
                        fillColor,
                    },
                },
            })
            console.log('color', {
                ...avatarOption,
                widgets: {
                    ...avatarOption.widgets,
                    [widgetType]: {
                        ...avatarOption.widgets?.[widgetType],
                        fillColor,
                    },
                },
            }.widgets.face?.fillColor)
        }
    }

    //
    const onSetSwitchWidget = (...args: any) => {
        console.log('arg', args);
    }
    if (!sections) {
        return null;
    }
    // @ts-ignore
    return (
        <div ref={scrollWrapper} style={{ position: 'relative', overflow: 'hidden' }} className='configurator-scroll'>
            <div className='configurator'>
                <SectionWrapper title='头像形状'>
                    <WrapperShapeItem avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
                </SectionWrapper>

                <SectionWrapper title='背景颜色'>
                    <ColorListItem avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
                </SectionWrapper>

                {sections.map((s: any) => {
                    console.log('s', s);
                    return (
                        <SectionWrapper key={s.widgetType} title={s.widgetType}>
                            {
                                s.widgetType === WidgetType.Tops ||
                                s.widgetType === WidgetType.Face ||
                                s.widgetType === WidgetType.Clothes ? (
                                    <details className="color-picker" open={s.widgetType === WidgetType.Face}>
                                        <summary className="color">{'颜色'}</summary>
                                        <ul className="color-list">
                                            {SETTINGS[
                                                s.widgetType === WidgetType.Face ? 'skinColors' : 'commonColors'
                                                ].map((fillColor) => (
                                                <li
                                                    key={fillColor}
                                                    className='color-list__item'
                                                    onClick={() => onSetWidgetColor(s.widgetType, fillColor)}
                                                >
                                                    <div style={{ background: fillColor }} className={`bg-color ${fillColor === getWidgetColor(s.widgetType, avatarOption) ? 'active' : ''}`}/>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                ) : null
                            }
                            {
                                <ul className='widget-list'>
                                    {s.widgetList.map((it) => (
                                        <li
                                            key={it.widgetShape}
                                            className={`list-item ${
                                                it.widgetShape === avatarOption.widgets?.[s.widgetType]?.shape
                                                    ? 'selected'
                                                    : ''
                                            }`}
                                            onClick={() => onSetSwitchWidget(s.widgetType, it.widgetShape)}
                                            dangerouslySetInnerHTML={{ __html: it.svgRaw }}
                                        />
                                    ))}
                                </ul>
                            }
                        </SectionWrapper>
                    )
                })
                }
                <SectionWrapper title='身体'>

                </SectionWrapper>
            </div>

        </div>
    )
}
