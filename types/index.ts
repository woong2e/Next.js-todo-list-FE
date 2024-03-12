import {SVGProps} from "react";
import store from "@/store";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Todo = {
  id: string;
  title: string;
  is_done: boolean;
  created_at: Date;
};

export type CustomModalType = 'detail' | 'edit' | 'delete';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
