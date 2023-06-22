import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import FlexBasisFull from '../components/FlexBasisFull';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot, onlyLettersAndNumbers } from '../utilities/stringConversions';
import { fetchAgent } from '../utilities/fetchAgents';
import { useLoadingContext } from '../contexts/LoadingContext';

const IndividualAgent: React.FC<{ setSelectedOption: (option: string) => void }> = ({ setSelectedOption }) => {
  const navigate = useNavigate();
  const { agentName } = useParams<{ agentName: string }>();
  const { setIsLoading } = useLoadingContext();
  const [agentData, setAgentData] = useState<any>(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const handleRoleClick = (role: any) => {
    setSelectedOption(role.displayName);
    navigate('/agents-list');
  };

  const handleAbilityClick = (ability: any) => {
    const abilityName = onlyLettersAndNumbers(ability.displayName);
    navigate(`/agent/${agentName}/${abilityName}`);
  };

  useEffect(() => {
    const getAgentData = async () => {
      try {
        setIsLoading(true);
        if (agentName) {
          const agentData = await fetchAgent(agentName);
          setAgentData(agentData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFetchCompleted(true);
        setIsLoading(false);
      }
    };

    getAgentData();
  }, [agentName, setIsLoading]);

  useEffect(() => {
    if (isFetchCompleted && !agentData) {
      navigate('/not-found');
    }
  }, [isFetchCompleted, agentData, navigate]);

  if (!agentData || !isFetchCompleted) {
    return null; // Don't try to render content until the fetch has completed
  }

  return (
    <>
      <div className='flex items-center'>
        <BackButton />
        <Header text={agentData.displayName} />
      </div>
      <FlexBasisFull />
      <div className='flex flex-wrap justify-center mt-[-16px]'>
        <div
          className='flex flex-wrap items-center justify-center cursor-pointer hover:bg-white hover:bg-opacity-25 p-1'
          onClick={() => handleRoleClick(agentData.role)}
        >
          <h3 className='text-lg sm:3xl'>{agentData.role.displayName}</h3>
          <div className='w-6 ml-2'>
            <img
              src={agentData.role.displayIcon}
              alt={agentData.role.displayName}
              className='object-contain w-full'
            />
          </div>
        </div>
        <FlexBasisFull />
        <h4 className='mt-2'>{`Codename: ${agentData.developerName}`}</h4>
        <FlexBasisFull />
        <div className='flex flex-wrap justify-center items-center relative top-[75px]'>
          <div className='w-full max-w-[80vw] sm:w-1/3 flex flex-wrap justify-center mb-10'>
            <FullAgentPortrait agent={agentData} />
          </div>
          <div className='w-full max-w-[80vw] sm:w-1/2 flex flex-wrap justify-center'>
            <section className='w-full max-w-[100vw] text-left mb-4'>
              <p>{agentData.description}</p>
            </section>
            <FlexBasisFull />
            <section className='mt-4 flex flex-wrap'>
              {agentData.abilities?.map((ability: any, index: number) => (
                <div
                  key={index}
                  className='w-1/2 p-2 flex flex-wrap justify-center cursor-pointer mb-6 hover:scale-125'
                  onClick={() => handleAbilityClick(ability)}
                >
                  <h4 className='w-full'>{ability.displayName} ({normalizeAbilitySlot(ability.slot)})</h4>
                  {ability.slot === 'Passive' ? (
                    <img
                      src={agentData.displayIcon}
                      alt={ability.displayName}
                      className='object-contain w-28'
                    />
                  ) : (
                    <img
                      src={ability.displayIcon}
                      alt={ability.displayName}
                      className='object-contain w-28'
                    />
                  )}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndividualAgent;
