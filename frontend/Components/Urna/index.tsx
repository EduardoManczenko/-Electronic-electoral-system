'use client'
import Image from 'next/image';
import VotingKeyboard from './VotingKeyboard';
import CandidateList from './CandidateList';

export function Urna(){
    //<Image width={800} height={700} src="/images/justica_eleitoral.png" alt="justica_eleitoral" className='rounded-md'></Image>
    return(
        <div className="bg-[#c7ebca] w-full h-screen flex flex-col items-center justify-center pt-[80px]">
            
            <div className="bg-[rgb(124,218,130)] border-2 px-4 border-green-100 w-[90%] max-w-[1700px] h-[50%] min-h-[600px] max-h-[675px] flex rounded-md items-center justify-center gap-10">

                <div className='bg-[rgb(155,214,159)] w-[70%] max h-[90%] rounded-lg border-[#a4e9a8] border-4'>
                <CandidateList/>
                </div>

                <div className='h-[90%] w-[30%] max-w-[400px] flex flex-col'>
                    <div className='flex items-center justify-center gap-4 mb-2 px-4 py-2 border-green-100 bg-green-200 border-2 rounded-md'>
                        <Image width={100} height={100} src="/images/logo_justica_eleitoral.png" alt="justica_eleitoral" className='rounded-md'></Image>
                        <div className='text-2xl font-extrabold text-end'>JUSTIÇA ELEITORAL</div>
                    </div>
                    <VotingKeyboard/>
                </div>


            </div>
        </div>
    )
}