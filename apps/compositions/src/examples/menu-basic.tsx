import { Button } from "compositions/ui/button"
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "compositions/ui/menu"
import { LuChevronsUpDown } from "react-icons/lu"

export const MenuBasic = () => {
  return (
    <MenuRoot>
      <MenuTrigger>
        <Button variant="outline" size="sm">
          Menu <LuChevronsUpDown />
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem value="new-txt">New Text File</MenuItem>
        <MenuItem value="new-file">New File...</MenuItem>
        <MenuItem value="new-win">New Window</MenuItem>
        <MenuItem value="open-file">Open File...</MenuItem>
        <MenuItem value="export">Export</MenuItem>
      </MenuContent>
    </MenuRoot>
  )
}
