import { type CSSProperties, type RefObject, useEffect, useState } from 'react';
import { Background } from '@components/widgets';
import { type WidgetShape, WidgetType, WrapperShape } from '@enums';
import type { AvatarOption, Widget } from '@types';
import { AVATAR_LAYER, NONE } from '@constants';
import { widgetData } from '@utils/dynamic-data';
import './style.less';

interface IReactColorAvatarProps {
  option: AvatarOption;
  size: 280;
  style: CSSProperties;
  colorAvatarRef: RefObject<HTMLDivElement>;
}
export default function ReactColorAvatar(props: IReactColorAvatarProps) {
  const { option: avatarOption, size: avatarSize, style, colorAvatarRef } = props;
  const [svgContent, setSvgContent] = useState('');

  useEffect(() => {
    (async () => {
      const sortedList = Object.entries(avatarOption.widgets).sort(
        ([prevShape, prev], [nextShape, next]) => {
          const prevZIndex = prev.zIndex ?? AVATAR_LAYER[prevShape as WidgetType]?.zIndex ?? 0;
          const nextZIndex = next.zIndex ?? AVATAR_LAYER[nextShape as WidgetType]?.zIndex ?? 0;
          return prevZIndex - nextZIndex;
        },
      );

      const getWidgetSvg = async (widgetType: WidgetType, opt: Widget<WidgetShape>) => {
        if (opt.shape !== NONE && widgetData?.[widgetType]?.[opt.shape]) {
          return (await widgetData[widgetType][opt.shape]()).default;
        }
        return '';
      };

      const promises = sortedList.map(async ([widgetType, opt]) => {
        return getWidgetSvg(widgetType as WidgetType, opt);
      });

      let skinColor: string | undefined;

      const svgRawList = await Promise.all(promises).then((raw) =>
        raw.map((svgRaw, i) => {
          const [widgetType, widget] = sortedList[i];
          let widgetFillColor = widget.fillColor;

          if (widgetType === WidgetType.Face) {
            skinColor = widgetFillColor;
          }
          if (skinColor && widgetType === WidgetType.Ear) {
            widgetFillColor = skinColor;
          }

          const content = svgRaw
            .slice(svgRaw.indexOf('>', svgRaw.indexOf('<svg')) + 1)
            .replace('</svg>', '')
            .replaceAll('$fillColor', widgetFillColor || 'transparent');

          return `
            <g id="react-color-avatar-${sortedList[i][0]}">
              ${content}
            </g>
           `;
        }),
      );

      setSvgContent(`
       <svg
              width="${avatarSize}"
              height="${avatarSize}"
              viewBox="0 0 ${avatarSize / 0.7} ${avatarSize / 0.7}"
              preserveAspectRatio="xMidYMax meet"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform='translate(100, 65)'>
                ${svgRawList.join('')}
              </g>
            </svg>
      `);
    })();
  }, [avatarOption, widgetData]);

  const getWrapperShapeClassName = () => {
    return {
      [WrapperShape.Circle]: avatarOption.wrapperShape === WrapperShape.Circle,
      [WrapperShape.Square]: avatarOption.wrapperShape === WrapperShape.Square,
      [WrapperShape.Squircle]: avatarOption.wrapperShape === WrapperShape.Squircle,
    };
  };
  const shapeClassNames = getWrapperShapeClassName();
  const trueShape = Object.keys(shapeClassNames).find((shape: string) => {
    return shapeClassNames[shape as WrapperShape];
  });

  return (
    <div
      className={`react-color-avatar ${trueShape}`}
      ref={colorAvatarRef}
      style={{ width: avatarSize, height: avatarSize, ...style }}
    >
      <Background color={avatarOption.background.color} />
      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div className="avatar-payload" dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
}
