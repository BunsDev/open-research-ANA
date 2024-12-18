import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DocumentOptionsState } from "@/types/document-options-state";
import ViewEditToggle from "@/components/ui/view-edit-toggle";
import { cn } from "@/lib/utils";

interface DocumentOptionsProps {
    state: DocumentOptionsState;
    onChange: (newState: Partial<DocumentOptionsState>) => void;
    canEdit: boolean;
}

export default function DocumentOptions({ 
    state, 
    onChange, 
    canEdit
}: DocumentOptionsProps) {
    const getItemClass = (selected = false) => cn(
                "bg-white",
                selected ? "bg-blue-50" : "hover:bg-gray-200",
                "active:bg-gray-300",
            )
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="inline-flex bg-[#F5F0EA] rounded-md shadow-md p-1">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        className="border border-black/10 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 mr-2">
                        {state.mode === 'section' ? 'Section View' : 'Full Document'}
                        <ChevronDown className="ml-2 h-4 w-4"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="border border-black/10">
                        <DropdownMenuItem onClick={() => onChange({ mode: 'full' })} className={getItemClass(state.mode === 'full')}>
                            Full Document
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onChange({ mode: 'section' })} className={getItemClass(state.mode === 'section')}>
                            Section View
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Select defaultValue="100" onValueChange={(value) => onChange({ zoom: Number(value) })}>
                    <SelectTrigger className="w-[100px] bg-white">
                        <SelectValue placeholder="View"/>
                    </SelectTrigger>
                    <SelectContent className="border border-black/10">
                        <SelectItem value="100" className={getItemClass(state.zoom === 100)}>100%</SelectItem>
                        <SelectItem value="75" className={getItemClass(state.zoom === 75)}>75%</SelectItem>
                        <SelectItem value="50" className={getItemClass(state.zoom === 50)}>50%</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="inline-flex bg-[#F5F0EA] rounded-md shadow-md p-1 h-[44px]">
                    <ViewEditToggle
                        mode={state.editMode ? 'edit' : 'view'}
                        onToggle={mode => onChange({ editMode: mode === 'edit' })}
                        disabled={!canEdit}
                    />
                </div>
        </div>
    );
}
