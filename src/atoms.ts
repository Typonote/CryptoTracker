import { atom } from "recoil";

// 유일한 값과 초기값을 필요로 함.
export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});
