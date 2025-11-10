import Image from 'next/image';
import { Scholarship } from '@/lib/utils'
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
        strong: 'border-green-600 text-green-600',
        good: 'border-blue-600 text-blue-600',
        fair: 'border-yellow-500 text-yellow-600',
    };

    return (
        <Card className='w-[450px] h-[400px] flex flex-col gap-3 px-4'>
            <CardHeader className='w-full'>
                <div className="flex gap-8">
                    <div className='relative w-24 h-24'>
                        <Image src={ scholarship.programImg } alt={ scholarship.programName } fill className='object-contain' />
                    </div>
                    <div className="flex flex-col">
                        <p className='text-2xl font-medium'>{ scholarship.programName }</p>
                        <p className='text-dark-grayish-blue'>{ scholarship.issuer }</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className='flex flex-col gap-2'>
                <div className="flex w-full justify-between font-semibold">
                    <p className='text-xl text-green-700'>{ scholarship.financialCoverage.toUpperCase() }</p>
                    <p className='flex items-center text-xs bg-green-800 px-4 rounded-full text-white'>{ scholarship.status.toUpperCase() }</p>
                </div>
                <div className="flex flex-col text-dark-grayish-blue">
                    <p>Eligibility: { scholarship.eligibility }</p>
                    <p>Award Value: up to PHP { scholarship.awardValue }</p>
                </div>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Deadline</p>
                        <p className='text-2xl font-medium'>{ scholarship.deadline }</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Grade Cutoff</p>
                        <p className='text-2xl font-medium'>{ scholarship.cutoff }</p>
                    </div>
                    <div className="flex flex-col">
                        <p className='text-sm text-dark-grayish-blue'>Slots</p>
                        <p className='text-2xl font-medium'>{ scholarship.slots }</p>
                    </div>
                </div>
                <div className="flex gap-3">
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
                        e.preventDefault()
                        alert("Coming Soon!")
                    }}
                    >
                    See Full Details &rarr;
                </Link>
                <div className={`flex gap-2 items-center border-2 py-1 px-2 rounded-sm text-sm ${ mapRecommendMatch[scholarship.eRecommendMatch?.toLowerCase()] || "bg-gray-300" }`}>
                    <FaThumbsUp />
                    <p>{ toTitleCase(scholarship.eRecommendMatch) } Match</p>
                </div>
            </CardFooter>
        </Card>
    )
}