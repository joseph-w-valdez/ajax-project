import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import FlexBasisFull from '../components/FlexBasisFull';
import Header from '../components/Header';
import FullAgentPortrait from '../components/FullAgentPortrait';
import BackButton from '../components/BackButton';
import { normalizeAbilitySlot } from '../utilities/stringConversions';
import { scrollToTop } from '../utilities/scrollToTop';

const IndividualAbility = () => {
  const location = useLocation();
  const ability = location.state.data.ability;
  const agent = location.state.data.agent;
  const iconSrc = ability.slot === 'Passive' ? agent.displayIcon : ability.displayIcon;

  useEffect(() => {
    scrollToTop();
  }, [location]);

  return (
    <div className='flex flex-wrap justify-center'>
      <div className='flex justify-center items-center'>
        <BackButton />
        <Header text={`${ability.displayName} (${normalizeAbilitySlot(ability.slot)})`} />

      </div>
      <FlexBasisFull />
      <div className='flex items-center'>
        <div className='w-1/2'>
          <FullAgentPortrait agent={agent} />
        </div>
        <div className='w-1/2 flex flex-wrap justify-center'>
          <div className='w-[200px] h-fit mb-10'>
            <img src={iconSrc} alt={ability.description} className='object-contain w-full' />
          </div>
          <div className='w-full flex justify-center'>
            <p className='w-[400px]'>{ability.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualAbility;
