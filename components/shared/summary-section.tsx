import { IconType } from "react-icons";

interface SummarySectionProps {
    title: string;
    listItems: string[];
    icon: IconType;
    listIcon: IconType
}

export const SummarySection = ({ title, listItems, icon: Icon, listIcon: ListIcon }: SummarySectionProps) => {
    return (
        <div className='w-full rounded-xl border-2 border-gray-outline flex flex-col gap-1 items-left xl:justify-center shadow-md px-4 py-5 hover:-translate-y-2 transition-transform duration-150'>
            <div className="flex gap-2 items-center">
                <Icon className="text-xl" />
                <p className='text-xl font-medium'>{ title }</p>
            </div>
            <ul>
                {listItems.map((item, index) => (
                    <li key={ index } className="flex gap-2 items-center text-base">
                        <ListIcon />
                        <span> { item } </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}