"use client";
import { useState } from 'react';
import { GrantType, ScholarshipFilters } from "@/lib/utils";
import { FaLocationDot, FaBookOpen } from "react-icons/fa6";
import { IoSchool } from "react-icons/io5";

const GRANT_COVERAGE = ['Full Grant', 'Partial Grant', 'Financial Assistance / Aid'];
const E_RECOMMEND_MATCHES = ['Strong', 'Good', 'Fair'];

export const ScholarshipFilter = () => {
    const [filters, setFilters] = useState<ScholarshipFilters>({
        location: "",
        financialCoverage: [],
        school: "",
        course: "",
        cutoffMax: null,
        eRecommendMatch: "",
        deadline: ""
    });

    const toggleGrant = (grant: GrantType) => {
        setFilters(prev => {
            const current = prev.financialCoverage || [];
            return {
                ...prev,
                financialCoverage: current.includes(grant) ? current.filter(g => g !== grant) : [...current, grant]
            };
        });    
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === "range" ? Number(value) : value 
        }));
    }
    return (
        <div className="flex flex-col gap-2 justify-center h-9/10 border-2 border-gray-300 rounded-lg w-1/4 px-8 py-2 text-dark-grayish-blue">
            <p className="text-3xl font-medium text-black">Filters</p>
            <label htmlFor='location' className='inline-flex flex-col gap-1 text-lg'>
                Location
                <div className="relative w-full">
                    <input type="text" name="location" id="location" value={ filters.location } className='w-full border-2 border-gray-outline rounded-sm h-8 px-2 text-sm placeholder-dark-grayish-blue' placeholder='Enter suburb, city, or, region...' />
                    <FaLocationDot className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-dark-grayish-blue'/>
                </div>
            </label>
            <label htmlFor='financialCoverage' className='inline-flex flex-col gap-1 text-lg'>
                Financial Coverage
                <div className="flex flex-col gap-1">
                    {GRANT_COVERAGE.map(grant => (
                        <label htmlFor={ grant } key={ grant } className='inline-flex items-center gap-2 text-sm'>
                            <input 
                                type="checkbox" 
                                value={ grant }  
                                checked={filters.financialCoverage?.includes(grant as GrantType)} 
                                onChange={ () => toggleGrant(grant as GrantType) }
                                className='w-4 h-4 rounded-xs'
                            />
                            { grant }
                        </label>
                    ))}
                </div>
            </label>
            <label htmlFor='school' className='inline-flex flex-col gap-1 text-lg'>
                School
                <div className="relative w-full">
                    <input type="text" name="school" id="school" value={ filters.school } onChange={ handleInputChange } className='w-full border-2 border-gray-outline rounded-sm h-8 px-2 text-sm placeholder-dark-grayish-blue' placeholder='University of St. La Salle' />
                    <IoSchool className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-dark-grayish-blue'/>
                </div>
            </label>
            <label htmlFor='course' className='inline-flex flex-col gap-1 text-lg'>
                Course / Program
                <div className="relative w-full">
                    <input type="text" name="course" id="course" value={ filters.course } onChange={ handleInputChange } className='w-full border-2 border-gray-outline rounded-sm h-8 px-2 text-sm placeholder-dark-grayish-blue' placeholder='BS Computer Science' />
                    <FaBookOpen className='absolute right-2 top-1/2 -translate-y-1/2 text-sm text-dark-grayish-blue'/>
                </div>
            </label>
            <label htmlFor='cutoffMax' className='inline-flex flex-col text-lg'>
                Grade Cut-off
                <div className="relative w-full">
                    <div 
                        className="absolute -bottom-5 w-10 text-center text-sm font-medium text-white bg-gold rounded"
                        style={{ left: `calc(${ filters.cutoffMax }% - 1.25rem)` }}
                    >
                        { filters.cutoffMax }%
                    </div>
                    <input 
                        type="range" 
                        min={0} 
                        max={100} 
                        name="cutoffMax" 
                        id="cutoffMax"
                        value={ filters.cutoffMax || 0 } 
                        onChange={ handleInputChange }
                        className="w-full h-2 rounded-lg appearance-none bg-gray-200 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer" 
                        style={{
                            background: `linear-gradient(to right, #FFD700 ${filters.cutoffMax}%, #E5E7EB ${filters.cutoffMax}%)`
                        }}
                    />
                </div>
            </label>
            <label htmlFor='eRecommendMatch' className='inline-flex flex-col gap-1 text-lg'>
                eRecommend Matches
                <select name="eRecommendMatch" id="eRecommendMatch" value={ filters.eRecommendMatch || "" } onChange={ handleInputChange } className='border-2 border-gray-outline rounded-sm p-1'>
                    <option value="">Select match level</option>
                    {E_RECOMMEND_MATCHES.map(match => (
                        <option key={ match } value={ match }>{ match } Match</option>
                    ))}
                </select>
            </label>
            <label htmlFor='deadline' className='inline-flex flex-col gap-1 text-lg'>
                Deadline
                <input
                    type="date"
                    name="deadline"
                    id="deadline"
                    value={filters.deadline || ""}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-outline rounded-sm h-8 px-2 text-sm text-dark-grayish-blue bg-white focus:outline-none focus:ring-2 focus:ring-gold"
                />
            </label>
        </div>
    )
}