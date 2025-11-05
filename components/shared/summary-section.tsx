interface SummarySectionProps {
    title: string;
    listItems: string[];
}

export const SummarySection = ({ title, listItems }: SummarySectionProps) => {
    return (
        <div className='flex flex-col gap-2 items-left'>
            <p className='text-3xl font-medium'>{ title }</p>
            <ul className='list-disc'>
                {listItems.map((item, index) => (
                    <li key={ index } >{ item }</li>
                ))}
            </ul>
        </div>
    )
}