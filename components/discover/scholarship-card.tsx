import Image from 'next/image';
import { Scholarship } from '@/hooks/useScholarships';
import { 
    Card,
    CardHeader,
    CardContent,
    CardFooter
} from '@/components/ui/card';
import Link from 'next/link'
import { toTitleCase } from '@/lib/utils';
import { FaThumbsUp } from "react-icons/fa6";

export const ScholarshipCard = ({ scholarship }: { scholarship: Scholarship }) => {
    const mapRecommendMatch: Record<string, string> = {
        strong: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-background',
        good: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-background',
        fair: 'border-yellow-500 text-yellow-600 hover:bg-green-600 hover:text-background',
    };

    const handleRecommend = (scholarship: Scholarship) => {

    } 

    return (
        <Card className='w-[48%] flex flex-col justify-between px-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-transform duration-200'>
            <CardHeader className='w-full'>
                <div className="flex gap-8">
                    <div className='relative w-24 h-24'>
                        <Image src={ scholarship.program_img_url } alt={ scholarship.program_name } fill className='object-contain' />
                    </div>
                    <div className="flex flex-col">
                        <p className='text-2xl font-medium'>{ scholarship.program_name }</p>
                        <p className='text-dark-grayish-blue'>{ scholarship.provider_name }</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <div className="flex w-full justify-between font-semibold">
                    <p className='text-xl text-green-700'>{ scholarship.grant_type.toUpperCase() }</p>
                    <p className='flex items-center text-xs bg-green-800 px-4 rounded-full text-white'>{ scholarship.status.toUpperCase() }</p>
                </div>
                <div className="flex flex-col text-dark-grayish-blue">
                    <p>Eligibility: { scholarship.eligibility }</p>
                    <p>Award Value: up to PHP { scholarship.award_value }</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Deadline</p>
                        <p className='text-2xl font-medium'>{ scholarship.deadline }</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Grade Cutoff</p>
                        <p className='text-2xl font-medium'>{ scholarship.cutoff_grade }</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Slots</p>
                        <p className='text-2xl font-medium'>{ scholarship.slots }</p>
                    </div>
                </div>
                <div className="flex gap-1">
                    {scholarship.tags.map((tag, i) => (
                        <p key={ i } className='p-1 border-2 text-xs border-blue-500 rounded-sm text-blue-500'>{ tag }</p>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between w-full">
                <Link 
                    href="#" 
                    className="text-dark-grayish-blue hover:underline"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("Coming Soon!");
                    }}
                    >
                    See Full Details &rarr;
                </Link>
                <button 
                    onClick={ () => handleRecommend(scholarship) }
                    className={`flex gap-2 items-center border-2 py-1 px-2 rounded-sm text-sm ${ mapRecommendMatch[scholarship.match?.toLowerCase() || ""] || "bg-gray-300" } hover:cursor-pointer transition-colors duration-200`}
                >
                    <FaThumbsUp />
                    { scholarship.match && <p>{ toTitleCase(scholarship.match) } Match</p> }
                </button>
            </CardFooter>
        </Card>
    )
}