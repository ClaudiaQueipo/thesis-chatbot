import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../assets/Icons/MoonIcon";
import { SunIcon } from "../assets/Icons/SunIcon";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      onClick={() => {
        if (theme === "dark") setTheme("light");
        else setTheme("dark");
        // setTheme("dark")
      }}
      size="lg"
      color="secondary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
    />
  );
}
