import { eastAsianWidth } from "eastasianwidth";

import { Color } from "./color";

export class Character {
  constructor(
    private _character: string,
    private _foregroundColor: Color = { default: true },
    private _backgroundColor: Color = { default: true }
  ) {}

  public eastAsianWidth(): "F" | "H" | "W" | "Na" | "A" | "N" {
    return eastAsianWidth(this._character);
  }

  public get character(): string {
    return this._character;
  }

  public get foregroundColor(): Color {
    return this._foregroundColor;
  }

  public get backgroundColor(): Color {
    return this._backgroundColor;
  }
}
