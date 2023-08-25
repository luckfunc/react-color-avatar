import { useEffect, useRef, useState } from 'react';
import { SectionWrapper, ColorListItem, WrapperShapeItem } from '@/components';
import { AvatarOption } from '@/types';
import { BeardShape, WidgetShape, WidgetType } from '@/enums';
import { getWidgets } from '@/utils';
import { AVATAR_LAYER, SETTINGS } from '@/constants';

interface IProps {
    avatarOption: AvatarOption
    setAvatarOption: (newOption: AvatarOption) => void
}
const sectionList = Object.values(WidgetType);

export default function PerfectScrollbar(props: IProps) {

    const { avatarOption, setAvatarOption } = props;
    const scrollWrapper = useRef(null);
    const [sections, setSections] = useState<{
        widgetType: WidgetType
        widgetList: {
            widgetType: WidgetType
            widgetShape: WidgetShape
            svgRaw: string
        }[]
    }[]>([]);

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
            setSections(updatedSections);
        })();
    }, []);

    const onSetWidgetColor = (widgetType: WidgetType, fillColor: string) => {
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
        }
    }

    //  设置身体
    const onSetSwitchWidget = (widgetType: WidgetType, widgetShape: WidgetShape) =>{
        if (widgetShape && avatarOption.widgets?.[widgetType]) {
            setAvatarOption({
                ...avatarOption,
                widgets: {
                    ...avatarOption.widgets,
                    [widgetType]: {
                        ...avatarOption.widgets?.[widgetType],
                        shape: widgetShape,
                        ...(widgetShape === BeardShape.Scruff
                            ? { zIndex: AVATAR_LAYER['mouth'].zIndex - 1 }
                            : undefined),
                    },
                },
            })
        }
    }
    const  getWidgetColor = (type: string) => {
        if (
            type === WidgetType.Face ||
            type === WidgetType.Tops ||
            type === WidgetType.Clothes
        ) {
            return avatarOption.widgets[type]?.fillColor
        } else return ''
    }
    if (!sections) {
        return null;
    }
    // @ts-ignore
    return (
        <div ref={scrollWrapper} style={{ position: 'relative', overflowY: 'auto', overflowX: 'hidden' }} className='configurator-scroll'>
            <div className='configurator'>
                <SectionWrapper title='头像形状'>
                    <WrapperShapeItem avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
                </SectionWrapper>

                <SectionWrapper title='背景颜色'>
                    <ColorListItem avatarOption={avatarOption} setAvatarOption={setAvatarOption}/>
                </SectionWrapper>
                {sections.map((s) => (
                    <SectionWrapper key={s.widgetType} title={(`${s.widgetType}`)}>
                        {
                            s.widgetType === WidgetType.Tops ||
                            s.widgetType === WidgetType.Face ||
                            s.widgetType === WidgetType.Clothes ? (
                                <details className={`color-picker ${s.widgetType === WidgetType.Face ? 'open' : ''}`}>
                                    <summary className="color">{('colors')}</summary>
                                    <ul className="color-list">
                                        {SETTINGS[s.widgetType === WidgetType.Face ? 'skinColors' : 'commonColors'].map(
                                            (fillColor) => (
                                                <li
                                                    key={fillColor}
                                                    className='color-list__item'
                                                    onClick={() => onSetWidgetColor(s.widgetType, fillColor)}
                                                >
                                                    <div style={{ background: fillColor }} className={`bg-color ${fillColor === getWidgetColor(s.widgetType) ? 'active' : ''}`} />
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </details>
                            ) : null
                        }

                        <ul className='widget-list'>
                            {s.widgetList.map((it) => (
                                <li
                                    key={it.widgetShape}
                                    className={`list-item ${it.widgetShape === avatarOption.widgets?.[s.widgetType]?.shape ? 'selected' : ''}`}
                                    onClick={() => onSetSwitchWidget(s.widgetType, it.widgetShape)}
                                    dangerouslySetInnerHTML={{ __html: it.svgRaw }}
                                />
                            ))}
                        </ul>
                    </SectionWrapper>
                ))}
            </div>

        </div>
    )
}
