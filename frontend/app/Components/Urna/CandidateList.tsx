'use client';

import { useEffect, useState } from 'react';
import CandidateListCard from './CandidateListCard';
import { ethers } from 'ethers';
import { URNA_ADDRESS, ABI } from '../../../config';

interface CandidateData {
  name: string;
  describe: string;
  candidatePhoto: string;
  politicalPartyName: string;
  politicalPartyNumber: number;
  votes: number;
}

export default function CandidateList({ position }: { position: number }) {
  const [candidates, setCandidates] = useState<CandidateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);

      try {
        const rpc_url = 'https://polygon-amoy.drpc.org';
        const provider = new ethers.JsonRpcProvider(rpc_url);
        const contract = new ethers.Contract(URNA_ADDRESS, ABI, provider);
        const candidatesData: [string, string, string, string, number, number][] = await contract.verifyCandidatesData(position);

        const parsedCandidates = candidatesData.map(([name, describe, candidatePhoto, politicalPartyName, politicalPartyNumber, votes]) => ({
          name,
          describe,
          candidatePhoto,
          politicalPartyName,
          politicalPartyNumber,
          votes,
        }));

        setCandidates(parsedCandidates);
      } catch (err) {
        console.error('Erro ao buscar candidatos:', err);
        setError('Erro ao carregar os candidatos. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [position]);

  if (loading) {
    return <div>Carregando candidatos...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col w-full h-full gap-1 overflow-y-scroll scrollbar-hide custom-scroll">
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 bg-[#c9f0cb] w-full flex justify-center gap-4 h-[10%] z-10 border-b-2 border-b-green-400">
        <div className="w-[30%] flex items-center justify-center text-lg font-bold">Foto</div>
        <div className="w-[20%] flex items-center justify-center text-lg font-bold">Nome/Partido</div>
        <div className="w-[65%] flex items-center justify-center text-lg font-bold">Descrição</div>
        <div className="w-[15%] flex items-center justify-center text-lg font-bold">Votos</div>
      </div>

      {/* Lista de candidatos */}
      {candidates.map((candidate, index) => (
        <CandidateListCard key={index} candidate={candidate} />
      ))}

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #84e28c;
          border-radius: 9999px;
        }

        .custom-scroll::-webkit-scrollbar-button {
          display: none;
        }

        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #9e9e9e transparent;
        }
      `}</style>
    </div>
  );
}
