import { FaTrophy } from "react-icons/fa";
export const AwardCard = ({ awardTitle }: { awardTitle: string }) => {
    return (
        <div className="w-3/10 flex gap-3 items-center justify-center rounded-md px-3 py-2 border-2 border-gray-300">
            <FaTrophy className="text-gold text-4xl" />
            <p className="text-xs">{ awardTitle }</p>
        </div>
    )
}