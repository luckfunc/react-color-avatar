import { type NONE } from '@constants';
import { REDO, SET_AVATAR_OPTION, SET_SIDER_STATUS, UNDO } from '@store/mutation-type';
import {
  type BeardShape,
  type ClothesShape,
  type EarringsShape,
  type EarShape,
  type EyebrowsShape,
  type EyesShape,
  type FaceShape,
  type Gender,
  type GlassesShape,
  type MouthShape,
  type NoseShape,
  type TopsShape,
  type WrapperShape,
} from '@enums';

export type None = typeof NONE;

export interface Widget<Shape> {
  shape: Shape | None;
  zIndex?: number;
  fillColor?: string;
  strokeColor?: string;
}

export interface AvatarWidgets {
  face: Widget<FaceShape>;
  tops: Widget<TopsShape>;
  ear: Widget<EarShape>;
  earrings: Widget<EarringsShape>;
  eyebrows: Widget<EyebrowsShape>;
  glasses: Widget<GlassesShape>;
  eyes: Widget<EyesShape>;
  nose: Widget<NoseShape>;
  mouth: Widget<MouthShape>;
  beard: Widget<BeardShape>;
  clothes: Widget<ClothesShape>;
}

export interface AvatarOption {
  gender?: Gender;

  wrapperShape?: `${WrapperShape}`;

  background: {
    color: string;
  };

  widgets: Partial<AvatarWidgets>;
}

export interface AvatarSettings {
  gender: [Gender, Gender];

  wrapperShape: WrapperShape[];
  faceShape: FaceShape[];
  topsShape: TopsShape[];
  earShape: EarShape[];
  earringsShape: EarringsShape[];
  eyebrowsShape: EyebrowsShape[];
  eyesShape: EyesShape[];
  noseShape: NoseShape[];
  mouthShape: MouthShape[];
  beardShape: BeardShape[];
  glassesShape: GlassesShape[];
  clothesShape: ClothesShape[];

  commonColors: string[];
  skinColors: string[];
  backgroundColor: string[];
}

// store
export interface AppState {
  history: {
    past: AvatarOption[];
    present: AvatarOption;
    future: AvatarOption[];
  };
  isCollapsed: boolean;
}

// reducer action type
export interface ActionTypes {
  type: typeof REDO | typeof SET_AVATAR_OPTION | typeof SET_SIDER_STATUS | typeof UNDO;
  payload: boolean;
}
