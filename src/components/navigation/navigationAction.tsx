import { Plus } from "lucide-react";
import ActionTooltip from "../actionTooltip";

export default function NavigationAction() {
  return (
    <>
      <ActionTooltip label="Add a server" side="right" align="start">
        <div className="group flex items-center">
          <button>
            <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
              <Plus className="group-hover:text-white transition text-emerald-500" />
              fsd
            </div>
          </button>
        </div>
      </ActionTooltip>
    </>
  );
}
